/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'happy-dom',
      setupFiles: './src/setupTests.ts',
      globals: true,
      snapshotFormat: {
        escapeString: false,
      },
      coverage: {
        enabled: true,
        provider: 'v8',
        include: ['src'],
        exclude: ['src/**/*.spec.{ts,vue}', 'src/setupTests.ts', '**/*.d.ts'],
        all: true,
      },
    },
  })
);
