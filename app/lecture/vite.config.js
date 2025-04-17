import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    base: "/",
    // build: {
    //     outDir: 'lecture'
    // },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    whitespace: 'preserve'
                },
            },
        }),
    ],
    server: {
        allowedHosts: ['tutorials.rione.org']
    }
})