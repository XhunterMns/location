/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { r as registerInstance, h, d as Host } from './index-tcQvqkiX.js';

const segmentContentCss = () => `:host{scroll-snap-align:center;scroll-snap-stop:always;-ms-flex-negative:0;flex-shrink:0;width:100%;min-height:1px;overflow-y:scroll;scrollbar-width:none;-ms-overflow-style:none;}:host::-webkit-scrollbar{display:none}`;

const SegmentContent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { key: '665f41a854621f898eaf7ba9a49e77cc9326501e' }, h("slot", { key: '635aa57fbf6167dcd36fe8dc5dfc1c313637ac04' })));
    }
};
SegmentContent.style = segmentContentCss();

export { SegmentContent as ion_segment_content };
