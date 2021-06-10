import path from 'path';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],

  resolve: {
    alias: {
      '@matrices/common': path.join(__dirname, '..', 'common', 'src', 'index.ts')
    }
  },

  build: {
    outDir: 'build'
  }
})
