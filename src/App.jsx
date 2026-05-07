import {
  Anchor,
  AppShell,
  AspectRatio,
  Avatar,
  Badge,
  BackgroundImage,
  Box,
  Burger,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Drawer,
  Grid,
  Group,
  Image,
  List,
  MantineProvider,
  NavLink,
  Overlay,
  Paper,
  Progress,
  RingProgress,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  Title,
  createTheme,
} from "@mantine/core";
import {
  IconBuildingFactory,
  IconClock,
  IconGauge,
  IconMoon,
  IconPhoto,
  IconPlane,
  IconRulerMeasure,
  IconScale,
  IconSun,
  IconTrendingUp,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

const forestImage =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=80";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const theme = createTheme({
  fontFamily: '"Poppins", sans-serif',
  headings: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "700",
  },
  primaryColor: "forest",
  colors: {
    dark: [
      "#effbe9",
      "#cfe9c5",
      "#a8cf9b",
      "#7cae73",
      "#5f8f56",
      "#426b3d",
      "#254b25",
      "#183618",
      "#102410",
      "#0b1c0b",
    ],
    forest: [
      "#effbe9",
      "#def3d4",
      "#bee7aa",
      "#9bd97d",
      "#7ccf57",
      "#62c640",
      "#4a8c3f",
      "#2d5a27",
      "#1a2e1a",
      "#102410",
    ],
  },
  defaultRadius: "md",
});

const translations = {
  et: {
    brand: "TARpv24 Lennuk company",
    navigationTitle: "Navigatsioon",
    menuAria: "Ava navigatsioon",
    languageLabel: "Keel",
    themeLabel: "Teema",
    lightTheme: "Hele",
    darkTheme: "Tume",
    nav: [
      ["Lennuk", "#lennuk"],
      ["Andmed", "#specs"],
      ["Protsess", "#protsess"],
      ["Meedia", "#meedia"],
      ["Meeskond", "#meeskond"],
    ],
    hero: {
      badge: "Uusim toodang - Sprint 4",
      title: "TARpv24 company Lennuk",
      text: "Sundinud metsasudamest, loodud lendama kaugemale kui keegi teine. Meie agiilse protsessi tipptulemus - tapsus, kergus ja maksimaalne lennukaugus.",
      specs: "Vaata spetsifikatsioone",
      process: "Meie protsess",
      cardTitle: "Standard A4 paberist ehitatud katsemudel",
      bullets: [
        "Korduvate sprintide pohjal disainitud.",
        "Testlendudega kontrollitud ja parandatud.",
        "Meeskondliku tagasisidega viimistletud.",
      ],
    },
    specs: {
      label: "Tehnilised andmed",
      title: "Lennuki spetsifikatsioonid",
      intro:
        "Koik allpool toodud naitajad pohinevad meie meeskonna poolt labi viidud testlendudel standardse A4 (80 g/m2) paberiga.",
      stats: [
        {
          icon: IconRulerMeasure,
          value: "28 cm",
          progress: 84,
          label: "Tiivaulatus",
          text: "Maksimaalne tiivaulatus tais laotuses.",
        },
        {
          icon: IconScale,
          value: "4.8 g",
          progress: 48,
          label: "Kaal",
          text: "Uhe A4 lehega, ilma taienava kaaluta.",
        },
        {
          icon: IconGauge,
          value: "9.4 m",
          progress: 94,
          label: "Max viskekaugus",
          text: "Parim tulemus 5 katse keskmisest.",
        },
        {
          icon: IconClock,
          value: "3.2 s",
          progress: 64,
          label: "Lennu kestus",
          text: "Keskmiselt ohus pusimise aeg.",
        },
      ],
    },
    process: {
      label: "Tootearendus",
      title: "Kuidas me siia joudsime",
      intro:
        "Meie teekond algas Taylori konveiersysteemist ja loppes agiilse iteratiivse tootearendusega.",
      steps: [
        {
          title: "Konveiermeetod",
          text: "Sprint 1 labisime rangelt Taylori pohimotetel: igal tiimiliikmel oli fikseeritud roll ja tootmisliin tootas mehaaniliselt.",
        },
        {
          title: "Uleleminek agiilsele",
          text: "Sprint 2-3 katsetasime risti-rollidega: igauks osales disainis ja testimises ning tagasiside tsukkel muutus kiiremaks.",
        },
        {
          title: "Raudne kolmnurk",
          text: "Sprint 4-ks oppisime tasakaalustama aega, kulu ja kvaliteeti nii, et tulemuseks oleks meie parim lennuk.",
        },
      ],
    },
    media: {
      label: "Foto & video",
      title: "Projektimeedia showcase",
      intro:
        "Lisa projekti kausta foto ja testlennu video, et esitlus oleks visuaalselt tugevam ja tulemused oleksid kohe nahtavad.",
      photoTitle: "Foto showcase",
      photoDescription: "Valminud paberilennuki, meeskonna voi tootmisprotsessi foto.",
      videoTitle: "Video showcase",
      videoDescription: "Testlennu, voltimise voi sprinti kokkuvotva video.",
    },
    team: {
      label: "Meeskond & Tehas",
      title: "TARpv24 Lennukitehas",
      intro:
        "Oleme vaikene, kuid puuendunud meeskond, kelle eesmark on luua maailma parimad paberilennukid. Parim tootearendus synnib keskkonnas, kus katsetamine on julgustatud.",
      principles: [
        ["Aeg", "Sprintide pikkus oli fikseeritud ja sundis tegema selgeid otsuseid."],
        ["Kulu", "Uks A4 leht tahendas nulli raiskamist ning lihtsat tootmist."],
        ["Kvaliteet", "Lennukaugust optimeerisime iga iteratsiooniga."],
        ["Agiilsus", "Luhikesed tsuklid, kiire tagasiside ja pidev taiustamine."],
      ],
    },
    footer: {
      copyright: "(c) 2026 TARpv24 Lennukitehas",
      authors: "Hussein, Makskim, Timur, Nikita - Projektijuhtimine ja Agiilsus",
      top: "Tagasi ules",
    },
  },
  en: {
    brand: "TARpv24 Airplane company",
    navigationTitle: "Navigation",
    menuAria: "Open navigation",
    languageLabel: "Language",
    themeLabel: "Theme",
    lightTheme: "Light",
    darkTheme: "Dark",
    nav: [
      ["Plane", "#lennuk"],
      ["Data", "#specs"],
      ["Process", "#protsess"],
      ["Media", "#meedia"],
      ["Team", "#meeskond"],
    ],
    hero: {
      badge: "Latest build - Sprint 4",
      title: "TARpv24 company Plane",
      text: "Born in the heart of the forest and built to fly farther than the rest. The peak result of our agile process - precision, lightness and maximum flight distance.",
      specs: "View specifications",
      process: "Our process",
      cardTitle: "Experimental model built from standard A4 paper",
      bullets: [
        "Designed through repeated sprints.",
        "Checked and improved with test flights.",
        "Refined through team feedback.",
      ],
    },
    specs: {
      label: "Technical data",
      title: "Plane specifications",
      intro:
        "All metrics below are based on test flights carried out by our team with standard A4 (80 g/m2) paper.",
      stats: [
        {
          icon: IconRulerMeasure,
          value: "28 cm",
          progress: 84,
          label: "Wingspan",
          text: "Maximum wingspan when fully unfolded.",
        },
        {
          icon: IconScale,
          value: "4.8 g",
          progress: 48,
          label: "Weight",
          text: "One A4 sheet with no additional ballast.",
        },
        {
          icon: IconGauge,
          value: "9.4 m",
          progress: 94,
          label: "Max throw distance",
          text: "Best result from the average of 5 attempts.",
        },
        {
          icon: IconClock,
          value: "3.2 s",
          progress: 64,
          label: "Flight duration",
          text: "Average time staying in the air.",
        },
      ],
    },
    process: {
      label: "Product development",
      title: "How we got here",
      intro:
        "Our journey started with Taylor's assembly-line system and ended with agile iterative product development.",
      steps: [
        {
          title: "Assembly-line method",
          text: "In Sprint 1 we followed Taylor's principles strictly: every team member had a fixed role and the production line worked mechanically.",
        },
        {
          title: "Transition to agile",
          text: "In Sprints 2-3 we tested cross-functional roles: everyone joined design and testing, and the feedback cycle became faster.",
        },
        {
          title: "Iron triangle",
          text: "By Sprint 4 we learned to balance time, cost and quality so the result would be our best plane.",
        },
      ],
    },
    media: {
      label: "Photo & video",
      title: "Project media showcase",
      intro:
        "Add a photo and test-flight video to the project folder so the presentation is more visual and the results are visible immediately.",
      photoTitle: "Photo showcase",
      photoDescription: "A photo of the finished paper plane, team or production process.",
      videoTitle: "Video showcase",
      videoDescription: "A test flight, folding process or sprint recap video.",
    },
    team: {
      label: "Team & Factory",
      title: "TARpv24 Airplane Factory",
      intro:
        "We are a small but committed team aiming to create the world's best paper planes. The best product development happens where experimentation is encouraged.",
      principles: [
        ["Time", "Fixed sprint length forced clear decisions."],
        ["Cost", "One A4 sheet meant zero waste and simple production."],
        ["Quality", "We optimized flight distance with every iteration."],
        ["Agility", "Short cycles, fast feedback and continuous improvement."],
      ],
    },
    footer: {
      copyright: "(c) 2026 TARpv24 Airplane Factory",
      authors: "Hussein, Makskim, Timur, Nikita - Project Management and Agility",
      top: "Back to top",
    },
  },
};

const getInitialLanguage = () => {
  if (typeof window === "undefined") {
    return "et";
  }

  const savedLanguage = localStorage.getItem("language");

  return savedLanguage === "en" || savedLanguage === "et" ? savedLanguage : "et";
};

const getInitialColorScheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedScheme = localStorage.getItem("colorScheme");

  if (savedScheme === "light" || savedScheme === "dark") {
    return savedScheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const palette = {
  dark: {
    appBg: "#102410",
    headerBg: "rgba(12, 34, 12, 0.94)",
    headerBorder: "1px solid rgba(168, 224, 149, 0.22)",
    navText: "rgba(255,255,255,0.82)",
    sectionBg: "#102410",
    sectionAltBg: "#1a2e1a",
    sectionText: "white",
    sectionMuted: "rgba(255,255,255,0.78)",
    heroCardBg: "#f6fbf2",
    heroCardText: "#102410",
    heroCardMuted: "#426b3d",
    footerBg: "#0b1c0b",
    footerText: "rgba(255,255,255,0.7)",
  },
  light: {
    appBg: "#f5f8f1",
    headerBg: "rgba(245, 248, 241, 0.94)",
    headerBorder: "1px solid rgba(45, 90, 39, 0.18)",
    navText: "#254b25",
    sectionBg: "#f5f8f1",
    sectionAltBg: "#e8f1e2",
    sectionText: "#102410",
    sectionMuted: "rgba(16,36,16,0.72)",
    heroCardBg: "#ffffff",
    heroCardText: "#102410",
    heroCardMuted: "#426b3d",
    footerBg: "#dfead8",
    footerText: "rgba(16,36,16,0.72)",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function Section({ children, style, ...props }) {
  return (
    <MotionBox
      component="section"
      initial="hidden"
      variants={fadeUp}
      viewport={{ once: true, amount: 0.16 }}
      whileInView="visible"
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        backgroundColor: "var(--section-bg)",
        color: "var(--section-text)",
        paddingBlock: "clamp(4.5rem, 8vw, 7rem)",
        ...style,
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
}

function SectionIntro({ icon: Icon, label, title, children }) {
  return (
    <Stack gap="sm" mb="xl">
      <Badge color="forest" leftSection={<Icon size={14} />} w="fit-content">
        {label}
      </Badge>
      <Title order={2} size="clamp(2rem, 4vw, 3.4rem)" c="var(--section-text)">
        {title}
      </Title>
      <Text c="var(--section-muted)" maw={720} size="lg">
        {children}
      </Text>
    </Stack>
  );
}

function MediaShowcaseCard({ type, icon: Icon, title, description, src }) {
  const [mediaError, setMediaError] = useState(false);
  const isVideo = type === "video";

  return (
    <MotionCard
      withBorder
      shadow="lg"
      radius="md"
      style={{ height: "100%", overflow: "hidden" }}
      whileHover={{ y: -8, boxShadow: "0 22px 54px rgba(0, 0, 0, 0.3)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <Card.Section>
        {!mediaError && !isVideo ? (
          <AspectRatio ratio={16 / 9}>
            <Image
              alt={title}
              src={src}
              onError={() => setMediaError(true)}
              h="100%"
              fit="cover"
            />
          </AspectRatio>
        ) : !mediaError ? (
          <AspectRatio ratio={16 / 9}>
            <Box
              component="video"
              src={src}
              controls
              muted
              onError={() => setMediaError(true)}
              style={{
                backgroundColor: "#0b1c0b",
                height: "100%",
                objectFit: "cover",
                width: "100%",
              }}
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={16 / 9}>
            <Center
              style={{
                backgroundImage: isVideo
                  ? "linear-gradient(135deg, rgba(26,46,26,0.95), rgba(74,140,63,0.65))"
                  : `linear-gradient(rgba(26,46,26,0.35), rgba(26,46,26,0.55)), url(${forestImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "white",
              }}
            >
              <ThemeIcon color="forest" radius="xl" size={78} variant="light">
                <Icon size={40} />
              </ThemeIcon>
            </Center>
          </AspectRatio>
        )}
      </Card.Section>
      <Stack gap="xs" mt="md">
        <Title order={3} size="h3">
          {title}
        </Title>
        <Text c="dimmed">{description}</Text>
      </Stack>
    </MotionCard>
  );
}

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [colorScheme, setColorScheme] = useState(getInitialColorScheme);
  const copy = translations[language] || translations.et;
  const colors = palette[colorScheme];

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("colorScheme", colorScheme);
  }, [colorScheme]);

  const renderControls = () => (
    <Group gap="xs" wrap="nowrap">
      <SegmentedControl
        aria-label={copy.languageLabel}
        data={[
          { label: "EE", value: "et" },
          { label: "EN", value: "en" },
        ]}
        onChange={setLanguage}
        size="xs"
        value={language}
      />
      <SegmentedControl
        aria-label={copy.themeLabel}
        data={[
          {
            label: (
              <Group gap={4} wrap="nowrap">
                <IconSun size={16} />
                <span>{copy.lightTheme}</span>
              </Group>
            ),
            value: "light",
          },
          {
            label: (
              <Group gap={4} wrap="nowrap">
                <IconMoon size={16} />
                <span>{copy.darkTheme}</span>
              </Group>
            ),
            value: "dark",
          },
        ]}
        onChange={setColorScheme}
        size="xs"
        value={colorScheme}
      />
    </Group>
  );

  return (
    <MantineProvider theme={theme} forceColorScheme={colorScheme}>
      <AppShell
        header={{ height: "calc(76px + env(safe-area-inset-top))" }}
        padding={0}
        bg={colors.appBg}
        style={{
          "--section-bg": colors.sectionBg,
          "--section-text": colors.sectionText,
          "--section-muted": colors.sectionMuted,
        }}
      >
        <AppShell.Header
          style={{
            backdropFilter: "blur(14px)",
            background: colors.headerBg,
            borderBottom: colors.headerBorder,
          }}
        >
          <Container size="lg" style={{ paddingTop: "env(safe-area-inset-top)" }}>
            <Group h={76} justify="space-between" wrap="nowrap">
              <Group gap="sm" wrap="nowrap">
                <Avatar color="forest" radius="xl" variant="filled">
                  <IconPlane size={22} />
                </Avatar>
                <Title order={1} c={colors.navText} size="1.35rem">
                  {copy.brand}
                </Title>
              </Group>
              <Group gap="lg" visibleFrom="md">
                {copy.nav.map(([label, href]) => (
                  <Anchor key={href} c={colors.navText} fw={600} href={href} underline="never">
                    {label}
                  </Anchor>
                ))}
              </Group>
              <Box visibleFrom="sm">{renderControls()}</Box>
              <Burger
                aria-label={copy.menuAria}
                color={colors.navText}
                hiddenFrom="md"
                onClick={open}
                opened={opened}
              />
            </Group>
          </Container>
        </AppShell.Header>

        <Drawer
          opened={opened}
          onClose={close}
          position="right"
          title={copy.navigationTitle}
          overlayProps={{ backgroundOpacity: 0.55, blur: 4 }}
        >
          <Stack gap="xs">
            {copy.nav.map(([label, href]) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                leftSection={<IconPlane size={18} />}
                onClick={close}
              />
            ))}
            <Divider my="sm" />
            {renderControls()}
          </Stack>
        </Drawer>

        <AppShell.Main>

        <Box
          id="lennuk"
          component="section"
          style={{
            alignItems: "center",
            color: "white",
            display: "flex",
            minHeight: "clamp(720px, 88vh, 880px)",
            overflow: "hidden",
            paddingBlock: "clamp(4rem, 8vw, 7rem)",
            position: "relative",
          }}
        >
          <BackgroundImage
            aria-hidden="true"
            src={forestImage}
            style={{
              filter: "blur(8px)",
              inset: "-18px",
              position: "absolute",
              transform: "scale(1.04)",
              zIndex: 0,
            }}
          />
          <Overlay
            backgroundOpacity={colorScheme === "dark" ? 0.18 : 0.08}
            color="#0a190a"
            gradient={
              colorScheme === "dark"
                ? "linear-gradient(90deg, rgba(10,25,10,0.58), rgba(26,46,26,0.24), rgba(10,25,10,0.48))"
                : "linear-gradient(90deg, rgba(245,248,241,0.86), rgba(245,248,241,0.42), rgba(223,234,216,0.76))"
            }
            zIndex={0}
          />
          <MotionBox
            aria-hidden="true"
            animate={{ opacity: [0.38, 0.58, 0.38] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            style={{
              background:
                "radial-gradient(circle at 52% 18%, rgba(168,224,149,0.22), transparent 24%), linear-gradient(180deg, transparent 72%, rgba(7,22,7,0.46))",
              inset: 0,
              position: "absolute",
              zIndex: 0,
            }}
          />
          <Container size="lg" style={{ position: "relative", zIndex: 2 }}>
            <Grid align="center" gutter="xl">
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack
                  component={motion.div}
                  align="flex-start"
                  gap="lg"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.13 } },
                  }}
                >
                  <Badge component={motion.div} variants={fadeUp} color="forest" size="lg">
                    {copy.hero.badge}
                  </Badge>
                  <Title
                    component={motion.h1}
                    variants={fadeUp}
                    c={colorScheme === "dark" ? "white" : "#2d5a27"}
                    order={1}
                    size="clamp(3.4rem, 8vw, 7rem)"
                    lh={0.95}
                    style={{
                      textShadow:
                        colorScheme === "dark"
                          ? "0 6px 30px rgba(0,0,0,0.55)"
                          : "0 4px 22px rgba(45,90,39,0.18)",
                    }}
                  >
                    {copy.hero.title}
                  </Title>
                  <Text
                    component={motion.p}
                    variants={fadeUp}
                    c={colorScheme === "dark" ? "rgba(255,255,255,0.84)" : "rgba(16,36,16,0.78)"}
                    maw={720}
                    size="xl"
                  >
                    {copy.hero.text}
                  </Text>
                  <Group component={motion.div} variants={fadeUp}>
                    <Button color="forest" radius="xl" size="lg" component="a" href="#specs">
                      {copy.hero.specs}
                    </Button>
                    <Button color="forest" radius="xl" size="lg" variant="outline" component="a" href="#protsess">
                      {copy.hero.process}
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 5 }}>
                <Paper
                  component={motion.div}
                  initial={{ opacity: 0, rotate: -2, scale: 0.92 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.65, ease: "easeOut" }}
                  p="xl"
                  radius="md"
                  shadow="xl"
                  withBorder
                  bg={colors.heroCardBg}
                  c={colors.heroCardText}
                  style={{ borderColor: "rgba(168, 224, 149, 0.45)" }}
                >
                  <Stack align="center" ta="center">
                    <ThemeIcon
                      component={motion.div}
                      animate={{ rotate: [-4, 4, -4], y: [0, -12, 0] }}
                      transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
                      color="forest"
                      radius="xl"
                      size={104}
                    >
                      <IconPlane size={48} />
                    </ThemeIcon>
                    <Title order={2} c={colors.heroCardText}>
                      {copy.hero.cardTitle}
                    </Title>
                    <List
                      c={colors.heroCardMuted}
                      icon={
                        <ThemeIcon color="forest" radius="xl" size={22}>
                          <IconPlane size={14} />
                        </ThemeIcon>
                      }
                      spacing="xs"
                      ta="left"
                    >
                      {copy.hero.bullets.map((item) => (
                        <List.Item key={item}>{item}</List.Item>
                      ))}
                    </List>
                  </Stack>
                </Paper>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        <Section id="specs" style={{ backgroundColor: colors.sectionAltBg }}>
          <Container size="lg">
            <SectionIntro icon={IconTrendingUp} label={copy.specs.label} title={copy.specs.title}>
              {copy.specs.intro}
            </SectionIntro>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
              {copy.specs.stats.map((item) => {
                const Icon = item.icon;
                return (
                  <MotionCard
                    key={item.label}
                    withBorder
                    shadow="md"
                    radius="md"
                    style={{ height: "100%" }}
                    whileHover={{ y: -8, boxShadow: "0 22px 54px rgba(0, 0, 0, 0.3)" }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <Stack gap="sm">
                      <RingProgress
                        roundCaps
                        size={92}
                        thickness={7}
                        sections={[{ value: item.progress, color: "forest" }]}
                        label={
                          <Center>
                            <ThemeIcon color="forest" radius="xl" size={46}>
                              <Icon size={25} />
                            </ThemeIcon>
                          </Center>
                        }
                      />
                      <Title order={3} size="2.2rem" c="forest.2">
                        {item.value}
                      </Title>
                      <Text fw={700}>{item.label}</Text>
                      <Progress color="forest" value={item.progress} radius="xl" size="sm" />
                      <Text c="dimmed">{item.text}</Text>
                    </Stack>
                  </MotionCard>
                );
              })}
            </SimpleGrid>
          </Container>
        </Section>

        <Section id="protsess">
          <Container size="md">
            <SectionIntro icon={IconBuildingFactory} label={copy.process.label} title={copy.process.title}>
              {copy.process.intro}
            </SectionIntro>
            <Timeline active={2} bulletSize={34} color="forest" lineWidth={3}>
              {copy.process.steps.map((item) => (
                <Timeline.Item
                  key={item.title}
                  bullet={<IconPlane size={18} />}
                  title={
                    <Text c="var(--section-text)" fw={700}>
                      {item.title}
                    </Text>
                  }
                >
                  <Paper mt="sm" p="md" radius="md" shadow="md" withBorder>
                    <Text c="dimmed">{item.text}</Text>
                  </Paper>
                </Timeline.Item>
              ))}
            </Timeline>
          </Container>
        </Section>

        <Section
          id="meedia"
          style={{
            backgroundImage:
              colorScheme === "dark"
                ? `linear-gradient(rgba(16,36,16,0.9), rgba(26,46,26,0.94)), url(${forestImage})`
                : `linear-gradient(rgba(245,248,241,0.88), rgba(232,241,226,0.94)), url(${forestImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Container size="lg">
            <SectionIntro icon={IconPhoto} label={copy.media.label} title={copy.media.title}>
              {copy.media.intro}
            </SectionIntro>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              <MediaShowcaseCard
                type="photo"
                icon={IconPhoto}
                title={copy.media.photoTitle}
                description={copy.media.photoDescription}
                src="/media/lennuk-photo.jpg"
              />
              <MediaShowcaseCard
                type="video"
                icon={IconVideo}
                title={copy.media.videoTitle}
                description={copy.media.videoDescription}
                src="/media/lennuk-video.mp4"
              />
            </SimpleGrid>
          </Container>
        </Section>

        <Section id="meeskond" style={{ backgroundColor: colors.sectionAltBg }}>
          <Container size="lg">
            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, md: 5 }}>
                <SectionIntro icon={IconUsers} label={copy.team.label} title={copy.team.title}>
                  {copy.team.intro}
                </SectionIntro>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 7 }}>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  {copy.team.principles.map(([title, text]) => (
                    <MotionCard
                      key={title}
                      withBorder
                      shadow="md"
                      radius="md"
                      style={{ height: "100%" }}
                      whileHover={{ y: -6, borderColor: "#4a8c3f" }}
                    >
                      <Title order={3} size="h4">
                        {title}
                      </Title>
                      <Text c="dimmed" mt="xs">
                        {text}
                      </Text>
                    </MotionCard>
                  ))}
                </SimpleGrid>
              </Grid.Col>
            </Grid>
          </Container>
        </Section>

        <Box component="footer" bg={colors.footerBg} c={colors.sectionText} py="xl">
          <Container size="lg">
            <Divider color="rgba(168,224,149,0.25)" mb="lg" />
            <Group justify="space-between" gap="md">
              <Text c={colors.footerText}>{copy.footer.copyright}</Text>
              <Text c={colors.footerText}>{copy.footer.authors}</Text>
              <Anchor c="forest.2" href="#lennuk" underline="hover">
                {copy.footer.top}
              </Anchor>
            </Group>
          </Container>
        </Box>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
