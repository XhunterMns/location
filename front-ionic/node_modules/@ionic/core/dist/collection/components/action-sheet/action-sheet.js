/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h, readTask } from "@stencil/core";
import { createButtonActiveGesture } from "../../utils/gesture/button-active";
import { raf } from "../../utils/helpers";
import { createLockController } from "../../utils/lock-controller";
import { BACKDROP, createDelegateController, createTriggerController, dismiss, eventMethod, isCancel, prepareOverlay, present, safeCall, setOverlayId, } from "../../utils/overlays";
import { getClassMap } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
import { iosEnterAnimation } from "./animations/ios.enter";
import { iosLeaveAnimation } from "./animations/ios.leave";
import { mdEnterAnimation } from "./animations/md.enter";
import { mdLeaveAnimation } from "./animations/md.leave";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export class ActionSheet {
    constructor() {
        this.delegateController = createDelegateController(this);
        this.lockController = createLockController();
        this.triggerController = createTriggerController();
        this.hasRadioButtons = false;
        this.presented = false;
        /** @internal */
        this.hasController = false;
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * An array of buttons for the action sheet.
         */
        this.buttons = [];
        /**
         * If `true`, the action sheet will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = true;
        /**
         * If `true`, the action sheet will be translucent.
         * Only applies when the mode is `"ios"` and the device supports
         * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
         */
        this.translucent = false;
        /**
         * If `true`, the action sheet will animate.
         */
        this.animated = true;
        /**
         * If `true`, the action sheet will open. If `false`, the action sheet will close.
         * Use this if you need finer grained control over presentation, otherwise
         * just use the actionSheetController or the `trigger` property.
         * Note: `isOpen` will not automatically be set back to `false` when
         * the action sheet dismisses. You will need to do that in your code.
         */
        this.isOpen = false;
        this.onBackdropTap = () => {
            this.dismiss(undefined, BACKDROP);
        };
        this.dispatchCancelHandler = (ev) => {
            const role = ev.detail.role;
            if (isCancel(role)) {
                const cancelButton = this.getButtons().find((b) => b.role === 'cancel');
                this.callButtonHandler(cancelButton);
            }
        };
    }
    buttonsChanged() {
        const radioButtons = this.getRadioButtons();
        this.hasRadioButtons = radioButtons.length > 0;
        // Initialize activeRadioId when buttons change
        if (this.hasRadioButtons) {
            const checkedButton = radioButtons.find((b) => { var _a; return ((_a = b.htmlAttributes) === null || _a === void 0 ? void 0 : _a['aria-checked']) === 'true'; });
            if (checkedButton) {
                const allButtons = this.getButtons();
                const checkedIndex = allButtons.indexOf(checkedButton);
                this.activeRadioId = this.getButtonId(checkedButton, checkedIndex);
            }
        }
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
    /**
     * Present the action sheet overlay after it has been created.
     */
    async present() {
        const unlock = await this.lockController.lock();
        await this.delegateController.attachViewToDom();
        await present(this, 'actionSheetEnter', iosEnterAnimation, mdEnterAnimation);
        unlock();
    }
    /**
     * Dismiss the action sheet overlay after it has been presented.
     * This is a no-op if the overlay has not been presented yet. If you want
     * to remove an overlay from the DOM that was never presented, use the
     * [remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the action sheet.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the action sheet. Some examples include:
     * `"cancel"`, `"destructive"`, `"selected"`, and `"backdrop"`.
     */
    async dismiss(data, role) {
        const unlock = await this.lockController.lock();
        const dismissed = await dismiss(this, data, role, 'actionSheetLeave', iosLeaveAnimation, mdLeaveAnimation);
        if (dismissed) {
            this.delegateController.removeViewFromDom();
        }
        unlock();
        return dismissed;
    }
    /**
     * Returns a promise that resolves when the action sheet did dismiss.
     */
    onDidDismiss() {
        return eventMethod(this.el, 'ionActionSheetDidDismiss');
    }
    /**
     * Returns a promise that resolves when the action sheet will dismiss.
     *
     */
    onWillDismiss() {
        return eventMethod(this.el, 'ionActionSheetWillDismiss');
    }
    async buttonClick(button) {
        const role = button.role;
        if (isCancel(role)) {
            return this.dismiss(button.data, role);
        }
        const shouldDismiss = await this.callButtonHandler(button);
        if (shouldDismiss) {
            return this.dismiss(button.data, button.role);
        }
        return Promise.resolve();
    }
    async callButtonHandler(button) {
        if (button) {
            // a handler has been provided, execute it
            // pass the handler the values from the inputs
            const rtn = await safeCall(button.handler);
            if (rtn === false) {
                // if the return value of the handler is false then do not dismiss
                return false;
            }
        }
        return true;
    }
    /**
     * Get all buttons regardless of role.
     */
    getButtons() {
        return this.buttons.map((b) => {
            return typeof b === 'string' ? { text: b } : b;
        });
    }
    /**
     * Get all radio buttons (buttons with role="radio").
     */
    getRadioButtons() {
        return this.getButtons().filter((b) => {
            var _a;
            const role = (_a = b.htmlAttributes) === null || _a === void 0 ? void 0 : _a.role;
            return role === 'radio' && !isCancel(role);
        });
    }
    /**
     * Handle radio button selection and update aria-checked state.
     *
     * @param button The radio button that was selected.
     */
    selectRadioButton(button) {
        const buttonId = this.getButtonId(button);
        // Set the active radio ID (this will trigger a re-render and update aria-checked)
        this.activeRadioId = buttonId;
    }
    /**
     * Get or generate an ID for a button.
     *
     * @param button The button for which to get the ID.
     * @param index Optional index of the button in the buttons array.
     * @returns The ID of the button.
     */
    getButtonId(button, index) {
        if (button.id) {
            return button.id;
        }
        const allButtons = this.getButtons();
        const buttonIndex = index !== undefined ? index : allButtons.indexOf(button);
        return `action-sheet-button-${this.overlayIndex}-${buttonIndex}`;
    }
    /**
     * When the action sheet has radio buttons, we want to follow the
     * keyboard navigation pattern for radio groups:
     * - Arrow Down/Right: Move to the next radio button (wrap to first if at end)
     * - Arrow Up/Left: Move to the previous radio button (wrap to last if at start)
     * - Space/Enter: Select the focused radio button and trigger its handler
     */
    onKeydown(ev) {
        // Only handle keyboard navigation if we have radio buttons
        if (!this.hasRadioButtons || !this.presented) {
            return;
        }
        const target = ev.target;
        // Ignore if the target element is not within the action sheet or not a radio button
        if (!this.el.contains(target) ||
            !target.classList.contains('action-sheet-button') ||
            target.getAttribute('role') !== 'radio') {
            return;
        }
        // Get all radio button elements and filter out disabled ones
        const radios = Array.from(this.el.querySelectorAll('.action-sheet-button[role="radio"]')).filter((el) => !el.disabled);
        const currentIndex = radios.findIndex((radio) => radio.id === target.id);
        if (currentIndex === -1) {
            return;
        }
        const allButtons = this.getButtons();
        const radioButtons = this.getRadioButtons();
        /**
         * Build a map of button element IDs to their ActionSheetButton
         * config objects.
         * This allows us to quickly look up which button config corresponds
         * to a DOM element when handling keyboard navigation
         * (e.g., whenuser presses Space/Enter or arrow keys).
         * The key is the ID that was set on the DOM element during render,
         * and the value is the ActionSheetButton config that contains the
         * handler and other properties.
         */
        const buttonIdMap = new Map();
        radioButtons.forEach((b) => {
            const allIndex = allButtons.indexOf(b);
            const buttonId = this.getButtonId(b, allIndex);
            buttonIdMap.set(buttonId, b);
        });
        let nextEl;
        if (['ArrowDown', 'ArrowRight'].includes(ev.key)) {
            ev.preventDefault();
            ev.stopPropagation();
            nextEl = currentIndex === radios.length - 1 ? radios[0] : radios[currentIndex + 1];
        }
        else if (['ArrowUp', 'ArrowLeft'].includes(ev.key)) {
            ev.preventDefault();
            ev.stopPropagation();
            nextEl = currentIndex === 0 ? radios[radios.length - 1] : radios[currentIndex - 1];
        }
        else if (ev.key === ' ' || ev.key === 'Enter') {
            ev.preventDefault();
            ev.stopPropagation();
            const button = buttonIdMap.get(target.id);
            if (button) {
                this.selectRadioButton(button);
                this.buttonClick(button);
            }
            return;
        }
        // Focus the next radio button
        if (nextEl) {
            const button = buttonIdMap.get(nextEl.id);
            if (button) {
                this.selectRadioButton(button);
                nextEl.focus();
            }
        }
    }
    connectedCallback() {
        prepareOverlay(this.el);
        this.triggerChanged();
    }
    disconnectedCallback() {
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
        this.triggerController.removeClickListener();
    }
    componentWillLoad() {
        var _a;
        if (!((_a = this.htmlAttributes) === null || _a === void 0 ? void 0 : _a.id)) {
            setOverlayId(this.el);
        }
        // Initialize activeRadioId for radio buttons
        this.buttonsChanged();
    }
    componentDidLoad() {
        /**
         * Only create gesture if:
         * 1. A gesture does not already exist
         * 2. App is running in iOS mode
         * 3. A wrapper ref exists
         * 4. A group ref exists
         */
        const { groupEl, wrapperEl } = this;
        if (!this.gesture && getIonMode(this) === 'ios' && wrapperEl && groupEl) {
            readTask(() => {
                const isScrollable = groupEl.scrollHeight > groupEl.clientHeight;
                if (!isScrollable) {
                    this.gesture = createButtonActiveGesture(wrapperEl, (refEl) => refEl.classList.contains('action-sheet-button'));
                    this.gesture.enable(true);
                }
            });
        }
        /**
         * If action sheet was rendered with isOpen="true"
         * then we should open action sheet immediately.
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
    renderActionSheetButtons(filteredButtons) {
        const mode = getIonMode(this);
        const { activeRadioId } = this;
        return filteredButtons.map((b, index) => {
            var _a;
            const isRadio = ((_a = b.htmlAttributes) === null || _a === void 0 ? void 0 : _a.role) === 'radio';
            const buttonId = this.getButtonId(b, index);
            const radioButtons = this.getRadioButtons();
            const isActiveRadio = isRadio && buttonId === activeRadioId;
            const isFirstRadio = isRadio && b === radioButtons[0];
            // For radio buttons, set tabindex: 0 for the active one, -1 for others
            // For non-radio buttons, use default tabindex (undefined, which means 0)
            /**
             * For radio buttons, set tabindex based on activeRadioId
             * - If the button is the active radio, tabindex is 0
             * - If no radio is active, the first radio button should have tabindex 0
             * - All other radio buttons have tabindex -1
             * For non-radio buttons, use default tabindex (undefined, which means 0)
             */
            let tabIndex;
            if (isRadio) {
                // Focus on the active radio button
                if (isActiveRadio) {
                    tabIndex = 0;
                }
                else if (!activeRadioId && isFirstRadio) {
                    // No active radio, first radio gets focus
                    tabIndex = 0;
                }
                else {
                    // All other radios are not focusable
                    tabIndex = -1;
                }
            }
            else {
                tabIndex = undefined;
            }
            // For radio buttons, set aria-checked based on activeRadioId
            // Otherwise, use the value from htmlAttributes if provided
            const htmlAttrs = Object.assign({}, b.htmlAttributes);
            if (isRadio) {
                htmlAttrs['aria-checked'] = isActiveRadio ? 'true' : 'false';
            }
            return (h("button", Object.assign({}, htmlAttrs, { role: isRadio ? 'radio' : undefined, type: "button", id: buttonId, class: Object.assign(Object.assign({}, buttonClass(b)), (isRadio && { 'action-sheet-selected': isActiveRadio })), onClick: () => {
                    if (isRadio) {
                        this.selectRadioButton(b);
                    }
                    this.buttonClick(b);
                }, disabled: b.disabled, tabIndex: tabIndex }), h("span", { class: "action-sheet-button-inner" }, b.icon && h("ion-icon", { icon: b.icon, "aria-hidden": "true", lazy: false, class: "action-sheet-icon" }), b.text), mode === 'md' && h("ion-ripple-effect", null)));
        });
    }
    render() {
        const { header, htmlAttributes, overlayIndex, hasRadioButtons } = this;
        const mode = getIonMode(this);
        const allButtons = this.getButtons();
        const cancelButton = allButtons.find((b) => b.role === 'cancel');
        const buttons = allButtons.filter((b) => b.role !== 'cancel');
        const headerID = `action-sheet-${overlayIndex}-header`;
        return (h(Host, Object.assign({ key: '48b63b870f2816b4cad3c606f3d9956854cee79a', role: "dialog", "aria-modal": "true", "aria-labelledby": header !== undefined ? headerID : null, tabindex: "-1" }, htmlAttributes, { style: {
                zIndex: `${20000 + this.overlayIndex}`,
            }, class: Object.assign(Object.assign({ [mode]: true }, getClassMap(this.cssClass)), { 'overlay-hidden': true, 'action-sheet-translucent': this.translucent }), onIonActionSheetWillDismiss: this.dispatchCancelHandler, onIonBackdropTap: this.onBackdropTap }), h("ion-backdrop", { key: '41dd5781f139d26b3feea33ab387451aeafacd51', tappable: this.backdropDismiss }), h("div", { key: 'f797c2657782e4e83adf90d2d796108e857a1fc0', tabindex: "0", "aria-hidden": "true" }), h("div", { key: '8e74209321fc5e8712e3e293c91a6fa036ea45ab', class: "action-sheet-wrapper ion-overlay-wrapper", ref: (el) => (this.wrapperEl = el) }, h("div", { key: 'c811860be2eed0b6c73fc2cc5a59cb94db2e8912', class: "action-sheet-container" }, h("div", { key: 'd36ee14b70d73eb5cd69e0c57bc5cc31daf86ab3', class: "action-sheet-group", ref: (el) => (this.groupEl = el), role: hasRadioButtons ? 'radiogroup' : undefined }, header !== undefined && (h("div", { key: '922695de191edc86451eed2552acc4f54993ea52', id: headerID, class: {
                'action-sheet-title': true,
                'action-sheet-has-sub-title': this.subHeader !== undefined,
            } }, header, this.subHeader && h("div", { key: 'a119d4a93668e829f7106f11cbbdd437310f3e80', class: "action-sheet-sub-title" }, this.subHeader))), this.renderActionSheetButtons(buttons)), cancelButton && (h("div", { key: '1d27f36d09bedd2e4c61fea9dd9d05f8f9271aef', class: "action-sheet-group action-sheet-group-cancel" }, h("button", Object.assign({ key: 'ed13658176c54cc45808a54a0331c297430d9bc6' }, cancelButton.htmlAttributes, { type: "button", class: buttonClass(cancelButton), onClick: () => this.buttonClick(cancelButton) }), h("span", { key: '5208e3e3535b775a443cef6fb1decd790db69b0c', class: "action-sheet-button-inner" }, cancelButton.icon && (h("ion-icon", { key: 'b7ba489e1ee50524a5b4af670eef787844a16286', icon: cancelButton.icon, "aria-hidden": "true", lazy: false, class: "action-sheet-icon" })), cancelButton.text), mode === 'md' && h("ion-ripple-effect", { key: 'b3f88898114855853259f0001def26b4bd6e4a98' })))))), h("div", { key: '0dfd0fcdc633bf565990eaa06679608e749cf8f9', tabindex: "0", "aria-hidden": "true" })));
    }
    static get is() { return "ion-action-sheet"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "ios": ["action-sheet.ios.scss"],
            "md": ["action-sheet.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["action-sheet.ios.css"],
            "md": ["action-sheet.md.css"]
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
                    "text": "Animation to use when the action sheet is presented."
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
                    "text": "Animation to use when the action sheet is dismissed."
                },
                "getter": false,
                "setter": false
            },
            "buttons": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "(ActionSheetButton | string)[]",
                    "resolved": "(string | ActionSheetButton<any>)[]",
                    "references": {
                        "ActionSheetButton": {
                            "location": "import",
                            "path": "./action-sheet-interface",
                            "id": "src/components/action-sheet/action-sheet-interface.ts::ActionSheetButton",
                            "referenceLocation": "ActionSheetButton"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "An array of buttons for the action sheet."
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
                    "text": "If `true`, the action sheet will be dismissed when the backdrop is clicked."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "backdrop-dismiss",
                "defaultValue": "true"
            },
            "header": {
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
                    "text": "Title for the action sheet."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "header"
            },
            "subHeader": {
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
                    "text": "Subtitle for the action sheet."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "sub-header"
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
                    "text": "If `true`, the action sheet will be translucent.\nOnly applies when the mode is `\"ios\"` and the device supports\n[`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility)."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "translucent",
                "defaultValue": "false"
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
                    "text": "If `true`, the action sheet will animate."
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
                    "text": "Additional attributes to pass to the action sheet."
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
                    "text": "If `true`, the action sheet will open. If `false`, the action sheet will close.\nUse this if you need finer grained control over presentation, otherwise\njust use the actionSheetController or the `trigger` property.\nNote: `isOpen` will not automatically be set back to `false` when\nthe action sheet dismisses. You will need to do that in your code."
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
                    "text": "An ID corresponding to the trigger element that\ncauses the action sheet to open when clicked."
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
            "activeRadioId": {}
        };
    }
    static get events() {
        return [{
                "method": "didPresent",
                "name": "ionActionSheetDidPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the action sheet has presented."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "willPresent",
                "name": "ionActionSheetWillPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before the action sheet has presented."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "willDismiss",
                "name": "ionActionSheetWillDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before the action sheet has dismissed."
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
                "name": "ionActionSheetDidDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the action sheet has dismissed."
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
                    "text": "Emitted after the action sheet has presented.\nShorthand for ionActionSheetWillDismiss."
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
                    "text": "Emitted before the action sheet has presented.\nShorthand for ionActionSheetWillPresent."
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
                    "text": "Emitted before the action sheet has dismissed.\nShorthand for ionActionSheetWillDismiss."
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
                    "text": "Emitted after the action sheet has dismissed.\nShorthand for ionActionSheetDidDismiss."
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
                    "text": "Present the action sheet overlay after it has been created.",
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
                            "docs": "The role of the element that is dismissing the action sheet.\nThis can be useful in a button handler for determining which button was\nclicked to dismiss the action sheet. Some examples include:\n`\"cancel\"`, `\"destructive\"`, `\"selected\"`, and `\"backdrop\"`."
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
                    "text": "Dismiss the action sheet overlay after it has been presented.\nThis is a no-op if the overlay has not been presented yet. If you want\nto remove an overlay from the DOM that was never presented, use the\n[remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method.",
                    "tags": [{
                            "name": "param",
                            "text": "data Any data to emit in the dismiss events."
                        }, {
                            "name": "param",
                            "text": "role The role of the element that is dismissing the action sheet.\nThis can be useful in a button handler for determining which button was\nclicked to dismiss the action sheet. Some examples include:\n`\"cancel\"`, `\"destructive\"`, `\"selected\"`, and `\"backdrop\"`."
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
                    "text": "Returns a promise that resolves when the action sheet did dismiss.",
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
                    "text": "Returns a promise that resolves when the action sheet will dismiss.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "buttons",
                "methodName": "buttonsChanged"
            }, {
                "propName": "isOpen",
                "methodName": "onIsOpenChange"
            }, {
                "propName": "trigger",
                "methodName": "triggerChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "onKeydown",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
const buttonClass = (button) => {
    return Object.assign({ 'action-sheet-button': true, 'ion-activatable': !button.disabled, 'ion-focusable': !button.disabled, [`action-sheet-${button.role}`]: button.role !== undefined }, getClassMap(button.cssClass));
};
