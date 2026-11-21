import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'id.dachat.app',
  appName: 'DaChat',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      backgroundColor: '#090d18',
      style: 'DARK',
    },
  },
};

export default config;
