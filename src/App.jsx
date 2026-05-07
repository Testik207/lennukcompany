import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import BalanceIcon from "@mui/icons-material/Balance";
import GroupsIcon from "@mui/icons-material/Groups";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SpeedIcon from "@mui/icons-material/Speed";
import StraightenIcon from "@mui/icons-material/Straighten";
import TimerIcon from "@mui/icons-material/Timer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VideocamIcon from "@mui/icons-material/Videocam";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";

const forestImage =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=80";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const theme = createTheme({
  palette: {
    background: {
      default: "#102410",
    },
    primary: {
      main: "#4a8c3f",
      light: "#7bbf6a",
      dark: "#1a2e1a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a8e095",
      contrastText: "#102410",
    },
    success: {
      main: "#2d5a27",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
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
    icon: <StraightenIcon />,
    value: "28 cm",
    label: "Tiivaulatus",
    text: "Maksimaalne tiivaulatus tais laotuses.",
  },
  {
    icon: <BalanceIcon />,
    value: "4.8 g",
    label: "Kaal",
    text: "Uhe A4 lehega, ilma taienava kaaluta.",
  },
  {
    icon: <SpeedIcon />,
    value: "9.4 m",
    label: "Max viskekaugus",
    text: "Parim tulemus 5 katse keskmisest.",
  },
  {
    icon: <TimerIcon />,
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

function AnimatedSection({ children, ...props }) {
  return (
    <MotionBox
      component="section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      {...props}
    >
      {children}
    </MotionBox>
  );
}

function MediaShowcaseCard({ type, icon, title, description, src }) {
  const [mediaError, setMediaError] = useState(false);
  const isVideo = type === "video";

  return (
    <MotionCard
      variant="outlined"
      sx={{ height: "100%", overflow: "hidden" }}
      whileHover={{ y: -8, boxShadow: "0 18px 44px rgba(26, 46, 26, 0.22)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {!mediaError ? (
        <CardMedia
          component={isVideo ? "video" : "img"}
          src={src}
          controls={isVideo}
          muted={isVideo}
          onError={() => setMediaError(true)}
          sx={{ aspectRatio: "16 / 9", objectFit: "cover", bgcolor: "grey.900" }}
        />
      ) : (
        <Box
          sx={{
            aspectRatio: "16 / 9",
            display: "grid",
            placeItems: "center",
            backgroundImage: isVideo
              ? "linear-gradient(135deg, rgba(26,46,26,0.95), rgba(74,140,63,0.65))"
              : `linear-gradient(rgba(26,46,26,0.35), rgba(26,46,26,0.55)), url(${forestImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: "white",
          }}
        >
          <Avatar sx={{ width: 74, height: 74, bgcolor: "rgba(255,255,255,0.18)" }}>
            {icon}
          </Avatar>
        </Box>
      )}
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
        <Typography variant="body2" sx={{ color: "primary.dark", mt: 2 }}>
          Fail: {src}
        </Typography>
      </CardContent>
    </MotionCard>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "rgba(12, 34, 12, 0.94)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(168, 224, 149, 0.22)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
              <AirplanemodeActiveIcon />
            </Avatar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TARpv24 Lennuk company
            </Typography>
            <Stack direction="row" spacing={1} sx={{ display: { xs: "none", sm: "flex" } }}>
              {navItems.map(([label, href]) => (
                <Button key={href} color="inherit" href={href}>
                  {label}
                </Button>
              ))}
            </Stack>
            <IconButton
              color="inherit"
              href="#lennuk"
              aria-label="Avaleht"
              sx={{ display: { sm: "none" } }}
            >
              <AirplanemodeActiveIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main">
        <Box
          id="lennuk"
          component="section"
          sx={{
            position: "relative",
            overflow: "hidden",
            minHeight: { xs: 720, md: 820 },
            py: { xs: 8, md: 12 },
            color: "white",
            display: "flex",
            alignItems: "center",
            backgroundImage: `linear-gradient(90deg, rgba(10,25,10,0.96), rgba(26,46,26,0.78), rgba(10,25,10,0.92)), url(${forestImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <MotionBox
            aria-hidden="true"
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 18%, rgba(168,224,149,0.32), transparent 24%), linear-gradient(180deg, transparent 68%, rgba(7,22,7,0.86))",
            }}
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack
                  component={motion.div}
                  spacing={3}
                  alignItems="flex-start"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.13 } },
                  }}
                >
                  <Chip
                    component={motion.div}
                    variants={fadeUp}
                    color="primary"
                    label="Uusim toodang - Sprint 4"
                  />
                  <Typography
                    component={motion.h1}
                    variants={fadeUp}
                    variant="h2"
                    sx={{ textShadow: "0 6px 30px rgba(0,0,0,0.55)" }}
                  >
                    TARpv24 company Lennuk
                  </Typography>
                  <Typography
                    component={motion.p}
                    variants={fadeUp}
                    variant="h6"
                    sx={{ color: "rgba(255,255,255,0.84)", maxWidth: 720 }}
                  >
                    Sundinud metsasudamest, loodud lendama kaugemale kui keegi teine.
                    Meie agiilse protsessi tipptulemus - tapsus, kergus ja maksimaalne
                    lennukaugus.
                  </Typography>
                  <Stack
                    component={motion.div}
                    variants={fadeUp}
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                  >
                    <Button variant="contained" size="large" href="#specs">
                      Vaata spetsifikatsioone
                    </Button>
                    <Button variant="outlined" size="large" href="#protsess">
                      Meie protsess
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Paper
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.65, ease: "easeOut" }}
                  variant="outlined"
                  sx={{
                    p: 4,
                    bgcolor: "rgba(255,255,255,0.92)",
                    borderColor: "rgba(168, 224, 149, 0.36)",
                  }}
                >
                  <Stack spacing={3} alignItems="center" textAlign="center">
                    <Avatar
                      component={motion.div}
                      animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      sx={{ width: 96, height: 96, bgcolor: "primary.main" }}
                    >
                      <AirplanemodeActiveIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" component="p">
                      Standard A4 paberist ehitatud katsemudel
                    </Typography>
                    <Typography color="text.secondary">
                      Disainitud korduvate sprintide, testlendude ja meeskondliku
                      tagasiside pohjal.
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <AnimatedSection
          id="specs"
          sx={{
            bgcolor: "primary.dark",
            color: "white",
            py: { xs: 7, md: 10 },
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={2} sx={{ mb: 4 }}>
              <Chip icon={<TrendingUpIcon />} label="Tehnilised andmed" sx={{ alignSelf: "flex-start" }} />
              <Typography variant="h3" component="h2">
                Lennuki spetsifikatsioonid
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.78)" }}>
                Koik allpool toodud naitajad pohinevad meie meeskonna poolt labi viidud
                testlendudel standardse A4 (80 g/m2) paberiga.
              </Typography>
            </Stack>
            <Grid container spacing={3}>
              {stats.map((item) => (
                <Grid key={item.label} size={{ xs: 12, sm: 6, md: 3 }}>
                  <MotionCard
                    variant="outlined"
                    sx={{ height: "100%" }}
                    whileHover={{ y: -8, boxShadow: "0 18px 44px rgba(26, 46, 26, 0.18)" }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Avatar sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}>
                          {item.icon}
                        </Avatar>
                        <Typography variant="h4">{item.value}</Typography>
                        <Typography variant="subtitle1">{item.label}</Typography>
                        <Typography color="text.secondary">{item.text}</Typography>
                      </Stack>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </AnimatedSection>

        <AnimatedSection
          id="protsess"
          sx={{
            bgcolor: "#102410",
            color: "white",
            py: { xs: 7, md: 10 },
          }}
        >
          <Container maxWidth="md">
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Chip icon={<ArchitectureIcon />} color="secondary" label="Tootearendus" sx={{ alignSelf: "flex-start" }} />
              <Typography variant="h3" component="h2">
                Kuidas me siia joudsime
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.78)" }}>
                Meie teekond algas Taylori konveiersysteemist ja loppes agiilse
                iteratiivse tootearendusega.
              </Typography>
            </Stack>
            <Timeline position="alternate">
              {process.map((item, index) => (
                <TimelineItem key={item.title}>
                  <TimelineSeparator>
                    <TimelineDot color={index === process.length - 1 ? "success" : "primary"} />
                    {index < process.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="h6" component="h3">
                        {item.title}
                      </Typography>
                      <Typography color="text.secondary">{item.text}</Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Container>
        </AnimatedSection>

        <AnimatedSection
          id="meedia"
          sx={{
            py: { xs: 7, md: 10 },
            color: "white",
            backgroundImage: `linear-gradient(rgba(16,36,16,0.9), rgba(26,46,26,0.94)), url(${forestImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={2} sx={{ mb: 4 }}>
              <Chip icon={<PhotoCameraIcon />} color="primary" label="Foto & video" sx={{ alignSelf: "flex-start" }} />
              <Typography variant="h3" component="h2">
                Projektimeedia showcase
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.78)" }}>
                Lisa projekti kausta foto ja testlennu video, et esitlus oleks
                visuaalselt tugevam ja tulemused oleksid kohe nahtavad.
              </Typography>
            </Stack>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <MediaShowcaseCard
                  type="photo"
                  icon={<PhotoCameraIcon fontSize="large" />}
                  title="Foto showcase"
                  description="Valminud paberilennuki, meeskonna voi tootmisprotsessi foto."
                  src="/media/lennuk-photo.jpg"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <MediaShowcaseCard
                  type="video"
                  icon={<VideocamIcon fontSize="large" />}
                  title="Video showcase"
                  description="Testlennu, voltimise voi sprinti kokkuvotva video."
                  src="/media/lennuk-video.mp4"
                />
              </Grid>
            </Grid>
          </Container>
        </AnimatedSection>

        <AnimatedSection
          id="meeskond"
          sx={{
            bgcolor: "primary.dark",
            color: "white",
            py: { xs: 7, md: 10 },
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Stack spacing={2}>
                  <Chip icon={<GroupsIcon />} label="Meeskond & Tehas" sx={{ alignSelf: "flex-start" }} />
                  <Typography variant="h3" component="h2">
                    TARpv24 Lennukitehas
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.78)" }}>
                    Oleme vaikene, kuid puuendunud meeskond, kelle eesmark on luua
                    maailma parimad paberilennukid. Parim tootearendus synnib
                    keskkonnas, kus katsetamine on julgustatud.
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 7 }}>
                <Grid container spacing={2}>
                  {principles.map(([title, text]) => (
                    <Grid key={title} size={{ xs: 12, sm: 6 }}>
                      <MotionCard
                        variant="outlined"
                        sx={{ height: "100%" }}
                        whileHover={{ y: -6, borderColor: "#4a8c3f" }}
                      >
                        <CardContent>
                          <Typography variant="h6" component="h3">
                            {title}
                          </Typography>
                          <Typography color="text.secondary">{text}</Typography>
                        </CardContent>
                      </MotionCard>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </AnimatedSection>
      </Box>

      <Box component="footer" sx={{ bgcolor: "#0b1c0b", color: "white", py: 4 }}>
        <Container maxWidth="lg">
          <Divider sx={{ borderColor: "rgba(168,224,149,0.25)", mb: 3 }} />
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2}>
            <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
              (c) 2025 TARpv24 Lennukitehas
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
              Hussein, Makskim, Timur, Nikita - Projektijuhtimine ja Agiilsus
            </Typography>
            <Link href="#lennuk" underline="hover" sx={{ color: "secondary.main" }}>
              Tagasi ules
            </Link>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
