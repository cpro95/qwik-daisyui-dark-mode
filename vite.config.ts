import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    resolve: {
      alias: {
        leaflet: path.resolve(__dirname, 'node_modules/leaflet/dist/leaflet.js'),
        'leaflet.css': path.resolve(__dirname, 'node_modules/leaflet/dist/leaflet.css'),
      },
    },
  };
});
