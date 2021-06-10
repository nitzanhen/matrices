//@ts-expect-error path is not known to browser, but script is being run in a Node.Js env.
import path from 'path';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],

  resolve: {
    alias: {
      //@ts-expect-error path is not known to browser, but script is being run in a Node.Js env.
      '@matrices/common': path.join(__dirname, '..', 'common', 'src', 'index.ts')
    }
  },

  build: {
    outDir: 'build'
  }
})
