import {
  Anchor,
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  MantineProvider,
  Paper,
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
  IconPhoto,
  IconPlane,
  IconRulerMeasure,
  IconScale,
  IconTrendingUp,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

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

const navItems = [
  ["Lennuk", "#lennuk"],
  ["Andmed", "#specs"],
  ["Protsess", "#protsess"],
  ["Meedia", "#meedia"],
  ["Meeskond", "#meeskond"],
];

const stats = [
  {
    icon: IconRulerMeasure,
    value: "28 cm",
    label: "Tiivaulatus",
    text: "Maksimaalne tiivaulatus tais laotuses.",
  },
  {
    icon: IconScale,
    value: "4.8 g",
    label: "Kaal",
    text: "Uhe A4 lehega, ilma taienava kaaluta.",
  },
  {
    icon: IconGauge,
    value: "9.4 m",
    label: "Max viskekaugus",
    text: "Parim tulemus 5 katse keskmisest.",
  },
  {
    icon: IconClock,
    value: "3.2 s",
    label: "Lennu kestus",
    text: "Keskmiselt ohus pusimise aeg.",
  },
];

const process = [
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
];

const principles = [
  ["Aeg", "Sprintide pikkus oli fikseeritud ja sundis tegema selgeid otsuseid."],
  ["Kulu", "Uks A4 leht tahendas nulli raiskamist ning lihtsat tootmist."],
  ["Kvaliteet", "Lennukaugust optimeerisime iga iteratsiooniga."],
  ["Agiilsus", "Luhikesed tsuklid, kiire tagasiside ja pidev taiustamine."],
];

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
        backgroundColor: "#102410",
        color: "white",
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
      <Title order={2} size="clamp(2rem, 4vw, 3.4rem)" c="white">
        {title}
      </Title>
      <Text c="rgba(255,255,255,0.78)" maw={720} size="lg">
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
        {!mediaError ? (
          <AspectRatio ratio={16 / 9}>
            <Box
              component={isVideo ? "video" : "img"}
              src={src}
              controls={isVideo || undefined}
              muted={isVideo || undefined}
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
            <Box
              style={{
                alignItems: "center",
                backgroundImage: isVideo
                  ? "linear-gradient(135deg, rgba(26,46,26,0.95), rgba(74,140,63,0.65))"
                  : `linear-gradient(rgba(26,46,26,0.35), rgba(26,46,26,0.55)), url(${forestImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "white",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ThemeIcon color="forest" radius="xl" size={78} variant="light">
                <Icon size={40} />
              </ThemeIcon>
            </Box>
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
  return (
    <MantineProvider theme={theme}>
      <Box bg="#102410" mih="100vh">
        <Box
          component="header"
          style={{
            backdropFilter: "blur(14px)",
            background: "rgba(12, 34, 12, 0.94)",
            borderBottom: "1px solid rgba(168, 224, 149, 0.22)",
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          <Container size="lg">
            <Group h={76} justify="space-between" wrap="nowrap">
              <Group gap="sm" wrap="nowrap">
                <Avatar color="forest" radius="xl" variant="filled">
                  <IconPlane size={22} />
                </Avatar>
                <Title order={1} c="white" size="1.35rem">
                  TARpv24 Lennuk company
                </Title>
              </Group>
              <Group gap="lg" visibleFrom="sm">
                {navItems.map(([label, href]) => (
                  <Anchor key={href} c="rgba(255,255,255,0.82)" fw={600} href={href} underline="never">
                    {label}
                  </Anchor>
                ))}
              </Group>
            </Group>
          </Container>
        </Box>

        <Box
          id="lennuk"
          component="section"
          style={{
            alignItems: "center",
            backgroundImage: `linear-gradient(90deg, rgba(10,25,10,0.96), rgba(26,46,26,0.78), rgba(10,25,10,0.92)), url(${forestImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: "white",
            display: "flex",
            minHeight: "clamp(720px, 88vh, 880px)",
            overflow: "hidden",
            paddingBlock: "clamp(4rem, 8vw, 7rem)",
            position: "relative",
          }}
        >
          <MotionBox
            aria-hidden="true"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            style={{
              background:
                "radial-gradient(circle at 52% 18%, rgba(168,224,149,0.32), transparent 24%), linear-gradient(180deg, transparent 68%, rgba(7,22,7,0.86))",
              inset: 0,
              position: "absolute",
            }}
          />
          <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
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
                    Uusim toodang - Sprint 4
                  </Badge>
                  <Title
                    component={motion.h1}
                    variants={fadeUp}
                    c="white"
                    order={1}
                    size="clamp(3.4rem, 8vw, 7rem)"
                    lh={0.95}
                    style={{ textShadow: "0 6px 30px rgba(0,0,0,0.55)" }}
                  >
                    TARpv24 company Lennuk
                  </Title>
                  <Text
                    component={motion.p}
                    variants={fadeUp}
                    c="rgba(255,255,255,0.84)"
                    maw={720}
                    size="xl"
                  >
                    Sundinud metsasudamest, loodud lendama kaugemale kui keegi teine.
                    Meie agiilse protsessi tipptulemus - tapsus, kergus ja maksimaalne
                    lennukaugus.
                  </Text>
                  <Group component={motion.div} variants={fadeUp}>
                    <Button color="forest" radius="xl" size="lg" component="a" href="#specs">
                      Vaata spetsifikatsioone
                    </Button>
                    <Button color="forest" radius="xl" size="lg" variant="outline" component="a" href="#protsess">
                      Meie protsess
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
                  bg="rgba(255,255,255,0.93)"
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
                    <Title order={2} c="forest.9">
                      Standard A4 paberist ehitatud katsemudel
                    </Title>
                    <Text c="dimmed">
                      Disainitud korduvate sprintide, testlendude ja meeskondliku
                      tagasiside pohjal.
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        <Section id="specs" style={{ backgroundColor: "#1a2e1a" }}>
          <Container size="lg">
            <SectionIntro icon={IconTrendingUp} label="Tehnilised andmed" title="Lennuki spetsifikatsioonid">
              Koik allpool toodud naitajad pohinevad meie meeskonna poolt labi viidud
              testlendudel standardse A4 (80 g/m2) paberiga.
            </SectionIntro>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
              {stats.map((item) => {
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
                      <ThemeIcon color="forest" radius="xl" size={52}>
                        <Icon size={28} />
                      </ThemeIcon>
                      <Title order={3} size="2.2rem" c="forest.8">
                        {item.value}
                      </Title>
                      <Text fw={700}>{item.label}</Text>
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
            <SectionIntro icon={IconBuildingFactory} label="Tootearendus" title="Kuidas me siia joudsime">
              Meie teekond algas Taylori konveiersysteemist ja loppes agiilse
              iteratiivse tootearendusega.
            </SectionIntro>
            <Timeline active={2} bulletSize={34} color="forest" lineWidth={3}>
              {process.map((item) => (
                <Timeline.Item
                  key={item.title}
                  bullet={<IconPlane size={18} />}
                  title={
                    <Text c="white" fw={700}>
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
            backgroundImage: `linear-gradient(rgba(16,36,16,0.9), rgba(26,46,26,0.94)), url(${forestImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Container size="lg">
            <SectionIntro icon={IconPhoto} label="Foto & video" title="Projektimeedia showcase">
              Lisa projekti kausta foto ja testlennu video, et esitlus oleks visuaalselt
              tugevam ja tulemused oleksid kohe nahtavad.
            </SectionIntro>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              <MediaShowcaseCard
                type="photo"
                icon={IconPhoto}
                title="Foto showcase"
                description="Valminud paberilennuki, meeskonna voi tootmisprotsessi foto."
                src="/media/lennuk-photo.jpg"
              />
              <MediaShowcaseCard
                type="video"
                icon={IconVideo}
                title="Video showcase"
                description="Testlennu, voltimise voi sprinti kokkuvotva video."
                src="/media/lennuk-video.mp4"
              />
            </SimpleGrid>
          </Container>
        </Section>

        <Section id="meeskond" style={{ backgroundColor: "#1a2e1a" }}>
          <Container size="lg">
            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, md: 5 }}>
                <SectionIntro icon={IconUsers} label="Meeskond & Tehas" title="TARpv24 Lennukitehas">
                  Oleme vaikene, kuid puuendunud meeskond, kelle eesmark on luua maailma
                  parimad paberilennukid. Parim tootearendus synnib keskkonnas, kus
                  katsetamine on julgustatud.
                </SectionIntro>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 7 }}>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  {principles.map(([title, text]) => (
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

        <Box component="footer" bg="#0b1c0b" c="white" py="xl">
          <Container size="lg">
            <Divider color="rgba(168,224,149,0.25)" mb="lg" />
            <Group justify="space-between" gap="md">
              <Text c="rgba(255,255,255,0.7)">(c) 2025 TARpv24 Lennukitehas</Text>
              <Text c="rgba(255,255,255,0.7)">
                Hussein, Makskim, Timur, Nikita - Projektijuhtimine ja Agiilsus
              </Text>
              <Anchor c="forest.2" href="#lennuk" underline="hover">
                Tagasi ules
              </Anchor>
            </Group>
          </Container>
        </Box>
      </Box>
    </MantineProvider>
  );
}

export default App;
