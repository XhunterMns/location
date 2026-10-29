/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { r as registerInstance, f as printIonWarning, h, d as Host, g as getElement } from './index-tcQvqkiX.js';
import { c as createColorClasses } from './theme-DiVJyqlX.js';
import { x as eyeOff, y as eye } from './index-DV3sJJW8.js';
import { b as getIonMode } from './ionic-global-Cp_eT4sZ.js';

const iosInputPasswordToggleCss = () => ``;

const mdInputPasswordToggleCss = () => ``;

const InputPasswordToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * @internal
         */
        this.type = 'password';
        this.togglePasswordVisibility = () => {
            const { inputElRef } = this;
            if (!inputElRef) {
                return;
            }
            inputElRef.type = inputElRef.type === 'text' ? 'password' : 'text';
        };
    }
    /**
     * Whenever the input type changes we need to re-run validation to ensure the password
     * toggle is being used with the correct input type. If the application changes the type
     * outside of this component we also need to re-render so the correct icon is shown.
     */
    onTypeChange(newValue) {
        if (newValue !== 'text' && newValue !== 'password') {
            printIonWarning(`[ion-input-password-toggle] - Only inputs of type "text" or "password" are supported. Input of type "${newValue}" is not compatible.`, this.el);
            return;
        }
    }
    connectedCallback() {
        const { el } = this;
        const inputElRef = (this.inputElRef = el.closest('ion-input'));
        if (!inputElRef) {
            printIonWarning('[ion-input-password-toggle] - No ancestor ion-input found. This component must be slotted inside of an ion-input.', el);
            return;
        }
        /**
         * Important: Set the type in connectedCallback because the default value
         * of this.type may not always be accurate. Usually inputs have the "password" type
         * but it is possible to have the input to initially have the "text" type. In that scenario
         * the wrong icon will show briefly before switching to the correct icon. Setting the
         * type here allows us to avoid that flicker.
         */
        this.type = inputElRef.type;
    }
    disconnectedCallback() {
        this.inputElRef = null;
    }
    render() {
        var _a, _b;
        const { color, type } = this;
        const mode = getIonMode(this);
        const showPasswordIcon = (_a = this.showIcon) !== null && _a !== void 0 ? _a : eye;
        const hidePasswordIcon = (_b = this.hideIcon) !== null && _b !== void 0 ? _b : eyeOff;
        const isPasswordVisible = type === 'text';
        return (h(Host, { key: '91bc55664d496fe457518bd112865dd7811d0c17', class: createColorClasses(color, {
                [mode]: true,
            }) }, h("ion-button", { key: '6344d6838f5cdcba54c6bf4b592f036092044de0', mode: mode, color: color, fill: "clear", shape: "round", "aria-label": isPasswordVisible ? 'Hide password' : 'Show password', "aria-pressed": isPasswordVisible ? 'true' : 'false', type: "button", onPointerDown: (ev) => {
                /**
                 * This prevents mobile browsers from
                 * blurring the input when the password toggle
                 * button is activated.
                 */
                ev.preventDefault();
            }, onClick: this.togglePasswordVisibility }, h("ion-icon", { key: 'a2bd9197c2635bf8cb155ff25ce022e7d7dc6d00', slot: "icon-only", "aria-hidden": "true", icon: isPasswordVisible ? hidePasswordIcon : showPasswordIcon }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "type": [{
                "onTypeChange": 0
            }]
    }; }
};
InputPasswordToggle.style = {
    ios: iosInputPasswordToggleCss(),
    md: mdInputPasswordToggleCss()
};

export { InputPasswordToggle as ion_input_password_toggle };
