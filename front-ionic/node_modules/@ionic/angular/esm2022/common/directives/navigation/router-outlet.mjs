import { ViewContainerRef, inject, Attribute, Directive, EventEmitter, Optional, Output, SkipSelf, EnvironmentInjector, Input, InjectionToken, Injectable, reflectComponentType, } from '@angular/core';
import { Router, ActivatedRoute, ChildrenOutletContexts, PRIMARY_OUTLET } from '@angular/router';
import { componentOnReady } from '@ionic/core/components';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Config } from '../../providers/config';
import { NavController } from '../../providers/nav-controller';
import { StackController } from './stack-controller';
import { getUrl, isTabSwitch } from './stack-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
// TODO(FW-2827): types
class IonRouterOutlet {
    parentOutlet;
    nativeEl;
    activatedView = null;
    tabsPrefix;
    _swipeGesture;
    stackCtrl;
    // Maintain map of activated route proxies for each component instance
    proxyMap = new WeakMap();
    // Keep the latest activated route in a subject for the proxy routes to switch map to
    currentActivatedRoute$ = new BehaviorSubject(null);
    activated = null;
    /** @internal */
    get activatedComponentRef() {
        return this.activated;
    }
    _activatedRoute = null;
    /**
     * The name of the outlet
     */
    name = PRIMARY_OUTLET;
    /** @internal */
    stackWillChange = new EventEmitter();
    /** @internal */
    stackDidChange = new EventEmitter();
    // eslint-disable-next-line @angular-eslint/no-output-rename
    activateEvents = new EventEmitter();
    // eslint-disable-next-line @angular-eslint/no-output-rename
    deactivateEvents = new EventEmitter();
    parentContexts = inject(ChildrenOutletContexts);
    location = inject(ViewContainerRef);
    environmentInjector = inject(EnvironmentInjector);
    inputBinder = inject(INPUT_BINDER, { optional: true });
    /** @nodoc */
    supportsBindingToComponentInputs = true;
    // Ionic providers
    config = inject(Config);
    navCtrl = inject(NavController);
    set animation(animation) {
        this.nativeEl.animation = animation;
    }
    set animated(animated) {
        this.nativeEl.animated = animated;
    }
    set swipeGesture(swipe) {
        this._swipeGesture = swipe;
        this.nativeEl.swipeHandler = swipe
            ? {
                canStart: () => this.stackCtrl.canGoBack(1) && !this.stackCtrl.hasRunningTask(),
                onStart: () => this.stackCtrl.startBackTransition(),
                onEnd: (shouldContinue) => this.stackCtrl.endBackTransition(shouldContinue),
            }
            : undefined;
    }
    constructor(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
        this.parentOutlet = parentOutlet;
        this.nativeEl = elementRef.nativeElement;
        this.name = name || PRIMARY_OUTLET;
        this.tabsPrefix = tabs === 'true' ? getUrl(router, activatedRoute) : undefined;
        this.stackCtrl = new StackController(this.tabsPrefix, this.nativeEl, router, this.navCtrl, zone, commonLocation);
        this.parentContexts.onChildOutletCreated(this.name, this);
    }
    ngOnDestroy() {
        this.stackCtrl.destroy();
        this.inputBinder?.unsubscribeFromRouteData(this);
    }
    getContext() {
        return this.parentContexts.getContext(this.name);
    }
    ngOnInit() {
        this.initializeOutletWithName();
    }
    // Note: Ionic deviates from the Angular Router implementation here
    initializeOutletWithName() {
        if (!this.activated) {
            // If the outlet was not instantiated at the time the route got activated we need to populate
            // the outlet when it is initialized (ie inside a NgIf)
            const context = this.getContext();
            if (context?.route) {
                this.activateWith(context.route, context.injector);
            }
        }
        new Promise((resolve) => componentOnReady(this.nativeEl, resolve)).then(() => {
            if (this._swipeGesture === undefined) {
                this.swipeGesture = this.config.getBoolean('swipeBackEnabled', this.nativeEl.mode === 'ios');
            }
        });
    }
    get isActivated() {
        return !!this.activated;
    }
    get component() {
        if (!this.activated) {
            throw new Error('Outlet is not activated');
        }
        return this.activated.instance;
    }
    get activatedRoute() {
        if (!this.activated) {
            throw new Error('Outlet is not activated');
        }
        return this._activatedRoute;
    }
    get activatedRouteData() {
        if (this._activatedRoute) {
            return this._activatedRoute.snapshot.data;
        }
        return {};
    }
    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     */
    detach() {
        throw new Error('incompatible reuse strategy');
    }
    /**
     * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    attach(_ref, _activatedRoute) {
        throw new Error('incompatible reuse strategy');
    }
    deactivate() {
        if (this.activated) {
            if (this.activatedView) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const context = this.getContext();
                this.activatedView.savedData = new Map(context.children['contexts']);
                /**
                 * Angular v11.2.10 introduced a change
                 * where this route context is cleared out when
                 * a router-outlet is deactivated, However,
                 * we need this route information in order to
                 * return a user back to the correct tab when
                 * leaving and then going back to the tab context.
                 */
                const primaryOutlet = this.activatedView.savedData.get('primary');
                if (primaryOutlet && context.route) {
                    primaryOutlet.route = { ...context.route };
                }
                /**
                 * Ensure we are saving the NavigationExtras
                 * data otherwise it will be lost
                 */
                this.activatedView.savedExtras = {};
                if (context.route) {
                    const contextSnapshot = context.route.snapshot;
                    this.activatedView.savedExtras.queryParams = contextSnapshot.queryParams;
                    this.activatedView.savedExtras.fragment = contextSnapshot.fragment;
                }
            }
            const c = this.component;
            this.activatedView = null;
            this.activated = null;
            this._activatedRoute = null;
            this.deactivateEvents.emit(c);
        }
    }
    activateWith(activatedRoute, environmentInjector) {
        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }
        this._activatedRoute = activatedRoute;
        let cmpRef;
        let enteringView = this.stackCtrl.getExistingView(activatedRoute);
        if (enteringView) {
            cmpRef = this.activated = enteringView.ref;
            const saved = enteringView.savedData;
            if (saved) {
                // self-restore
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const context = this.getContext();
                context.children['contexts'] = saved;
            }
            // Updated activated route proxy for this component
            this.updateActivatedRouteProxy(cmpRef.instance, activatedRoute);
        }
        else {
            const snapshot = activatedRoute._futureSnapshot;
            /**
             * Angular 14 introduces a new `loadComponent` property to the route config.
             * This function will assign a `component` property to the route snapshot.
             * We check for the presence of this property to determine if the route is
             * using standalone components.
             */
            const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
            // We create an activated route proxy object that will maintain future updates for this component
            // over its lifecycle in the stack.
            const component$ = new BehaviorSubject(null);
            const activatedRouteProxy = this.createActivatedRouteProxy(component$, activatedRoute);
            const injector = new OutletInjector(activatedRouteProxy, childContexts, this.location.injector);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const component = snapshot.routeConfig.component ?? snapshot.component;
            /**
             * View components need to be added as a child of ion-router-outlet
             * for page transitions and swipe to go back.
             * However, createComponent mounts components as siblings of the
             * ViewContainerRef. As a result, outletContent must reference
             * an ng-container inside of ion-router-outlet and not
             * ion-router-outlet itself.
             */
            cmpRef = this.activated = this.outletContent.createComponent(component, {
                index: this.outletContent.length,
                injector,
                environmentInjector: environmentInjector ?? this.environmentInjector,
            });
            // Once the component is created we can push it to our local subject supplied to the proxy
            component$.next(cmpRef.instance);
            // Calling `markForCheck` to make sure we will run the change detection when the
            // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
            /**
             * At this point this.activated has been set earlier
             * in this function, so it is guaranteed to be non-null.
             */
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            enteringView = this.stackCtrl.createView(this.activated, activatedRoute);
            // Store references to the proxy by component
            this.proxyMap.set(cmpRef.instance, activatedRouteProxy);
            this.currentActivatedRoute$.next({ component: cmpRef.instance, activatedRoute });
        }
        this.inputBinder?.bindActivatedRouteToOutletComponent(this);
        this.activatedView = enteringView;
        /**
         * The top outlet is set prior to the entering view's transition completing,
         * so that when we have nested outlets (e.g. ion-tabs inside an ion-router-outlet),
         * the tabs outlet will be assigned as the top outlet when a view inside tabs is
         * activated.
         *
         * In this scenario, activeWith is called for both the tabs and the root router outlet.
         * To avoid a race condition, we assign the top outlet synchronously.
         */
        this.navCtrl.setTopOutlet(this);
        const leavingView = this.stackCtrl.getActiveView();
        this.stackWillChange.emit({
            enteringView,
            tabSwitch: isTabSwitch(enteringView, leavingView),
        });
        this.stackCtrl.setActive(enteringView).then((data) => {
            this.activateEvents.emit(cmpRef.instance);
            this.stackDidChange.emit(data);
        });
    }
    /**
     * Returns `true` if there are pages in the stack to go back.
     */
    canGoBack(deep = 1, stackId) {
        return this.stackCtrl.canGoBack(deep, stackId);
    }
    /**
     * Resolves to `true` if it the outlet was able to sucessfully pop the last N pages.
     */
    pop(deep = 1, stackId) {
        return this.stackCtrl.pop(deep, stackId);
    }
    /**
     * Returns the URL of the active page of each stack.
     */
    getLastUrl(stackId) {
        const active = this.stackCtrl.getLastUrl(stackId);
        return active ? active.url : undefined;
    }
    /**
     * Returns the RouteView of the active page of each stack.
     * @internal
     */
    getLastRouteView(stackId) {
        return this.stackCtrl.getLastUrl(stackId);
    }
    /**
     * Returns the root view in the tab stack.
     * @internal
     */
    getRootView(stackId) {
        return this.stackCtrl.getRootUrl(stackId);
    }
    /**
     * Returns the active stack ID. In the context of ion-tabs, it means the active tab.
     */
    getActiveStackId() {
        return this.stackCtrl.getActiveStackId();
    }
    /**
     * Since the activated route can change over the life time of a component in an ion router outlet, we create
     * a proxy so that we can update the values over time as a user navigates back to components already in the stack.
     */
    createActivatedRouteProxy(component$, activatedRoute) {
        const proxy = new ActivatedRoute();
        proxy._futureSnapshot = activatedRoute._futureSnapshot;
        proxy._routerState = activatedRoute._routerState;
        proxy.snapshot = activatedRoute.snapshot;
        proxy.outlet = activatedRoute.outlet;
        proxy.component = activatedRoute.component;
        // Setup wrappers for the observables so consumers don't have to worry about switching to new observables as the state updates
        proxy._paramMap = this.proxyObservable(component$, 'paramMap');
        proxy._queryParamMap = this.proxyObservable(component$, 'queryParamMap');
        proxy.url = this.proxyObservable(component$, 'url');
        proxy.params = this.proxyObservable(component$, 'params');
        proxy.queryParams = this.proxyObservable(component$, 'queryParams');
        proxy.fragment = this.proxyObservable(component$, 'fragment');
        proxy.data = this.proxyObservable(component$, 'data');
        return proxy;
    }
    /**
     * Create a wrapped observable that will switch to the latest activated route matched by the given component
     */
    proxyObservable(component$, path) {
        return component$.pipe(
        // First wait until the component instance is pushed
        filter((component) => !!component), switchMap((component) => this.currentActivatedRoute$.pipe(filter((current) => current !== null && current.component === component), switchMap((current) => current && current.activatedRoute[path]), distinctUntilChanged())));
    }
    /**
     * Updates the activated route proxy for the given component to the new incoming router state
     */
    updateActivatedRouteProxy(component, activatedRoute) {
        const proxy = this.proxyMap.get(component);
        if (!proxy) {
            throw new Error(`Could not find activated route proxy for view`);
        }
        proxy._futureSnapshot = activatedRoute._futureSnapshot;
        proxy._routerState = activatedRoute._routerState;
        proxy.snapshot = activatedRoute.snapshot;
        proxy.outlet = activatedRoute.outlet;
        proxy.component = activatedRoute.component;
        this.currentActivatedRoute$.next({ component, activatedRoute });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRouterOutlet, deps: [{ token: 'name', attribute: true }, { token: 'tabs', attribute: true, optional: true }, { token: i1.Location }, { token: i0.ElementRef }, { token: i2.Router }, { token: i0.NgZone }, { token: i2.ActivatedRoute }, { token: IonRouterOutlet, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: IonRouterOutlet, selector: "ion-router-outlet", inputs: { animated: "animated", animation: "animation", mode: "mode", swipeGesture: "swipeGesture", name: "name" }, outputs: { stackWillChange: "stackWillChange", stackDidChange: "stackDidChange", activateEvents: "activate", deactivateEvents: "deactivate" }, exportAs: ["outlet"], ngImport: i0 });
}
export { IonRouterOutlet };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRouterOutlet, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ion-router-outlet',
                    exportAs: 'outlet',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['animated', 'animation', 'mode', 'swipeGesture'],
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['name']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Attribute,
                    args: ['tabs']
                }] }, { type: i1.Location }, { type: i0.ElementRef }, { type: i2.Router }, { type: i0.NgZone }, { type: i2.ActivatedRoute }, { type: IonRouterOutlet, decorators: [{
                    type: SkipSelf
                }, {
                    type: Optional
                }] }]; }, propDecorators: { name: [{
                type: Input
            }], stackWillChange: [{
                type: Output
            }], stackDidChange: [{
                type: Output
            }], activateEvents: [{
                type: Output,
                args: ['activate']
            }], deactivateEvents: [{
                type: Output,
                args: ['deactivate']
            }] } });
class OutletInjector {
    route;
    childContexts;
    parent;
    constructor(route, childContexts, parent) {
        this.route = route;
        this.childContexts = childContexts;
        this.parent = parent;
    }
    get(token, notFoundValue) {
        if (token === ActivatedRoute) {
            return this.route;
        }
        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }
        return this.parent.get(token, notFoundValue);
    }
}
// TODO: FW-4785 - Remove this once Angular 15 support is dropped
const INPUT_BINDER = new InjectionToken('');
/**
 * Injectable used as a tree-shakable provider for opting in to binding router data to component
 * inputs.
 *
 * The RouterOutlet registers itself with this service when an `ActivatedRoute` is attached or
 * activated. When this happens, the service subscribes to the `ActivatedRoute` observables (params,
 * queryParams, data) and sets the inputs of the component using `ComponentRef.setInput`.
 * Importantly, when an input does not have an item in the route data with a matching key, this
 * input is set to `undefined`. If it were not done this way, the previous information would be
 * retained if the data got removed from the route (i.e. if a query parameter is removed).
 *
 * The `RouterOutlet` should unregister itself when destroyed via `unsubscribeFromRouteData` so that
 * the subscriptions are cleaned up.
 */
class RoutedComponentInputBinder {
    outletDataSubscriptions = new Map();
    bindActivatedRouteToOutletComponent(outlet) {
        this.unsubscribeFromRouteData(outlet);
        this.subscribeToRouteData(outlet);
    }
    unsubscribeFromRouteData(outlet) {
        this.outletDataSubscriptions.get(outlet)?.unsubscribe();
        this.outletDataSubscriptions.delete(outlet);
    }
    subscribeToRouteData(outlet) {
        const { activatedRoute } = outlet;
        const dataSubscription = combineLatest([activatedRoute.queryParams, activatedRoute.params, activatedRoute.data])
            .pipe(switchMap(([queryParams, params, data], index) => {
            data = { ...queryParams, ...params, ...data };
            // Get the first result from the data subscription synchronously so it's available to
            // the component as soon as possible (and doesn't require a second change detection).
            if (index === 0) {
                return of(data);
            }
            // Promise.resolve is used to avoid synchronously writing the wrong data when
            // two of the Observables in the `combineLatest` stream emit one after
            // another.
            return Promise.resolve(data);
        }))
            .subscribe((data) => {
            // Outlet may have been deactivated or changed names to be associated with a different
            // route
            if (!outlet.isActivated ||
                !outlet.activatedComponentRef ||
                outlet.activatedRoute !== activatedRoute ||
                activatedRoute.component === null) {
                this.unsubscribeFromRouteData(outlet);
                return;
            }
            const mirror = reflectComponentType(activatedRoute.component);
            if (!mirror) {
                this.unsubscribeFromRouteData(outlet);
                return;
            }
            for (const { templateName } of mirror.inputs) {
                outlet.activatedComponentRef.setInput(templateName, data[templateName]);
            }
        });
        this.outletDataSubscriptions.set(outlet, dataSubscription);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RoutedComponentInputBinder, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RoutedComponentInputBinder });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RoutedComponentInputBinder, decorators: [{
            type: Injectable
        }] });
export const provideComponentInputBinding = () => {
    return {
        provide: INPUT_BINDER,
        useFactory: componentInputBindingFactory,
        deps: [Router],
    };
};
function componentInputBindingFactory(router) {
    /**
     * We cast the router to any here, since the componentInputBindingEnabled
     * property is not available until Angular v16.
     */
    if (router?.componentInputBindingEnabled) {
        return new RoutedComponentInputBinder();
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLW91dGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbW1vbi9zcmMvZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL3JvdXRlci1vdXRsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQU9MLGdCQUFnQixFQUNoQixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1IsbUJBQW1CLEVBQ25CLEtBQUssRUFDTCxjQUFjLEVBQ2QsVUFBVSxFQUNWLG9CQUFvQixHQUNyQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQWlCLE1BQU0sRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsY0FBYyxFQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdEgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQsT0FBTyxFQUFjLGVBQWUsRUFBZ0IsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBd0QsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUUxRyx1QkFBdUI7QUFFdkIsTUFPc0IsZUFBZTtJQTRFQTtJQXpFbkMsUUFBUSxDQUE2QjtJQUNyQyxhQUFhLEdBQXFCLElBQUksQ0FBQztJQUN2QyxVQUFVLENBQXFCO0lBRXZCLGFBQWEsQ0FBVztJQUN4QixTQUFTLENBQWtCO0lBRW5DLHNFQUFz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Uyw0QkFBNEIsQ0FBQyxNQUFlO0lBQ25EOzs7T0FHRztJQUNILElBQUssTUFBYyxFQUFFLDRCQUE0QixFQUFFO1FBQ2pELE9BQU8sSUFBSSwwQkFBMEIsRUFBRSxDQUFDO0tBQ3pDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgaW5qZWN0LFxuICBBdHRyaWJ1dGUsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTa2lwU2VsZixcbiAgRW52aXJvbm1lbnRJbmplY3RvcixcbiAgSW5wdXQsXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3RhYmxlLFxuICByZWZsZWN0Q29tcG9uZW50VHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPdXRsZXRDb250ZXh0LCBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBDaGlsZHJlbk91dGxldENvbnRleHRzLCBQUklNQVJZX09VVExFVCwgRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBjb21wb25lbnRPblJlYWR5IH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cyc7XG5pbXBvcnQgdHlwZSB7IEFuaW1hdGlvbkJ1aWxkZXIgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0LCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY29uZmlnJztcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbmF2LWNvbnRyb2xsZXInO1xuXG5pbXBvcnQgeyBTdGFja0NvbnRyb2xsZXIgfSBmcm9tICcuL3N0YWNrLWNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUm91dGVWaWV3LCBTdGFja0RpZENoYW5nZUV2ZW50LCBTdGFja1dpbGxDaGFuZ2VFdmVudCwgZ2V0VXJsLCBpc1RhYlN3aXRjaCB9IGZyb20gJy4vc3RhY2stdXRpbHMnO1xuXG4vLyBUT0RPKEZXLTI4MjcpOiB0eXBlc1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpb24tcm91dGVyLW91dGxldCcsXG4gIGV4cG9ydEFzOiAnb3V0bGV0JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2FuaW1hdGVkJywgJ2FuaW1hdGlvbicsICdtb2RlJywgJ3N3aXBlR2VzdHVyZSddLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIElvblJvdXRlck91dGxldCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgYWJzdHJhY3Qgb3V0bGV0Q29udGVudDogYW55O1xuXG4gIG5hdGl2ZUVsOiBIVE1MSW9uUm91dGVyT3V0bGV0RWxlbWVudDtcbiAgYWN0aXZhdGVkVmlldzogUm91dGVWaWV3IHwgbnVsbCA9IG51bGw7XG4gIHRhYnNQcmVmaXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF9zd2lwZUdlc3R1cmU/OiBib29sZWFuO1xuICBwcml2YXRlIHN0YWNrQ3RybDogU3RhY2tDb250cm9sbGVyO1xuXG4gIC8vIE1haW50YWluIG1hcCBvZiBhY3RpdmF0ZWQgcm91dGUgcHJveGllcyBmb3IgZWFjaCBjb21wb25lbnQgaW5zdGFuY2VcbiAgcHJpdmF0ZSBwcm94eU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgQWN0aXZhdGVkUm91dGU+KCk7XG4gIC8vIEtlZXAgdGhlIGxhdGVzdCBhY3RpdmF0ZWQgcm91dGUgaW4gYSBzdWJqZWN0IGZvciB0aGUgcHJveHkgcm91dGVzIHRvIHN3aXRjaCBtYXAgdG9cbiAgcHJpdmF0ZSBjdXJyZW50QWN0aXZhdGVkUm91dGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDx7IGNvbXBvbmVudDogYW55OyBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUgfSB8IG51bGw+KG51bGwpO1xuXG4gIHByaXZhdGUgYWN0aXZhdGVkOiBDb21wb25lbnRSZWY8YW55PiB8IG51bGwgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIGdldCBhY3RpdmF0ZWRDb21wb25lbnRSZWYoKTogQ29tcG9uZW50UmVmPGFueT4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmF0ZWQ7XG4gIH1cbiAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBvdXRsZXRcbiAgICovXG4gIEBJbnB1dCgpIG5hbWUgPSBQUklNQVJZX09VVExFVDtcblxuICAvKiogQGludGVybmFsICovXG4gIEBPdXRwdXQoKSBzdGFja1dpbGxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFN0YWNrV2lsbENoYW5nZUV2ZW50PigpO1xuICAvKiogQGludGVybmFsICovXG4gIEBPdXRwdXQoKSBzdGFja0RpZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8U3RhY2tEaWRDaGFuZ2VFdmVudD4oKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1yZW5hbWVcbiAgQE91dHB1dCgnYWN0aXZhdGUnKSBhY3RpdmF0ZUV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1yZW5hbWVcbiAgQE91dHB1dCgnZGVhY3RpdmF0ZScpIGRlYWN0aXZhdGVFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIHBhcmVudENvbnRleHRzID0gaW5qZWN0KENoaWxkcmVuT3V0bGV0Q29udGV4dHMpO1xuICBwcml2YXRlIGxvY2F0aW9uID0gaW5qZWN0KFZpZXdDb250YWluZXJSZWYpO1xuICBwcml2YXRlIGVudmlyb25tZW50SW5qZWN0b3IgPSBpbmplY3QoRW52aXJvbm1lbnRJbmplY3Rvcik7XG4gIHByaXZhdGUgaW5wdXRCaW5kZXIgPSBpbmplY3QoSU5QVVRfQklOREVSLCB7IG9wdGlvbmFsOiB0cnVlIH0pO1xuICAvKiogQG5vZG9jICovXG4gIHJlYWRvbmx5IHN1cHBvcnRzQmluZGluZ1RvQ29tcG9uZW50SW5wdXRzID0gdHJ1ZTtcblxuICAvLyBJb25pYyBwcm92aWRlcnNcbiAgcHJpdmF0ZSBjb25maWcgPSBpbmplY3QoQ29uZmlnKTtcbiAgcHJpdmF0ZSBuYXZDdHJsID0gaW5qZWN0KE5hdkNvbnRyb2xsZXIpO1xuXG4gIHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBBbmltYXRpb25CdWlsZGVyKSB7XG4gICAgdGhpcy5uYXRpdmVFbC5hbmltYXRpb24gPSBhbmltYXRpb247XG4gIH1cblxuICBzZXQgYW5pbWF0ZWQoYW5pbWF0ZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLm5hdGl2ZUVsLmFuaW1hdGVkID0gYW5pbWF0ZWQ7XG4gIH1cblxuICBzZXQgc3dpcGVHZXN0dXJlKHN3aXBlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3dpcGVHZXN0dXJlID0gc3dpcGU7XG5cbiAgICB0aGlzLm5hdGl2ZUVsLnN3aXBlSGFuZGxlciA9IHN3aXBlXG4gICAgICA/IHtcbiAgICAgICAgICBjYW5TdGFydDogKCkgPT4gdGhpcy5zdGFja0N0cmwuY2FuR29CYWNrKDEpICYmICF0aGlzLnN0YWNrQ3RybC5oYXNSdW5uaW5nVGFzaygpLFxuICAgICAgICAgIG9uU3RhcnQ6ICgpID0+IHRoaXMuc3RhY2tDdHJsLnN0YXJ0QmFja1RyYW5zaXRpb24oKSxcbiAgICAgICAgICBvbkVuZDogKHNob3VsZENvbnRpbnVlKSA9PiB0aGlzLnN0YWNrQ3RybC5lbmRCYWNrVHJhbnNpdGlvbihzaG91bGRDb250aW51ZSksXG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEF0dHJpYnV0ZSgnbmFtZScpIG5hbWU6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBAQXR0cmlidXRlKCd0YWJzJykgdGFiczogc3RyaW5nLFxuICAgIGNvbW1vbkxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHJvdXRlcjogUm91dGVyLFxuICAgIHpvbmU6IE5nWm9uZSxcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgcmVhZG9ubHkgcGFyZW50T3V0bGV0PzogSW9uUm91dGVyT3V0bGV0XG4gICkge1xuICAgIHRoaXMubmF0aXZlRWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZSB8fCBQUklNQVJZX09VVExFVDtcbiAgICB0aGlzLnRhYnNQcmVmaXggPSB0YWJzID09PSAndHJ1ZScgPyBnZXRVcmwocm91dGVyLCBhY3RpdmF0ZWRSb3V0ZSkgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGFja0N0cmwgPSBuZXcgU3RhY2tDb250cm9sbGVyKHRoaXMudGFic1ByZWZpeCwgdGhpcy5uYXRpdmVFbCwgcm91dGVyLCB0aGlzLm5hdkN0cmwsIHpvbmUsIGNvbW1vbkxvY2F0aW9uKTtcbiAgICB0aGlzLnBhcmVudENvbnRleHRzLm9uQ2hpbGRPdXRsZXRDcmVhdGVkKHRoaXMubmFtZSwgdGhpcyBhcyBhbnkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdGFja0N0cmwuZGVzdHJveSgpO1xuICAgIHRoaXMuaW5wdXRCaW5kZXI/LnVuc3Vic2NyaWJlRnJvbVJvdXRlRGF0YSh0aGlzKTtcbiAgfVxuXG4gIGdldENvbnRleHQoKTogT3V0bGV0Q29udGV4dCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnBhcmVudENvbnRleHRzLmdldENvbnRleHQodGhpcy5uYW1lKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdGlhbGl6ZU91dGxldFdpdGhOYW1lKCk7XG4gIH1cblxuICAvLyBOb3RlOiBJb25pYyBkZXZpYXRlcyBmcm9tIHRoZSBBbmd1bGFyIFJvdXRlciBpbXBsZW1lbnRhdGlvbiBoZXJlXG4gIHByaXZhdGUgaW5pdGlhbGl6ZU91dGxldFdpdGhOYW1lKCkge1xuICAgIGlmICghdGhpcy5hY3RpdmF0ZWQpIHtcbiAgICAgIC8vIElmIHRoZSBvdXRsZXQgd2FzIG5vdCBpbnN0YW50aWF0ZWQgYXQgdGhlIHRpbWUgdGhlIHJvdXRlIGdvdCBhY3RpdmF0ZWQgd2UgbmVlZCB0byBwb3B1bGF0ZVxuICAgICAgLy8gdGhlIG91dGxldCB3aGVuIGl0IGlzIGluaXRpYWxpemVkIChpZSBpbnNpZGUgYSBOZ0lmKVxuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2V0Q29udGV4dCgpO1xuICAgICAgaWYgKGNvbnRleHQ/LnJvdXRlKSB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVXaXRoKGNvbnRleHQucm91dGUsIGNvbnRleHQuaW5qZWN0b3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBjb21wb25lbnRPblJlYWR5KHRoaXMubmF0aXZlRWwsIHJlc29sdmUpKS50aGVuKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9zd2lwZUdlc3R1cmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnN3aXBlR2VzdHVyZSA9IHRoaXMuY29uZmlnLmdldEJvb2xlYW4oJ3N3aXBlQmFja0VuYWJsZWQnLCAodGhpcy5uYXRpdmVFbCBhcyBhbnkpLm1vZGUgPT09ICdpb3MnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpc0FjdGl2YXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmFjdGl2YXRlZDtcbiAgfVxuXG4gIGdldCBjb21wb25lbnQoKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4ge1xuICAgIGlmICghdGhpcy5hY3RpdmF0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignT3V0bGV0IGlzIG5vdCBhY3RpdmF0ZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGVkLmluc3RhbmNlO1xuICB9XG5cbiAgZ2V0IGFjdGl2YXRlZFJvdXRlKCk6IEFjdGl2YXRlZFJvdXRlIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZhdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGxldCBpcyBub3QgYWN0aXZhdGVkJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSBhcyBBY3RpdmF0ZWRSb3V0ZTtcbiAgfVxuXG4gIGdldCBhY3RpdmF0ZWRSb3V0ZURhdGEoKTogRGF0YSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2YXRlZFJvdXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGVkUm91dGUuc25hcHNob3QuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBgUm91dGVSZXVzZVN0cmF0ZWd5YCBpbnN0cnVjdHMgdG8gZGV0YWNoIHRoZSBzdWJ0cmVlXG4gICAqL1xuICBkZXRhY2goKTogQ29tcG9uZW50UmVmPGFueT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5jb21wYXRpYmxlIHJldXNlIHN0cmF0ZWd5Jyk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGBSb3V0ZVJldXNlU3RyYXRlZ3lgIGluc3RydWN0cyB0byByZS1hdHRhY2ggYSBwcmV2aW91c2x5IGRldGFjaGVkIHN1YnRyZWVcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgYXR0YWNoKF9yZWY6IENvbXBvbmVudFJlZjxhbnk+LCBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbmNvbXBhdGlibGUgcmV1c2Ugc3RyYXRlZ3knKTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0aXZhdGVkKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmF0ZWRWaWV3KSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKSE7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZERhdGEgPSBuZXcgTWFwKGNvbnRleHQuY2hpbGRyZW5bJ2NvbnRleHRzJ10pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbmd1bGFyIHYxMS4yLjEwIGludHJvZHVjZWQgYSBjaGFuZ2VcbiAgICAgICAgICogd2hlcmUgdGhpcyByb3V0ZSBjb250ZXh0IGlzIGNsZWFyZWQgb3V0IHdoZW5cbiAgICAgICAgICogYSByb3V0ZXItb3V0bGV0IGlzIGRlYWN0aXZhdGVkLCBIb3dldmVyLFxuICAgICAgICAgKiB3ZSBuZWVkIHRoaXMgcm91dGUgaW5mb3JtYXRpb24gaW4gb3JkZXIgdG9cbiAgICAgICAgICogcmV0dXJuIGEgdXNlciBiYWNrIHRvIHRoZSBjb3JyZWN0IHRhYiB3aGVuXG4gICAgICAgICAqIGxlYXZpbmcgYW5kIHRoZW4gZ29pbmcgYmFjayB0byB0aGUgdGFiIGNvbnRleHQuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBwcmltYXJ5T3V0bGV0ID0gdGhpcy5hY3RpdmF0ZWRWaWV3LnNhdmVkRGF0YS5nZXQoJ3ByaW1hcnknKTtcbiAgICAgICAgaWYgKHByaW1hcnlPdXRsZXQgJiYgY29udGV4dC5yb3V0ZSkge1xuICAgICAgICAgIHByaW1hcnlPdXRsZXQucm91dGUgPSB7IC4uLmNvbnRleHQucm91dGUgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbnN1cmUgd2UgYXJlIHNhdmluZyB0aGUgTmF2aWdhdGlvbkV4dHJhc1xuICAgICAgICAgKiBkYXRhIG90aGVyd2lzZSBpdCB3aWxsIGJlIGxvc3RcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcyA9IHt9O1xuICAgICAgICBpZiAoY29udGV4dC5yb3V0ZSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRleHRTbmFwc2hvdCA9IGNvbnRleHQucm91dGUuc25hcHNob3Q7XG5cbiAgICAgICAgICB0aGlzLmFjdGl2YXRlZFZpZXcuc2F2ZWRFeHRyYXMucXVlcnlQYXJhbXMgPSBjb250ZXh0U25hcHNob3QucXVlcnlQYXJhbXM7XG4gICAgICAgICAgKHRoaXMuYWN0aXZhdGVkVmlldy5zYXZlZEV4dHJhcy5mcmFnbWVudCBhcyBzdHJpbmcgfCBudWxsKSA9IGNvbnRleHRTbmFwc2hvdC5mcmFnbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgYyA9IHRoaXMuY29tcG9uZW50O1xuICAgICAgdGhpcy5hY3RpdmF0ZWRWaWV3ID0gbnVsbDtcbiAgICAgIHRoaXMuYWN0aXZhdGVkID0gbnVsbDtcbiAgICAgIHRoaXMuX2FjdGl2YXRlZFJvdXRlID0gbnVsbDtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZUV2ZW50cy5lbWl0KGMpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlV2l0aChhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsIGVudmlyb25tZW50SW5qZWN0b3I6IEVudmlyb25tZW50SW5qZWN0b3IgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGFjdGl2YXRlIGFuIGFscmVhZHkgYWN0aXZhdGVkIG91dGxldCcpO1xuICAgIH1cbiAgICB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xuXG4gICAgbGV0IGNtcFJlZjogYW55O1xuICAgIGxldCBlbnRlcmluZ1ZpZXcgPSB0aGlzLnN0YWNrQ3RybC5nZXRFeGlzdGluZ1ZpZXcoYWN0aXZhdGVkUm91dGUpO1xuICAgIGlmIChlbnRlcmluZ1ZpZXcpIHtcbiAgICAgIGNtcFJlZiA9IHRoaXMuYWN0aXZhdGVkID0gZW50ZXJpbmdWaWV3LnJlZjtcbiAgICAgIGNvbnN0IHNhdmVkID0gZW50ZXJpbmdWaWV3LnNhdmVkRGF0YTtcbiAgICAgIGlmIChzYXZlZCkge1xuICAgICAgICAvLyBzZWxmLXJlc3RvcmVcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2V0Q29udGV4dCgpITtcbiAgICAgICAgY29udGV4dC5jaGlsZHJlblsnY29udGV4dHMnXSA9IHNhdmVkO1xuICAgICAgfVxuICAgICAgLy8gVXBkYXRlZCBhY3RpdmF0ZWQgcm91dGUgcHJveHkgZm9yIHRoaXMgY29tcG9uZW50XG4gICAgICB0aGlzLnVwZGF0ZUFjdGl2YXRlZFJvdXRlUHJveHkoY21wUmVmLmluc3RhbmNlLCBhY3RpdmF0ZWRSb3V0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gKGFjdGl2YXRlZFJvdXRlIGFzIGFueSkuX2Z1dHVyZVNuYXBzaG90O1xuXG4gICAgICAvKipcbiAgICAgICAqIEFuZ3VsYXIgMTQgaW50cm9kdWNlcyBhIG5ldyBgbG9hZENvbXBvbmVudGAgcHJvcGVydHkgdG8gdGhlIHJvdXRlIGNvbmZpZy5cbiAgICAgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBhc3NpZ24gYSBgY29tcG9uZW50YCBwcm9wZXJ0eSB0byB0aGUgcm91dGUgc25hcHNob3QuXG4gICAgICAgKiBXZSBjaGVjayBmb3IgdGhlIHByZXNlbmNlIG9mIHRoaXMgcHJvcGVydHkgdG8gZGV0ZXJtaW5lIGlmIHRoZSByb3V0ZSBpc1xuICAgICAgICogdXNpbmcgc3RhbmRhbG9uZSBjb21wb25lbnRzLlxuICAgICAgICovXG4gICAgICBjb25zdCBjaGlsZENvbnRleHRzID0gdGhpcy5wYXJlbnRDb250ZXh0cy5nZXRPckNyZWF0ZUNvbnRleHQodGhpcy5uYW1lKS5jaGlsZHJlbjtcblxuICAgICAgLy8gV2UgY3JlYXRlIGFuIGFjdGl2YXRlZCByb3V0ZSBwcm94eSBvYmplY3QgdGhhdCB3aWxsIG1haW50YWluIGZ1dHVyZSB1cGRhdGVzIGZvciB0aGlzIGNvbXBvbmVudFxuICAgICAgLy8gb3ZlciBpdHMgbGlmZWN5Y2xlIGluIHRoZSBzdGFjay5cbiAgICAgIGNvbnN0IGNvbXBvbmVudCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gICAgICBjb25zdCBhY3RpdmF0ZWRSb3V0ZVByb3h5ID0gdGhpcy5jcmVhdGVBY3RpdmF0ZWRSb3V0ZVByb3h5KGNvbXBvbmVudCQsIGFjdGl2YXRlZFJvdXRlKTtcblxuICAgICAgY29uc3QgaW5qZWN0b3IgPSBuZXcgT3V0bGV0SW5qZWN0b3IoYWN0aXZhdGVkUm91dGVQcm94eSwgY2hpbGRDb250ZXh0cywgdGhpcy5sb2NhdGlvbi5pbmplY3Rvcik7XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICBjb25zdCBjb21wb25lbnQgPSBzbmFwc2hvdC5yb3V0ZUNvbmZpZyEuY29tcG9uZW50ID8/IHNuYXBzaG90LmNvbXBvbmVudDtcblxuICAgICAgLyoqXG4gICAgICAgKiBWaWV3IGNvbXBvbmVudHMgbmVlZCB0byBiZSBhZGRlZCBhcyBhIGNoaWxkIG9mIGlvbi1yb3V0ZXItb3V0bGV0XG4gICAgICAgKiBmb3IgcGFnZSB0cmFuc2l0aW9ucyBhbmQgc3dpcGUgdG8gZ28gYmFjay5cbiAgICAgICAqIEhvd2V2ZXIsIGNyZWF0ZUNvbXBvbmVudCBtb3VudHMgY29tcG9uZW50cyBhcyBzaWJsaW5ncyBvZiB0aGVcbiAgICAgICAqIFZpZXdDb250YWluZXJSZWYuIEFzIGEgcmVzdWx0LCBvdXRsZXRDb250ZW50IG11c3QgcmVmZXJlbmNlXG4gICAgICAgKiBhbiBuZy1jb250YWluZXIgaW5zaWRlIG9mIGlvbi1yb3V0ZXItb3V0bGV0IGFuZCBub3RcbiAgICAgICAqIGlvbi1yb3V0ZXItb3V0bGV0IGl0c2VsZi5cbiAgICAgICAqL1xuICAgICAgY21wUmVmID0gdGhpcy5hY3RpdmF0ZWQgPSB0aGlzLm91dGxldENvbnRlbnQuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCwge1xuICAgICAgICBpbmRleDogdGhpcy5vdXRsZXRDb250ZW50Lmxlbmd0aCxcbiAgICAgICAgaW5qZWN0b3IsXG4gICAgICAgIGVudmlyb25tZW50SW5qZWN0b3I6IGVudmlyb25tZW50SW5qZWN0b3IgPz8gdGhpcy5lbnZpcm9ubWVudEluamVjdG9yLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIE9uY2UgdGhlIGNvbXBvbmVudCBpcyBjcmVhdGVkIHdlIGNhbiBwdXNoIGl0IHRvIG91ciBsb2NhbCBzdWJqZWN0IHN1cHBsaWVkIHRvIHRoZSBwcm94eVxuICAgICAgY29tcG9uZW50JC5uZXh0KGNtcFJlZi5pbnN0YW5jZSk7XG5cbiAgICAgIC8vIENhbGxpbmcgYG1hcmtGb3JDaGVja2AgdG8gbWFrZSBzdXJlIHdlIHdpbGwgcnVuIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW4gdGhlXG4gICAgICAvLyBgUm91dGVyT3V0bGV0YCBpcyBpbnNpZGUgYSBgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoYCBjb21wb25lbnQuXG5cbiAgICAgIC8qKlxuICAgICAgICogQXQgdGhpcyBwb2ludCB0aGlzLmFjdGl2YXRlZCBoYXMgYmVlbiBzZXQgZWFybGllclxuICAgICAgICogaW4gdGhpcyBmdW5jdGlvbiwgc28gaXQgaXMgZ3VhcmFudGVlZCB0byBiZSBub24tbnVsbC5cbiAgICAgICAqL1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIGVudGVyaW5nVmlldyA9IHRoaXMuc3RhY2tDdHJsLmNyZWF0ZVZpZXcodGhpcy5hY3RpdmF0ZWQhLCBhY3RpdmF0ZWRSb3V0ZSk7XG5cbiAgICAgIC8vIFN0b3JlIHJlZmVyZW5jZXMgdG8gdGhlIHByb3h5IGJ5IGNvbXBvbmVudFxuICAgICAgdGhpcy5wcm94eU1hcC5zZXQoY21wUmVmLmluc3RhbmNlLCBhY3RpdmF0ZWRSb3V0ZVByb3h5KTtcbiAgICAgIHRoaXMuY3VycmVudEFjdGl2YXRlZFJvdXRlJC5uZXh0KHsgY29tcG9uZW50OiBjbXBSZWYuaW5zdGFuY2UsIGFjdGl2YXRlZFJvdXRlIH0pO1xuICAgIH1cblxuICAgIHRoaXMuaW5wdXRCaW5kZXI/LmJpbmRBY3RpdmF0ZWRSb3V0ZVRvT3V0bGV0Q29tcG9uZW50KHRoaXMpO1xuXG4gICAgdGhpcy5hY3RpdmF0ZWRWaWV3ID0gZW50ZXJpbmdWaWV3O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRvcCBvdXRsZXQgaXMgc2V0IHByaW9yIHRvIHRoZSBlbnRlcmluZyB2aWV3J3MgdHJhbnNpdGlvbiBjb21wbGV0aW5nLFxuICAgICAqIHNvIHRoYXQgd2hlbiB3ZSBoYXZlIG5lc3RlZCBvdXRsZXRzIChlLmcuIGlvbi10YWJzIGluc2lkZSBhbiBpb24tcm91dGVyLW91dGxldCksXG4gICAgICogdGhlIHRhYnMgb3V0bGV0IHdpbGwgYmUgYXNzaWduZWQgYXMgdGhlIHRvcCBvdXRsZXQgd2hlbiBhIHZpZXcgaW5zaWRlIHRhYnMgaXNcbiAgICAgKiBhY3RpdmF0ZWQuXG4gICAgICpcbiAgICAgKiBJbiB0aGlzIHNjZW5hcmlvLCBhY3RpdmVXaXRoIGlzIGNhbGxlZCBmb3IgYm90aCB0aGUgdGFicyBhbmQgdGhlIHJvb3Qgcm91dGVyIG91dGxldC5cbiAgICAgKiBUbyBhdm9pZCBhIHJhY2UgY29uZGl0aW9uLCB3ZSBhc3NpZ24gdGhlIHRvcCBvdXRsZXQgc3luY2hyb25vdXNseS5cbiAgICAgKi9cbiAgICB0aGlzLm5hdkN0cmwuc2V0VG9wT3V0bGV0KHRoaXMpO1xuXG4gICAgY29uc3QgbGVhdmluZ1ZpZXcgPSB0aGlzLnN0YWNrQ3RybC5nZXRBY3RpdmVWaWV3KCk7XG5cbiAgICB0aGlzLnN0YWNrV2lsbENoYW5nZS5lbWl0KHtcbiAgICAgIGVudGVyaW5nVmlldyxcbiAgICAgIHRhYlN3aXRjaDogaXNUYWJTd2l0Y2goZW50ZXJpbmdWaWV3LCBsZWF2aW5nVmlldyksXG4gICAgfSk7XG5cbiAgICB0aGlzLnN0YWNrQ3RybC5zZXRBY3RpdmUoZW50ZXJpbmdWaWV3KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRlRXZlbnRzLmVtaXQoY21wUmVmLmluc3RhbmNlKTtcbiAgICAgIHRoaXMuc3RhY2tEaWRDaGFuZ2UuZW1pdChkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGVyZSBhcmUgcGFnZXMgaW4gdGhlIHN0YWNrIHRvIGdvIGJhY2suXG4gICAqL1xuICBjYW5Hb0JhY2soZGVlcCA9IDEsIHN0YWNrSWQ/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGFja0N0cmwuY2FuR29CYWNrKGRlZXAsIHN0YWNrSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRvIGB0cnVlYCBpZiBpdCB0aGUgb3V0bGV0IHdhcyBhYmxlIHRvIHN1Y2Vzc2Z1bGx5IHBvcCB0aGUgbGFzdCBOIHBhZ2VzLlxuICAgKi9cbiAgcG9wKGRlZXAgPSAxLCBzdGFja0lkPzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLnBvcChkZWVwLCBzdGFja0lkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBVUkwgb2YgdGhlIGFjdGl2ZSBwYWdlIG9mIGVhY2ggc3RhY2suXG4gICAqL1xuICBnZXRMYXN0VXJsKHN0YWNrSWQ/OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuc3RhY2tDdHJsLmdldExhc3RVcmwoc3RhY2tJZCk7XG4gICAgcmV0dXJuIGFjdGl2ZSA/IGFjdGl2ZS51cmwgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgUm91dGVWaWV3IG9mIHRoZSBhY3RpdmUgcGFnZSBvZiBlYWNoIHN0YWNrLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGdldExhc3RSb3V0ZVZpZXcoc3RhY2tJZD86IHN0cmluZyk6IFJvdXRlVmlldyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmdldExhc3RVcmwoc3RhY2tJZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCB2aWV3IGluIHRoZSB0YWIgc3RhY2suXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZ2V0Um9vdFZpZXcoc3RhY2tJZD86IHN0cmluZyk6IFJvdXRlVmlldyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmdldFJvb3RVcmwoc3RhY2tJZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYWN0aXZlIHN0YWNrIElELiBJbiB0aGUgY29udGV4dCBvZiBpb24tdGFicywgaXQgbWVhbnMgdGhlIGFjdGl2ZSB0YWIuXG4gICAqL1xuICBnZXRBY3RpdmVTdGFja0lkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RhY2tDdHJsLmdldEFjdGl2ZVN0YWNrSWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW5jZSB0aGUgYWN0aXZhdGVkIHJvdXRlIGNhbiBjaGFuZ2Ugb3ZlciB0aGUgbGlmZSB0aW1lIG9mIGEgY29tcG9uZW50IGluIGFuIGlvbiByb3V0ZXIgb3V0bGV0LCB3ZSBjcmVhdGVcbiAgICogYSBwcm94eSBzbyB0aGF0IHdlIGNhbiB1cGRhdGUgdGhlIHZhbHVlcyBvdmVyIHRpbWUgYXMgYSB1c2VyIG5hdmlnYXRlcyBiYWNrIHRvIGNvbXBvbmVudHMgYWxyZWFkeSBpbiB0aGUgc3RhY2suXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUFjdGl2YXRlZFJvdXRlUHJveHkoY29tcG9uZW50JDogT2JzZXJ2YWJsZTxhbnk+LCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpOiBBY3RpdmF0ZWRSb3V0ZSB7XG4gICAgY29uc3QgcHJveHk6IGFueSA9IG5ldyBBY3RpdmF0ZWRSb3V0ZSgpO1xuXG4gICAgcHJveHkuX2Z1dHVyZVNuYXBzaG90ID0gKGFjdGl2YXRlZFJvdXRlIGFzIGFueSkuX2Z1dHVyZVNuYXBzaG90O1xuICAgIHByb3h5Ll9yb3V0ZXJTdGF0ZSA9IChhY3RpdmF0ZWRSb3V0ZSBhcyBhbnkpLl9yb3V0ZXJTdGF0ZTtcbiAgICBwcm94eS5zbmFwc2hvdCA9IGFjdGl2YXRlZFJvdXRlLnNuYXBzaG90O1xuICAgIHByb3h5Lm91dGxldCA9IGFjdGl2YXRlZFJvdXRlLm91dGxldDtcbiAgICBwcm94eS5jb21wb25lbnQgPSBhY3RpdmF0ZWRSb3V0ZS5jb21wb25lbnQ7XG5cbiAgICAvLyBTZXR1cCB3cmFwcGVycyBmb3IgdGhlIG9ic2VydmFibGVzIHNvIGNvbnN1bWVycyBkb24ndCBoYXZlIHRvIHdvcnJ5IGFib3V0IHN3aXRjaGluZyB0byBuZXcgb2JzZXJ2YWJsZXMgYXMgdGhlIHN0YXRlIHVwZGF0ZXNcbiAgICAocHJveHkgYXMgYW55KS5fcGFyYW1NYXAgPSB0aGlzLnByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkLCAncGFyYW1NYXAnKTtcbiAgICAocHJveHkgYXMgYW55KS5fcXVlcnlQYXJhbU1hcCA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdxdWVyeVBhcmFtTWFwJyk7XG4gICAgcHJveHkudXJsID0gdGhpcy5wcm94eU9ic2VydmFibGUoY29tcG9uZW50JCwgJ3VybCcpO1xuICAgIHByb3h5LnBhcmFtcyA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdwYXJhbXMnKTtcbiAgICBwcm94eS5xdWVyeVBhcmFtcyA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdxdWVyeVBhcmFtcycpO1xuICAgIHByb3h5LmZyYWdtZW50ID0gdGhpcy5wcm94eU9ic2VydmFibGUoY29tcG9uZW50JCwgJ2ZyYWdtZW50Jyk7XG4gICAgcHJveHkuZGF0YSA9IHRoaXMucHJveHlPYnNlcnZhYmxlKGNvbXBvbmVudCQsICdkYXRhJyk7XG5cbiAgICByZXR1cm4gcHJveHkgYXMgQWN0aXZhdGVkUm91dGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgd3JhcHBlZCBvYnNlcnZhYmxlIHRoYXQgd2lsbCBzd2l0Y2ggdG8gdGhlIGxhdGVzdCBhY3RpdmF0ZWQgcm91dGUgbWF0Y2hlZCBieSB0aGUgZ2l2ZW4gY29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIHByb3h5T2JzZXJ2YWJsZShjb21wb25lbnQkOiBPYnNlcnZhYmxlPGFueT4sIHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIGNvbXBvbmVudCQucGlwZShcbiAgICAgIC8vIEZpcnN0IHdhaXQgdW50aWwgdGhlIGNvbXBvbmVudCBpbnN0YW5jZSBpcyBwdXNoZWRcbiAgICAgIGZpbHRlcigoY29tcG9uZW50KSA9PiAhIWNvbXBvbmVudCksXG4gICAgICBzd2l0Y2hNYXAoKGNvbXBvbmVudCkgPT5cbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aXZhdGVkUm91dGUkLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChjdXJyZW50KSA9PiBjdXJyZW50ICE9PSBudWxsICYmIGN1cnJlbnQuY29tcG9uZW50ID09PSBjb21wb25lbnQpLFxuICAgICAgICAgIHN3aXRjaE1hcCgoY3VycmVudCkgPT4gY3VycmVudCAmJiAoY3VycmVudC5hY3RpdmF0ZWRSb3V0ZSBhcyBhbnkpW3BhdGhdKSxcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGFjdGl2YXRlZCByb3V0ZSBwcm94eSBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudCB0byB0aGUgbmV3IGluY29taW5nIHJvdXRlciBzdGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVBY3RpdmF0ZWRSb3V0ZVByb3h5KGNvbXBvbmVudDogYW55LCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpOiB2b2lkIHtcbiAgICBjb25zdCBwcm94eSA9IHRoaXMucHJveHlNYXAuZ2V0KGNvbXBvbmVudCk7XG4gICAgaWYgKCFwcm94eSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhY3RpdmF0ZWQgcm91dGUgcHJveHkgZm9yIHZpZXdgKTtcbiAgICB9XG5cbiAgICAocHJveHkgYXMgYW55KS5fZnV0dXJlU25hcHNob3QgPSAoYWN0aXZhdGVkUm91dGUgYXMgYW55KS5fZnV0dXJlU25hcHNob3Q7XG4gICAgKHByb3h5IGFzIGFueSkuX3JvdXRlclN0YXRlID0gKGFjdGl2YXRlZFJvdXRlIGFzIGFueSkuX3JvdXRlclN0YXRlO1xuICAgIHByb3h5LnNuYXBzaG90ID0gYWN0aXZhdGVkUm91dGUuc25hcHNob3Q7XG4gICAgcHJveHkub3V0bGV0ID0gYWN0aXZhdGVkUm91dGUub3V0bGV0O1xuICAgIHByb3h5LmNvbXBvbmVudCA9IGFjdGl2YXRlZFJvdXRlLmNvbXBvbmVudDtcblxuICAgIHRoaXMuY3VycmVudEFjdGl2YXRlZFJvdXRlJC5uZXh0KHsgY29tcG9uZW50LCBhY3RpdmF0ZWRSb3V0ZSB9KTtcbiAgfVxufVxuXG5jbGFzcyBPdXRsZXRJbmplY3RvciBpbXBsZW1lbnRzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgY2hpbGRDb250ZXh0czogQ2hpbGRyZW5PdXRsZXRDb250ZXh0cywgcHJpdmF0ZSBwYXJlbnQ6IEluamVjdG9yKSB7fVxuXG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KTogYW55IHtcbiAgICBpZiAodG9rZW4gPT09IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZTtcbiAgICB9XG5cbiAgICBpZiAodG9rZW4gPT09IENoaWxkcmVuT3V0bGV0Q29udGV4dHMpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkQ29udGV4dHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmdldCh0b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG4gIH1cbn1cblxuLy8gVE9ETzogRlctNDc4NSAtIFJlbW92ZSB0aGlzIG9uY2UgQW5ndWxhciAxNSBzdXBwb3J0IGlzIGRyb3BwZWRcbmNvbnN0IElOUFVUX0JJTkRFUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxSb3V0ZWRDb21wb25lbnRJbnB1dEJpbmRlcj4oJycpO1xuXG4vKipcbiAqIEluamVjdGFibGUgdXNlZCBhcyBhIHRyZWUtc2hha2FibGUgcHJvdmlkZXIgZm9yIG9wdGluZyBpbiB0byBiaW5kaW5nIHJvdXRlciBkYXRhIHRvIGNvbXBvbmVudFxuICogaW5wdXRzLlxuICpcbiAqIFRoZSBSb3V0ZXJPdXRsZXQgcmVnaXN0ZXJzIGl0c2VsZiB3aXRoIHRoaXMgc2VydmljZSB3aGVuIGFuIGBBY3RpdmF0ZWRSb3V0ZWAgaXMgYXR0YWNoZWQgb3JcbiAqIGFjdGl2YXRlZC4gV2hlbiB0aGlzIGhhcHBlbnMsIHRoZSBzZXJ2aWNlIHN1YnNjcmliZXMgdG8gdGhlIGBBY3RpdmF0ZWRSb3V0ZWAgb2JzZXJ2YWJsZXMgKHBhcmFtcyxcbiAqIHF1ZXJ5UGFyYW1zLCBkYXRhKSBhbmQgc2V0cyB0aGUgaW5wdXRzIG9mIHRoZSBjb21wb25lbnQgdXNpbmcgYENvbXBvbmVudFJlZi5zZXRJbnB1dGAuXG4gKiBJbXBvcnRhbnRseSwgd2hlbiBhbiBpbnB1dCBkb2VzIG5vdCBoYXZlIGFuIGl0ZW0gaW4gdGhlIHJvdXRlIGRhdGEgd2l0aCBhIG1hdGNoaW5nIGtleSwgdGhpc1xuICogaW5wdXQgaXMgc2V0IHRvIGB1bmRlZmluZWRgLiBJZiBpdCB3ZXJlIG5vdCBkb25lIHRoaXMgd2F5LCB0aGUgcHJldmlvdXMgaW5mb3JtYXRpb24gd291bGQgYmVcbiAqIHJldGFpbmVkIGlmIHRoZSBkYXRhIGdvdCByZW1vdmVkIGZyb20gdGhlIHJvdXRlIChpLmUuIGlmIGEgcXVlcnkgcGFyYW1ldGVyIGlzIHJlbW92ZWQpLlxuICpcbiAqIFRoZSBgUm91dGVyT3V0bGV0YCBzaG91bGQgdW5yZWdpc3RlciBpdHNlbGYgd2hlbiBkZXN0cm95ZWQgdmlhIGB1bnN1YnNjcmliZUZyb21Sb3V0ZURhdGFgIHNvIHRoYXRcbiAqIHRoZSBzdWJzY3JpcHRpb25zIGFyZSBjbGVhbmVkIHVwLlxuICovXG5ASW5qZWN0YWJsZSgpXG5jbGFzcyBSb3V0ZWRDb21wb25lbnRJbnB1dEJpbmRlciB7XG4gIHByaXZhdGUgb3V0bGV0RGF0YVN1YnNjcmlwdGlvbnMgPSBuZXcgTWFwPElvblJvdXRlck91dGxldCwgU3Vic2NyaXB0aW9uPigpO1xuXG4gIGJpbmRBY3RpdmF0ZWRSb3V0ZVRvT3V0bGV0Q29tcG9uZW50KG91dGxldDogSW9uUm91dGVyT3V0bGV0KTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZUZyb21Sb3V0ZURhdGEob3V0bGV0KTtcbiAgICB0aGlzLnN1YnNjcmliZVRvUm91dGVEYXRhKG91dGxldCk7XG4gIH1cblxuICB1bnN1YnNjcmliZUZyb21Sb3V0ZURhdGEob3V0bGV0OiBJb25Sb3V0ZXJPdXRsZXQpOiB2b2lkIHtcbiAgICB0aGlzLm91dGxldERhdGFTdWJzY3JpcHRpb25zLmdldChvdXRsZXQpPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMub3V0bGV0RGF0YVN1YnNjcmlwdGlvbnMuZGVsZXRlKG91dGxldCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvUm91dGVEYXRhKG91dGxldDogSW9uUm91dGVyT3V0bGV0KSB7XG4gICAgY29uc3QgeyBhY3RpdmF0ZWRSb3V0ZSB9ID0gb3V0bGV0O1xuICAgIGNvbnN0IGRhdGFTdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KFthY3RpdmF0ZWRSb3V0ZS5xdWVyeVBhcmFtcywgYWN0aXZhdGVkUm91dGUucGFyYW1zLCBhY3RpdmF0ZWRSb3V0ZS5kYXRhXSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKFtxdWVyeVBhcmFtcywgcGFyYW1zLCBkYXRhXSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBkYXRhID0geyAuLi5xdWVyeVBhcmFtcywgLi4ucGFyYW1zLCAuLi5kYXRhIH07XG4gICAgICAgICAgLy8gR2V0IHRoZSBmaXJzdCByZXN1bHQgZnJvbSB0aGUgZGF0YSBzdWJzY3JpcHRpb24gc3luY2hyb25vdXNseSBzbyBpdCdzIGF2YWlsYWJsZSB0b1xuICAgICAgICAgIC8vIHRoZSBjb21wb25lbnQgYXMgc29vbiBhcyBwb3NzaWJsZSAoYW5kIGRvZXNuJ3QgcmVxdWlyZSBhIHNlY29uZCBjaGFuZ2UgZGV0ZWN0aW9uKS5cbiAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBvZihkYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUHJvbWlzZS5yZXNvbHZlIGlzIHVzZWQgdG8gYXZvaWQgc3luY2hyb25vdXNseSB3cml0aW5nIHRoZSB3cm9uZyBkYXRhIHdoZW5cbiAgICAgICAgICAvLyB0d28gb2YgdGhlIE9ic2VydmFibGVzIGluIHRoZSBgY29tYmluZUxhdGVzdGAgc3RyZWFtIGVtaXQgb25lIGFmdGVyXG4gICAgICAgICAgLy8gYW5vdGhlci5cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAvLyBPdXRsZXQgbWF5IGhhdmUgYmVlbiBkZWFjdGl2YXRlZCBvciBjaGFuZ2VkIG5hbWVzIHRvIGJlIGFzc29jaWF0ZWQgd2l0aCBhIGRpZmZlcmVudFxuICAgICAgICAvLyByb3V0ZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIW91dGxldC5pc0FjdGl2YXRlZCB8fFxuICAgICAgICAgICFvdXRsZXQuYWN0aXZhdGVkQ29tcG9uZW50UmVmIHx8XG4gICAgICAgICAgb3V0bGV0LmFjdGl2YXRlZFJvdXRlICE9PSBhY3RpdmF0ZWRSb3V0ZSB8fFxuICAgICAgICAgIGFjdGl2YXRlZFJvdXRlLmNvbXBvbmVudCA9PT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbVJvdXRlRGF0YShvdXRsZXQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1pcnJvciA9IHJlZmxlY3RDb21wb25lbnRUeXBlKGFjdGl2YXRlZFJvdXRlLmNvbXBvbmVudCk7XG4gICAgICAgIGlmICghbWlycm9yKSB7XG4gICAgICAgICAgdGhpcy51bnN1YnNjcmliZUZyb21Sb3V0ZURhdGEob3V0bGV0KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHsgdGVtcGxhdGVOYW1lIH0gb2YgbWlycm9yLmlucHV0cykge1xuICAgICAgICAgIG91dGxldC5hY3RpdmF0ZWRDb21wb25lbnRSZWYuc2V0SW5wdXQodGVtcGxhdGVOYW1lLCBkYXRhW3RlbXBsYXRlTmFtZV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMub3V0bGV0RGF0YVN1YnNjcmlwdGlvbnMuc2V0KG91dGxldCwgZGF0YVN1YnNjcmlwdGlvbik7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHByb3ZpZGVDb21wb25lbnRJbnB1dEJpbmRpbmcgPSAoKTogUHJvdmlkZXIgPT4ge1xuICByZXR1cm4ge1xuICAgIHByb3ZpZGU6IElOUFVUX0JJTkRFUixcbiAgICB1c2VGYWN0b3J5OiBjb21wb25lbnRJbnB1dEJpbmRpbmdGYWN0b3J5LFxuICAgIGRlcHM6IFtSb3V0ZXJdLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY29tcG9uZW50SW5wdXRCaW5kaW5nRmFjdG9yeShyb3V0ZXI/OiBSb3V0ZXIpIHtcbiAgLyoqXG4gICAqIFdlIGNhc3QgdGhlIHJvdXRlciB0byBhbnkgaGVyZSwgc2luY2UgdGhlIGNvbXBvbmVudElucHV0QmluZGluZ0VuYWJsZWRcbiAgICogcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZSB1bnRpbCBBbmd1bGFyIHYxNi5cbiAgICovXG4gIGlmICgocm91dGVyIGFzIGFueSk/LmNvbXBvbmVudElucHV0QmluZGluZ0VuYWJsZWQpIHtcbiAgICByZXR1cm4gbmV3IFJvdXRlZENvbXBvbmVudElucHV0QmluZGVyKCk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=