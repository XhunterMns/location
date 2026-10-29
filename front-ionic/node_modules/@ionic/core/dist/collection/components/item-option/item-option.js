/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { createColorClasses } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot start - Content is placed to the left of the option text in LTR, and to the right in RTL.
 * @slot top - Content is placed above the option text.
 * @slot icon-only - Should be used on an icon in an option that has no text.
 * @slot bottom - Content is placed below the option text.
 * @slot end - Content is placed to the right of the option text in LTR, and to the left in RTL.
 *
 * @part native - The native HTML button or anchor element that wraps all child elements.
 * @part inner - The inner wrapper element that arranges the option content.
 * @part container - The container element that wraps the start, icon-only, default, and end slots.
 */
export class ItemOption {
    constructor() {
        /**
         * If `true`, the user cannot interact with the item option.
         */
        this.disabled = false;
        /**
         * If `true`, the option will expand to take up the available width and cover any other options.
         */
        this.expandable = false;
        /**
         * The type of the button.
         */
        this.type = 'button';
        this.onClick = (ev) => {
            const el = ev.target.closest('ion-item-option');
            if (el) {
                ev.preventDefault();
            }
        };
    }
    render() {
        const { disabled, expandable, href } = this;
        const TagType = href === undefined ? 'button' : 'a';
        const mode = getIonMode(this);
        const attrs = TagType === 'button'
            ? { type: this.type }
            : {
                download: this.download,
                href: this.href,
                target: this.target,
            };
        return (h(Host, { key: 'b576e8f449ee9a03e659abd923421b051f7427c8', onClick: this.onClick, class: createColorClasses(this.color, {
                [mode]: true,
                'item-option-disabled': disabled,
                'item-option-expandable': expandable,
                'ion-activatable': true,
            }) }, h(TagType, Object.assign({ key: '568c7de194ecef7d1efec2abdf855b3fce71aa03' }, attrs, { class: "button-native", part: "native", disabled: disabled }), h("span", { key: 'fe1a494a40febc5c415098d8c9b2edad9fac02c9', class: "button-inner", part: "inner" }, h("slot", { key: '8e4ec73c1a9c047a29dac8ad09ff1cce94a751c7', name: "top" }), h("div", { key: '7828c6413d2cab692a3a2e5aa2a17240e0dcb230', class: "horizontal-wrapper", part: "container" }, h("slot", { key: 'c8eb9881db296280ba895ab249e5d1bb3fc27206', name: "start" }), h("slot", { key: '144b18f7ea90a45abbe0b1fa878c87e623897b7b', name: "icon-only" }), h("slot", { key: '6c63ebad29552a32e1ed9ca3c95aa005b35b9b86' }), h("slot", { key: '99478d52600bf32342649a2f74ed8e1eb07407d4', name: "end" })), h("slot", { key: '00247fc54e61cface4e6ac6e8ea05a0685f5e26e', name: "bottom" })), mode === 'md' && h("ion-ripple-effect", { key: 'dc5057f2ff0926b2e5fd1520fed6cf7dc3197cf8' }))));
    }
    static get is() { return "ion-item-option"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["item-option.ios.scss"],
            "md": ["item-option.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["item-option.ios.css"],
            "md": ["item-option.md.css"]
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
                    "text": "If `true`, the user cannot interact with the item option."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "download": {
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
                    "text": "This attribute instructs browsers to download a URL instead of navigating to\nit, so the user will be prompted to save it as a local file. If the attribute\nhas a value, it is used as the pre-filled file name in the Save prompt\n(the user can still change the file name if they want)."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "download"
            },
            "expandable": {
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
                    "text": "If `true`, the option will expand to take up the available width and cover any other options."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "expandable",
                "defaultValue": "false"
            },
            "href": {
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
                    "text": "Contains a URL or a URL fragment that the hyperlink points to.\nIf this property is set, an anchor tag will be rendered."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "href"
            },
            "rel": {
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
                    "text": "Specifies the relationship of the target object to the link object.\nThe value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "rel"
            },
            "target": {
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
                    "text": "Specifies where to display the linked URL.\nOnly applies when an `href` is provided.\nSpecial keywords: `\"_blank\"`, `\"_self\"`, `\"_parent\"`, `\"_top\"`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "target"
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'submit' | 'reset' | 'button'",
                    "resolved": "\"button\" | \"reset\" | \"submit\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The type of the button."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "type",
                "defaultValue": "'button'"
            }
        };
    }
    static get elementRef() { return "el"; }
}
