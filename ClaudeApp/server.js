/**
 * Paper Plane Classifier — Backend
 * Node.js + Express + Clarifai API
 *
 * Установка зависимостей:
 *   npm install express multer cors dotenv
 *
 * Настройка:
 *   1. Зарегистрируйся на https://clarifai.com (бесплатно, 1000 вызовов/мес)
 *   2. Перейди в Settings → Security → Create Personal Access Token
 *   3. Скопируй PAT и добавь в .env файл:
 *        CLARIFAI_PAT=your_personal_access_token_here
 *
 * Запуск:
 *   node server.js
 */

require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Clarifai Config ───────────────────────────────────────────────────────────
// Используем бесплатную публичную модель general-image-recognition от Clarifai
// Документация: https://clarifai.com/clarifai/main/models/general-image-recognition
const CLARIFAI_PAT = process.env.CLARIFAI_PAT;
const CLARIFAI_MODEL_URL =
  "https://api.clarifai.com/v2/users/clarifai/apps/main/models/general-image-recognition/outputs";

if (!CLARIFAI_PAT) {
  console.error("❌ CLARIFAI_PAT не найден в .env файле!");
  console.error("   Получи токен на https://clarifai.com → Settings → Security");
  process.exit(1);
}

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Multer: хранение файлов в памяти (не на диске)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Только изображения!"), false);
    }
    cb(null, true);
  },
});

// ─── Классификационные константы ──────────────────────────────────────────────

// Метки Vision API, означающие "это вообще летательный аппарат"
const AIRCRAFT_LABELS = [
  "airplane", "aircraft", "plane", "jet", "aviation",
  "fighter jet", "glider", "biplane", "airliner", "helicopter",
  "propeller", "wing", "fuselage", "cockpit", "runway",
  "airport", "boeing", "airbus", "aircraft engine",
];

// Метки настоящих (не бумажных) самолётов
const REAL_AIRCRAFT_LABELS = [
  "jet", "fighter jet", "airliner", "commercial aircraft",
  "boeing", "airbus", "military aircraft", "passenger aircraft",
  "propeller plane", "biplane", "helicopter", "aircraft engine",
  "runway", "airport terminal",
];

// Метки, характерные для бумажных/игрушечных самолётов
const PAPER_PLANE_LABELS = [
  "paper airplane", "paper plane", "origami", "paper craft",
  "paper model", "paper art", "folded paper",
];

// Метки, указывающие на планер/purilennuk
const GLIDER_LABELS = [
  "glider", "gliding", "motorless aircraft", "sailplane",
  "purilennuk", "soaring", "hang glider", "paper glider",
  // Если метки Vision API говорят о широких крыльях и нет мотора
  "delta wing", "swept wing",
];

// ─── Утилиты ──────────────────────────────────────────────────────────────────

function normalize(str) {
  return str.toLowerCase().trim();
}

function hasMatch(labels, keywords) {
  return labels.some((label) =>
    keywords.some((kw) => normalize(label).includes(normalize(kw)))
  );
}

function scoreMatch(labels, keywords) {
  let score = 0;
  for (const label of labels) {
    for (const kw of keywords) {
      if (normalize(label).includes(normalize(kw))) {
        score++;
      }
    }
  }
  return score;
}

// ─── 3-уровневая классификация ────────────────────────────────────────────────

/**
 * Вызов Clarifai API — возвращает массив концептов с вероятностями
 * Формат: [{ name: "airplane", value: 0.98 }, ...]
 */
async function callClarifai(imageBase64) {
  const body = JSON.stringify({
    inputs: [
      {
        data: {
          image: { base64: imageBase64 },
        },
      },
    ],
  });

  const response = await fetch(CLARIFAI_MODEL_URL, {
    method: "POST",
    headers: {
      Authorization: `Key ${CLARIFAI_PAT}`,
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Clarifai API вернул ${response.status}: ${text}`);
  }

  const data = await response.json();

  // Проверяем статус ответа Clarifai
  const status = data?.status?.code;
  if (status !== 10000) {
    throw new Error(`Clarifai ошибка: ${data?.status?.description || "неизвестная ошибка"}`);
  }

  // Возвращаем список концептов из первого (единственного) output
  return data.outputs?.[0]?.data?.concepts || [];
}

/**
 * УРОВЕНЬ 1: Есть ли на картинке вообще летательный аппарат?
 * Clarifai возвращает концепты с value (0..1) — используем порог 0.5
 */
function classifyLevel1(concepts) {
  const names = concepts
    .filter((c) => c.value >= 0.5)
    .map((c) => c.name);
  return hasMatch(names, AIRCRAFT_LABELS);
}

/**
 * УРОВЕНЬ 2: Это бумажный самолёт, или настоящий?
 * Возвращает: "paper" | "real" | "unclear"
 */
function classifyLevel2(concepts) {
  // Берём все концепты с вероятностью >= 0.3 (широкий захват)
  const names = concepts
    .filter((c) => c.value >= 0.3)
    .map((c) => c.name);

  const paperScore = scoreMatch(names, PAPER_PLANE_LABELS);
  const realScore  = scoreMatch(names, REAL_AIRCRAFT_LABELS);

  if (paperScore > 0 && paperScore >= realScore) return "paper";
  if (realScore > 0  && realScore > paperScore)  return "real";

  // Дополнительная эвристика: если есть "paper" среди концептов с value > 0.5
  const hasPaperConcept = concepts.some(
    (c) => c.value > 0.5 && normalize(c.name).includes("paper")
  );
  if (hasPaperConcept) return "paper";

  return "unclear";
}

/**
 * УРОВЕНЬ 3: Какой тип бумажного самолёта?
 * Возвращает: "glider" | "classic"
 */
function classifyLevel3(concepts) {
  const names = concepts.map((c) => c.name);
  const gliderScore = scoreMatch(names, GLIDER_LABELS);
  if (gliderScore > 0) return "glider";
  return "classic";
}

// ─── Инструкции по сборке ─────────────────────────────────────────────────────

const INSTRUCTIONS = {
  glider: {
    title: "Purilennuk / Планер",
    emoji: "🛩️",
    description:
      "Широкий планирующий самолёт с большим размахом крыльев. Летит медленно и далеко.",
    youtube: "https://www.youtube.com/watch?v=8PkE_C-sKKo",
    steps: [
      "Возьмите лист A4 и сложите пополам по длине, затем разверните.",
      "Согните верхние углы к центральной линии — получится треугольник сверху.",
      "Загните треугольник вниз примерно на 2 см ниже середины листа.",
      "Снова согните верхние углы к центру (поверх первых сгибов).",
      "Поднимите маленький треугольник вверх — он зафиксирует крылья.",
      "Сложите самолёт пополам по центральной линии.",
      "Отогните крылья горизонтально. Готово! Бросайте мягко под углом ~10°.",
    ],
  },
  classic: {
    title: "Klassikaline paberlennuk / Классический самолёт",
    emoji: "✈️",
    description:
      "Классическая стрела — самый быстрый и дальнобойный тип бумажного самолёта.",
    youtube: "https://www.youtube.com/watch?v=veyZNyurlwU",
    steps: [
      "Возьмите лист A4, сложите пополам по длине, разверните.",
      "Согните два верхних угла к центральной линии.",
      "Согните получившиеся скошенные края снова к центру.",
      "Сложите самолёт пополам по центру.",
      "Загните одно крыло вниз так, чтобы его край совпал с нижним краем корпуса.",
      "Переверните и повторите для второго крыла.",
      "Расправьте крылья горизонтально. Бросайте сильно и прямо!",
    ],
  },
};

// ─── Смешные сообщения об ошибках ─────────────────────────────────────────────

const ERROR_MESSAGES = {
  not_aircraft: [
    "🐱 Эй, это же не самолёт! Моя бабушка лучше разбирается в авиации.",
    "🌸 Красивый цветочек, но мы тут самолёты ищем. Попробуй снова!",
    "🚗 Машина? Серьёзно? Мы не автосервис, дружище.",
    "🥔 Картошка не летает. Пока что.",
  ],
  real_aircraft: [
    "✈️ Это Boeing 737, а не бумажный самолётик! Пассажиры были бы удивлены.",
    "🛫 Слушай, это реальный самолёт. Мы тут с бумагой работаем, не с авиакомпаниями.",
    "🪖 Это боевой истребитель. Я не допущен к военным секретам.",
    "🚁 Вертолёт — это здорово, но бумажный вертолёт — это другая история.",
  ],
  unclear: [
    "🤔 Хм, я не уверен что это. Попробуй фото покачественнее?",
    "😵 Моя нейронная сеть в панике. Что это вообще такое?",
  ],
};

function randomMessage(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Основной маршрут ─────────────────────────────────────────────────────────

app.post("/classify", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Изображение не загружено." });
  }

  try {
    const imageContent = req.file.buffer.toString("base64");

    // Запрос к Clarifai API
    const concepts = await callClarifai(imageContent);

    // ── УРОВЕНЬ 1: Летательный аппарат? ──
    const isAircraft = classifyLevel1(concepts);
    if (!isAircraft) {
      return res.json({
        level: 1,
        passed: false,
        message: randomMessage(ERROR_MESSAGES.not_aircraft),
        debug: { concepts: concepts.map((c) => ({ name: c.name, value: c.value })) },
      });
    }

    // ── УРОВЕНЬ 2: Бумажный или настоящий? ──
    const aircraftType = classifyLevel2(concepts);
    if (aircraftType === "real") {
      return res.json({
        level: 2,
        passed: false,
        message: randomMessage(ERROR_MESSAGES.real_aircraft),
        debug: { concepts: concepts.map((c) => ({ name: c.name, value: c.value })) },
      });
    }
    if (aircraftType === "unclear") {
      return res.json({
        level: 2,
        passed: false,
        message: randomMessage(ERROR_MESSAGES.unclear),
        debug: { concepts: concepts.map((c) => ({ name: c.name, value: c.value })) },
      });
    }

    // ── УРОВЕНЬ 3: Какой тип бумажного самолёта? ──
    const planeType = classifyLevel3(concepts);
    const instructions = INSTRUCTIONS[planeType] || INSTRUCTIONS.classic;

    return res.json({
      level: 3,
      passed: true,
      planeType,
      instructions,
      debug: {
        concepts: concepts.map((c) => ({ name: c.name, value: c.value })),
      },
    });
  } catch (err) {
    console.error("Vision API error:", err);
    return res.status(500).json({
      error: "Ошибка сервера. Проверь API ключ и формат изображения.",
      details: err.message,
    });
  }
});

// ─── Запуск ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Paper Plane Classifier запущен на http://localhost:${PORT}`);
  console.log(`📸 POST /classify — отправь изображение как multipart/form-data (поле: image)`);
});