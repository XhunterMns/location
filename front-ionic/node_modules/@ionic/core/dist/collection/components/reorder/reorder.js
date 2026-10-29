/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { reorderThreeOutline, reorderTwoSharp } from "ionicons/icons";
import { getIonMode } from "../../global/ionic-global";
/**
 * @part icon - The icon of the reorder handle (uses ion-icon).
 */
export class Reorder {
    onClick(ev) {
        const reorderGroup = this.el.closest('ion-reorder-group');
        ev.preventDefault();
        // Only stop event propagation if the reorder is inside of an enabled
        // reorder group. This allows interaction with clickable children components.
        if (!reorderGroup || !reorderGroup.disabled) {
            ev.stopImmediatePropagation();
        }
    }
    render() {
        const mode = getIonMode(this);
        const reorderIcon = mode === 'ios' ? reorderThreeOutline : reorderTwoSharp;
        return (h(Host, { key: 'b869db61ca6393cf1476f2111a66b387b567c6d1', class: mode }, h("slot", { key: 'a78edd1776835282b8b5c841377018f36c83296c' }, h("ion-icon", { key: '7fb067c47bbb9a7258e5063f028282cc097d0f94', icon: reorderIcon, lazy: false, class: "reorder-icon", part: "icon", "aria-hidden": "true" }))));
    }
    static get is() { return "ion-reorder"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["reorder.ios.scss"],
            "md": ["reorder.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["reorder.ios.css"],
            "md": ["reorder.md.css"]
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick",
                "target": undefined,
                "capture": true,
                "passive": false
            }];
    }
}
