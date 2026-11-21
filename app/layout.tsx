import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DaChat — Chat, lebih dekat',
  description: 'Ruang obrolan yang simpel, cepat, dan nyaman.',
  applicationName: 'DaChat',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'DaChat', statusBarStyle: 'black-translucent' },
};

export const viewport: Viewport = {
  themeColor: '#090d18',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
