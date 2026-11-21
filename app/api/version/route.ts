import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    appName: 'DaChat',
    versionName: process.env.NEXT_PUBLIC_APP_VERSION ?? '0.1.0',
    versionCode: Number(process.env.NEXT_PUBLIC_VERSION_CODE ?? 1),
    minimumVersionCode: 1,
    downloadUrl: process.env.NEXT_PUBLIC_ANDROID_APK_URL ?? '',
    releaseNotes: ['Rilis fondasi awal DaChat', 'Web dan Android memakai basis kode yang sama'],
  });
}
