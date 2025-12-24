import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // Prevent Vite from obscuring Rust errors
    clearScreen: false,

    // Tauri expects a fixed port to communicate with the frontend
    server: {
        port: 5173,
        strictPort: true,
        watch: {
            // Tell Vite to ignore changes in the Rust backend folder
            ignored: ["**/src-tauri/**"],
        },
    },

    // Environment variables starting with these prefixes will be exposed to the frontend
    envPrefix: ['VITE_', 'TAURI_'],

    build: {
        // Support modern browsers for better performance
        target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
        // Disable minification during debug for easier troubleshooting
        minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
        // Enable sourcemaps only in debug builds
        sourcemap: !!process.env.TAURI_DEBUG,
    },
});