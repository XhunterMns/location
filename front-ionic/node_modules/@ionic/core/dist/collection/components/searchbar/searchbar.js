/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, forceUpdate, h } from "@stencil/core";
import { debounceEvent, raf, componentOnReady, inheritAttributes } from "../../utils/helpers";
import { isRTL } from "../../utils/rtl/index";
import { createColorClasses } from "../../utils/theme";
import { arrowBackSharp, closeCircle, closeSharp, searchOutline, searchSharp } from "ionicons/icons";
import { config } from "../../global/config";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export class Searchbar {
    constructor() {
        this.isCancelVisible = false;
        this.shouldAlignLeft = true;
        this.inputId = `ion-searchbar-${searchbarIds++}`;
        this.inheritedAttributes = {};
        this.focused = false;
        this.noAnimate = true;
        /**
         * If `true`, enable searchbar animation.
         */
        this.animated = false;
        /**
         * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
         * Available options: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`.
         */
        this.autocapitalize = 'off';
        /**
         * Set the input's autocomplete property.
         */
        this.autocomplete = 'off';
        /**
         * Set the input's autocorrect property.
         */
        this.autocorrect = 'off';
        /**
         * Set the cancel button icon. Only applies to `md` mode.
         * Defaults to `arrow-back-sharp`.
         */
        this.cancelButtonIcon = config.get('backButtonIcon', arrowBackSharp);
        /**
         * Set the cancel button text. Only applies to `ios` mode.
         */
        this.cancelButtonText = 'Cancel';
        /**
         * If `true`, the user cannot interact with the input.
         */
        this.disabled = false;
        /**
         * If used in a form, set the name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * Set the input's placeholder.
         * `placeholder` can accept either plaintext or HTML as a string.
         * To display characters normally reserved for HTML, they
         * must be escaped. For example `<Ionic>` would become
         * `&lt;Ionic&gt;`
         *
         * For more information: [Security Documentation](https://ionicframework.com/docs/faq/security)
         */
        this.placeholder = 'Search';
        /**
         * Sets the behavior for the cancel button. Defaults to `"never"`.
         * Setting to `"focus"` shows the cancel button on focus.
         * Setting to `"never"` hides the cancel button.
         * Setting to `"always"` shows the cancel button regardless
         * of focus state.
         */
        this.showCancelButton = 'never';
        /**
         * Sets the behavior for the clear button. Defaults to `"focus"`.
         * Setting to `"focus"` shows the clear button on focus if the
         * input is not empty.
         * Setting to `"never"` hides the clear button.
         * Setting to `"always"` shows the clear button regardless
         * of focus state, but only if the input is not empty.
         */
        this.showClearButton = 'always';
        /**
         * If `true`, enable spellcheck on the input.
         */
        this.spellcheck = false;
        /**
         * Set the type of the input.
         */
        this.type = 'search';
        /**
         * the value of the searchbar.
         */
        this.value = '';
        /**
         * Clears the input field and triggers the control change.
         */
        this.onClearInput = async (shouldFocus) => {
            if (this.clearTimeout) {
                clearTimeout(this.clearTimeout);
            }
            this.ionClear.emit();
            return new Promise((resolve) => {
                // setTimeout() fixes https://github.com/ionic-team/ionic-framework/issues/7527
                // wait for 4 frames
                this.clearTimeout = setTimeout(() => {
                    const value = this.getValue();
                    if (value !== '') {
                        this.value = '';
                        this.emitInputChange();
                        /**
                         * When tapping clear button
                         * ensure input is focused after
                         * clearing input so users
                         * can quickly start typing.
                         */
                        if (shouldFocus && !this.focused) {
                            this.setFocus();
                            /**
                             * The setFocus call above will clear focusedValue,
                             * but ionChange will never have gotten a chance to
                             * fire. Manually revert focusedValue so onBlur can
                             * compare against what was in the box before the clear.
                             */
                            this.focusedValue = value;
                        }
                    }
                    resolve();
                }, 16 * 4);
            });
        };
        /**
         * Clears the input field and tells the input to blur since
         * the clearInput function doesn't want the input to blur
         * then calls the custom cancel function if the user passed one in.
         */
        this.onCancelSearchbar = async (ev) => {
            if (ev) {
                ev.preventDefault();
                ev.stopPropagation();
            }
            this.ionCancel.emit();
            // get cached values before clearing the input
            const value = this.getValue();
            const focused = this.focused;
            await this.onClearInput();
            /**
             * If there used to be something in the box, and we weren't focused
             * beforehand (meaning no blur fired that would already handle this),
             * manually fire ionChange.
             */
            if (value && !focused) {
                this.emitValueChange(ev);
            }
            if (this.nativeInput) {
                this.nativeInput.blur();
            }
        };
        /**
         * Update the Searchbar input value when the input changes
         */
        this.onInput = (ev) => {
            const input = ev.target;
            if (input) {
                this.value = input.value;
            }
            this.emitInputChange(ev);
        };
        this.onChange = (ev) => {
            this.emitValueChange(ev);
        };
        /**
         * Sets the Searchbar to not focused and checks if it should align left
         * based on whether there is a value in the searchbar or not.
         */
        this.onBlur = (ev) => {
            this.focused = false;
            this.ionBlur.emit();
            this.positionElements();
            if (this.focusedValue !== this.value) {
                this.emitValueChange(ev);
            }
            this.focusedValue = undefined;
        };
        /**
         * Sets the Searchbar to focused and active on input focus.
         */
        this.onFocus = () => {
            this.focused = true;
            this.focusedValue = this.value;
            this.ionFocus.emit();
            this.positionElements();
        };
    }
    /**
     * lang and dir are globally enumerated attributes.
     * As a result, creating these as properties
     * can have unintended side effects. Instead, we
     * listen for attribute changes and inherit them
     * to the inner `<input>` element.
     */
    onLangChanged(newValue) {
        this.inheritedAttributes = Object.assign(Object.assign({}, this.inheritedAttributes), { lang: newValue });
        forceUpdate(this);
    }
    onDirChanged(newValue) {
        this.inheritedAttributes = Object.assign(Object.assign({}, this.inheritedAttributes), { dir: newValue });
        forceUpdate(this);
    }
    debounceChanged() {
        const { ionInput, debounce, originalIonInput } = this;
        /**
         * If debounce is undefined, we have to manually revert the ionInput emitter in case
         * debounce used to be set to a number. Otherwise, the event would stay debounced.
         */
        this.ionInput = debounce === undefined ? originalIonInput !== null && originalIonInput !== void 0 ? originalIonInput : ionInput : debounceEvent(ionInput, debounce);
    }
    valueChanged() {
        const inputEl = this.nativeInput;
        const value = this.getValue();
        if (inputEl && inputEl.value !== value) {
            inputEl.value = value;
        }
    }
    showCancelButtonChanged() {
        requestAnimationFrame(() => {
            this.positionElements();
            forceUpdate(this);
        });
    }
    connectedCallback() {
        this.emitStyle();
    }
    componentWillLoad() {
        this.inheritedAttributes = Object.assign({}, inheritAttributes(this.el, ['lang', 'dir']));
    }
    componentDidLoad() {
        this.originalIonInput = this.ionInput;
        this.positionElements();
        this.debounceChanged();
        this.loadTimeout = setTimeout(() => {
            this.noAnimate = false;
        }, 300);
    }
    disconnectedCallback() {
        var _a;
        if (this.loadTimeout) {
            clearTimeout(this.loadTimeout);
        }
        if (this.clearTimeout) {
            clearTimeout(this.clearTimeout);
        }
        (_a = this.searchIconResizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    emitStyle() {
        this.ionStyle.emit({
            searchbar: true,
        });
    }
    /**
     * Sets focus on the native `input` in `ion-searchbar`. Use this method instead of the global
     * `input.focus()`.
     * Developers who wish to focus an input when a page enters
     * should call `setFocus()` in the `ionViewDidEnter()` lifecycle method.
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
        this.ionInput.emit({ value, event });
    }
    /**
     * Positions the input search icon, placeholder, and the cancel button
     * based on the input value and if it is focused. (ios only)
     */
    positionElements() {
        const value = this.getValue();
        const prevAlignLeft = this.shouldAlignLeft;
        const mode = getIonMode(this);
        const shouldAlignLeft = !this.animated || value.trim() !== '' || !!this.focused;
        this.shouldAlignLeft = shouldAlignLeft;
        if (mode !== 'ios') {
            return;
        }
        if (prevAlignLeft !== shouldAlignLeft) {
            this.positionPlaceholder();
        }
        if (this.animated) {
            this.positionCancelButton();
        }
    }
    /**
     * Positions the input placeholder
     */
    positionPlaceholder() {
        const inputEl = this.nativeInput;
        if (!inputEl) {
            return;
        }
        const rtl = isRTL(this.el);
        const iconEl = (this.el.shadowRoot || this.el).querySelector('.searchbar-search-icon');
        if (this.shouldAlignLeft) {
            inputEl.removeAttribute('style');
            iconEl.removeAttribute('style');
        }
        else {
            // Create a dummy span to get the placeholder width
            const doc = document;
            const tempSpan = doc.createElement('span');
            tempSpan.innerText = this.placeholder || '';
            doc.body.appendChild(tempSpan);
            // Get the width of the span then remove it
            raf(() => {
                var _a, _b;
                const textWidth = tempSpan.offsetWidth;
                tempSpan.remove();
                // Calculate the input padding
                const inputLeft = 'calc(50% - ' + textWidth / 2 + 'px)';
                // Calculate the icon margin
                /**
                 * We take the icon width to account
                 * for any text scales applied to the icon
                 * such as Dynamic Type on iOS as well as 8px
                 * of padding.
                 */
                const iconWidth = iconEl.clientWidth;
                /**
                 * Fix for https://github.com/ionic-team/ionic-framework/issues/30434:
                 * iconEl.clientWidth can very briefly be 0 when this is called from componentDidLoad.
                 * If it is zero, set up a ResizeObserver and call this function when it observes a width greater than 0.
                 */
                if (iconWidth === 0) {
                    (_a = this.searchIconResizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
                    this.searchIconResizeObserver = new ResizeObserver((entries) => {
                        var _a;
                        if (entries[0].contentRect.width > 0) {
                            (_a = this.searchIconResizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
                            this.positionPlaceholder();
                        }
                    });
                    (_b = this.searchIconResizeObserver) === null || _b === void 0 ? void 0 : _b.observe(iconEl);
                    return;
                }
                const iconLeft = 'calc(50% - ' + (textWidth / 2 + iconWidth + 8) + 'px)';
                // Set the input padding start and icon margin start
                if (rtl) {
                    inputEl.style.paddingRight = inputLeft;
                    iconEl.style.marginRight = iconLeft;
                }
                else {
                    inputEl.style.paddingLeft = inputLeft;
                    iconEl.style.marginLeft = iconLeft;
                }
            });
        }
    }
    /**
     * Show the iOS Cancel button on focus, hide it offscreen otherwise
     */
    positionCancelButton() {
        const rtl = isRTL(this.el);
        const cancelButton = (this.el.shadowRoot || this.el).querySelector('.searchbar-cancel-button');
        const shouldShowCancel = this.shouldShowCancelButton();
        if (cancelButton !== null && shouldShowCancel !== this.isCancelVisible) {
            const cancelStyle = cancelButton.style;
            this.isCancelVisible = shouldShowCancel;
            if (shouldShowCancel) {
                if (rtl) {
                    cancelStyle.marginLeft = '0';
                }
                else {
                    cancelStyle.marginRight = '0';
                }
            }
            else {
                const offset = cancelButton.offsetWidth;
                if (offset > 0) {
                    if (rtl) {
                        cancelStyle.marginLeft = -offset + 'px';
                    }
                    else {
                        cancelStyle.marginRight = -offset + 'px';
                    }
                }
            }
        }
    }
    getValue() {
        return this.value || '';
    }
    hasValue() {
        return this.getValue() !== '';
    }
    /**
     * Determines whether or not the cancel button should be visible onscreen.
     * Cancel button should be shown if one of two conditions applies:
     * 1. `showCancelButton` is set to `always`.
     * 2. `showCancelButton` is set to `focus`, and the searchbar has been focused.
     */
    shouldShowCancelButton() {
        if (this.showCancelButton === 'never' || (this.showCancelButton === 'focus' && !this.focused)) {
            return false;
        }
        return true;
    }
    /**
     * Determines whether or not the clear button should be visible onscreen.
     * Clear button should be shown if one of two conditions applies:
     * 1. `showClearButton` is set to `always`.
     * 2. `showClearButton` is set to `focus`, and the searchbar has been focused.
     */
    shouldShowClearButton() {
        if (this.showClearButton === 'never' || (this.showClearButton === 'focus' && !this.focused)) {
            return false;
        }
        return true;
    }
    render() {
        const { cancelButtonText, autocapitalize } = this;
        const animated = this.animated && config.getBoolean('animated', true);
        const mode = getIonMode(this);
        const clearIcon = this.clearIcon || (mode === 'ios' ? closeCircle : closeSharp);
        const searchIcon = this.searchIcon || (mode === 'ios' ? searchOutline : searchSharp);
        const shouldShowCancelButton = this.shouldShowCancelButton();
        const cancelButton = this.showCancelButton !== 'never' && (h("button", { key: '226b7a676b4819cda4062b8334fa8d4c4cee6f1a', "aria-label": cancelButtonText, "aria-hidden": shouldShowCancelButton ? undefined : 'true', type: "button", tabIndex: mode === 'ios' && !shouldShowCancelButton ? -1 : undefined, onMouseDown: this.onCancelSearchbar, onTouchStart: this.onCancelSearchbar, class: "searchbar-cancel-button" }, h("div", { key: '89adb4efa17a78c973bbd5527cfac91d99ceb9bb', "aria-hidden": "true" }, mode === 'md' ? (h("ion-icon", { "aria-hidden": "true", mode: mode, icon: this.cancelButtonIcon, lazy: false })) : (cancelButtonText))));
        return (h(Host, { key: '237dd767403dba3cb3d7de8905996e275669da3b', role: "search", "aria-disabled": this.disabled ? 'true' : null, class: createColorClasses(this.color, {
                [mode]: true,
                'searchbar-animated': animated,
                'searchbar-disabled': this.disabled,
                'searchbar-no-animate': animated && this.noAnimate,
                'searchbar-has-value': this.hasValue(),
                'searchbar-left-aligned': this.shouldAlignLeft,
                'searchbar-has-focus': this.focused,
                'searchbar-should-show-clear': this.shouldShowClearButton(),
                'searchbar-should-show-cancel': this.shouldShowCancelButton(),
            }) }, h("div", { key: '5b4bdf7280bea710304b6975e76390fe6ceb7417', class: "searchbar-input-container" }, h("input", Object.assign({ key: '01a0820a2cf904aec1c7d84b542ab7918d435632', "aria-label": "search text", disabled: this.disabled, ref: (el) => (this.nativeInput = el), class: "searchbar-input", inputMode: this.inputmode, enterKeyHint: this.enterkeyhint, name: this.name, onInput: this.onInput, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, minLength: this.minlength, maxLength: this.maxlength, placeholder: this.placeholder, type: this.type, value: this.getValue(), autoCapitalize: autocapitalize === 'default' ? undefined : autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, spellcheck: this.spellcheck }, this.inheritedAttributes)), mode === 'md' && cancelButton, h("ion-icon", { key: 'cd64973206b1cc59d221112861733b7ee25f0323', "aria-hidden": "true", mode: mode, icon: searchIcon, lazy: false, class: "searchbar-search-icon" }), h("button", { key: '2061fa8449bbc576cf8c5130ea613378ea492944', "aria-label": "reset", type: "button", "no-blur": true, class: "searchbar-clear-button", onPointerDown: (ev) => {
                /**
                 * This prevents mobile browsers from
                 * blurring the input when the clear
                 * button is activated.
                 */
                ev.preventDefault();
            }, onClick: () => this.onClearInput(true) }, h("ion-icon", { key: '00df6f7742bff70b1b088d544b8c00e962e7216c', "aria-hidden": "true", mode: mode, icon: clearIcon, lazy: false, class: "searchbar-clear-icon" }))), mode === 'ios' && cancelButton));
    }
    static get is() { return "ion-searchbar"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "ios": ["searchbar.ios.scss"],
            "md": ["searchbar.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["searchbar.ios.css"],
            "md": ["searchbar.md.css"]
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
                    "text": "If `true`, enable searchbar animation."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "animated",
                "defaultValue": "false"
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
                    "text": "Set the input's autocomplete property."
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
                    "text": "Set the input's autocorrect property."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "autocorrect",
                "defaultValue": "'off'"
            },
            "cancelButtonIcon": {
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
                    "text": "Set the cancel button icon. Only applies to `md` mode.\nDefaults to `arrow-back-sharp`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "cancel-button-icon",
                "defaultValue": "config.get('backButtonIcon', arrowBackSharp) as string"
            },
            "cancelButtonText": {
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
                    "text": "Set the cancel button text. Only applies to `ios` mode."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "cancel-button-text",
                "defaultValue": "'Cancel'"
            },
            "clearIcon": {
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
                    "text": "Set the clear icon. Defaults to `close-circle` for `ios` and `close-sharp` for `md`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "clear-icon"
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
                "reflect": false,
                "attribute": "disabled",
                "defaultValue": "false"
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
                    "text": "This attribute specifies the maximum number of characters that the user can enter."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "maxlength"
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
                    "text": "This attribute specifies the minimum number of characters that the user can enter."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "minlength"
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
                    "text": "If used in a form, set the name of the control, which is submitted with the form data."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "name",
                "defaultValue": "this.inputId"
            },
            "placeholder": {
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
                    "text": "Set the input's placeholder.\n`placeholder` can accept either plaintext or HTML as a string.\nTo display characters normally reserved for HTML, they\nmust be escaped. For example `<Ionic>` would become\n`&lt;Ionic&gt;`\n\nFor more information: [Security Documentation](https://ionicframework.com/docs/faq/security)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "placeholder",
                "defaultValue": "'Search'"
            },
            "searchIcon": {
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
                    "text": "The icon to use as the search icon. Defaults to `search-outline` in\n`ios` mode and `search-sharp` in `md` mode."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "search-icon"
            },
            "showCancelButton": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'never' | 'focus' | 'always'",
                    "resolved": "\"always\" | \"focus\" | \"never\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets the behavior for the cancel button. Defaults to `\"never\"`.\nSetting to `\"focus\"` shows the cancel button on focus.\nSetting to `\"never\"` hides the cancel button.\nSetting to `\"always\"` shows the cancel button regardless\nof focus state."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "show-cancel-button",
                "defaultValue": "'never'"
            },
            "showClearButton": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'never' | 'focus' | 'always'",
                    "resolved": "\"always\" | \"focus\" | \"never\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets the behavior for the clear button. Defaults to `\"focus\"`.\nSetting to `\"focus\"` shows the clear button on focus if the\ninput is not empty.\nSetting to `\"never\"` hides the clear button.\nSetting to `\"always\"` shows the clear button regardless\nof focus state, but only if the input is not empty."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "show-clear-button",
                "defaultValue": "'always'"
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
                    "text": "If `true`, enable spellcheck on the input."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "spellcheck",
                "defaultValue": "false"
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'",
                    "resolved": "\"email\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"url\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Set the type of the input."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "type",
                "defaultValue": "'search'"
            },
            "value": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string | null",
                    "resolved": "null | string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "the value of the searchbar."
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
            "focused": {},
            "noAnimate": {}
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
                    "text": "Emitted when the `value` of the `ion-searchbar` element has changed."
                },
                "complexType": {
                    "original": "SearchbarInputEventDetail",
                    "resolved": "SearchbarInputEventDetail",
                    "references": {
                        "SearchbarInputEventDetail": {
                            "location": "import",
                            "path": "./searchbar-interface",
                            "id": "src/components/searchbar/searchbar-interface.ts::SearchbarInputEventDetail",
                            "referenceLocation": "SearchbarInputEventDetail"
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
                    "text": "The `ionChange` event is fired for `<ion-searchbar>` elements when the user\nmodifies the element's value. Unlike the `ionInput` event, the `ionChange`\nevent is not necessarily fired for each alteration to an element's value.\n\nThe `ionChange` event is fired when the value has been committed\nby the user. This can happen when the element loses focus or\nwhen the \"Enter\" key is pressed. `ionChange` can also fire\nwhen clicking the clear or cancel buttons.\n\nThis event will not emit when programmatically setting the `value` property."
                },
                "complexType": {
                    "original": "SearchbarChangeEventDetail",
                    "resolved": "SearchbarChangeEventDetail",
                    "references": {
                        "SearchbarChangeEventDetail": {
                            "location": "import",
                            "path": "./searchbar-interface",
                            "id": "src/components/searchbar/searchbar-interface.ts::SearchbarChangeEventDetail",
                            "referenceLocation": "SearchbarChangeEventDetail"
                        }
                    }
                }
            }, {
                "method": "ionCancel",
                "name": "ionCancel",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the cancel button is clicked."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "ionClear",
                "name": "ionClear",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the clear input button is clicked."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
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
                    "original": "void",
                    "resolved": "void",
                    "references": {}
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
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "ionStyle",
                "name": "ionStyle",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": "Emitted when the styles change."
                },
                "complexType": {
                    "original": "StyleEventDetail",
                    "resolved": "StyleEventDetail",
                    "references": {
                        "StyleEventDetail": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::StyleEventDetail",
                            "referenceLocation": "StyleEventDetail"
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
                    "text": "Sets focus on the native `input` in `ion-searchbar`. Use this method instead of the global\n`input.focus()`.\nDevelopers who wish to focus an input when a page enters\nshould call `setFocus()` in the `ionViewDidEnter()` lifecycle method.\nDevelopers who wish to focus an input when an overlay is presented\nshould call `setFocus` after `didPresent` has resolved.\n\nSee [managing focus](/docs/developing/managing-focus) for more information.",
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
                "propName": "lang",
                "methodName": "onLangChanged"
            }, {
                "propName": "dir",
                "methodName": "onDirChanged"
            }, {
                "propName": "debounce",
                "methodName": "debounceChanged"
            }, {
                "propName": "value",
                "methodName": "valueChanged"
            }, {
                "propName": "showCancelButton",
                "methodName": "showCancelButtonChanged"
            }];
    }
}
let searchbarIds = 0;
