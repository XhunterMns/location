/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Build, Host, forceUpdate, h, } from "@stencil/core";
import { createNotchController, checkInvalidState } from "../../utils/forms/index";
import { inheritAriaAttributes, debounceEvent, inheritAttributes, componentOnReady } from "../../utils/helpers";
import { createSlotMutationController } from "../../utils/slot-mutation-controller";
import { createColorClasses, hostContext } from "../../utils/theme";
import { closeCircle, closeSharp } from "ionicons/icons";
import { getIonMode } from "../../global/ionic-global";
import { getCounterText } from "./input.utils";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @slot label - The label text to associate with the input. Use the `labelPlacement` property to control where the label is placed relative to the input. Use this if you need to render a label with custom HTML. (EXPERIMENTAL)
 * @slot start - Content to display at the leading edge of the input. (EXPERIMENTAL)
 * @slot end - Content to display at the trailing edge of the input. (EXPERIMENTAL)
 */
export class Input {
    constructor() {
        this.inputId = `ion-input-${inputIds++}`;
        this.helperTextId = `${this.inputId}-helper-text`;
        this.errorTextId = `${this.inputId}-error-text`;
        this.labelTextId = `${this.inputId}-label`;
        this.inheritedAttributes = {};
        this.isComposing = false;
        /**
         * `true` if the input was cleared as a result of the user typing
         * with `clearOnEdit` enabled.
         *
         * Resets when the input loses focus.
         */
        this.didInputClearOnEdit = false;
        /**
         * The `hasFocus` state ensures the focus class is
         * added regardless of how the element is focused.
         * The `ion-focused` class only applies when focused
         * via tabbing, not by clicking.
         * The `has-focus` logic was added to ensure the class
         * is applied in both cases.
         */
        this.hasFocus = false;
        /**
         * Track validation state for proper aria-live announcements
         */
        this.isInvalid = false;
        /**
         * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
         * Available options: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`.
         */
        this.autocapitalize = 'off';
        /**
         * Indicates whether the value of the control can be automatically completed by the browser.
         */
        this.autocomplete = 'off';
        /**
         * Whether auto correction should be enabled when the user is entering/editing the text value.
         */
        this.autocorrect = 'off';
        /**
         * Sets the [`autofocus` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus) on the native input element.
         *
         * This may not be sufficient for the element to be focused on page load. See [managing focus](/docs/developing/managing-focus) for more information.
         */
        this.autofocus = false;
        /**
         * If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.
         */
        this.clearInput = false;
        /**
         * If `true`, a character counter will display the ratio of characters used and the total character limit. Developers must also set the `maxlength` property for the counter to be calculated correctly.
         */
        this.counter = false;
        /**
         * If `true`, the user cannot interact with the input.
         */
        this.disabled = false;
        /**
         * Where to place the label relative to the input.
         * `"start"`: The label will appear to the left of the input in LTR and to the right in RTL.
         * `"end"`: The label will appear to the right of the input in LTR and to the left in RTL.
         * `"floating"`: The label will appear smaller and above the input when the input is focused or it has a value. Otherwise it will appear on top of the input.
         * `"stacked"`: The label will appear smaller and above the input regardless even when the input is blurred or has no value.
         * `"fixed"`: The label has the same behavior as `"start"` except it also has a fixed width. Long text will be truncated with ellipses ("...").
         */
        this.labelPlacement = 'start';
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If `true`, the user cannot modify the value.
         */
        this.readonly = false;
        /**
         * If `true`, the user must fill in a value before submitting a form.
         */
        this.required = false;
        /**
         * If `true`, the element will have its spelling and grammar checked.
         */
        this.spellcheck = false;
        /**
         * The type of control to display. The default type is text.
         */
        this.type = 'text';
        /**
         * The value of the input.
         */
        this.value = '';
        this.onInput = (ev) => {
            const input = ev.target;
            if (input) {
                this.value = input.value || '';
            }
            this.emitInputChange(ev);
        };
        this.onChange = (ev) => {
            this.emitValueChange(ev);
        };
        this.onBlur = (ev) => {
            this.hasFocus = false;
            if (this.focusedValue !== this.value) {
                /**
                 * Emits the `ionChange` event when the input value
                 * is different than the value when the input was focused.
                 */
                this.emitValueChange(ev);
            }
            this.didInputClearOnEdit = false;
            this.ionBlur.emit(ev);
        };
        this.onFocus = (ev) => {
            this.hasFocus = true;
            this.focusedValue = this.value;
            this.ionFocus.emit(ev);
        };
        this.onKeydown = (ev) => {
            this.checkClearOnEdit(ev);
        };
        this.onCompositionStart = () => {
            this.isComposing = true;
        };
        this.onCompositionEnd = () => {
            this.isComposing = false;
        };
        this.clearTextInput = (ev) => {
            if (this.clearInput && !this.readonly && !this.disabled && ev) {
                ev.preventDefault();
                ev.stopPropagation();
                // Attempt to focus input again after pressing clear button
                this.setFocus();
            }
            this.value = '';
            this.emitInputChange(ev);
        };
        /**
         * Stops propagation when the label is clicked,
         * otherwise, two clicks will be triggered.
         */
        this.onLabelClick = (ev) => {
            // Only stop propagation if the click was directly on the label
            // and not on the input or other child elements
            if (ev.target === ev.currentTarget) {
                ev.stopPropagation();
            }
        };
    }
    debounceChanged() {
        const { ionInput, debounce, originalIonInput } = this;
        /**
         * If debounce is undefined, we have to manually revert the ionInput emitter in case
         * debounce used to be set to a number. Otherwise, the event would stay debounced.
         */
        this.ionInput = debounce === undefined ? originalIonInput !== null && originalIonInput !== void 0 ? originalIonInput : ionInput : debounceEvent(ionInput, debounce);
    }
    /**
     * Whenever the type on the input changes we need
     * to update the internal type prop on the password
     * toggle so that that correct icon is shown.
     */
    onTypeChange() {
        const passwordToggle = this.el.querySelector('ion-input-password-toggle');
        if (passwordToggle) {
            passwordToggle.type = this.type;
        }
    }
    /**
     * Update the native input element when the value changes
     */
    valueChanged() {
        const nativeInput = this.nativeInput;
        const value = this.getValue();
        if (nativeInput && nativeInput.value !== value && !this.isComposing) {
            /**
             * Assigning the native input's value on attribute
             * value change, allows `ionInput` implementations
             * to override the control's value.
             *
             * Used for patterns such as input trimming (removing whitespace),
             * or input masking.
             */
            nativeInput.value = value;
        }
    }
    /**
     * dir is a globally enumerated attribute.
     * As a result, creating these as properties
     * can have unintended side effects. Instead, we
     * listen for attribute changes and inherit them
     * to the inner `<input>` element.
     */
    onDirChanged(newValue) {
        this.inheritedAttributes = Object.assign(Object.assign({}, this.inheritedAttributes), { dir: newValue });
        forceUpdate(this);
    }
    /**
     * This prevents the native input from emitting the click event.
     * Instead, the click event from the ion-input is emitted.
     */
    onClickCapture(ev) {
        const nativeInput = this.nativeInput;
        if (nativeInput && ev.target === nativeInput) {
            ev.stopPropagation();
            this.el.click();
        }
    }
    componentWillLoad() {
        this.inheritedAttributes = Object.assign(Object.assign({}, inheritAriaAttributes(this.el)), inheritAttributes(this.el, ['tabindex', 'title', 'data-form-type', 'dir']));
    }
    connectedCallback() {
        const { el } = this;
        this.slotMutationController = createSlotMutationController(el, ['label', 'start', 'end'], () => {
            this.setSlottedLabelId();
            forceUpdate(this);
        });
        this.setSlottedLabelId();
        this.notchController = createNotchController(el, () => this.notchSpacerEl, () => this.labelSlot);
        // Watch for class changes to update validation state
        if (Build.isBrowser && typeof MutationObserver !== 'undefined') {
            this.validationObserver = new MutationObserver(() => {
                const newIsInvalid = checkInvalidState(el);
                if (this.isInvalid !== newIsInvalid) {
                    this.isInvalid = newIsInvalid;
                    // Force a re-render to update aria-describedby immediately
                    forceUpdate(this);
                }
            });
            this.validationObserver.observe(el, {
                attributes: true,
                attributeFilter: ['class'],
            });
        }
        // Always set initial state
        this.isInvalid = checkInvalidState(el);
        this.debounceChanged();
        if (Build.isBrowser) {
            document.dispatchEvent(new CustomEvent('ionInputDidLoad', {
                detail: this.el,
            }));
        }
    }
    componentDidLoad() {
        this.originalIonInput = this.ionInput;
        /**
         * Set the type on the password toggle in the event that this input's
         * type was set async and does not match the default type for the password toggle.
         * This can happen when the type is bound using a JS framework binding syntax
         * such as [type] in Angular.
         */
        this.onTypeChange();
        this.debounceChanged();
    }
    componentDidRender() {
        var _a;
        (_a = this.notchController) === null || _a === void 0 ? void 0 : _a.calculateNotchWidth();
    }
    disconnectedCallback() {
        if (Build.isBrowser) {
            document.dispatchEvent(new CustomEvent('ionInputDidUnload', {
                detail: this.el,
            }));
        }
        if (this.slotMutationController) {
            this.slotMutationController.destroy();
            this.slotMutationController = undefined;
        }
        if (this.notchController) {
            this.notchController.destroy();
            this.notchController = undefined;
        }
        // Clean up validation observer to prevent memory leaks
        if (this.validationObserver) {
            this.validationObserver.disconnect();
            this.validationObserver = undefined;
        }
    }
    /**
     * Sets focus on the native `input` in `ion-input`. Use this method instead of the global
     * `input.focus()`.
     *
     * Developers who wish to focus an input when a page enters
     * should call `setFocus()` in the `ionViewDidEnter()` lifecycle method.
     *
     * Developers who wish to focus an input when an overlay is presented
     * should call `setFocus` after `didPresent` has resolved.
     *
     * See [managing focus](/docs/developing/managing-focus) for more information.
     */
    async setFocus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
    }
    /**
     * Returns the native `<input>` element used under the hood.
     */
    async getInputElement() {
        /**
         * If this gets called in certain early lifecycle hooks (ex: Vue onMounted),
         * nativeInput won't be defined yet with the custom elements build, so wait for it to load in.
         */
        if (!this.nativeInput) {
            await new Promise((resolve) => componentOnReady(this.el, resolve));
        }
        return Promise.resolve(this.nativeInput);
    }
    /**
     * Emits an `ionChange` event.
     *
     * This API should be called for user committed changes.
     * This API should not be used for external value changes.
     */
    emitValueChange(event) {
        const { value } = this;
        // Checks for both null and undefined values
        const newValue = value == null ? value : value.toString();
        // Emitting a value change should update the internal state for tracking the focused value
        this.focusedValue = newValue;
        this.ionChange.emit({ value: newValue, event });
    }
    /**
     * Emits an `ionInput` event.
     */
    emitInputChange(event) {
        const { value } = this;
        // Checks for both null and undefined values
        const newValue = value == null ? value : value.toString();
        this.ionInput.emit({ value: newValue, event });
    }
    shouldClearOnEdit() {
        const { type, clearOnEdit } = this;
        return clearOnEdit === undefined ? type === 'password' : clearOnEdit;
    }
    getValue() {
        return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString();
    }
    checkClearOnEdit(ev) {
        if (!this.shouldClearOnEdit()) {
            return;
        }
        /**
         * The following keys do not modify the
         * contents of the input. As a result, pressing
         * them should not edit the input.
         *
         * We can't check to see if the value of the input
         * was changed because we call checkClearOnEdit
         * in a keydown listener, and the key has not yet
         * been added to the input.
         */
        const IGNORED_KEYS = ['Enter', 'Tab', 'Shift', 'Meta', 'Alt', 'Control'];
        const pressedIgnoredKey = IGNORED_KEYS.includes(ev.key);
        /**
         * Clear the input if the control has not been previously cleared during focus.
         * Do not clear if the user hitting enter to submit a form.
         */
        if (!this.didInputClearOnEdit && this.hasValue() && !pressedIgnoredKey) {
            this.value = '';
            this.emitInputChange(ev);
        }
        /**
         * Pressing an IGNORED_KEYS first and
         * then an allowed key will cause the input to not
         * be cleared.
         */
        if (!pressedIgnoredKey) {
            this.didInputClearOnEdit = true;
        }
    }
    hasValue() {
        return this.getValue().length > 0;
    }
    /**
     * Renders the helper text or error text values
     */
    renderHintText() {
        const { helperText, errorText, helperTextId, errorTextId, isInvalid } = this;
        return [
            h("div", { id: helperTextId, class: "helper-text", "aria-live": "polite" }, !isInvalid ? helperText : null),
            h("div", { id: errorTextId, class: "error-text", role: "alert" }, isInvalid ? errorText : null),
        ];
    }
    getHintTextID() {
        const { isInvalid, helperText, errorText, helperTextId, errorTextId } = this;
        if (isInvalid && errorText) {
            return errorTextId;
        }
        if (helperText) {
            return helperTextId;
        }
        return undefined;
    }
    renderCounter() {
        const { counter, maxlength, counterFormatter, value } = this;
        if (counter !== true || maxlength === undefined) {
            return;
        }
        return h("div", { class: "counter" }, getCounterText(value, maxlength, counterFormatter));
    }
    /**
     * Responsible for rendering helper text,
     * error text, and counter. This element should only
     * be rendered if hint text is set or counter is enabled.
     */
    renderBottomContent() {
        const { counter, helperText, errorText, maxlength } = this;
        /**
         * undefined and empty string values should
         * be treated as not having helper/error text.
         */
        const hasHintText = !!helperText || !!errorText;
        const hasCounter = counter === true && maxlength !== undefined;
        if (!hasHintText && !hasCounter) {
            return;
        }
        return (h("div", { class: "input-bottom" }, this.renderHintText(), this.renderCounter()));
    }
    renderLabel() {
        const { label, labelTextId } = this;
        return (h("div", { class: {
                'label-text-wrapper': true,
                'label-text-wrapper-hidden': !this.hasLabel,
            }, "aria-hidden": this.hasLabel ? 'true' : null }, label === undefined ? (h("slot", { name: "label" })) : (h("div", { class: "label-text", id: labelTextId }, label))));
    }
    /**
     * Gets any content passed into the `label` slot,
     * not the <slot> definition.
     */
    get labelSlot() {
        return this.el.querySelector('[slot="label"]');
    }
    /**
     * Ensures the slotted label element has an ID for aria-labelledby.
     * If no ID exists, we assign one using our generated labelTextId.
     */
    setSlottedLabelId() {
        const slottedLabel = this.labelSlot;
        if (slottedLabel && !slottedLabel.id) {
            slottedLabel.id = this.labelTextId;
        }
    }
    /**
     * Returns the ID to use for aria-labelledby on the native input,
     * or undefined if aria-label is explicitly set (to avoid conflicts).
     */
    getLabelledById() {
        var _a;
        if (this.inheritedAttributes['aria-label']) {
            return undefined;
        }
        if (this.label !== undefined) {
            return this.labelTextId;
        }
        return ((_a = this.labelSlot) === null || _a === void 0 ? void 0 : _a.id) || undefined;
    }
    /**
     * Returns `true` if label content is provided
     * either by a prop or a content. If you want
     * to get the plaintext value of the label use
     * the `labelText` getter instead.
     */
    get hasLabel() {
        return this.label !== undefined || this.labelSlot !== null;
    }
    /**
     * Renders the border container
     * when fill="outline".
     */
    renderLabelContainer() {
        const mode = getIonMode(this);
        const hasOutlineFill = mode === 'md' && this.fill === 'outline';
        if (hasOutlineFill) {
            /**
             * The outline fill has a special outline
             * that appears around the input and the label.
             * Certain stacked and floating label placements cause the
             * label to translate up and create a "cut out"
             * inside of that border by using the notch-spacer element.
             */
            return [
                h("div", { class: "input-outline-container" }, h("div", { class: "input-outline-start" }), h("div", { class: {
                        'input-outline-notch': true,
                        'input-outline-notch-hidden': !this.hasLabel,
                    } }, h("div", { class: "notch-spacer", "aria-hidden": "true", ref: (el) => (this.notchSpacerEl = el) }, this.label)), h("div", { class: "input-outline-end" })),
                this.renderLabel(),
            ];
        }
        /**
         * If not using the outline style,
         * we can render just the label.
         */
        return this.renderLabel();
    }
    render() {
        const { disabled, fill, readonly, shape, inputId, labelPlacement, el, hasFocus, clearInputIcon } = this;
        const mode = getIonMode(this);
        const value = this.getValue();
        const inItem = hostContext('ion-item', this.el);
        const shouldRenderHighlight = mode === 'md' && fill !== 'outline' && !inItem;
        const defaultClearIcon = mode === 'ios' ? closeCircle : closeSharp;
        const clearIconData = clearInputIcon !== null && clearInputIcon !== void 0 ? clearInputIcon : defaultClearIcon;
        const hasValue = this.hasValue();
        const hasStartEndSlots = el.querySelector('[slot="start"], [slot="end"]') !== null;
        /**
         * If the label is stacked, it should always sit above the input.
         * For floating labels, the label should move above the input if
         * the input has a value, is focused, or has anything in either
         * the start or end slot.
         *
         * If there is content in the start slot, the label would overlap
         * it if not forced to float. This is also applied to the end slot
         * because with the default or solid fills, the input is not
         * vertically centered in the container, but the label is. This
         * causes the slots and label to appear vertically offset from each
         * other when the label isn't floating above the input. This doesn't
         * apply to the outline fill, but this was not accounted for to keep
         * things consistent.
         *
         * TODO(FW-5592): Remove hasStartEndSlots condition
         */
        const labelShouldFloat = labelPlacement === 'stacked' || (labelPlacement === 'floating' && (hasValue || hasFocus || hasStartEndSlots));
        return (h(Host, { key: '9ba9cf425b573d2ca9ac34455a0e6b8474c4de6d', class: createColorClasses(this.color, {
                [mode]: true,
                'has-value': hasValue,
                'has-focus': hasFocus,
                'label-floating': labelShouldFloat,
                [`input-fill-${fill}`]: fill !== undefined,
                [`input-shape-${shape}`]: shape !== undefined,
                [`input-label-placement-${labelPlacement}`]: true,
                'in-item': inItem,
                'in-item-color': hostContext('ion-item.ion-color', this.el),
                'input-disabled': disabled,
            }) }, h("label", { key: '74b989d0aa5ab38f29f952519868f05119df6005', class: "input-wrapper", htmlFor: inputId, onClick: this.onLabelClick }, this.renderLabelContainer(), h("div", { key: '47f2b42e2f74ea866b4f871026e08ab375d7a726', class: "native-wrapper", onClick: this.onLabelClick }, h("slot", { key: 'eaabe5a4a329a356cac3294d15c087d0d131fff2', name: "start" }), h("input", Object.assign({ key: 'c821a984a8a9b7f96f30892c06d8deda093ff24b', class: "native-input", ref: (input) => (this.nativeInput = input), id: inputId, disabled: disabled, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, name: this.name, pattern: this.pattern, placeholder: this.placeholder || '', readOnly: readonly, required: this.required, spellcheck: this.spellcheck, step: this.step, type: this.type, value: value, onInput: this.onInput, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeydown, onCompositionstart: this.onCompositionStart, onCompositionend: this.onCompositionEnd, "aria-describedby": this.getHintTextID(), "aria-invalid": this.isInvalid ? 'true' : undefined, "aria-labelledby": this.getLabelledById() }, this.inheritedAttributes)), this.clearInput && !readonly && !disabled && (h("button", { key: '62069c11016ee190dc46ab941372e1c4ad8a36ed', "aria-label": "reset", type: "button", class: "input-clear-icon", onPointerDown: (ev) => {
                /**
                 * This prevents mobile browsers from
                 * blurring the input when the clear
                 * button is activated.
                 */
                ev.preventDefault();
            }, onClick: this.clearTextInput }, h("ion-icon", { key: 'dd75a516d32110d85382b664c663bd41f177ce12', "aria-hidden": "true", icon: clearIconData }))), h("slot", { key: '330d4b9389f2c62223a5ee24003e96ef3e6b2473', name: "end" })), shouldRenderHighlight && h("div", { key: '8e442bed130ddc84976ab70fd3f8578d6bcc6316', class: "input-highlight" })), this.renderBottomContent()));
    }
    static get is() { return "ion-input"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "ios": ["input.ios.scss"],
            "md": ["input.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["input.ios.css"],
            "md": ["input.md.css"]
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
            "autocapitalize": {
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
                    "text": "Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.\nAvailable options: `\"off\"`, `\"none\"`, `\"on\"`, `\"sentences\"`, `\"words\"`, `\"characters\"`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "autocapitalize",
                "defaultValue": "'off'"
            },
            "autocomplete": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "AutocompleteTypes",
                    "resolved": "\"additional-name\" | \"address-level1\" | \"address-level2\" | \"address-level3\" | \"address-level4\" | \"address-line1\" | \"address-line2\" | \"address-line3\" | \"bday\" | \"bday-day\" | \"bday-month\" | \"bday-year\" | \"cc-additional-name\" | \"cc-csc\" | \"cc-exp\" | \"cc-exp-month\" | \"cc-exp-year\" | \"cc-family-name\" | \"cc-given-name\" | \"cc-name\" | \"cc-number\" | \"cc-type\" | \"country\" | \"country-name\" | \"current-password\" | \"email\" | \"family-name\" | \"given-name\" | \"honorific-prefix\" | \"honorific-suffix\" | \"impp\" | \"language\" | \"name\" | \"new-password\" | \"nickname\" | \"off\" | \"on\" | \"one-time-code\" | \"organization\" | \"organization-title\" | \"photo\" | \"postal-code\" | \"sex\" | \"street-address\" | \"tel\" | \"tel-area-code\" | \"tel-country-code\" | \"tel-extension\" | \"tel-local\" | \"tel-national\" | \"transaction-amount\" | \"transaction-currency\" | \"url\" | \"username\"",
                    "references": {
                        "AutocompleteTypes": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::AutocompleteTypes",
                            "referenceLocation": "AutocompleteTypes"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Indicates whether the value of the control can be automatically completed by the browser."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "autocomplete",
                "defaultValue": "'off'"
            },
            "autocorrect": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'on' | 'off'",
                    "resolved": "\"off\" | \"on\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether auto correction should be enabled when the user is entering/editing the text value."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "autocorrect",
                "defaultValue": "'off'"
            },
            "autofocus": {
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
                    "text": "Sets the [`autofocus` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus) on the native input element.\n\nThis may not be sufficient for the element to be focused on page load. See [managing focus](/docs/developing/managing-focus) for more information."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "autofocus",
                "defaultValue": "false"
            },
            "clearInput": {
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
                    "text": "If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "clear-input",
                "defaultValue": "false"
            },
            "clearInputIcon": {
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
                    "text": "The icon to use for the clear button. Only applies when `clearInput` is set to `true`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "clear-input-icon"
            },
            "clearOnEdit": {
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
                    "text": "If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `\"password\"`, `false` for all other types."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "clear-on-edit"
            },
            "counter": {
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
                    "text": "If `true`, a character counter will display the ratio of characters used and the total character limit. Developers must also set the `maxlength` property for the counter to be calculated correctly."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "counter",
                "defaultValue": "false"
            },
            "counterFormatter": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "(inputLength: number, maxLength: number) => string",
                    "resolved": "((inputLength: number, maxLength: number) => string) | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "A callback used to format the counter text.\nBy default the counter text is set to \"itemLength / maxLength\".\n\nSee https://ionicframework.com/docs/troubleshooting/runtime#accessing-this\nif you need to access `this` from within the callback."
                },
                "getter": false,
                "setter": false
            },
            "debounce": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Set the amount of time, in milliseconds, to wait to trigger the `ionInput` event after each keystroke."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "debounce"
            },
            "disabled": {
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
                    "text": "If `true`, the user cannot interact with the input."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "enterkeyhint": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'",
                    "resolved": "\"done\" | \"enter\" | \"go\" | \"next\" | \"previous\" | \"search\" | \"send\" | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "A hint to the browser for which enter key to display.\nPossible values: `\"enter\"`, `\"done\"`, `\"go\"`, `\"next\"`,\n`\"previous\"`, `\"search\"`, and `\"send\"`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "enterkeyhint"
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
                    "text": "Text that is placed under the input and displayed when an error is detected."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "error-text"
            },
            "fill": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'outline' | 'solid'",
                    "resolved": "\"outline\" | \"solid\" | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The fill for the item. If `\"solid\"` the item will have a background. If\n`\"outline\"` the item will be transparent with a border. Only available in `md` mode."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "fill"
            },
            "inputmode": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'",
                    "resolved": "\"decimal\" | \"email\" | \"none\" | \"numeric\" | \"search\" | \"tel\" | \"text\" | \"url\" | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "A hint to the browser for which keyboard to display.\nPossible values: `\"none\"`, `\"text\"`, `\"tel\"`, `\"url\"`,\n`\"email\"`, `\"numeric\"`, `\"decimal\"`, and `\"search\"`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "inputmode"
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
                    "text": "Text that is placed under the input and displayed when no error is detected."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "helper-text"
            },
            "label": {
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
                    "text": "The visible label associated with the input.\n\nUse this if you need to render a plaintext label.\n\nThe `label` property will take priority over the `label` slot if both are used."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label"
            },
            "labelPlacement": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'start' | 'end' | 'floating' | 'stacked' | 'fixed'",
                    "resolved": "\"end\" | \"fixed\" | \"floating\" | \"stacked\" | \"start\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Where to place the label relative to the input.\n`\"start\"`: The label will appear to the left of the input in LTR and to the right in RTL.\n`\"end\"`: The label will appear to the right of the input in LTR and to the left in RTL.\n`\"floating\"`: The label will appear smaller and above the input when the input is focused or it has a value. Otherwise it will appear on top of the input.\n`\"stacked\"`: The label will appear smaller and above the input regardless even when the input is blurred or has no value.\n`\"fixed\"`: The label has the same behavior as `\"start\"` except it also has a fixed width. Long text will be truncated with ellipses (\"...\")."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label-placement",
                "defaultValue": "'start'"
            },
            "max": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "string | number",
                    "resolved": "number | string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The maximum value, which must not be less than its minimum (min attribute) value."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "max"
            },
            "maxlength": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "maxlength"
            },
            "min": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "string | number",
                    "resolved": "number | string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The minimum value, which must not be greater than its maximum (max attribute) value."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "min"
            },
            "minlength": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "minlength"
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
                    "text": "If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `\"email\"`, otherwise it is ignored."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "multiple"
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
            "pattern": {
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
                    "text": "A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `\"text\"`, `\"search\"`, `\"tel\"`, `\"url\"`, `\"email\"`, `\"date\"`, or `\"password\"`, otherwise it is ignored. When the type attribute is `\"date\"`, `pattern` will only be used in browsers that do not support the `\"date\"` input type natively. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for more information."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "pattern"
            },
            "placeholder": {
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
                    "text": "Instructional text that shows before the input has a value.\nThis property applies only when the `type` property is set to `\"email\"`,\n`\"number\"`, `\"password\"`, `\"search\"`, `\"tel\"`, `\"text\"`, or `\"url\"`, otherwise it is ignored."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "placeholder"
            },
            "readonly": {
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
                    "text": "If `true`, the user cannot modify the value."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "attribute": "readonly",
                "defaultValue": "false"
            },
            "required": {
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
                    "text": "If `true`, the user must fill in a value before submitting a form."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "required",
                "defaultValue": "false"
            },
            "shape": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'round'",
                    "resolved": "\"round\" | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The shape of the input. If \"round\" it will have an increased border radius."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "shape"
            },
            "spellcheck": {
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
                    "text": "If `true`, the element will have its spelling and grammar checked."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "spellcheck",
                "defaultValue": "false"
            },
            "step": {
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
                    "text": "Works with the min and max attributes to limit the increments at which a value can be set.\nPossible values are: `\"any\"` or a positive floating point number."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "step"
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "TextFieldTypes",
                    "resolved": "\"date\" | \"datetime-local\" | \"email\" | \"month\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"time\" | \"url\" | \"week\"",
                    "references": {
                        "TextFieldTypes": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::TextFieldTypes",
                            "referenceLocation": "TextFieldTypes"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The type of control to display. The default type is text."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "type",
                "defaultValue": "'text'"
            },
            "value": {
                "type": "any",
                "mutable": true,
                "complexType": {
                    "original": "string | number | null",
                    "resolved": "null | number | string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The value of the input."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value",
                "defaultValue": "''"
            }
        };
    }
    static get states() {
        return {
            "hasFocus": {},
            "isInvalid": {}
        };
    }
    static get events() {
        return [{
                "method": "ionInput",
                "name": "ionInput",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "The `ionInput` event is fired each time the user modifies the input's value.\nUnlike the `ionChange` event, the `ionInput` event is fired for each alteration\nto the input's value. This typically happens for each keystroke as the user types.\n\nFor elements that accept text input (`type=text`, `type=tel`, etc.), the interface\nis [`InputEvent`](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent); for others,\nthe interface is [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event). If\nthe input is cleared on edit, the type is `null`."
                },
                "complexType": {
                    "original": "InputInputEventDetail",
                    "resolved": "InputInputEventDetail",
                    "references": {
                        "InputInputEventDetail": {
                            "location": "import",
                            "path": "./input-interface",
                            "id": "src/components/input/input-interface.ts::InputInputEventDetail",
                            "referenceLocation": "InputInputEventDetail"
                        }
                    }
                }
            }, {
                "method": "ionChange",
                "name": "ionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "The `ionChange` event is fired when the user modifies the input's value.\nUnlike the `ionInput` event, the `ionChange` event is only fired when changes\nare committed, not as the user types.\n\nDepending on the way the users interacts with the element, the `ionChange`\nevent fires at a different moment:\n- When the user commits the change explicitly (e.g. by selecting a date\nfrom a date picker for `<ion-input type=\"date\">`, pressing the \"Enter\" key, etc.).\n- When the element loses focus after its value has changed: for elements\nwhere the user's interaction is typing.\n\nThis event will not emit when programmatically setting the `value` property."
                },
                "complexType": {
                    "original": "InputChangeEventDetail",
                    "resolved": "InputChangeEventDetail",
                    "references": {
                        "InputChangeEventDetail": {
                            "location": "import",
                            "path": "./input-interface",
                            "id": "src/components/input/input-interface.ts::InputChangeEventDetail",
                            "referenceLocation": "InputChangeEventDetail"
                        }
                    }
                }
            }, {
                "method": "ionBlur",
                "name": "ionBlur",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the input loses focus."
                },
                "complexType": {
                    "original": "FocusEvent",
                    "resolved": "FocusEvent",
                    "references": {
                        "FocusEvent": {
                            "location": "global",
                            "id": "global::FocusEvent"
                        }
                    }
                }
            }, {
                "method": "ionFocus",
                "name": "ionFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the input has focus."
                },
                "complexType": {
                    "original": "FocusEvent",
                    "resolved": "FocusEvent",
                    "references": {
                        "FocusEvent": {
                            "location": "global",
                            "id": "global::FocusEvent"
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
                    "text": "Sets focus on the native `input` in `ion-input`. Use this method instead of the global\n`input.focus()`.\n\nDevelopers who wish to focus an input when a page enters\nshould call `setFocus()` in the `ionViewDidEnter()` lifecycle method.\n\nDevelopers who wish to focus an input when an overlay is presented\nshould call `setFocus` after `didPresent` has resolved.\n\nSee [managing focus](/docs/developing/managing-focus) for more information.",
                    "tags": []
                }
            },
            "getInputElement": {
                "complexType": {
                    "signature": "() => Promise<HTMLInputElement>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLInputElement": {
                            "location": "global",
                            "id": "global::HTMLInputElement"
                        }
                    },
                    "return": "Promise<HTMLInputElement>"
                },
                "docs": {
                    "text": "Returns the native `<input>` element used under the hood.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "debounce",
                "methodName": "debounceChanged"
            }, {
                "propName": "type",
                "methodName": "onTypeChange"
            }, {
                "propName": "value",
                "methodName": "valueChanged"
            }, {
                "propName": "dir",
                "methodName": "onDirChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClickCapture",
                "target": undefined,
                "capture": true,
                "passive": false
            }];
    }
}
let inputIds = 0;
