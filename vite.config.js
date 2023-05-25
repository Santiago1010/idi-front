import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    VueI18nPlugin({
      include: './src/locales/**'
    }),

    quasar({
      sassVariables: 'src/assets/styles/sass/quasar-variables.sass'
    })
  ],
})
