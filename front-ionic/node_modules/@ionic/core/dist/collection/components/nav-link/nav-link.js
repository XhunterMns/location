/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { navLink } from "./nav-link-utils";
export class NavLink {
    constructor() {
        /**
         * The transition direction when navigating to another page.
         */
        this.routerDirection = 'forward';
        this.onClick = () => {
            return navLink(this.el, this.routerDirection, this.component, this.componentProps, this.routerAnimation);
        };
    }
    render() {
        return h(Host, { key: 'd4d80feb51c0d92b0bedf6952c892f9df3002046', onClick: this.onClick });
    }
    static get is() { return "ion-nav-link"; }
    static get properties() {
        return {
            "component": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "NavComponent",
                    "resolved": "Function | HTMLElement | ViewController | null | string | undefined",
                    "references": {
                        "NavComponent": {
                            "location": "import",
                            "path": "../nav/nav-interface",
                            "id": "src/components/nav/nav-interface.ts::NavComponent",
                            "referenceLocation": "NavComponent"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Component to navigate to. Only used if the `routerDirection` is `\"forward\"` or `\"root\"`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "component"
            },
            "componentProps": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "ComponentProps",
                    "resolved": "T | undefined",
                    "references": {
                        "ComponentProps": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::ComponentProps",
                            "referenceLocation": "ComponentProps"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Data you want to pass to the component as props. Only used if the `\"routerDirection\"` is `\"forward\"` or `\"root\"`."
                },
                "getter": false,
                "setter": false
            },
            "routerDirection": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "RouterDirection",
                    "resolved": "\"back\" | \"forward\" | \"root\"",
                    "references": {
                        "RouterDirection": {
                            "location": "import",
                            "path": "../router/utils/interface",
                            "id": "src/components/router/utils/interface.ts::RouterDirection",
                            "referenceLocation": "RouterDirection"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The transition direction when navigating to another page."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "router-direction",
                "defaultValue": "'forward'"
            },
            "routerAnimation": {
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
                    "text": "The transition animation when navigating to another page."
                },
                "getter": false,
                "setter": false
            }
        };
    }
    static get elementRef() { return "el"; }
}
