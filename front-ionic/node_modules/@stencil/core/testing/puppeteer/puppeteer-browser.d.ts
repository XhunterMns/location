import type { ValidatedConfig } from '@stencil/core/internal';
import type { Browser } from 'puppeteer';
export declare function startPuppeteerBrowser(config: ValidatedConfig): Promise<Browser>;
export declare function connectBrowser(): Promise<Browser>;
export declare function disconnectBrowser(browser: Browser): Promise<void>;
export declare function newBrowserPage(browser: Browser): Promise<import("puppeteer-core").Page>;
