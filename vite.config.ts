/// <reference types="vitest" />
// vite.config.ts

import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths'
// import '@testing-library/jest-dom';

export default defineConfig({
    test: {
        globals: true,
    },
    plugins: [tsconfigPaths()],
})