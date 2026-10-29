import type { E2EPage } from "../../../utils/test/playwright/index";
export declare class RadioFixture {
    readonly page: E2EPage;
    private radio;
    constructor(page: E2EPage);
    checkRadio(method: 'keyboard' | 'mouse', selector?: string, key?: 'Space' | 'Enter'): Promise<import("@utils/test/playwright").E2ELocator>;
    expectChecked(state: boolean): Promise<void>;
}
