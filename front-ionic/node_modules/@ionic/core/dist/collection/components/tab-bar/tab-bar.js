/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { createKeyboardController } from "../../utils/keyboard/keyboard-controller";
import { createColorClasses } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export class TabBar {
    constructor() {
        this.keyboardCtrl = null;
        this.keyboardCtrlPromise = null;
        this.didLoad = false;
        this.keyboardVisible = false;
        /**
         * If `true`, the tab bar will be translucent.
         * Only applies when the mode is `"ios"` and the device supports
         * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
         */
        this.translucent = false;
    }
    selectedTabChanged() {
        // Skip the initial watcher call that happens during component load
        // We handle that in componentDidLoad to ensure children are ready
        if (!this.didLoad) {
            return;
        }
        if (this.selectedTab !== undefined) {
            this.ionTabBarChanged.emit({
                tab: this.selectedTab,
            });
        }
    }
    componentDidLoad() {
        this.ionTabBarLoaded.emit();
        // Set the flag to indicate the component has loaded
        // This allows the watcher to emit changes from this point forward
        this.didLoad = true;
        // Emit the initial selected tab after the component is fully loaded
        // This ensures all child components (ion-tab-button) are ready
        if (this.selectedTab !== undefined) {
            this.ionTabBarChanged.emit({
                tab: this.selectedTab,
            });
        }
    }
    async connectedCallback() {
        const promise = createKeyboardController(async (keyboardOpen, waitForResize) => {
            /**
             * If the keyboard is hiding, then we need to wait
             * for the webview to resize. Otherwise, the tab bar
             * will flicker before the webview resizes.
             */
            if (keyboardOpen === false && waitForResize !== undefined) {
                await waitForResize;
            }
            this.keyboardVisible = keyboardOpen; // trigger re-render by updating state
        });
        this.keyboardCtrlPromise = promise;
        const keyboardCtrl = await promise;
        /**
         * Only assign if this is still the current promise.
         * Otherwise, a new connectedCallback has started or
         * disconnectedCallback was called, so destroy this instance.
         */
        if (this.keyboardCtrlPromise === promise) {
            this.keyboardCtrl = keyboardCtrl;
            this.keyboardCtrlPromise = null;
        }
        else {
            keyboardCtrl.destroy();
        }
    }
    disconnectedCallback() {
        if (this.keyboardCtrlPromise) {
            this.keyboardCtrlPromise.then((ctrl) => ctrl.destroy());
            this.keyboardCtrlPromise = null;
        }
        if (this.keyboardCtrl) {
            this.keyboardCtrl.destroy();
            this.keyboardCtrl = null;
        }
    }
    render() {
        const { color, translucent, keyboardVisible } = this;
        const mode = getIonMode(this);
        const shouldHide = keyboardVisible && this.el.getAttribute('slot') !== 'top';
        return (h(Host, { key: '24e164eaf81a0bec9237b561465618f10990806c', role: "tablist", "aria-hidden": shouldHide ? 'true' : null, class: createColorClasses(color, {
                [mode]: true,
                'tab-bar-translucent': translucent,
                'tab-bar-hidden': shouldHide,
            }) }, h("slot", { key: '0ca29a2d97a7c38bbf43f8d79e271b874b4d9be8' })));
    }
    static get is() { return "ion-tab-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["tab-bar.ios.scss"],
            "md": ["tab-bar.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["tab-bar.ios.css"],
            "md": ["tab-bar.md.css"]
        };
    }
    static get properties() {
        return {
            "color": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Color",
                    "resolved": "\"danger\" | \"dark\" | \"light\" | \"medium\" | \"primary\" | \"secondary\" | \"success\" | \"tertiary\" | \"warning\" | string & Record<never, never> | undefined",
                    "references": {
                        "Color": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::Color",
                            "referenceLocation": "Color"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The color to use from your application's color palette.\nDefault options are: `\"primary\"`, `\"secondary\"`, `\"tertiary\"`, `\"success\"`, `\"warning\"`, `\"danger\"`, `\"light\"`, `\"medium\"`, and `\"dark\"`.\nFor more information on colors, see [theming](/docs/theming/basics)."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "attribute": "color"
            },
            "selectedTab": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The selected tab component"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "selected-tab"
            },
            "translucent": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the tab bar will be translucent.\nOnly applies when the mode is `\"ios\"` and the device supports\n[`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility)."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "translucent",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "keyboardVisible": {}
        };
    }
    static get events() {
        return [{
                "method": "ionTabBarChanged",
                "name": "ionTabBarChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": ""
                },
                "complexType": {
                    "original": "TabBarChangedEventDetail",
                    "resolved": "TabBarChangedEventDetail",
                    "references": {
                        "TabBarChangedEventDetail": {
                            "location": "import",
                            "path": "./tab-bar-interface",
                            "id": "src/components/tab-bar/tab-bar-interface.ts::TabBarChangedEventDetail",
                            "referenceLocation": "TabBarChangedEventDetail"
                        }
                    }
                }
            }, {
                "method": "ionTabBarLoaded",
                "name": "ionTabBarLoaded",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "This event is used in IonContent to correctly\ncalculate the fullscreen content offsets\nwhen IonTabBar is used."
                        }],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "selectedTab",
                "methodName": "selectedTabChanged"
            }];
    }
}
