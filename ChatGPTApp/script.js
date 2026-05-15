const samples = [
  {
    id: "sailplane",
    title: "Purilennuk",
    label: "Tase 1 läbib, tase 2 peatub",
    url: "https://cyberplanet.tech/tthk/agile/pics/purilennuk.jpg",
    filename: "purilennuk.jpg",
    badge: "real",
  },
  {
    id: "classic",
    title: "Klassikaline paberlennuk",
    label: "Tase 3: klassikaline nool",
    url: "https://cyberplanet.tech/tthk/agile/pics/paberlennuk.jpg",
    filename: "paberlennuk.jpg",
    badge: "paper",
  },
  {
    id: "boeing",
    title: "Boeing 737",
    label: "Tase 1 läbib, tase 2 peatub",
    url: "https://cyberplanet.tech/tthk/agile/pics/boeng737.jpg",
    filename: "boeng737.jpg",
    badge: "real",
  },
];

const guides = {
  glider: {
    title: "Purilennuki voltimine",
    video:
      "https://www.youtube.com/results?search_query=paper+glider+folding+tutorial",
    steps: [
      "Võta A4 paber püstises asendis ja murra see pikuti pooleks.",
      "Ava paber ning murra ülemised nurgad keskjoonele, et tekiks terav nina.",
      "Murra sama nurgapaari veel kord keskjoone poole, kuid jäta tiibadele lai kandepind.",
      "Pööra lennuk keskjoonest kokku nii, et voldid jäävad väljapoole.",
      "Murra mõlemad tiivad alla, jättes kereks umbes kahe sõrme laiuse osa.",
      "Painuta tiiva tagumised servad veidi üles, et purilennuk lendaks stabiilsemalt.",
    ],
  },
  classic: {
    title: "Klassikalise noole voltimine",
    video:
      "https://www.youtube.com/results?search_query=classic+paper+airplane+folding+tutorial",
    steps: [
      "Võta A4 paber püstises asendis ja murra see pikuti pooleks.",
      "Ava paber ning too ülemised nurgad täpselt keskjoonele.",
      "Murra tekkinud kaldservad uuesti keskjoonele, et nina muutuks kitsaks.",
      "Murra lennuk keskjoonest kokku nii, et terav nina jääb ette.",
      "Voldi esimene tiib alla kere alumise servani ja korda sama teisel poolel.",
      "Silita voldid tugevaks ja ava tiivad sümmeetriliselt enne viskamist.",
    ],
  },
};

const stageLabels = [
  {
    key: "level1",
    eyebrow: "Samm A",
    title: "Kas pildil on lennuk?",
    locked: "Ootab sisendit.",
  },
  {
    key: "level2",
    eyebrow: "Samm B",
    title: "Kas see on paberlennuk?",
    locked: "Lukus kuni samm A õnnestub.",
  },
  {
    key: "level3",
    eyebrow: "Samm 3",
    title: "Milline paberlennuk?",
    locked: "Lukus kuni samm B õnnestub.",
  },
];

const sampleGrid = document.querySelector("#sampleGrid");
const previewImage = document.querySelector("#previewImage");
const imageFrame = document.querySelector(".image-frame");
const decisionTitle = document.querySelector("#decisionTitle");
const decisionCopy = document.querySelector("#decisionCopy");
const confidenceMeter = document.querySelector("#confidenceMeter");
const confidenceValue = document.querySelector("#confidenceValue");
const stageList = document.querySelector("#stageList");
const guidePanel = document.querySelector("#guidePanel");
const guideTitle = document.querySelector("#guideTitle");
const guideLink = document.querySelector("#guideLink");
const guideSteps = document.querySelector("#guideSteps");
const fileInput = document.querySelector("#fileInput");
const fileName = document.querySelector("#fileName");
const resetButton = document.querySelector("#resetButton");
const decoyButton = document.querySelector("#decoyButton");

let objectUrl = "";
let detectionModelPromise = null;
let classificationRun = 0;

function renderSamples() {
  sampleGrid.innerHTML = samples
    .map(
      (sample) => `
        <button class="sample-card" type="button" data-sample-id="${sample.id}">
          <img src="${sample.url}" alt="${sample.title}" loading="lazy" />
          <span>
            <strong>${sample.title}</strong>
            ${sample.label}
            <span class="badge ${sample.badge}">${sample.badge === "paper" ? "Paber" : "Päris lennuk"}</span>
          </span>
        </button>
      `,
    )
    .join("");
}

function classify({ filename = "", id = "" }) {
  const token = `${filename} ${id}`.toLowerCase();
  const isTrustedSample = samples.some((sample) => sample.id === id);

  if (matches(token, ["kass", "cat", "auto", "car", "lill", "flower", "muu", "decoy"])) {
    return nonPlaneResult();
  }

  if (isTrustedSample && id === "classic") {
    return paperResult({
      title: "Klassikaline paberlennuk",
      copy: "Kõik väravad läbitud: testpildil on terava ninaga klassikaline paberist nool.",
      confidence: 93,
      typeId: "classic",
      detail: "Terav nina ja kitsad sümmeetrilised tiivad sobivad klassikalise noolega.",
    });
  }

  if (
    matches(token, [
      "boeng",
      "boeing",
      "737",
      "airbus",
      "fighter",
      "jet",
      "reisilennuk",
      "purilennuk",
      "sailplane",
      "glider",
    ])
  ) {
    return realPlaneResult();
  }

  if (!isTrustedSample) return unverifiedUploadResult();

  return {
    title: "Vajab kontrolli",
    copy: "Demo ei leidnud kindlat märksõna. Päris lahenduses küsiks sama adapter Vision API-lt klassifikatsiooni koos põhjendusega.",
    confidence: 41,
    typeId: null,
    stages: {
      level1: fail("MVP ei saa pildi sisust piisavalt kindlalt aru."),
      level2: locked("Liigume edasi ainult kindla lennuki korral."),
      level3: locked("Tüüp jääb määramata."),
    },
  };
}

function loadingVisionResult() {
  return {
    title: "AI vaatab pilti",
    copy: "Laen vision-mudelit, otsin päris lennukit ja kontrollin vajadusel paberist lennuki kuju.",
    confidence: 12,
    typeId: null,
    stages: {
      level1: locked("Vision-mudel ja paberkuju analüüs töötavad."),
      level2: locked("Ootab sammu A tulemust."),
      level3: locked("Ootab paberlennuki kinnitust."),
    },
  };
}

async function classifyUploadedImage(imageElement) {
  try {
    await waitForImageLoad(imageElement);
    const model = await loadDetectionModel();
    const predictions = await model.detect(imageElement);
    const airplane = predictions
      .filter((prediction) => prediction.class === "airplane")
      .sort((a, b) => b.score - a.score)[0];
    const nonPlaneObject = findBlockingNonPlaneObject(predictions);

    if (airplane && airplane.score >= 0.45) {
      return uploadedPlaneResult(airplane.score);
    }

    if (nonPlaneObject) {
      return uploadedNonPlaneResult(predictions);
    }

    const paperPlane = analyzePaperPlaneShape(imageElement);
    if (paperPlane.detected) {
      return uploadedPaperPlaneResult(paperPlane);
    }

    return uploadedNonPlaneResult(predictions);
  } catch (error) {
    return visionErrorResult(error);
  }
}

function findBlockingNonPlaneObject(predictions) {
  const blockedClasses = new Set([
    "person",
    "bird",
    "cat",
    "dog",
    "horse",
    "sheep",
    "cow",
    "elephant",
    "bear",
    "zebra",
    "giraffe",
    "teddy bear",
  ]);

  return predictions.find(
    (prediction) => blockedClasses.has(prediction.class) && prediction.score >= 0.35,
  );
}

function loadDetectionModel() {
  if (!window.cocoSsd) {
    return Promise.reject(new Error("COCO-SSD mudel ei laadinud. Kontrolli internetiühendust."));
  }

  if (!detectionModelPromise) {
    detectionModelPromise = window.cocoSsd.load();
  }

  return detectionModelPromise;
}

function waitForImageLoad(imageElement) {
  if (imageElement.complete && imageElement.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    imageElement.addEventListener("load", resolve, { once: true });
    imageElement.addEventListener("error", () => reject(new Error("Pilti ei saanud lugeda.")), {
      once: true,
    });
  });
}

function analyzePaperPlaneShape(imageElement) {
  const sourceWidth = imageElement.naturalWidth || imageElement.width;
  const sourceHeight = imageElement.naturalHeight || imageElement.height;
  const maxSide = 260;
  const scale = Math.min(maxSide / sourceWidth, maxSide / sourceHeight, 1);
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  canvas.width = width;
  canvas.height = height;
  context.drawImage(imageElement, 0, 0, width, height);

  const { data } = context.getImageData(0, 0, width, height);
  const mask = new Uint8Array(width * height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const alpha = data[index + 3];
      if (alpha < 80) continue;

      const maxChannel = Math.max(red, green, blue);
      const minChannel = Math.min(red, green, blue);
      const brightness = (red + green + blue) / 3;
      const saturation = maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel;
      const warmth = red - blue;
      const looksLikePaper = brightness > 168 && saturation < 0.26 && warmth < 46;

      if (looksLikePaper) mask[y * width + x] = 1;
    }
  }

  const components = findPaperComponents(mask, width, height);
  if (!components.length) {
    return { detected: false, confidence: 0 };
  }

  const best = components
    .map((component) => scorePaperComponent(component, width, height))
    .sort((a, b) => b.score - a.score)[0];

  const detected =
    best.score >= 76 &&
    best.paperRatio > 0.055 &&
    best.paperRatio < 0.56 &&
    best.fillRatio > 0.22 &&
    best.fillRatio < 0.7 &&
    best.aspectRatio > 1.28 &&
    best.taperScore > 0.52 &&
    !best.looksLikeBackground;

  return {
    detected,
    confidence: Math.min(96, Math.max(45, best.score)),
    metrics: {
      aspectRatio: best.aspectRatio,
      fillRatio: best.fillRatio,
      paperRatio: best.paperRatio,
      taperScore: best.taperScore,
    },
  };
}

function findPaperComponents(mask, width, height) {
  const visited = new Uint8Array(mask.length);
  const components = [];
  const minPixels = Math.max(80, Math.round(width * height * 0.018));

  for (let start = 0; start < mask.length; start += 1) {
    if (!mask[start] || visited[start]) continue;

    const stack = [start];
    const pixels = [];
    const rowCounts = new Array(height).fill(0);
    const colCounts = new Array(width).fill(0);
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    visited[start] = 1;

    while (stack.length) {
      const index = stack.pop();
      const x = index % width;
      const y = Math.floor(index / width);
      pixels.push(index);
      rowCounts[y] += 1;
      colCounts[x] += 1;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);

      const neighbors = [index - 1, index + 1, index - width, index + width];
      for (const neighbor of neighbors) {
        if (neighbor < 0 || neighbor >= mask.length || visited[neighbor] || !mask[neighbor]) {
          continue;
        }

        const neighborX = neighbor % width;
        if (Math.abs(neighborX - x) > 1) continue;

        visited[neighbor] = 1;
        stack.push(neighbor);
      }
    }

    if (pixels.length >= minPixels) {
      components.push({
        pixels: pixels.length,
        rowCounts,
        colCounts,
        minX,
        minY,
        maxX,
        maxY,
      });
    }
  }

  return components;
}

function scorePaperComponent(component, width, height) {
  const boxWidth = component.maxX - component.minX + 1;
  const boxHeight = component.maxY - component.minY + 1;
  const paperRatio = component.pixels / (width * height);
  const fillRatio = component.pixels / (boxWidth * boxHeight);
  const aspectRatio = Math.max(boxWidth / boxHeight, boxHeight / boxWidth);
  const widthRatio = boxWidth / width;
  const heightRatio = boxHeight / height;
  const taperScore = Math.max(
    getTaperScore(component.colCounts, component.minX, component.maxX),
    getTaperScore(component.rowCounts, component.minY, component.maxY),
  );
  const touchesLeft = component.minX <= 2;
  const touchesRight = component.maxX >= width - 3;
  const touchesTop = component.minY <= 2;
  const touchesBottom = component.maxY >= height - 3;
  const touchedEdges = [touchesLeft, touchesRight, touchesTop, touchesBottom].filter(Boolean)
    .length;
  const looksLikeBackground =
    touchedEdges >= 2 || (touchesBottom && widthRatio > 0.72) || fillRatio > 0.72;

  let score = 0;
  if (paperRatio > 0.055 && paperRatio < 0.56) score += 20;
  if (widthRatio > 0.36 && heightRatio > 0.18) score += 18;
  if (aspectRatio > 1.28) score += 18;
  if (fillRatio > 0.22 && fillRatio < 0.7) score += 18;
  score += Math.round(taperScore * 22);
  if (looksLikeBackground) score -= 24;

  return {
    score,
    paperRatio,
    fillRatio,
    aspectRatio,
    taperScore,
    looksLikeBackground,
  };
}

function getTaperScore(counts, start, end) {
  const length = end - start + 1;
  if (length < 12) return 0;

  const edgeSize = Math.max(3, Math.floor(length * 0.16));
  const centerSize = Math.max(3, Math.floor(length * 0.24));
  const centerStart = Math.max(start, Math.floor((start + end - centerSize) / 2));
  const leftAverage = averageRange(counts, start, start + edgeSize - 1);
  const rightAverage = averageRange(counts, end - edgeSize + 1, end);
  const centerAverage = averageRange(counts, centerStart, centerStart + centerSize - 1);
  const maxAverage = Math.max(leftAverage, rightAverage, centerAverage, 1);
  const narrowEdge = Math.min(leftAverage, rightAverage) / maxAverage;
  const centerStrength = centerAverage / maxAverage;

  if (narrowEdge > 0.58 || centerStrength < 0.38) return 0;
  return Math.min(1, (0.58 - narrowEdge) / 0.58 + centerStrength * 0.45);
}

function averageRange(values, start, end) {
  let sum = 0;
  let count = 0;

  for (let index = start; index <= end; index += 1) {
    sum += values[index] || 0;
    count += 1;
  }

  return count ? sum / count : 0;
}

function nonPlaneResult() {
  return {
    title: "Siin ei ole lennukit",
    copy: "Samm A peatab töövoo: ilus pilt, aga lennuomadused on kahtlased.",
    confidence: 88,
    typeId: null,
    stages: {
      level1: fail("Objekt ei ole lennuk ega lennukilaadne ese."),
      level2: locked("Samm B jäi avamata, sest sisend ei läbinud esimest filtrit."),
      level3: locked("Tüüpi ei tuvastata, kui pildil pole lennukit."),
    },
  };
}

function uploadedPaperPlaneResult(paperPlane) {
  const confidence = Math.round(paperPlane.confidence);

  return paperResult({
    title: "Klassikaline paberlennuk",
    copy: "COCO-SSD ei tundnud seda klassina ära, aga paberkuju analüüs leidis suure valge nurgelise ja terava lennuki.",
    confidence,
    typeId: "classic",
    detail: `Paberi kuju, täituvus ja terav ots sobivad klassikalise paberlennukiga (${confidence}%).`,
  });
}

function uploadedPlaneResult(score) {
  const confidence = Math.round(score * 100);

  return {
    title: "Lennuk tuvastatud",
    copy: "AI leidis pildilt lennuki. Paberlennuki juhist veel ei kuvata, sest selleks on vaja eraldi pabermudeli kontrolli.",
    confidence,
    typeId: null,
    stages: {
      level1: pass(`Vision-mudel tuvastas klassi "airplane" kindlusega ${confidence}%.`),
      level2: fail("Uploadide puhul ei piisa COCO-SSD lennukiklassist, et öelda kindlalt 'paberlennuk'."),
      level3: locked("Tüüpi ei määrata enne paberlennuki erimudeli kinnitust."),
    },
  };
}

function uploadedNonPlaneResult(predictions) {
  const bestGuess = predictions[0]?.class;
  const guessText = bestGuess ? ` Mudeli parim muu pakkumine oli "${bestGuess}".` : "";

  return {
    title: "Lennukit ei leitud",
    copy: `AI ei leidnud pildilt päris lennukit ega paberlennuki kuju, seega töövoog peatub sammus A.${guessText}`,
    confidence: 82,
    typeId: null,
    stages: {
      level1: fail("Vision-mudel ei tuvastanud klassi \"airplane\" ja paberkuju kontroll ei läbinud lävendit."),
      level2: locked("Samm B avaneb ainult siis, kui pildil on lennuk."),
      level3: locked("Paberlennuki tüüpi ei otsita ilma lennukita."),
    },
  };
}

function visionErrorResult(error) {
  return {
    title: "AI mudel ei käivitunud",
    copy: error.message,
    confidence: 0,
    typeId: null,
    stages: {
      level1: fail("Brauser ei saanud vision-mudelit laadida või pilti analüüsida."),
      level2: locked("Paberlennuki kontroll jäi avamata."),
      level3: locked("Juhist ei kuvata."),
    },
  };
}

function realPlaneResult() {
  return {
    title: "Päris lennuk",
    copy: "Samm B peatab voo: see lendab küll, aga pildil on päris kere või kokpit, mitte volditud paber.",
    confidence: 96,
    typeId: null,
    stages: {
      level1: pass("Lennuki kuju on tuvastatud."),
      level2: fail("Materjal ja detailid viitavad päris lennukile, mitte paberlennukile."),
      level3: locked("Paberlennuki mudelit ei otsita, sest samm B põrus."),
    },
  };
}

function unverifiedUploadResult() {
  return {
    title: "Upload vajab AI kontrolli",
    copy: "Turvareegel: MVP ei nimeta üleslaetud pilti paberlennukiks ainult failinime või oletuse põhjal.",
    confidence: 34,
    typeId: null,
    stages: {
      level1: fail("Pildi sisu ei kontrollitud päris vision-mudeliga."),
      level2: locked("Paberlennuki kontroll avaneb ainult usaldusväärse lennuki tuvastuse järel."),
      level3: locked("Voltmisjuhist ei kuvata enne kindlat paberlennuki tuvastust."),
    },
  };
}

function paperResult({ title, copy, confidence, typeId, detail }) {
  return {
    title,
    copy,
    confidence,
    typeId,
    stages: {
      level1: pass("Lennukilaadne objekt on tuvastatud."),
      level2: pass("Objekt on paberist volditud lennuk, mitte päris lennuk või lind."),
      level3: pass(detail),
    },
  };
}

function matches(token, words) {
  return words.some((word) => token.includes(word));
}

function pass(text) {
  return { status: "pass", text };
}

function fail(text) {
  return { status: "fail", text };
}

function locked(text) {
  return { status: "locked", text };
}

function renderResult(result) {
  decisionTitle.textContent = result.title;
  decisionCopy.textContent = result.copy;
  confidenceMeter.style.width = `${result.confidence}%`;
  confidenceMeter.style.background = result.confidence >= 80 ? "var(--teal)" : "var(--yellow)";
  confidenceValue.textContent = `${result.confidence}%`;

  stageList.innerHTML = stageLabels
    .map((stage) => {
      const state = result.stages[stage.key] || locked(stage.locked);
      const heading = state.status === "locked" ? stage.title : statusTitle(stage.title, state.status);

      return `
        <article class="stage-card ${state.status}">
          <div class="stage-kicker">
            <span>${stage.eyebrow}</span>
            <span class="status-dot" aria-hidden="true"></span>
          </div>
          <h3>${heading}</h3>
          <p>${state.text}</p>
        </article>
      `;
    })
    .join("");

  renderGuide(result.typeId);
}

function statusTitle(title, status) {
  return `${title} ${status === "pass" ? "Jah" : "Ei"}`;
}

function renderGuide(typeId) {
  if (!typeId || !guides[typeId]) {
    guidePanel.classList.add("hidden");
    guideSteps.innerHTML = "";
    return;
  }

  const guide = guides[typeId];
  guideTitle.textContent = guide.title;
  guideLink.href = guide.video;
  guideSteps.innerHTML = guide.steps.map((step) => `<li>${step}</li>`).join("");
  guidePanel.classList.remove("hidden");
}

function setPreview({ url, title }) {
  previewImage.src = url;
  previewImage.alt = title;
  imageFrame.classList.add("has-image");
}

function clearObjectUrl() {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
    objectUrl = "";
  }
}

function selectSample(sampleId) {
  classificationRun += 1;
  clearObjectUrl();
  const sample = samples.find((item) => item.id === sampleId);
  if (!sample) return;

  document.querySelectorAll(".sample-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.sampleId === sampleId);
  });
  fileInput.value = "";
  fileName.textContent = "Faili pole valitud";

  setPreview({ url: sample.url, title: sample.title });
  renderResult(classify({ filename: sample.filename, id: sample.id }));
}

function reset() {
  classificationRun += 1;
  clearObjectUrl();
  previewImage.removeAttribute("src");
  previewImage.alt = "";
  imageFrame.classList.remove("has-image");
  document.querySelectorAll(".sample-card").forEach((card) => card.classList.remove("active"));
  fileInput.value = "";
  fileName.textContent = "Faili pole valitud";
  renderResult({
    title: "Ootel",
    copy: "Klassifikaator ootab sisendit.",
    confidence: 0,
    typeId: null,
    stages: {
      level1: locked("Ootab sisendit."),
      level2: locked("Lukus kuni samm A õnnestub."),
      level3: locked("Lukus kuni samm B õnnestub."),
    },
  });
}

sampleGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".sample-card");
  if (card) selectSample(card.dataset.sampleId);
});

fileInput.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;

  const runId = (classificationRun += 1);
  clearObjectUrl();
  objectUrl = URL.createObjectURL(file);
  document.querySelectorAll(".sample-card").forEach((card) => card.classList.remove("active"));
  fileName.textContent = file.name;
  setPreview({ url: objectUrl, title: file.name });
  renderResult(loadingVisionResult());

  const result = await classifyUploadedImage(previewImage);
  if (runId === classificationRun) renderResult(result);
});

decoyButton.addEventListener("click", () => {
  classificationRun += 1;
  clearObjectUrl();
  document.querySelectorAll(".sample-card").forEach((card) => card.classList.remove("active"));
  fileInput.value = "";
  fileName.textContent = "Faili pole valitud";
  previewImage.removeAttribute("src");
  previewImage.alt = "";
  imageFrame.classList.remove("has-image");
  renderResult(classify({ filename: "kass.jpg", id: "decoy" }));
});

resetButton.addEventListener("click", reset);

renderSamples();
reset();
