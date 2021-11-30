import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
/**
 * mdx解析后的代码是jsx，因此不使用sfc
 */
import vueJsx from '@vitejs/plugin-vue-jsx'
import mdx from './src/mdx-plugin/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mdx(), vueJsx({
    include: /\.(mdx|jsx|tsx)/
  })],
  resolve: {
    alias: {
      'vue3-mdx': '/src/mdx-plugin'
    }
  }
})
