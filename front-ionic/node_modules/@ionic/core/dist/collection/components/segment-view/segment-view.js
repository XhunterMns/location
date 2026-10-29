/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { isRTL } from "../../utils/rtl/index";
export class SegmentView {
    constructor() {
        this.scrollEndTimeout = null;
        this.isTouching = false;
        /**
         * If `true`, the segment view cannot be interacted with.
         */
        this.disabled = false;
        /**
         * If `true`, users will be able to swipe the segment view to navigate between segment contents.
         */
        this.swipeGesture = true;
    }
    handleScroll(ev) {
        var _a;
        const { scrollLeft, scrollWidth, clientWidth } = ev.target;
        const max = scrollWidth - clientWidth;
        const scrollRatio = (isRTL(this.el) ? -1 : 1) * (scrollLeft / max);
        this.ionSegmentViewScroll.emit({
            scrollRatio,
            isManualScroll: (_a = this.isManualScroll) !== null && _a !== void 0 ? _a : true,
        });
        // Reset the timeout to check for scroll end
        this.resetScrollEndTimeout();
    }
    /**
     * Handle touch start event to know when the user is actively dragging the segment view.
     */
    handleScrollStart() {
        if (this.scrollEndTimeout) {
            clearTimeout(this.scrollEndTimeout);
            this.scrollEndTimeout = null;
        }
        this.isTouching = true;
    }
    /**
     * Handle touch end event to know when the user is no longer dragging the segment view.
     */
    handleTouchEnd() {
        this.isTouching = false;
    }
    /**
     * Reset the scroll end detection timer. This is called on every scroll event.
     */
    resetScrollEndTimeout() {
        if (this.scrollEndTimeout) {
            clearTimeout(this.scrollEndTimeout);
            this.scrollEndTimeout = null;
        }
        this.scrollEndTimeout = setTimeout(() => {
            this.checkForScrollEnd();
        }, 
        // Setting this to a lower value may result in inconsistencies in behavior
        // across browsers (particularly Firefox).
        // Ideally, all of this logic is removed once the scroll end event is
        // supported on all browsers (https://caniuse.com/?search=scrollend)
        100);
    }
    /**
     * Check if the scroll has ended and the user is not actively touching.
     * If the conditions are met (active content is enabled and no active touch),
     * reset the scroll position and emit the scroll end event.
     */
    checkForScrollEnd() {
        // Only emit scroll end event if the active content is not disabled and
        // the user is not touching the segment view
        if (!this.isTouching) {
            this.isManualScroll = undefined;
        }
    }
    /**
     * @internal
     *
     * This method is used to programmatically set the displayed segment content
     * in the segment view. Calling this method will update the `value` of the
     * corresponding segment button.
     *
     * @param id: The id of the segment content to display.
     * @param smoothScroll: Whether to animate the scroll transition.
     */
    async setContent(id, smoothScroll = true) {
        const contents = this.getSegmentContents();
        const index = contents.findIndex((content) => content.id === id);
        if (index === -1)
            return;
        this.isManualScroll = false;
        this.resetScrollEndTimeout();
        const contentWidth = this.el.offsetWidth;
        const offset = index * contentWidth;
        this.el.scrollTo({
            top: 0,
            left: (isRTL(this.el) ? -1 : 1) * offset,
            behavior: smoothScroll ? 'smooth' : 'instant',
        });
    }
    getSegmentContents() {
        return Array.from(this.el.querySelectorAll('ion-segment-content'));
    }
    render() {
        const { disabled, isManualScroll, swipeGesture } = this;
        return (h(Host, { key: '2a6e0a1046af75b1fa0eed20a5fbbb4634480297', class: {
                'segment-view-disabled': disabled,
                'segment-view-scroll-disabled': isManualScroll === false,
                'segment-view-swipe-disabled': swipeGesture === false,
            } }, h("slot", { key: '644b60d179d0de3fa204e3bef26a3503ceeaf1d6' })));
    }
    static get is() { return "ion-segment-view"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["segment-view.ios.scss"],
            "md": ["segment-view.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["segment-view.ios.css"],
            "md": ["segment-view.md.css"]
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
                    "text": "If `true`, the segment view cannot be interacted with."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "swipeGesture": {
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
                    "text": "If `true`, users will be able to swipe the segment view to navigate between segment contents."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "swipe-gesture",
                "defaultValue": "true"
            }
        };
    }
    static get states() {
        return {
            "isManualScroll": {}
        };
    }
    static get events() {
        return [{
                "method": "ionSegmentViewScroll",
                "name": "ionSegmentViewScroll",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the segment view is scrolled."
                },
                "complexType": {
                    "original": "SegmentViewScrollEvent",
                    "resolved": "SegmentViewScrollEvent",
                    "references": {
                        "SegmentViewScrollEvent": {
                            "location": "import",
                            "path": "./segment-view-interface",
                            "id": "src/components/segment-view/segment-view-interface.ts::SegmentViewScrollEvent",
                            "referenceLocation": "SegmentViewScrollEvent"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "setContent": {
                "complexType": {
                    "signature": "(id: string, smoothScroll?: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "id",
                            "type": "string",
                            "docs": ": The id of the segment content to display."
                        }, {
                            "name": "smoothScroll",
                            "type": "boolean",
                            "docs": ": Whether to animate the scroll transition."
                        }],
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
                            "text": "This method is used to programmatically set the displayed segment content\nin the segment view. Calling this method will update the `value` of the\ncorresponding segment button."
                        }, {
                            "name": "param",
                            "text": "id : The id of the segment content to display."
                        }, {
                            "name": "param",
                            "text": "smoothScroll : Whether to animate the scroll transition."
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "scroll",
                "method": "handleScroll",
                "target": undefined,
                "capture": false,
                "passive": true
            }, {
                "name": "touchstart",
                "method": "handleScrollStart",
                "target": undefined,
                "capture": false,
                "passive": true
            }, {
                "name": "touchend",
                "method": "handleTouchEnd",
                "target": undefined,
                "capture": false,
                "passive": true
            }];
    }
}
