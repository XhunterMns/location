import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { IonNav as IonNavBase, ProxyCmp } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-nav.js';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular/common";
let IonNav = class IonNav extends IonNavBase {
    constructor(ref, environmentInjector, injector, angularDelegate, z, c) {
        super(ref, environmentInjector, injector, angularDelegate, z, c);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonNav, deps: [{ token: i0.ElementRef }, { token: i0.EnvironmentInjector }, { token: i0.Injector }, { token: i1.AngularDelegate }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonNav, isStandalone: true, selector: "ion-nav", usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
};
IonNav = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
    })
], IonNav);
export { IonNav };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonNav, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-nav',
                    template: '<ng-content></ng-content>',
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.EnvironmentInjector }, { type: i0.Injector }, { type: i1.AngularDelegate }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3RhbmRhbG9uZS9zcmMvbmF2aWdhdGlvbi9uYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXdFLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxNQUFNLElBQUksVUFBVSxFQUFFLFFBQVEsRUFBbUIsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7O0FBS3hFLElBS2EsTUFBTSxHQUxuQixNQUthLE1BQU8sU0FBUSxVQUFVO0lBQ3BDLFlBQ0UsR0FBZSxFQUNmLG1CQUF3QyxFQUN4QyxRQUFrQixFQUNsQixlQUFnQyxFQUNoQyxDQUFTLEVBQ1QsQ0FBb0I7UUFFcEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDOzJIQVZVLE1BQU07K0dBQU4sTUFBTSwwRkFIUCwyQkFBMkI7O0FBRzFCLE1BQU07SUFSbEIsUUFBUSxDQUFDO1FBQ1IscUJBQXFCLEVBQUUsbUJBQW1CO0tBQzNDLENBQUM7R0FNVyxNQUFNLENBV2xCO1NBWFksTUFBTTs0RkFBTixNQUFNO2tCQUxsQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxVQUFVLEVBQUUsSUFBSTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBFbnZpcm9ubWVudEluamVjdG9yLCBOZ1pvbmUsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJb25OYXYgYXMgSW9uTmF2QmFzZSwgUHJveHlDbXAsIEFuZ3VsYXJEZWxlZ2F0ZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBkZWZpbmVDdXN0b21FbGVtZW50IH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cy9pb24tbmF2LmpzJztcblxuQFByb3h5Q21wKHtcbiAgZGVmaW5lQ3VzdG9tRWxlbWVudEZuOiBkZWZpbmVDdXN0b21FbGVtZW50LFxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1uYXYnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBJb25OYXYgZXh0ZW5kcyBJb25OYXZCYXNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcmVmOiBFbGVtZW50UmVmLFxuICAgIGVudmlyb25tZW50SW5qZWN0b3I6IEVudmlyb25tZW50SW5qZWN0b3IsXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIGFuZ3VsYXJEZWxlZ2F0ZTogQW5ndWxhckRlbGVnYXRlLFxuICAgIHo6IE5nWm9uZSxcbiAgICBjOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICBzdXBlcihyZWYsIGVudmlyb25tZW50SW5qZWN0b3IsIGluamVjdG9yLCBhbmd1bGFyRGVsZWdhdGUsIHosIGMpO1xuICB9XG59XG4iXX0=