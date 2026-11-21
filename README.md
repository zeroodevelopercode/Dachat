# DaChat

DaChat is a web-first chat application prepared for Android packaging with Capacitor.

## Requirements
- Node.js 20+
- npm
- Android Studio + Android SDK (for APK builds)

## Run the web app
```bash
npm install
npm run dev
```

## Build static web assets
```bash
npm run build
```

The exported site is written to `out/`.

## Android
```bash
npx cap add android
npm run cap:sync
npm run cap:open
```

Build the APK from Android Studio or with the Android Gradle wrapper.

## App updates
The app checks `/api/version` when hosted. Set:
- `NEXT_PUBLIC_APP_VERSION`
- `NEXT_PUBLIC_VERSION_CODE`
- `NEXT_PUBLIC_ANDROID_APK_URL`

The update screen can direct users to the published APK. A native in-app package installer and signed release pipeline are the next Android integration step; Android still requires the user to approve installing an APK from outside the Play Store.

## Current scope
This first milestone is a functional UI prototype with local demo messages. Authentication, persistent chat, realtime delivery, and WhatsApp Business Platform integration are not connected yet.
