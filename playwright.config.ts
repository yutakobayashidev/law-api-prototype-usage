import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  retries: 1,
  timeout: 10000,
  testDir: "./src/__tests__/e2e/",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    // CIでのテスト実行時には、ここで指定したコマンドでサーバーを起動する
    command: "yarn start",
    port: 3000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" }, // or 'msedge-dev'
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" }, // or 'chrome-beta'
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
};

export default config;
