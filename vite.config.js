import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['@supabase/supabase-js']
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks: {
                    supabase: ['@supabase/supabase-js']
                }
            }
        }
    },
    resolve: {
        alias: {
            './runtimeConfig': './runtimeConfig.browser',
        }
    }
})