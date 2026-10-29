/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { inheritAttributes } from "../../utils/helpers";
import { createColorClasses } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
export class PickerColumnOption {
    constructor() {
        /**
         * We keep track of the parent picker column
         * so we can update the value of it when
         * clicking an enable option.
         */
        this.pickerColumn = null;
        /**
         * The aria-label of the option.
         *
         * If the value changes, then it will trigger a
         * re-render of the picker since it's a @State variable.
         * Otherwise, the `aria-label` attribute cannot be updated
         * after the component is loaded.
         */
        this.ariaLabel = null;
        /**
         * If `true`, the user cannot interact with the picker column option.
         */
        this.disabled = false;
        /**
         * The color to use from your application's color palette.
         * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
         * For more information on colors, see [theming](/docs/theming/basics).
         */
        this.color = 'primary';
    }
    /**
     * The aria-label of the option has changed after the
     * first render and needs to be updated within the component.
     *
     * @param ariaLbl The new aria-label value.
     */
    onAriaLabelChange(ariaLbl) {
        this.ariaLabel = ariaLbl;
    }
    componentWillLoad() {
        const inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
        /**
         * The initial value of `aria-label` needs to be set for
         * the first render.
    
         */
        this.ariaLabel = inheritedAttributes['aria-label'] || null;
    }
    connectedCallback() {
        this.pickerColumn = this.el.closest('ion-picker-column');
    }
    disconnectedCallback() {
        this.pickerColumn = null;
    }
    /**
     * The column options can load at any time
     * so the options needs to tell the
     * parent picker column when it is loaded
     * so the picker column can ensure it is
     * centered in the view.
     *
     * We intentionally run this for every
     * option. If we only ran this from
     * the selected option then if the newly
     * loaded options were not selected then
     * scrollActiveItemIntoView would not be called.
     */
    componentDidLoad() {
        const { pickerColumn } = this;
        if (pickerColumn !== null) {
            pickerColumn.scrollActiveItemIntoView();
        }
    }
    /**
     * When an option is clicked, update the
     * parent picker column value. This
     * component will handle centering the option
     * in the column view.
     */
    onClick() {
        const { pickerColumn } = this;
        if (pickerColumn !== null) {
            pickerColumn.setValue(this.value);
        }
    }
    render() {
        const { color, disabled, ariaLabel } = this;
        const mode = getIonMode(this);
        return (h(Host, { key: 'c45a1c14a351bf57d7113671164852349be5aa8a', class: createColorClasses(color, {
                [mode]: true,
                ['option-disabled']: disabled,
            }) }, h("div", { key: '824930b658c6e3fb493ac4c6c2451d38c6bc4829', class: 'picker-column-option-button', role: "button", "aria-label": ariaLabel, onClick: () => this.onClick() }, h("slot", { key: '019df4dcf46e629bdbebcd46ed3ab29669feab27' }))));
    }
    static get is() { return "ion-picker-column-option"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["picker-column-option.ios.scss"],
            "md": ["picker-column-option.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["picker-column-option.ios.css"],
            "md": ["picker-column-option.md.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "If `true`, the user cannot interact with the picker column option."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "value": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "any | null",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The text value of the option."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value"
            },
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
                "attribute": "color",
                "defaultValue": "'primary'"
            }
        };
    }
    static get states() {
        return {
            "ariaLabel": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "aria-label",
                "methodName": "onAriaLabelChange"
            }];
    }
}
