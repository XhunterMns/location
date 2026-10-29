/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
export class SegmentContent {
    render() {
        return (h(Host, { key: '665f41a854621f898eaf7ba9a49e77cc9326501e' }, h("slot", { key: '635aa57fbf6167dcd36fe8dc5dfc1c313637ac04' })));
    }
    static get is() { return "ion-segment-content"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["segment-content.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["segment-content.css"]
        };
    }
}
