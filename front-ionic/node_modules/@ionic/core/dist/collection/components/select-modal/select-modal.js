/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { getIonMode } from "../../global/ionic-global";
import { Host, forceUpdate, h } from "@stencil/core";
import { safeCall } from "../../utils/overlays";
import { getClassMap } from "../../utils/theme";
export class SelectModal {
    constructor() {
        // Tracks the option that received Enter-keydown so keyup only
        // dismisses when the press started on the same option. Prevents
        // Enter on the triggering ion-select from auto-dismissing.
        this.pendingEnterTarget = null;
        /**
         * The text to display on the cancel button.
         */
        this.cancelText = 'Close';
        this.options = [];
    }
    closeModal() {
        const modal = this.el.closest('ion-modal');
        if (modal) {
            modal.dismiss();
        }
    }
    findOptionFromEvent(ev) {
        const { options } = this;
        return options.find((o) => o.value === ev.target.value);
    }
    getValues(ev) {
        const { multiple, options } = this;
        if (multiple) {
            // this is a modal with checkboxes (multiple value select)
            // return an array of all the checked values
            return options.filter((o) => o.checked).map((o) => o.value);
        }
        // this is a modal with radio buttons (single value select)
        // return the value that was clicked, otherwise undefined
        const option = ev ? this.findOptionFromEvent(ev) : null;
        return option ? option.value : undefined;
    }
    callOptionHandler(ev) {
        const option = this.findOptionFromEvent(ev);
        const values = this.getValues(ev);
        if (option === null || option === void 0 ? void 0 : option.handler) {
            safeCall(option.handler, values);
        }
    }
    setChecked(ev) {
        const { multiple } = this;
        const option = this.findOptionFromEvent(ev);
        // this is a modal with checkboxes (multiple value select)
        // we need to set the checked value for this option
        if (multiple && option) {
            option.checked = ev.detail.checked;
        }
    }
    renderRadioOptions() {
        const checked = this.options.filter((o) => o.checked).map((o) => o.value)[0];
        return (h("ion-radio-group", { value: checked, onIonChange: (ev) => this.callOptionHandler(ev) }, this.options.map((option) => (h("ion-item", { lines: "none", class: Object.assign({
                // TODO FW-4784
                'item-radio-checked': option.value === checked
            }, getClassMap(option.cssClass)) }, h("ion-radio", { value: option.value, disabled: option.disabled, justify: "start", labelPlacement: "end", onClick: () => this.closeModal(), onKeyDown: (ev) => {
                if (ev.key === 'Enter' && !ev.repeat) {
                    this.pendingEnterTarget = ev.currentTarget;
                }
            }, onKeyUp: (ev) => {
                if (ev.key === ' ') {
                    // Space selects and dismisses in one press.
                    this.closeModal();
                }
                else if (ev.key === 'Enter') {
                    const shouldClose = this.pendingEnterTarget === ev.currentTarget;
                    this.pendingEnterTarget = null;
                    if (shouldClose) {
                        this.closeModal();
                    }
                }
            } }, option.text))))));
    }
    renderCheckboxOptions() {
        return this.options.map((option) => (h("ion-item", { class: Object.assign({
                // TODO FW-4784
                'item-checkbox-checked': option.checked
            }, getClassMap(option.cssClass)) }, h("ion-checkbox", { value: option.value, disabled: option.disabled, checked: option.checked, justify: "start", labelPlacement: "end", onIonChange: (ev) => {
                this.setChecked(ev);
                this.callOptionHandler(ev);
                // TODO FW-4784
                forceUpdate(this);
            } }, option.text))));
    }
    render() {
        return (h(Host, { key: 'fda0bf6f93cd5ec9f3c64f88a52de849e0e140a2', class: getIonMode(this) }, h("ion-header", { key: '27c0b17175a53db9ff159feeeb96451a3f011dab' }, h("ion-toolbar", { key: '91a4155ebc317fbc9f1bb3e26a7e94754b953c9b' }, this.header !== undefined && h("ion-title", { key: 'f6dae8e4e381f322cc90efefd9bb6ef81d4d2f3e' }, this.header), h("ion-buttons", { key: 'e7760532fb2e7e7385ed6e62097d92d96ff20148', slot: "end" }, h("ion-button", { key: '4999b6fc46cba138186546dca67b7950855e6fb7', onClick: () => this.closeModal() }, this.cancelText)))), h("ion-content", { key: 'c73f80a4bc25b9061ea65cf11e5d811c1a4d8704' }, h("ion-list", { key: 'b21905d15b36ad5eb45845e768918d2763cf48b1' }, this.multiple === true ? this.renderCheckboxOptions() : this.renderRadioOptions()))));
    }
    static get is() { return "ion-select-modal"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "ios": ["select-modal.ios.scss"],
            "md": ["select-modal.md.scss"],
            "ionic": ["select-modal.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["select-modal.ios.css"],
            "md": ["select-modal.md.css"],
            "ionic": ["select-modal.md.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "header"
            },
            "cancelText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The text to display on the cancel button."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "cancel-text",
                "defaultValue": "'Close'"
            },
            "multiple": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "multiple"
            },
            "options": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "SelectModalOption[]",
                    "resolved": "SelectModalOption[]",
                    "references": {
                        "SelectModalOption": {
                            "location": "import",
                            "path": "./select-modal-interface",
                            "id": "src/components/select-modal/select-modal-interface.ts::SelectModalOption",
                            "referenceLocation": "SelectModalOption"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            }
        };
    }
    static get elementRef() { return "el"; }
}
