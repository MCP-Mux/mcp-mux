/**
 * WebdriverIO configuration for Tauri E2E testing
 * 
 * Prerequisites:
 * 1. cargo install tauri-driver --locked
 * 2. Build the app: pnpm build
 * 3. Linux: apt-get install webkit2gtk-driver
 * 4. Windows: Edge Driver matching your Edge version
 * 
 * Note: macOS is NOT supported (no WKWebView driver)
 */

import type { Options } from '@wdio/types';
import { spawn, type ChildProcess } from 'child_process';
import path from 'path';

// Store tauri-driver process
let tauriDriver: ChildProcess | null = null;

// Path to built app
const APP_PATH = process.platform === 'win32'
  ? path.resolve('./target/release/mcpmux.exe')
  : path.resolve('./target/release/mcpmux');

export const config: Options.Testrunner = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },

  specs: ['./specs/**/*.wdio.ts'],
  exclude: [],

  maxInstances: 1, // Tauri only supports one instance

  capabilities: [
    {
      'tauri:options': {
        application: APP_PATH,
      },
    } as WebdriverIO.Capabilities,
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',
  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  // Start tauri-driver before tests
  onPrepare: async function () {
    return new Promise<void>((resolve, reject) => {
      tauriDriver = spawn('tauri-driver', [], {
        stdio: ['ignore', 'pipe', 'pipe'],
      });

      tauriDriver.stdout?.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Listening on')) {
          console.log('[tauri-driver] Started');
          resolve();
        }
      });

      tauriDriver.stderr?.on('data', (data) => {
        console.error('[tauri-driver]', data.toString());
      });

      tauriDriver.on('error', (err) => {
        console.error('[tauri-driver] Failed to start:', err);
        reject(err);
      });

      // Timeout if tauri-driver doesn't start
      setTimeout(() => {
        reject(new Error('tauri-driver startup timeout'));
      }, 30000);
    });
  },

  // Stop tauri-driver after tests
  onComplete: async function () {
    if (tauriDriver) {
      tauriDriver.kill();
      tauriDriver = null;
    }
  },
};
