import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
    'process.env': {},
  },
  assetsInclude: ['**/*.JPG'],
  server: {
    port: 6075,
  },
  preview: {
    port: 6075,
  }
});
