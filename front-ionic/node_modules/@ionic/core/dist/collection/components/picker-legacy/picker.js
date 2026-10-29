/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { raf } from "../../utils/helpers";
import { createLockController } from "../../utils/lock-controller";
import { printIonWarning } from "../../utils/logging/index";
import { createDelegateController, createTriggerController, BACKDROP, dismiss, eventMethod, isCancel, prepareOverlay, present, safeCall, setOverlayId, } from "../../utils/overlays";
import { getClassMap } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
import { iosEnterAnimation } from "./animations/ios.enter";
import { iosLeaveAnimation } from "./animations/ios.leave";
// TODO(FW-2832): types
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export class Picker {
    constructor() {
        this.delegateController = createDelegateController(this);
        this.lockController = createLockController();
        this.triggerController = createTriggerController();
        this.presented = false;
        /** @internal */
        this.hasController = false;
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * Array of buttons to be displayed at the top of the picker.
         */
        this.buttons = [];
        /**
         * Array of columns to be displayed in the picker.
         */
        this.columns = [];
        /**
         * Number of milliseconds to wait before dismissing the picker.
         */
        this.duration = 0;
        /**
         * If `true`, a backdrop will be displayed behind the picker.
         */
        this.showBackdrop = true;
        /**
         * If `true`, the picker will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = true;
        /**
         * If `true`, the picker will animate.
         */
        this.animated = true;
        /**
         * If `true`, the picker will open. If `false`, the picker will close.
         * Use this if you need finer grained control over presentation, otherwise
         * just use the pickerController or the `trigger` property.
         * Note: `isOpen` will not automatically be set back to `false` when
         * the picker dismisses. You will need to do that in your code.
         */
        this.isOpen = false;
        this.onBackdropTap = () => {
            this.dismiss(undefined, BACKDROP);
        };
        this.dispatchCancelHandler = (ev) => {
            const role = ev.detail.role;
            if (isCancel(role)) {
                const cancelButton = this.buttons.find((b) => b.role === 'cancel');
                this.callButtonHandler(cancelButton);
            }
        };
    }
    onIsOpenChange(newValue, oldValue) {
        if (newValue === true && oldValue === false) {
            this.present();
        }
        else if (newValue === false && oldValue === true) {
            this.dismiss();
        }
    }
    triggerChanged() {
        const { trigger, el, triggerController } = this;
        if (trigger) {
            triggerController.addClickListener(el, trigger);
        }
    }
    connectedCallback() {
        prepareOverlay(this.el);
        this.triggerChanged();
    }
    disconnectedCallback() {
        this.triggerController.removeClickListener();
    }
    componentWillLoad() {
        var _a;
        if (!((_a = this.htmlAttributes) === null || _a === void 0 ? void 0 : _a.id)) {
            setOverlayId(this.el);
        }
    }
    componentDidLoad() {
        printIonWarning('[ion-picker-legacy] - ion-picker-legacy and ion-picker-legacy-column have been deprecated in favor of new versions of the ion-picker and ion-picker-column components. These new components display inline with your page content allowing for more presentation flexibility than before.', this.el);
        /**
         * If picker was rendered with isOpen="true"
         * then we should open picker immediately.
         */
        if (this.isOpen === true) {
            raf(() => this.present());
        }
        /**
         * When binding values in frameworks such as Angular
         * it is possible for the value to be set after the Web Component
         * initializes but before the value watcher is set up in Stencil.
         * As a result, the watcher callback may not be fired.
         * We work around this by manually calling the watcher
         * callback when the component has loaded and the watcher
         * is configured.
         */
        this.triggerChanged();
    }
    /**
     * Present the picker overlay after it has been created.
     */
    async present() {
        const unlock = await this.lockController.lock();
        await this.delegateController.attachViewToDom();
        await present(this, 'pickerEnter', iosEnterAnimation, iosEnterAnimation, undefined);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration);
        }
        unlock();
    }
    /**
     * Dismiss the picker overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the picker.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the picker.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     */
    async dismiss(data, role) {
        const unlock = await this.lockController.lock();
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        const dismissed = await dismiss(this, data, role, 'pickerLeave', iosLeaveAnimation, iosLeaveAnimation);
        if (dismissed) {
            this.delegateController.removeViewFromDom();
        }
        unlock();
        return dismissed;
    }
    /**
     * Returns a promise that resolves when the picker did dismiss.
     */
    onDidDismiss() {
        return eventMethod(this.el, 'ionPickerDidDismiss');
    }
    /**
     * Returns a promise that resolves when the picker will dismiss.
     */
    onWillDismiss() {
        return eventMethod(this.el, 'ionPickerWillDismiss');
    }
    /**
     * Get the column that matches the specified name.
     *
     * @param name The name of the column.
     */
    getColumn(name) {
        return Promise.resolve(this.columns.find((column) => column.name === name));
    }
    async buttonClick(button) {
        const role = button.role;
        if (isCancel(role)) {
            return this.dismiss(undefined, role);
        }
        const shouldDismiss = await this.callButtonHandler(button);
        if (shouldDismiss) {
            return this.dismiss(this.getSelected(), button.role);
        }
        return Promise.resolve();
    }
    async callButtonHandler(button) {
        if (button) {
            // a handler has been provided, execute it
            // pass the handler the values from the inputs
            const rtn = await safeCall(button.handler, this.getSelected());
            if (rtn === false) {
                // if the return value of the handler is false then do not dismiss
                return false;
            }
        }
        return true;
    }
    getSelected() {
        const selected = {};
        this.columns.forEach((col, index) => {
            const selectedColumn = col.selectedIndex !== undefined ? col.options[col.selectedIndex] : undefined;
            selected[col.name] = {
                text: selectedColumn ? selectedColumn.text : undefined,
                value: selectedColumn ? selectedColumn.value : undefined,
                columnIndex: index,
            };
        });
        return selected;
    }
    render() {
        const { htmlAttributes } = this;
        const mode = getIonMode(this);
        return (h(Host, Object.assign({ key: '80f66d33780d8a1352d24be9cb63a0cc03d01ab5', "aria-modal": "true", tabindex: "-1" }, htmlAttributes, { style: {
                zIndex: `${20000 + this.overlayIndex}`,
            }, class: Object.assign({ [mode]: true,
                // Used internally for styling
                [`picker-${mode}`]: true, 'overlay-hidden': true }, getClassMap(this.cssClass)), onIonBackdropTap: this.onBackdropTap, onIonPickerWillDismiss: this.dispatchCancelHandler }), h("ion-backdrop", { key: '97fb8e10ba08b197610cb8c0cdea61103883d55f', visible: this.showBackdrop, tappable: this.backdropDismiss }), h("div", { key: 'b3969cb6fbf7153623d14e3ca1493d3370efb211', tabindex: "0", "aria-hidden": "true" }), h("div", { key: '299268483c3727e698d9135bfdf40349a7050ac1', class: "picker-wrapper ion-overlay-wrapper", role: "dialog" }, h("div", { key: '95394de3ef691899b7dbf416f56fd3e86bbdce3f', class: "picker-toolbar" }, this.buttons.map((b) => (h("div", { class: buttonWrapperClass(b) }, h("button", { type: "button", onClick: () => this.buttonClick(b), class: buttonClass(b) }, b.text))))), h("div", { key: '05f18bb8d00dc0e22f691b7e41f90f729a6c66d7', class: "picker-columns" }, h("div", { key: '4a8fdf224effc0af67fd413e2e6aca8a78d1cf43', class: "picker-above-highlight" }), this.presented && this.columns.map((c) => h("ion-picker-legacy-column", { col: c })), h("div", { key: 'e50a31db45e3f39e9d0fed36a21be9257eec09bf', class: "picker-below-highlight" }))), h("div", { key: '5a78cb2176ac807ea0c195c6b76cd0e8eef9d4c0', tabindex: "0", "aria-hidden": "true" })));
    }
    static get is() { return "ion-picker-legacy"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "ios": ["picker.ios.scss"],
            "md": ["picker.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["picker.ios.css"],
            "md": ["picker.md.css"]
        };
    }
    static get properties() {
        return {
            "overlayIndex": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "overlay-index"
            },
            "delegate": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "FrameworkDelegate",
                    "resolved": "FrameworkDelegate | undefined",
                    "references": {
                        "FrameworkDelegate": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::FrameworkDelegate",
                            "referenceLocation": "FrameworkDelegate"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "hasController": {
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
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "has-controller",
                "defaultValue": "false"
            },
            "keyboardClose": {
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
                    "text": "If `true`, the keyboard will be automatically dismissed when the overlay is presented."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "keyboard-close",
                "defaultValue": "true"
            },
            "enterAnimation": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "AnimationBuilder",
                    "resolved": "((baseEl: any, opts?: any) => Animation) | undefined",
                    "references": {
                        "AnimationBuilder": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::AnimationBuilder",
                            "referenceLocation": "AnimationBuilder"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Animation to use when the picker is presented."
                },
                "getter": false,
                "setter": false
            },
            "leaveAnimation": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "AnimationBuilder",
                    "resolved": "((baseEl: any, opts?: any) => Animation) | undefined",
                    "references": {
                        "AnimationBuilder": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::AnimationBuilder",
                            "referenceLocation": "AnimationBuilder"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Animation to use when the picker is dismissed."
                },
                "getter": false,
                "setter": false
            },
            "buttons": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "PickerButton[]",
                    "resolved": "PickerButton[]",
                    "references": {
                        "PickerButton": {
                            "location": "import",
                            "path": "./picker-interface",
                            "id": "src/components/picker-legacy/picker-interface.ts::PickerButton",
                            "referenceLocation": "PickerButton"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Array of buttons to be displayed at the top of the picker."
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            },
            "columns": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "PickerColumn[]",
                    "resolved": "PickerColumn[]",
                    "references": {
                        "PickerColumn": {
                            "location": "import",
                            "path": "./picker-interface",
                            "id": "src/components/picker-legacy/picker-interface.ts::PickerColumn",
                            "referenceLocation": "PickerColumn"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Array of columns to be displayed in the picker."
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            },
            "cssClass": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | string[]",
                    "resolved": "string | string[] | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Additional classes to apply for custom CSS. If multiple classes are\nprovided they should be separated by spaces."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "css-class"
            },
            "duration": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Number of milliseconds to wait before dismissing the picker."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "duration",
                "defaultValue": "0"
            },
            "showBackdrop": {
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
                    "text": "If `true`, a backdrop will be displayed behind the picker."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "show-backdrop",
                "defaultValue": "true"
            },
            "backdropDismiss": {
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
                    "text": "If `true`, the picker will be dismissed when the backdrop is clicked."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "backdrop-dismiss",
                "defaultValue": "true"
            },
            "animated": {
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
                    "text": "If `true`, the picker will animate."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "animated",
                "defaultValue": "true"
            },
            "htmlAttributes": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "{ [key: string]: any }",
                    "resolved": "undefined | { [key: string]: any; }",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Additional attributes to pass to the picker."
                },
                "getter": false,
                "setter": false
            },
            "isOpen": {
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
                    "text": "If `true`, the picker will open. If `false`, the picker will close.\nUse this if you need finer grained control over presentation, otherwise\njust use the pickerController or the `trigger` property.\nNote: `isOpen` will not automatically be set back to `false` when\nthe picker dismisses. You will need to do that in your code."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "is-open",
                "defaultValue": "false"
            },
            "trigger": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | undefined",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "An ID corresponding to the trigger element that\ncauses the picker to open when clicked."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "trigger"
            }
        };
    }
    static get states() {
        return {
            "presented": {}
        };
    }
    static get events() {
        return [{
                "method": "didPresent",
                "name": "ionPickerDidPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the picker has presented."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "willPresent",
                "name": "ionPickerWillPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before the picker has presented."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "willDismiss",
                "name": "ionPickerWillDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before the picker has dismissed."
                },
                "complexType": {
                    "original": "OverlayEventDetail",
                    "resolved": "OverlayEventDetail<any>",
                    "references": {
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail",
                            "referenceLocation": "OverlayEventDetail"
                        }
                    }
                }
            }, {
                "method": "didDismiss",
                "name": "ionPickerDidDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the picker has dismissed."
                },
                "complexType": {
                    "original": "OverlayEventDetail",
                    "resolved": "OverlayEventDetail<any>",
                    "references": {
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail",
                            "referenceLocation": "OverlayEventDetail"
                        }
                    }
                }
            }, {
                "method": "didPresentShorthand",
                "name": "didPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the picker has presented.\nShorthand for ionPickerWillDismiss."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "willPresentShorthand",
                "name": "willPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before the picker has presented.\nShorthand for ionPickerWillPresent."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "willDismissShorthand",
                "name": "willDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before the picker has dismissed.\nShorthand for ionPickerWillDismiss."
                },
                "complexType": {
                    "original": "OverlayEventDetail",
                    "resolved": "OverlayEventDetail<any>",
                    "references": {
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail",
                            "referenceLocation": "OverlayEventDetail"
                        }
                    }
                }
            }, {
                "method": "didDismissShorthand",
                "name": "didDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the picker has dismissed.\nShorthand for ionPickerDidDismiss."
                },
                "complexType": {
                    "original": "OverlayEventDetail",
                    "resolved": "OverlayEventDetail<any>",
                    "references": {
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail",
                            "referenceLocation": "OverlayEventDetail"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "present": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Present the picker overlay after it has been created.",
                    "tags": []
                }
            },
            "dismiss": {
                "complexType": {
                    "signature": "(data?: any, role?: string) => Promise<boolean>",
                    "parameters": [{
                            "name": "data",
                            "type": "any",
                            "docs": "Any data to emit in the dismiss events."
                        }, {
                            "name": "role",
                            "type": "string | undefined",
                            "docs": "The role of the element that is dismissing the picker.\nThis can be useful in a button handler for determining which button was\nclicked to dismiss the picker.\nSome examples include: ``\"cancel\"`, `\"destructive\"`, \"selected\"`, and `\"backdrop\"`."
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<boolean>"
                },
                "docs": {
                    "text": "Dismiss the picker overlay after it has been presented.",
                    "tags": [{
                            "name": "param",
                            "text": "data Any data to emit in the dismiss events."
                        }, {
                            "name": "param",
                            "text": "role The role of the element that is dismissing the picker.\nThis can be useful in a button handler for determining which button was\nclicked to dismiss the picker.\nSome examples include: ``\"cancel\"`, `\"destructive\"`, \"selected\"`, and `\"backdrop\"`."
                        }]
                }
            },
            "onDidDismiss": {
                "complexType": {
                    "signature": "<T = any>() => Promise<OverlayEventDetail<T>>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail",
                            "referenceLocation": "OverlayEventDetail"
                        },
                        "T": {
                            "location": "global",
                            "id": "global::T"
                        }
                    },
                    "return": "Promise<OverlayEventDetail<T>>"
                },
                "docs": {
                    "text": "Returns a promise that resolves when the picker did dismiss.",
                    "tags": []
                }
            },
            "onWillDismiss": {
                "complexType": {
                    "signature": "<T = any>() => Promise<OverlayEventDetail<T>>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail",
                            "referenceLocation": "OverlayEventDetail"
                        },
                        "T": {
                            "location": "global",
                            "id": "global::T"
                        }
                    },
                    "return": "Promise<OverlayEventDetail<T>>"
                },
                "docs": {
                    "text": "Returns a promise that resolves when the picker will dismiss.",
                    "tags": []
                }
            },
            "getColumn": {
                "complexType": {
                    "signature": "(name: string) => Promise<PickerColumn | undefined>",
                    "parameters": [{
                            "name": "name",
                            "type": "string",
                            "docs": "The name of the column."
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "PickerColumn": {
                            "location": "import",
                            "path": "./picker-interface",
                            "id": "src/components/picker-legacy/picker-interface.ts::PickerColumn",
                            "referenceLocation": "PickerColumn"
                        }
                    },
                    "return": "Promise<PickerColumn | undefined>"
                },
                "docs": {
                    "text": "Get the column that matches the specified name.",
                    "tags": [{
                            "name": "param",
                            "text": "name The name of the column."
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "isOpen",
                "methodName": "onIsOpenChange"
            }, {
                "propName": "trigger",
                "methodName": "triggerChanged"
            }];
    }
}
const buttonWrapperClass = (button) => {
    return {
        [`picker-toolbar-${button.role}`]: button.role !== undefined,
        'picker-toolbar-button': true,
    };
};
const buttonClass = (button) => {
    return Object.assign({ 'picker-button': true, 'ion-activatable': true }, getClassMap(button.cssClass));
};
