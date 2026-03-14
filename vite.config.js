import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  // './' 讓 GitHub Pages 的 repo 路徑與自訂網域都能正常載入靜態資源
  base: './',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        teachers: resolve(__dirname, 'teachers.html'),
        courses: resolve(__dirname, 'courses.html'),
        materials: resolve(__dirname, 'materials.html'),
        contact: resolve(__dirname, 'contact.html'),
        training: resolve(__dirname, 'training.html'),
        claire: resolve(__dirname, 'teachers/claire.html'),
        juniorHigh: resolve(__dirname, 'courses/junior-high.html'),
        seniorHigh: resolve(__dirname, 'courses/senior-high.html'),
        certification: resolve(__dirname, 'courses/certification.html')
      }
    }
  }
})
