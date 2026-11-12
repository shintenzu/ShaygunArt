import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/




export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
     // 2. Add to plugins array
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // This silences the @import warning for Dart Sass
        silenceDeprecations: ['import'],
      },
    },
  },
});



// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//      // 2. Add to plugins array
//   ],
// })