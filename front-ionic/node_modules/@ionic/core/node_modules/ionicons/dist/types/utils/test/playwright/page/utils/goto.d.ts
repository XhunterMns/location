import type { Page, TestInfo } from '@playwright/test';
/**
 * This is an extended version of Playwright's
 * page.goto method. In addition to performing
 * the normal page.goto work, this code also
 * automatically waits for the Stencil components
 * to be hydrated before proceeding with the test.
 */
export declare const goto: (page: Page, url: string, options: any, _: TestInfo, originalFn: typeof page.goto) => Promise<import("playwright-core").Response | null>;
