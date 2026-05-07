# TARpv24 Lennuk Company

React/Vite website packaged as a Capacitor mobile app for Android and iOS. The same source code builds both the website and the native apps.

## Website

```bash
npm install
npm run dev
```

Build the static website for hosting:

```bash
npm run site:build
```

Preview the production website locally:

```bash
npm run preview
```

The website includes a web manifest and service worker, so browsers can install it as a standalone web app when it is served over HTTPS.

## Mobile

Build the web app and sync it into the native projects:

```bash
npm run mobile:build
```

Open the Android project:

```bash
npm run android
```

Open the iOS project:

```bash
npm run ios
```

Android builds require Android Studio or a valid Android SDK configured with `ANDROID_HOME` or `android/local.properties`.

iOS builds require macOS with Xcode.
