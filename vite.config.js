import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Por default Vite embebe como base64 cualquier asset < 4kb. Los
    // SVGs de vasos y guarniciones caen casi todos ahí, así que quedaban
    // pegados al chunk JS: cualquier cambio de código forzaba a
    // redescargarlos todos de nuevo. Con esto se emiten como archivos
    // aparte, cacheables independientemente del JS.
    assetsInlineLimit: 0,
  },
})
