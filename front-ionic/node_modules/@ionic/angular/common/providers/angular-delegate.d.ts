import { ApplicationRef, ComponentRef, EnvironmentInjector, InjectionToken, Injector, NgZone } from '@angular/core';
import { FrameworkDelegate } from '@ionic/core/components';
import * as i0 from "@angular/core";
export declare const IonModalToken: InjectionToken<HTMLIonModalElement>;
export declare class AngularDelegate {
    private zone;
    private applicationRef;
    private config;
    create(environmentInjector: EnvironmentInjector, injector: Injector, elementReferenceKey?: string, customInjector?: Injector): AngularFrameworkDelegate;
    static ɵfac: i0.ɵɵFactoryDeclaration<AngularDelegate, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AngularDelegate>;
}
export declare class AngularFrameworkDelegate implements FrameworkDelegate {
    private environmentInjector;
    private injector;
    private applicationRef;
    private zone;
    private elementReferenceKey?;
    private enableSignalsSupport?;
    private customInjector?;
    private elRefMap;
    private elEventsMap;
    constructor(environmentInjector: EnvironmentInjector, injector: Injector, applicationRef: ApplicationRef, zone: NgZone, elementReferenceKey?: string | undefined, enableSignalsSupport?: boolean | undefined, customInjector?: Injector | undefined);
    attachViewToDom(container: any, component: any, params?: any, cssClasses?: string[]): Promise<any>;
    removeViewFromDom(_container: any, component: any): Promise<void>;
}
export declare const attachView: (zone: NgZone, environmentInjector: EnvironmentInjector, injector: Injector, applicationRef: ApplicationRef, elRefMap: WeakMap<HTMLElement, ComponentRef<any>>, elEventsMap: WeakMap<HTMLElement, () => void>, container: any, component: any, params: any, cssClasses: string[] | undefined, elementReferenceKey: string | undefined, enableSignalsSupport: boolean | undefined, customInjector?: Injector) => any;
export declare const bindLifecycleEvents: (zone: NgZone, instance: any, element: HTMLElement) => (() => void);
