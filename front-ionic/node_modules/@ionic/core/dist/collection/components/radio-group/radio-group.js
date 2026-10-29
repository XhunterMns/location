/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Build, Host, h } from "@stencil/core";
import { checkInvalidState } from "../../utils/forms/index";
import { renderHiddenInput } from "../../utils/helpers";
import { getIonMode } from "../../global/ionic-global";
export class RadioGroup {
    constructor() {
        this.inputId = `ion-rg-${radioGroupIds++}`;
        this.helperTextId = `${this.inputId}-helper-text`;
        this.errorTextId = `${this.inputId}-error-text`;
        this.labelId = `${this.inputId}-lbl`;
        /**
         * Track validation state for proper aria-live announcements.
         */
        this.isInvalid = false;
        /**
         * If `true`, the radios can be deselected.
         */
        this.allowEmptySelection = false;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        this.setRadioTabindex = (value) => {
            const radios = this.getRadios();
            // Get the first radio that is not disabled and the checked one
            const first = radios.find((radio) => !radio.disabled);
            const checked = radios.find((radio) => radio.value === value && !radio.disabled);
            if (!first && !checked) {
                return;
            }
            // If an enabled checked radio exists, set it to be the focusable radio
            // otherwise we default to focus the first radio
            const focusable = checked || first;
            for (const radio of radios) {
                const tabindex = radio === focusable ? 0 : -1;
                radio.setButtonTabindex(tabindex);
            }
        };
        this.onClick = (ev) => {
            ev.preventDefault();
            /**
             * The Radio Group component mandates that only one radio button
             * within the group can be selected at any given time. Since `ion-radio`
             * is a shadow DOM component, it cannot natively perform this behavior
             * using the `name` attribute.
             */
            const selectedRadio = ev.target && ev.target.closest('ion-radio');
            /**
             * Our current disabled prop definition causes Stencil to mark it
             * as optional. While this is not desired, fixing this behavior
             * in Stencil is a significant breaking change, so this effort is
             * being de-risked in STENCIL-917. Until then, we compromise
             * here by checking for falsy `disabled` values instead of strictly
             * checking `disabled === false`.
             */
            if (selectedRadio && !selectedRadio.disabled) {
                const currentValue = this.value;
                const newValue = selectedRadio.value;
                if (newValue !== currentValue) {
                    this.value = newValue;
                    this.emitValueChange(ev);
                }
                else if (this.allowEmptySelection) {
                    this.value = undefined;
                    this.emitValueChange(ev);
                }
            }
        };
    }
    valueChanged(value) {
        this.setRadioTabindex(value);
        this.ionValueChange.emit({ value });
    }
    componentDidLoad() {
        /**
         * There's an issue when assigning a value to the radio group
         * within the Angular primary content (rendering within the
         * app component template). When the template is isolated to a route,
         * the value is assigned correctly.
         * To address this issue, we need to ensure that the watcher is
         * called after the component has finished loading,
         * allowing the emit to be dispatched correctly.
         */
        this.valueChanged(this.value);
    }
    async connectedCallback() {
        // Get the list header if it exists and set the id
        // this is used to set aria-labelledby
        const header = this.el.querySelector('ion-list-header') || this.el.querySelector('ion-item-divider');
        if (header) {
            const label = (this.label = header.querySelector('ion-label'));
            if (label) {
                this.labelId = label.id = this.name + '-lbl';
            }
        }
        // Watch for class changes to update validation state.
        if (Build.isBrowser && typeof MutationObserver !== 'undefined') {
            this.validationObserver = new MutationObserver(() => {
                const newIsInvalid = checkInvalidState(this.el);
                if (this.isInvalid !== newIsInvalid) {
                    this.isInvalid = newIsInvalid;
                    /**
                     * Screen readers tend to announce changes
                     * to `aria-describedby` when the attribute
                     * is changed during a blur event for a
                     * native form control.
                     * However, the announcement can be spotty
                     * when using a non-native form control
                     * and `forceUpdate()`.
                     * This is due to `forceUpdate()` internally
                     * rescheduling the DOM update to a lower
                     * priority queue regardless if it's called
                     * inside a Promise or not, thus causing
                     * the screen reader to potentially miss the
                     * change.
                     * By using a State variable inside a Promise,
                     * it guarantees a re-render immediately at
                     * a higher priority.
                     */
                    Promise.resolve().then(() => {
                        this.hintTextId = this.getHintTextId();
                    });
                }
            });
            this.validationObserver.observe(this.el, {
                attributes: true,
                attributeFilter: ['class'],
            });
        }
        // Always set initial state
        this.isInvalid = checkInvalidState(this.el);
    }
    componentWillLoad() {
        this.hintTextId = this.getHintTextId();
    }
    disconnectedCallback() {
        // Clean up validation observer to prevent memory leaks.
        if (this.validationObserver) {
            this.validationObserver.disconnect();
            this.validationObserver = undefined;
        }
    }
    getRadios() {
        return Array.from(this.el.querySelectorAll('ion-radio'));
    }
    /**
     * Emits an `ionChange` event.
     *
     * This API should be called for user committed changes.
     * This API should not be used for external value changes.
     */
    emitValueChange(event) {
        const { value } = this;
        this.ionChange.emit({ value, event });
    }
    onKeydown(ev) {
        // We don't want the value to automatically change/emit when the radio group is part of a select interface
        // as this will cause the interface to close when navigating through the radio group options
        const inSelectInterface = !!this.el.closest('ion-select-popover') || !!this.el.closest('ion-select-modal');
        if (ev.target && !this.el.contains(ev.target)) {
            return;
        }
        // Get all radios inside of the radio group and then
        // filter out disabled radios since we need to skip those
        const radios = this.getRadios().filter((radio) => !radio.disabled);
        // Only move the radio if the current focus is in the radio group
        if (ev.target && radios.includes(ev.target)) {
            const index = radios.findIndex((radio) => radio === ev.target);
            const current = radios[index];
            let next;
            // If hitting arrow down or arrow right, move to the next radio
            // If we're on the last radio, move to the first radio
            if (['ArrowDown', 'ArrowRight'].includes(ev.key)) {
                next = index === radios.length - 1 ? radios[0] : radios[index + 1];
            }
            // If hitting arrow up or arrow left, move to the previous radio
            // If we're on the first radio, move to the last radio
            if (['ArrowUp', 'ArrowLeft'].includes(ev.key)) {
                next = index === 0 ? radios[radios.length - 1] : radios[index - 1];
            }
            if (next && radios.includes(next)) {
                next.setFocus(ev);
                if (!inSelectInterface) {
                    this.value = next.value;
                    this.emitValueChange(ev);
                }
            }
            // Update the radio group value when a user presses the
            // space bar on top of a selected radio
            if ([' '].includes(ev.key)) {
                const previousValue = this.value;
                this.value = this.allowEmptySelection && this.value !== undefined ? undefined : current.value;
                if (previousValue !== this.value || this.allowEmptySelection) {
                    /**
                     * Value change should only be emitted if the value is different,
                     * such as selecting a new radio with the space bar or if
                     * the radio group allows for empty selection and the user
                     * is deselecting a checked radio.
                     */
                    this.emitValueChange(ev);
                }
                // Prevent browsers from jumping
                // to the bottom of the screen
                ev.preventDefault();
            }
            // Inside a select interface, Enter commits the focused radio
            // value (matching native <select>). The !ev.repeat guard stops
            // a held Enter on the triggering ion-select from re-committing
            // once focus lands in the opened popover/modal.
            if (ev.key === 'Enter' && inSelectInterface && !ev.repeat) {
                const previousValue = this.value;
                this.value = current.value;
                if (previousValue !== this.value) {
                    this.emitValueChange(ev);
                }
                ev.preventDefault();
            }
        }
    }
    /** @internal */
    async setFocus() {
        const radioToFocus = this.getRadios().find((r) => r.tabIndex !== -1);
        radioToFocus === null || radioToFocus === void 0 ? void 0 : radioToFocus.setFocus();
    }
    /**
     * Renders the helper text or error text values
     */
    renderHintText() {
        const { helperText, errorText, helperTextId, errorTextId, isInvalid } = this;
        const hasHintText = !!helperText || !!errorText;
        if (!hasHintText) {
            return;
        }
        return (h("div", { class: "radio-group-top" }, h("div", { id: helperTextId, class: "helper-text", "aria-live": "polite" }, !isInvalid ? helperText : null), h("div", { id: errorTextId, class: "error-text", role: "alert" }, isInvalid ? errorText : null)));
    }
    getHintTextId() {
        const { helperText, errorText, helperTextId, errorTextId, isInvalid } = this;
        if (isInvalid && errorText) {
            return errorTextId;
        }
        if (helperText) {
            return helperTextId;
        }
        return undefined;
    }
    render() {
        const { label, labelId, el, name, value } = this;
        const mode = getIonMode(this);
        renderHiddenInput(true, el, name, value, false);
        return (h(Host, { key: '377e4aa3a656cc84b742f9d7a7d4be65d20c69f5', role: "radiogroup", "aria-labelledby": label ? labelId : null, "aria-describedby": this.hintTextId, "aria-invalid": this.isInvalid ? 'true' : undefined, onClick: this.onClick, class: mode }, this.renderHintText(), h("slot", { key: 'c3187a2497773b4f15cea3b413b036502bcec8c0' })));
    }
    static get is() { return "ion-radio-group"; }
    static get originalStyleUrls() {
        return {
            "ios": ["radio-group.ios.scss"],
            "md": ["radio-group.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["radio-group.ios.css"],
            "md": ["radio-group.md.css"]
        };
    }
    static get properties() {
        return {
            "allowEmptySelection": {
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
                    "text": "If `true`, the radios can be deselected."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "allow-empty-selection",
                "defaultValue": "false"
            },
            "compareWith": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | RadioGroupCompareFn | null",
                    "resolved": "((currentValue: any, compareValue: any) => boolean) | null | string | undefined",
                    "references": {
                        "RadioGroupCompareFn": {
                            "location": "import",
                            "path": "./radio-group-interface",
                            "id": "src/components/radio-group/radio-group-interface.ts::RadioGroupCompareFn",
                            "referenceLocation": "RadioGroupCompareFn"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "This property allows developers to specify a custom function or property\nname for comparing objects when determining the selected option in the\nion-radio-group. When not specified, the default behavior will use strict\nequality (===) for comparison."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "compare-with"
            },
            "name": {
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
                    "text": "The name of the control, which is submitted with the form data."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "name",
                "defaultValue": "this.inputId"
            },
            "value": {
                "type": "any",
                "mutable": true,
                "complexType": {
                    "original": "any | null",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "the value of the radio group."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value"
            },
            "helperText": {
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
                    "text": "The helper text to display at the top of the radio group."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "helper-text"
            },
            "errorText": {
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
                    "text": "The error text to display at the top of the radio group."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "error-text"
            }
        };
    }
    static get states() {
        return {
            "isInvalid": {},
            "hintTextId": {}
        };
    }
    static get events() {
        return [{
                "method": "ionChange",
                "name": "ionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the value has changed.\n\nThis event will not emit when programmatically setting the `value` property."
                },
                "complexType": {
                    "original": "RadioGroupChangeEventDetail",
                    "resolved": "RadioGroupChangeEventDetail<any>",
                    "references": {
                        "RadioGroupChangeEventDetail": {
                            "location": "import",
                            "path": "./radio-group-interface",
                            "id": "src/components/radio-group/radio-group-interface.ts::RadioGroupChangeEventDetail",
                            "referenceLocation": "RadioGroupChangeEventDetail"
                        }
                    }
                }
            }, {
                "method": "ionValueChange",
                "name": "ionValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": "Emitted when the `value` property has changed.\nThis is used to ensure that `ion-radio` can respond\nto any value property changes from the group."
                },
                "complexType": {
                    "original": "RadioGroupChangeEventDetail",
                    "resolved": "RadioGroupChangeEventDetail<any>",
                    "references": {
                        "RadioGroupChangeEventDetail": {
                            "location": "import",
                            "path": "./radio-group-interface",
                            "id": "src/components/radio-group/radio-group-interface.ts::RadioGroupChangeEventDetail",
                            "referenceLocation": "RadioGroupChangeEventDetail"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "setFocus": {
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
                    "text": "",
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "valueChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "onKeydown",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
let radioGroupIds = 0;
