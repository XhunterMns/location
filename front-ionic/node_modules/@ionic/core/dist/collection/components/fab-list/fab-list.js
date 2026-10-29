/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { getIonMode } from "../../global/ionic-global";
export class FabList {
    constructor() {
        this.activateTimeouts = [];
        /**
         * If `true`, the fab list will show all fab buttons in the list.
         */
        this.activated = false;
        /**
         * The side the fab list will show on relative to the main fab button.
         */
        this.side = 'bottom';
    }
    activatedChanged(activated) {
        this.activateTimeouts.forEach(clearTimeout);
        this.activateTimeouts = [];
        const fabs = Array.from(this.el.querySelectorAll('ion-fab-button'));
        // if showing the fabs add a timeout, else show immediately
        const timeout = activated ? 30 : 0;
        fabs.forEach((fab, i) => {
            this.activateTimeouts.push(setTimeout(() => (fab.show = activated), i * timeout));
        });
    }
    disconnectedCallback() {
        this.activateTimeouts.forEach(clearTimeout);
        this.activateTimeouts = [];
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { key: '03a8920c29a93c6df4bab14753a78a8a30722ce8', class: {
                [mode]: true,
                'fab-list-active': this.activated,
                [`fab-list-side-${this.side}`]: true,
            } }, h("slot", { key: 'd9e1541cb044e209bc2dff14080f3b938a2b84ae' })));
    }
    static get is() { return "ion-fab-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["fab-list.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["fab-list.css"]
        };
    }
    static get properties() {
        return {
            "activated": {
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
                    "text": "If `true`, the fab list will show all fab buttons in the list."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "activated",
                "defaultValue": "false"
            },
            "side": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'start' | 'end' | 'top' | 'bottom'",
                    "resolved": "\"bottom\" | \"end\" | \"start\" | \"top\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The side the fab list will show on relative to the main fab button."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "side",
                "defaultValue": "'bottom'"
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "activated",
                "methodName": "activatedChanged"
            }];
    }
}
