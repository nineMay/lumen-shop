import { copyFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages 项目地址是 /lumen-shop/，本地开发仍用根路径。
const githubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: githubPages ? '/lumen-shop/' : '/',
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      closeBundle() {
        if (!githubPages) return
        // 直接打开 /product/... 时，GitHub Pages 会回落到 404.html。
        copyFileSync('dist/index.html', 'dist/404.html')
      },
    },
  ],
})
