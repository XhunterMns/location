/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h, forceUpdate } from "@stencil/core";
import { safeCall } from "../../utils/overlays";
import { getClassMap } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
/**
 * @internal
 */
export class SelectPopover {
    constructor() {
        // Tracks the option that received Enter-keydown so keyup only
        // dismisses when the press started on the same option. Prevents
        // Enter on the triggering ion-select from auto-dismissing.
        this.pendingEnterTarget = null;
        /**
         * An array of options for the popover
         */
        this.options = [];
    }
    findOptionFromEvent(ev) {
        const { options } = this;
        return options.find((o) => o.value === ev.target.value);
    }
    /**
     * When an option is selected we need to get the value(s)
     * of the selected option(s) and return it in the option
     * handler
     */
    callOptionHandler(ev) {
        const option = this.findOptionFromEvent(ev);
        const values = this.getValues(ev);
        if (option === null || option === void 0 ? void 0 : option.handler) {
            safeCall(option.handler, values);
        }
    }
    /**
     * Dismisses the host popover that the `ion-select-popover`
     * is rendered within.
     */
    dismissParentPopover() {
        const popover = this.el.closest('ion-popover');
        if (popover) {
            popover.dismiss();
        }
    }
    setChecked(ev) {
        const { multiple } = this;
        const option = this.findOptionFromEvent(ev);
        // this is a popover with checkboxes (multiple value select)
        // we need to set the checked value for this option
        if (multiple && option) {
            option.checked = ev.detail.checked;
        }
    }
    getValues(ev) {
        const { multiple, options } = this;
        if (multiple) {
            // this is a popover with checkboxes (multiple value select)
            // return an array of all the checked values
            return options.filter((o) => o.checked).map((o) => o.value);
        }
        // this is a popover with radio buttons (single value select)
        // return the value that was clicked, otherwise undefined
        const option = this.findOptionFromEvent(ev);
        return option ? option.value : undefined;
    }
    renderOptions(options) {
        const { multiple } = this;
        switch (multiple) {
            case true:
                return this.renderCheckboxOptions(options);
            default:
                return this.renderRadioOptions(options);
        }
    }
    renderCheckboxOptions(options) {
        return options.map((option) => (h("ion-item", { class: Object.assign({
                // TODO FW-4784
                'item-checkbox-checked': option.checked
            }, getClassMap(option.cssClass)) }, h("ion-checkbox", { value: option.value, disabled: option.disabled, checked: option.checked, justify: "start", labelPlacement: "end", onIonChange: (ev) => {
                this.setChecked(ev);
                this.callOptionHandler(ev);
                // TODO FW-4784
                forceUpdate(this);
            } }, option.text))));
    }
    renderRadioOptions(options) {
        const checked = options.filter((o) => o.checked).map((o) => o.value)[0];
        return (h("ion-radio-group", { value: checked, onIonChange: (ev) => this.callOptionHandler(ev) }, options.map((option) => (h("ion-item", { class: Object.assign({
                // TODO FW-4784
                'item-radio-checked': option.value === checked
            }, getClassMap(option.cssClass)) }, h("ion-radio", { value: option.value, disabled: option.disabled, onClick: () => this.dismissParentPopover(), onKeyDown: (ev) => {
                if (ev.key === 'Enter' && !ev.repeat) {
                    this.pendingEnterTarget = ev.currentTarget;
                }
            }, onKeyUp: (ev) => {
                if (ev.key === ' ') {
                    // Space selects and dismisses in one press.
                    this.dismissParentPopover();
                }
                else if (ev.key === 'Enter') {
                    const shouldDismiss = this.pendingEnterTarget === ev.currentTarget;
                    this.pendingEnterTarget = null;
                    if (shouldDismiss) {
                        this.dismissParentPopover();
                    }
                }
            } }, option.text))))));
    }
    render() {
        const { header, message, options, subHeader } = this;
        const hasSubHeaderOrMessage = subHeader !== undefined || message !== undefined;
        return (h(Host, { key: 'e7449a1ecfcdbf45a79f8e26a00253c4e146448a', class: getIonMode(this) }, h("ion-list", { key: '52abdfc8668c3429a0dcefef8ddedb6647fdd894' }, header !== undefined && h("ion-list-header", { key: '978e5c03728756feafcc60a0e10e6ec59bf2ae11' }, header), hasSubHeaderOrMessage && (h("ion-item", { key: 'e93c44e7f07a76def16e4b11f0fb4780d84ed402' }, h("ion-label", { key: 'bba1aac43b0bc7f4f00978dd8301985233f3725c', class: "ion-text-wrap" }, subHeader !== undefined && h("h3", { key: 'ad96f6017cf2cc5219540bded2c4f1ca3b532de2' }, subHeader), message !== undefined && h("p", { key: '3fd038921dc40c4d0c29734433984b279ccaeec3' }, message)))), this.renderOptions(options))));
    }
    static get is() { return "ion-select-popover"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "ios": ["select-popover.ios.scss"],
            "md": ["select-popover.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["select-popover.ios.css"],
            "md": ["select-popover.md.css"]
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
                    "text": "The header text of the popover"
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
                    "text": "The subheader text of the popover"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "sub-header"
            },
            "message": {
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
                    "text": "The text content of the popover body"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "message"
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
                    "text": "If true, the select accepts multiple values"
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
                    "original": "SelectPopoverOption[]",
                    "resolved": "SelectPopoverOption[]",
                    "references": {
                        "SelectPopoverOption": {
                            "location": "import",
                            "path": "./select-popover-interface",
                            "id": "src/components/select-popover/select-popover-interface.ts::SelectPopoverOption",
                            "referenceLocation": "SelectPopoverOption"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "An array of options for the popover"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            }
        };
    }
    static get elementRef() { return "el"; }
}
