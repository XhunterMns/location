import { Directive, ElementRef, EventEmitter, HostListener, Output, ViewChild, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../providers/nav-controller";
/**
 * Extracts `queryParams` and `fragment` from a tab button's href for use
 * as Angular `NavigationExtras`. Returns `undefined` when neither is present.
 */
const parseHrefExtras = (href) => {
    if (!href) {
        return undefined;
    }
    const hashIndex = href.indexOf('#');
    // Treat a bare `#` (no fragment text) as no fragment.
    const fragment = hashIndex >= 0 && hashIndex < href.length - 1 ? href.slice(hashIndex + 1) : undefined;
    const beforeHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    const queryIndex = beforeHash.indexOf('?');
    const search = queryIndex >= 0 ? beforeHash.slice(queryIndex + 1) : '';
    let queryParams;
    if (search) {
        const params = new URLSearchParams(search);
        queryParams = {};
        for (const key of new Set(params.keys())) {
            const all = params.getAll(key);
            queryParams[key] = all.length > 1 ? all : all[0];
        }
    }
    if (!queryParams && fragment === undefined) {
        return undefined;
    }
    /**
     * Build the result with only the populated keys so that a spread of the
     * returned object does not overwrite saved `queryParams`/`fragment` with
     * `undefined` (which `Object.assign`/spread would copy as a real key).
     */
    const extras = {};
    if (queryParams)
        extras.queryParams = queryParams;
    if (fragment !== undefined)
        extras.fragment = fragment;
    return extras;
};
class IonTabs {
    navCtrl;
    tabsInner;
    /**
     * Emitted before the tab view is changed.
     */
    ionTabsWillChange = new EventEmitter();
    /**
     * Emitted after the tab view is changed.
     */
    ionTabsDidChange = new EventEmitter();
    tabBarSlot = 'bottom';
    hasTab = false;
    selectedTab;
    leavingTab;
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ngAfterViewInit() {
        /**
         * Developers must pass at least one ion-tab
         * inside of ion-tabs if they want to use a
         * basic tab-based navigation without the
         * history stack or URL updates associated
         * with the router.
         */
        const firstTab = this.tabs.length > 0 ? this.tabs.first : undefined;
        if (firstTab) {
            this.hasTab = true;
            this.setActiveTab(firstTab.tab);
            this.tabSwitch();
        }
    }
    ngAfterContentInit() {
        this.detectSlotChanges();
    }
    ngAfterContentChecked() {
        this.detectSlotChanges();
    }
    /**
     * @internal
     */
    onStackWillChange({ enteringView, tabSwitch }) {
        const stackId = enteringView.stackId;
        if (tabSwitch && stackId !== undefined) {
            this.ionTabsWillChange.emit({ tab: stackId });
        }
    }
    /**
     * @internal
     */
    onStackDidChange({ enteringView, tabSwitch }) {
        const stackId = enteringView.stackId;
        if (tabSwitch && stackId !== undefined) {
            if (this.tabBar) {
                this.tabBar.selectedTab = stackId;
            }
            this.ionTabsDidChange.emit({ tab: stackId });
        }
    }
    /**
     * When a tab button is clicked, there are several scenarios:
     * 1. If the selected tab is currently active (the tab button has been clicked
     *    again), then it should go to the root view for that tab.
     *
     *   a. Get the saved root view from the router outlet. If the saved root view
     *      matches the tabRootUrl, set the route view to this view including the
     *      navigation extras. Any `queryParams` or `fragment` declared on the tab
     *      button's `href` are also forwarded.
     *   b. If the saved root view from the router outlet does not match, navigate
     *      to the tabRootUrl, forwarding any `queryParams`/`fragment` declared on
     *      the tab button's `href`.
     *
     * 2. If the current tab tab is not currently selected, get the last route
     *    view from the router outlet.
     *
     *   a. If the last route view exists, navigate to that view including any
     *      navigation extras.
     *   b. If the last route view doesn't exist, then navigate to the default
     *      tabRootUrl, forwarding any `queryParams`/`fragment` declared on the
     *      tab button's `href`.
     */
    select(tabOrEvent) {
        const isTabString = typeof tabOrEvent === 'string';
        const tab = isTabString ? tabOrEvent : tabOrEvent.detail.tab;
        const href = isTabString ? undefined : tabOrEvent.detail.href;
        /**
         * If the tabs are not using the router, then
         * the tab switch logic is handled by the tabs
         * component itself.
         */
        if (this.hasTab) {
            this.setActiveTab(tab);
            this.tabSwitch();
            return;
        }
        const alreadySelected = this.outlet.getActiveStackId() === tab;
        const tabRootUrl = `${this.outlet.tabsPrefix}/${tab}`;
        /**
         * The href pathname is ignored here; tab routing is driven by `tabsPrefix/tab`.
         * Only the query and fragment are forwarded as navigation extras.
         */
        const hrefExtras = parseHrefExtras(href);
        /**
         * If this is a nested tab, prevent the event
         * from bubbling otherwise the outer tabs
         * will respond to this event too, causing
         * the app to get directed to the wrong place.
         */
        if (!isTabString) {
            tabOrEvent.stopPropagation();
        }
        if (alreadySelected) {
            const activeStackId = this.outlet.getActiveStackId();
            const activeView = this.outlet.getLastRouteView(activeStackId);
            // If on root tab, do not navigate to root tab again
            if (activeView?.url === tabRootUrl) {
                return;
            }
            const rootView = this.outlet.getRootView(tab);
            const navigationExtras = rootView && tabRootUrl === rootView.url && rootView.savedExtras;
            return this.navCtrl.navigateRoot(tabRootUrl, {
                ...navigationExtras,
                ...hrefExtras,
                animated: true,
                animationDirection: 'back',
            });
        }
        else {
            const lastRoute = this.outlet.getLastRouteView(tab);
            /**
             * If there is a lastRoute, goto that, otherwise goto the fallback url of the
             * selected tab. When falling back to the tab root, honor query params and
             * fragment declared on the tab button's href.
             */
            const url = lastRoute?.url || tabRootUrl;
            const navigationExtras = lastRoute?.savedExtras ?? (url === tabRootUrl ? hrefExtras : undefined);
            return this.navCtrl.navigateRoot(url, {
                ...navigationExtras,
                animated: true,
                animationDirection: 'back',
            });
        }
    }
    setActiveTab(tab) {
        const tabs = this.tabs;
        const selectedTab = tabs.find((t) => t.tab === tab);
        if (!selectedTab) {
            console.error(`[Ionic Error]: Tab with id: "${tab}" does not exist`);
            return;
        }
        this.leavingTab = this.selectedTab;
        this.selectedTab = selectedTab;
        this.ionTabsWillChange.emit({ tab });
        selectedTab.el.active = true;
    }
    tabSwitch() {
        const { selectedTab, leavingTab } = this;
        if (this.tabBar && selectedTab) {
            this.tabBar.selectedTab = selectedTab.tab;
        }
        if (leavingTab?.tab !== selectedTab?.tab) {
            if (leavingTab?.el) {
                leavingTab.el.active = false;
            }
        }
        if (selectedTab) {
            this.ionTabsDidChange.emit({ tab: selectedTab.tab });
        }
    }
    getSelected() {
        if (this.hasTab) {
            return this.selectedTab?.tab;
        }
        return this.outlet.getActiveStackId();
    }
    /**
     * Detects changes to the slot attribute of the tab bar.
     *
     * If the slot attribute has changed, then the tab bar
     * should be relocated to the new slot position.
     */
    detectSlotChanges() {
        this.tabBars.forEach((tabBar) => {
            // el is a protected attribute from the generated component wrapper
            const currentSlot = tabBar.el.getAttribute('slot');
            if (currentSlot !== this.tabBarSlot) {
                this.tabBarSlot = currentSlot;
                this.relocateTabBar();
            }
        });
    }
    /**
     * Relocates the tab bar to the new slot position.
     */
    relocateTabBar() {
        /**
         * `el` is a protected attribute from the generated component wrapper.
         * To avoid having to manually create the wrapper for tab bar, we
         * cast the tab bar to any and access the protected attribute.
         */
        const tabBar = this.tabBar.el;
        if (this.tabBarSlot === 'top') {
            /**
             * A tab bar with a slot of "top" should be inserted
             * at the top of the container.
             */
            this.tabsInner.nativeElement.before(tabBar);
        }
        else {
            /**
             * A tab bar with a slot of "bottom" or without a slot
             * should be inserted at the end of the container.
             */
            this.tabsInner.nativeElement.after(tabBar);
        }
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTabs, deps: [{ token: i1.NavController }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: IonTabs, selector: "ion-tabs", outputs: { ionTabsWillChange: "ionTabsWillChange", ionTabsDidChange: "ionTabsDidChange" }, host: { listeners: { "ionTabButtonClick": "select($event)" } }, viewQueries: [{ propertyName: "tabsInner", first: true, predicate: ["tabsInner"], descendants: true, read: ElementRef, static: true }], ngImport: i0 });
}
export { IonTabs };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTabs, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ion-tabs',
                }]
        }], ctorParameters: function () { return [{ type: i1.NavController }]; }, propDecorators: { tabsInner: [{
                type: ViewChild,
                args: ['tabsInner', { read: ElementRef, static: true }]
            }], ionTabsWillChange: [{
                type: Output
            }], ionTabsDidChange: [{
                type: Output
            }], select: [{
                type: HostListener,
                args: ['ionTabButtonClick', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbW1vbi9zcmMvZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL3RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sU0FBUyxHQUdWLE1BQU0sZUFBZSxDQUFDOzs7QUFPdkI7OztHQUdHO0FBQ0gsTUFBTSxlQUFlLEdBQUcsQ0FBQyxJQUF3QixFQUEyRCxFQUFFO0lBQzVHLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEMsc0RBQXNEO0lBQ3RELE1BQU0sUUFBUSxHQUFHLFNBQVMsSUFBSSxDQUFDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3ZHLE1BQU0sVUFBVSxHQUFHLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFcEUsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQyxNQUFNLE1BQU0sR0FBRyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRXZFLElBQUksV0FBK0IsQ0FBQztJQUNwQyxJQUFJLE1BQU0sRUFBRTtRQUNWLE1B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ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXQsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbmF2LWNvbnRyb2xsZXInO1xuXG5pbXBvcnQgeyBTdGFja0RpZENoYW5nZUV2ZW50LCBTdGFja1dpbGxDaGFuZ2VFdmVudCB9IGZyb20gJy4vc3RhY2stdXRpbHMnO1xuXG4vKipcbiAqIEV4dHJhY3RzIGBxdWVyeVBhcmFtc2AgYW5kIGBmcmFnbWVudGAgZnJvbSBhIHRhYiBidXR0b24ncyBocmVmIGZvciB1c2VcbiAqIGFzIEFuZ3VsYXIgYE5hdmlnYXRpb25FeHRyYXNgLiBSZXR1cm5zIGB1bmRlZmluZWRgIHdoZW4gbmVpdGhlciBpcyBwcmVzZW50LlxuICovXG5jb25zdCBwYXJzZUhyZWZFeHRyYXMgPSAoaHJlZjogc3RyaW5nIHwgdW5kZWZpbmVkKTogeyBxdWVyeVBhcmFtcz86IFBhcmFtczsgZnJhZ21lbnQ/OiBzdHJpbmcgfSB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmICghaHJlZikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBoYXNoSW5kZXggPSBocmVmLmluZGV4T2YoJyMnKTtcbiAgLy8gVHJlYXQgYSBiYXJlIGAjYCAobm8gZnJhZ21lbnQgdGV4dCkgYXMgbm8gZnJhZ21lbnQuXG4gIGNvbnN0IGZyYWdtZW50ID0gaGFzaEluZGV4ID49IDAgJiYgaGFzaEluZGV4IDwgaHJlZi5sZW5ndGggLSAxID8gaHJlZi5zbGljZShoYXNoSW5kZXggKyAxKSA6IHVuZGVmaW5lZDtcbiAgY29uc3QgYmVmb3JlSGFzaCA9IGhhc2hJbmRleCA+PSAwID8gaHJlZi5zbGljZSgwLCBoYXNoSW5kZXgpIDogaHJlZjtcblxuICBjb25zdCBxdWVyeUluZGV4ID0gYmVmb3JlSGFzaC5pbmRleE9mKCc/Jyk7XG4gIGNvbnN0IHNlYXJjaCA9IHF1ZXJ5SW5kZXggPj0gMCA/IGJlZm9yZUhhc2guc2xpY2UocXVlcnlJbmRleCArIDEpIDogJyc7XG5cbiAgbGV0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgfCB1bmRlZmluZWQ7XG4gIGlmIChzZWFyY2gpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHNlYXJjaCk7XG4gICAgcXVlcnlQYXJhbXMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBuZXcgU2V0KHBhcmFtcy5rZXlzKCkpKSB7XG4gICAgICBjb25zdCBhbGwgPSBwYXJhbXMuZ2V0QWxsKGtleSk7XG4gICAgICBxdWVyeVBhcmFtc1trZXldID0gYWxsLmxlbmd0aCA+IDEgPyBhbGwgOiBhbGxbMF07XG4gICAgfVxuICB9XG5cbiAgaWYgKCFxdWVyeVBhcmFtcyAmJiBmcmFnbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCB0aGUgcmVzdWx0IHdpdGggb25seSB0aGUgcG9wdWxhdGVkIGtleXMgc28gdGhhdCBhIHNwcmVhZCBvZiB0aGVcbiAgICogcmV0dXJuZWQgb2JqZWN0IGRvZXMgbm90IG92ZXJ3cml0ZSBzYXZlZCBgcXVlcnlQYXJhbXNgL2BmcmFnbWVudGAgd2l0aFxuICAgKiBgdW5kZWZpbmVkYCAod2hpY2ggYE9iamVjdC5hc3NpZ25gL3NwcmVhZCB3b3VsZCBjb3B5IGFzIGEgcmVhbCBrZXkpLlxuICAgKi9cbiAgY29uc3QgZXh0cmFzOiB7IHF1ZXJ5UGFyYW1zPzogUGFyYW1zOyBmcmFnbWVudD86IHN0cmluZyB9ID0ge307XG4gIGlmIChxdWVyeVBhcmFtcykgZXh0cmFzLnF1ZXJ5UGFyYW1zID0gcXVlcnlQYXJhbXM7XG4gIGlmIChmcmFnbWVudCAhPT0gdW5kZWZpbmVkKSBleHRyYXMuZnJhZ21lbnQgPSBmcmFnbWVudDtcbiAgcmV0dXJuIGV4dHJhcztcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lvbi10YWJzJyxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJb25UYWJzIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIC8qKlxuICAgKiBOb3RlOiBUaGVzZSBtdXN0IGJlIHJlZGVjbGFyZWQgb24gZWFjaCBjaGlsZCBjbGFzcyBzaW5jZSBpdCBuZWVkc1xuICAgKiBhY2Nlc3MgdG8gZ2VuZXJhdGVkIGNvbXBvbmVudHMgc3VjaCBhcyBJb25Sb3V0ZXJPdXRsZXQgYW5kIElvblRhYkJhci5cbiAgICovXG4gIGFic3RyYWN0IG91dGxldDogYW55O1xuICBhYnN0cmFjdCB0YWJCYXI6IGFueTtcbiAgYWJzdHJhY3QgdGFiQmFyczogUXVlcnlMaXN0PGFueT47XG4gIGFic3RyYWN0IHRhYnM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gIEBWaWV3Q2hpbGQoJ3RhYnNJbm5lcicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIHRhYnNJbm5lcjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG5cbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSB0YWIgdmlldyBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIGlvblRhYnNXaWxsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IHRhYjogc3RyaW5nIH0+KCk7XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSB0YWIgdmlldyBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIGlvblRhYnNEaWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgdGFiOiBzdHJpbmcgfT4oKTtcblxuICBwcml2YXRlIHRhYkJhclNsb3QgPSAnYm90dG9tJztcblxuICBwcml2YXRlIGhhc1RhYiA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGVkVGFiPzogeyB0YWI6IHN0cmluZyB9O1xuICBwcml2YXRlIGxlYXZpbmdUYWI/OiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuYXZDdHJsOiBOYXZDb250cm9sbGVyKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAvKipcbiAgICAgKiBEZXZlbG9wZXJzIG11c3QgcGFzcyBhdCBsZWFzdCBvbmUgaW9uLXRhYlxuICAgICAqIGluc2lkZSBvZiBpb24tdGFicyBpZiB0aGV5IHdhbnQgdG8gdXNlIGFcbiAgICAgKiBiYXNpYyB0YWItYmFzZWQgbmF2aWdhdGlvbiB3aXRob3V0IHRoZVxuICAgICAqIGhpc3Rvcnkgc3RhY2sgb3IgVVJMIHVwZGF0ZXMgYXNzb2NpYXRlZFxuICAgICAqIHdpdGggdGhlIHJvdXRlci5cbiAgICAgKi9cbiAgICBjb25zdCBmaXJzdFRhYiA9IHRoaXMudGFicy5sZW5ndGggPiAwID8gdGhpcy50YWJzLmZpcnN0IDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGZpcnN0VGFiKSB7XG4gICAgICB0aGlzLmhhc1RhYiA9IHRydWU7XG4gICAgICB0aGlzLnNldEFjdGl2ZVRhYihmaXJzdFRhYi50YWIpO1xuICAgICAgdGhpcy50YWJTd2l0Y2goKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kZXRlY3RTbG90Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuZGV0ZWN0U2xvdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG9uU3RhY2tXaWxsQ2hhbmdlKHsgZW50ZXJpbmdWaWV3LCB0YWJTd2l0Y2ggfTogU3RhY2tXaWxsQ2hhbmdlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBzdGFja0lkID0gZW50ZXJpbmdWaWV3LnN0YWNrSWQ7XG4gICAgaWYgKHRhYlN3aXRjaCAmJiBzdGFja0lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaW9uVGFic1dpbGxDaGFuZ2UuZW1pdCh7IHRhYjogc3RhY2tJZCB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBvblN0YWNrRGlkQ2hhbmdlKHsgZW50ZXJpbmdWaWV3LCB0YWJTd2l0Y2ggfTogU3RhY2tEaWRDaGFuZ2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YWNrSWQgPSBlbnRlcmluZ1ZpZXcuc3RhY2tJZDtcbiAgICBpZiAodGFiU3dpdGNoICYmIHN0YWNrSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMudGFiQmFyKSB7XG4gICAgICAgIHRoaXMudGFiQmFyLnNlbGVjdGVkVGFiID0gc3RhY2tJZDtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW9uVGFic0RpZENoYW5nZS5lbWl0KHsgdGFiOiBzdGFja0lkIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGEgdGFiIGJ1dHRvbiBpcyBjbGlja2VkLCB0aGVyZSBhcmUgc2V2ZXJhbCBzY2VuYXJpb3M6XG4gICAqIDEuIElmIHRoZSBzZWxlY3RlZCB0YWIgaXMgY3VycmVudGx5IGFjdGl2ZSAodGhlIHRhYiBidXR0b24gaGFzIGJlZW4gY2xpY2tlZFxuICAgKiAgICBhZ2FpbiksIHRoZW4gaXQgc2hvdWxkIGdvIHRvIHRoZSByb290IHZpZXcgZm9yIHRoYXQgdGFiLlxuICAgKlxuICAgKiAgIGEuIEdldCB0aGUgc2F2ZWQgcm9vdCB2aWV3IGZyb20gdGhlIHJvdXRlciBvdXRsZXQuIElmIHRoZSBzYXZlZCByb290IHZpZXdcbiAgICogICAgICBtYXRjaGVzIHRoZSB0YWJSb290VXJsLCBzZXQgdGhlIHJvdXRlIHZpZXcgdG8gdGhpcyB2aWV3IGluY2x1ZGluZyB0aGVcbiAgICogICAgICBuYXZpZ2F0aW9uIGV4dHJhcy4gQW55IGBxdWVyeVBhcmFtc2Agb3IgYGZyYWdtZW50YCBkZWNsYXJlZCBvbiB0aGUgdGFiXG4gICAqICAgICAgYnV0dG9uJ3MgYGhyZWZgIGFyZSBhbHNvIGZvcndhcmRlZC5cbiAgICogICBiLiBJZiB0aGUgc2F2ZWQgcm9vdCB2aWV3IGZyb20gdGhlIHJvdXRlciBvdXRsZXQgZG9lcyBub3QgbWF0Y2gsIG5hdmlnYXRlXG4gICAqICAgICAgdG8gdGhlIHRhYlJvb3RVcmwsIGZvcndhcmRpbmcgYW55IGBxdWVyeVBhcmFtc2AvYGZyYWdtZW50YCBkZWNsYXJlZCBvblxuICAgKiAgICAgIHRoZSB0YWIgYnV0dG9uJ3MgYGhyZWZgLlxuICAgKlxuICAgKiAyLiBJZiB0aGUgY3VycmVudCB0YWIgdGFiIGlzIG5vdCBjdXJyZW50bHkgc2VsZWN0ZWQsIGdldCB0aGUgbGFzdCByb3V0ZVxuICAgKiAgICB2aWV3IGZyb20gdGhlIHJvdXRlciBvdXRsZXQuXG4gICAqXG4gICAqICAgYS4gSWYgdGhlIGxhc3Qgcm91dGUgdmlldyBleGlzdHMsIG5hdmlnYXRlIHRvIHRoYXQgdmlldyBpbmNsdWRpbmcgYW55XG4gICAqICAgICAgbmF2aWdhdGlvbiBleHRyYXMuXG4gICAqICAgYi4gSWYgdGhlIGxhc3Qgcm91dGUgdmlldyBkb2Vzbid0IGV4aXN0LCB0aGVuIG5hdmlnYXRlIHRvIHRoZSBkZWZhdWx0XG4gICAqICAgICAgdGFiUm9vdFVybCwgZm9yd2FyZGluZyBhbnkgYHF1ZXJ5UGFyYW1zYC9gZnJhZ21lbnRgIGRlY2xhcmVkIG9uIHRoZVxuICAgKiAgICAgIHRhYiBidXR0b24ncyBgaHJlZmAuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdpb25UYWJCdXR0b25DbGljaycsIFsnJGV2ZW50J10pXG4gIHNlbGVjdCh0YWJPckV2ZW50OiBzdHJpbmcgfCBDdXN0b21FdmVudCk6IFByb21pc2U8Ym9vbGVhbj4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGlzVGFiU3RyaW5nID0gdHlwZW9mIHRhYk9yRXZlbnQgPT09ICdzdHJpbmcnO1xuICAgIGNvbnN0IHRhYiA9IGlzVGFiU3RyaW5nID8gdGFiT3JFdmVudCA6ICh0YWJPckV2ZW50IGFzIEN1c3RvbUV2ZW50KS5kZXRhaWwudGFiO1xuICAgIGNvbnN0IGhyZWY6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGlzVGFiU3RyaW5nID8gdW5kZWZpbmVkIDogKHRhYk9yRXZlbnQgYXMgQ3VzdG9tRXZlbnQpLmRldGFpbC5ocmVmO1xuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIHRhYnMgYXJlIG5vdCB1c2luZyB0aGUgcm91dGVyLCB0aGVuXG4gICAgICogdGhlIHRhYiBzd2l0Y2ggbG9naWMgaXMgaGFuZGxlZCBieSB0aGUgdGFic1xuICAgICAqIGNvbXBvbmVudCBpdHNlbGYuXG4gICAgICovXG4gICAgaWYgKHRoaXMuaGFzVGFiKSB7XG4gICAgICB0aGlzLnNldEFjdGl2ZVRhYih0YWIpO1xuICAgICAgdGhpcy50YWJTd2l0Y2goKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFscmVhZHlTZWxlY3RlZCA9IHRoaXMub3V0bGV0LmdldEFjdGl2ZVN0YWNrSWQoKSA9PT0gdGFiO1xuICAgIGNvbnN0IHRhYlJvb3RVcmwgPSBgJHt0aGlzLm91dGxldC50YWJzUHJlZml4fS8ke3RhYn1gO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGhyZWYgcGF0aG5hbWUgaXMgaWdub3JlZCBoZXJlOyB0YWIgcm91dGluZyBpcyBkcml2ZW4gYnkgYHRhYnNQcmVmaXgvdGFiYC5cbiAgICAgKiBPbmx5IHRoZSBxdWVyeSBhbmQgZnJhZ21lbnQgYXJlIGZvcndhcmRlZCBhcyBuYXZpZ2F0aW9uIGV4dHJhcy5cbiAgICAgKi9cbiAgICBjb25zdCBocmVmRXh0cmFzID0gcGFyc2VIcmVmRXh0cmFzKGhyZWYpO1xuXG4gICAgLyoqXG4gICAgICogSWYgdGhpcyBpcyBhIG5lc3RlZCB0YWIsIHByZXZlbnQgdGhlIGV2ZW50XG4gICAgICogZnJvbSBidWJibGluZyBvdGhlcndpc2UgdGhlIG91dGVyIHRhYnNcbiAgICAgKiB3aWxsIHJlc3BvbmQgdG8gdGhpcyBldmVudCB0b28sIGNhdXNpbmdcbiAgICAgKiB0aGUgYXBwIHRvIGdldCBkaXJlY3RlZCB0byB0aGUgd3JvbmcgcGxhY2UuXG4gICAgICovXG4gICAgaWYgKCFpc1RhYlN0cmluZykge1xuICAgICAgKHRhYk9yRXZlbnQgYXMgQ3VzdG9tRXZlbnQpLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGlmIChhbHJlYWR5U2VsZWN0ZWQpIHtcbiAgICAgIGNvbnN0IGFjdGl2ZVN0YWNrSWQgPSB0aGlzLm91dGxldC5nZXRBY3RpdmVTdGFja0lkKCk7XG4gICAgICBjb25zdCBhY3RpdmVWaWV3ID0gdGhpcy5vdXRsZXQuZ2V0TGFzdFJvdXRlVmlldyhhY3RpdmVTdGFja0lkKTtcblxuICAgICAgLy8gSWYgb24gcm9vdCB0YWIsIGRvIG5vdCBuYXZpZ2F0ZSB0byByb290IHRhYiBhZ2FpblxuICAgICAgaWYgKGFjdGl2ZVZpZXc/LnVybCA9PT0gdGFiUm9vdFVybCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJvb3RWaWV3ID0gdGhpcy5vdXRsZXQuZ2V0Um9vdFZpZXcodGFiKTtcbiAgICAgIGNvbnN0IG5hdmlnYXRpb25FeHRyYXMgPSByb290VmlldyAmJiB0YWJSb290VXJsID09PSByb290Vmlldy51cmwgJiYgcm9vdFZpZXcuc2F2ZWRFeHRyYXM7XG4gICAgICByZXR1cm4gdGhpcy5uYXZDdHJsLm5hdmlnYXRlUm9vdCh0YWJSb290VXJsLCB7XG4gICAgICAgIC4uLm5hdmlnYXRpb25FeHRyYXMsXG4gICAgICAgIC4uLmhyZWZFeHRyYXMsXG4gICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICBhbmltYXRpb25EaXJlY3Rpb246ICdiYWNrJyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsYXN0Um91dGUgPSB0aGlzLm91dGxldC5nZXRMYXN0Um91dGVWaWV3KHRhYik7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoZXJlIGlzIGEgbGFzdFJvdXRlLCBnb3RvIHRoYXQsIG90aGVyd2lzZSBnb3RvIHRoZSBmYWxsYmFjayB1cmwgb2YgdGhlXG4gICAgICAgKiBzZWxlY3RlZCB0YWIuIFdoZW4gZmFsbGluZyBiYWNrIHRvIHRoZSB0YWIgcm9vdCwgaG9ub3IgcXVlcnkgcGFyYW1zIGFuZFxuICAgICAgICogZnJhZ21lbnQgZGVjbGFyZWQgb24gdGhlIHRhYiBidXR0b24ncyBocmVmLlxuICAgICAgICovXG4gICAgICBjb25zdCB1cmwgPSBsYXN0Um91dGU/LnVybCB8fCB0YWJSb290VXJsO1xuICAgICAgY29uc3QgbmF2aWdhdGlvbkV4dHJhcyA9IGxhc3RSb3V0ZT8uc2F2ZWRFeHRyYXMgPz8gKHVybCA9PT0gdGFiUm9vdFVybCA/IGhyZWZFeHRyYXMgOiB1bmRlZmluZWQpO1xuXG4gICAgICByZXR1cm4gdGhpcy5uYXZDdHJsLm5hdmlnYXRlUm9vdCh1cmwsIHtcbiAgICAgICAgLi4ubmF2aWdhdGlvbkV4dHJhcyxcbiAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgIGFuaW1hdGlvbkRpcmVjdGlvbjogJ2JhY2snLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRBY3RpdmVUYWIodGFiOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB0YWJzID0gdGhpcy50YWJzO1xuICAgIGNvbnN0IHNlbGVjdGVkVGFiID0gdGFicy5maW5kKCh0OiBhbnkpID0+IHQudGFiID09PSB0YWIpO1xuXG4gICAgaWYgKCFzZWxlY3RlZFRhYikge1xuICAgICAgY29uc29sZS5lcnJvcihgW0lvbmljIEVycm9yXTogVGFiIHdpdGggaWQ6IFwiJHt0YWJ9XCIgZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxlYXZpbmdUYWIgPSB0aGlzLnNlbGVjdGVkVGFiO1xuICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSBzZWxlY3RlZFRhYjtcblxuICAgIHRoaXMuaW9uVGFic1dpbGxDaGFuZ2UuZW1pdCh7IHRhYiB9KTtcblxuICAgIHNlbGVjdGVkVGFiLmVsLmFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHRhYlN3aXRjaCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkVGFiLCBsZWF2aW5nVGFiIH0gPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMudGFiQmFyICYmIHNlbGVjdGVkVGFiKSB7XG4gICAgICB0aGlzLnRhYkJhci5zZWxlY3RlZFRhYiA9IHNlbGVjdGVkVGFiLnRhYjtcbiAgICB9XG5cbiAgICBpZiAobGVhdmluZ1RhYj8udGFiICE9PSBzZWxlY3RlZFRhYj8udGFiKSB7XG4gICAgICBpZiAobGVhdmluZ1RhYj8uZWwpIHtcbiAgICAgICAgbGVhdmluZ1RhYi5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0ZWRUYWIpIHtcbiAgICAgIHRoaXMuaW9uVGFic0RpZENoYW5nZS5lbWl0KHsgdGFiOiBzZWxlY3RlZFRhYi50YWIgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U2VsZWN0ZWQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5oYXNUYWIpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGFiPy50YWI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3V0bGV0LmdldEFjdGl2ZVN0YWNrSWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlY3RzIGNoYW5nZXMgdG8gdGhlIHNsb3QgYXR0cmlidXRlIG9mIHRoZSB0YWIgYmFyLlxuICAgKlxuICAgKiBJZiB0aGUgc2xvdCBhdHRyaWJ1dGUgaGFzIGNoYW5nZWQsIHRoZW4gdGhlIHRhYiBiYXJcbiAgICogc2hvdWxkIGJlIHJlbG9jYXRlZCB0byB0aGUgbmV3IHNsb3QgcG9zaXRpb24uXG4gICAqL1xuICBwcml2YXRlIGRldGVjdFNsb3RDaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMudGFiQmFycy5mb3JFYWNoKCh0YWJCYXI6IGFueSkgPT4ge1xuICAgICAgLy8gZWwgaXMgYSBwcm90ZWN0ZWQgYXR0cmlidXRlIGZyb20gdGhlIGdlbmVyYXRlZCBjb21wb25lbnQgd3JhcHBlclxuICAgICAgY29uc3QgY3VycmVudFNsb3QgPSB0YWJCYXIuZWwuZ2V0QXR0cmlidXRlKCdzbG90Jyk7XG5cbiAgICAgIGlmIChjdXJyZW50U2xvdCAhPT0gdGhpcy50YWJCYXJTbG90KSB7XG4gICAgICAgIHRoaXMudGFiQmFyU2xvdCA9IGN1cnJlbnRTbG90O1xuICAgICAgICB0aGlzLnJlbG9jYXRlVGFiQmFyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVsb2NhdGVzIHRoZSB0YWIgYmFyIHRvIHRoZSBuZXcgc2xvdCBwb3NpdGlvbi5cbiAgICovXG4gIHByaXZhdGUgcmVsb2NhdGVUYWJCYXIoKTogdm9pZCB7XG4gICAgLyoqXG4gICAgICogYGVsYCBpcyBhIHByb3RlY3RlZCBhdHRyaWJ1dGUgZnJvbSB0aGUgZ2VuZXJhdGVkIGNvbXBvbmVudCB3cmFwcGVyLlxuICAgICAqIFRvIGF2b2lkIGhhdmluZyB0byBtYW51YWxseSBjcmVhdGUgdGhlIHdyYXBwZXIgZm9yIHRhYiBiYXIsIHdlXG4gICAgICogY2FzdCB0aGUgdGFiIGJhciB0byBhbnkgYW5kIGFjY2VzcyB0aGUgcHJvdGVjdGVkIGF0dHJpYnV0ZS5cbiAgICAgKi9cbiAgICBjb25zdCB0YWJCYXIgPSAodGhpcy50YWJCYXIgYXMgYW55KS5lbCBhcyBIVE1MRWxlbWVudDtcblxuICAgIGlmICh0aGlzLnRhYkJhclNsb3QgPT09ICd0b3AnKSB7XG4gICAgICAvKipcbiAgICAgICAqIEEgdGFiIGJhciB3aXRoIGEgc2xvdCBvZiBcInRvcFwiIHNob3VsZCBiZSBpbnNlcnRlZFxuICAgICAgICogYXQgdGhlIHRvcCBvZiB0aGUgY29udGFpbmVyLlxuICAgICAgICovXG4gICAgICB0aGlzLnRhYnNJbm5lci5uYXRpdmVFbGVtZW50LmJlZm9yZSh0YWJCYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKipcbiAgICAgICAqIEEgdGFiIGJhciB3aXRoIGEgc2xvdCBvZiBcImJvdHRvbVwiIG9yIHdpdGhvdXQgYSBzbG90XG4gICAgICAgKiBzaG91bGQgYmUgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGUgY29udGFpbmVyLlxuICAgICAgICovXG4gICAgICB0aGlzLnRhYnNJbm5lci5uYXRpdmVFbGVtZW50LmFmdGVyKHRhYkJhcik7XG4gICAgfVxuICB9XG59XG4iXX0=