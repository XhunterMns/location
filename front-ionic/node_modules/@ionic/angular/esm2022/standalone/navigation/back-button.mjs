import { __decorate } from "tslib";
import { Component, Optional, ChangeDetectionStrategy } from '@angular/core';
import { IonBackButton as IonBackButtonBase, ProxyCmp } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-back-button.js';
import * as i0 from "@angular/core";
import * as i1 from "./router-outlet";
import * as i2 from "@ionic/angular/common";
let IonBackButton = class IonBackButton extends IonBackButtonBase {
    constructor(routerOutlet, navCtrl, config, r, z, c) {
        super(routerOutlet, navCtrl, config, r, z, c);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBackButton, deps: [{ token: i1.IonRouterOutlet, optional: true }, { token: i2.NavController }, { token: i2.Config }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonBackButton, isStandalone: true, selector: "ion-back-button", usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonBackButton = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
    })
], IonBackButton);
export { IonBackButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBackButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-back-button',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i1.IonRouterOutlet, decorators: [{
                    type: Optional
                }] }, { type: i2.NavController }, { type: i2.Config }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9uYXZpZ2F0aW9uL2JhY2stYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBeUMsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLGFBQWEsSUFBSSxpQkFBaUIsRUFBeUIsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7Ozs7QUFPaEYsSUFPYSxhQUFhLEdBUDFCLE1BT2EsYUFBYyxTQUFRLGlCQUFpQjtJQUNsRCxZQUNjLFlBQTZCLEVBQ3pDLE9BQXNCLEVBQ3RCLE1BQWMsRUFDZCxDQUFhLEVBQ2IsQ0FBUyxFQUNULENBQW9CO1FBRXBCLEtBQUssQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7MkhBVlUsYUFBYTsrR0FBYixhQUFhLGtHQUpkLDJCQUEyQjs7QUFJMUIsYUFBYTtJQVZ6QixRQUFRLENBQUM7UUFDUixxQkFBcUIsRUFBRSxtQkFBbUI7S0FDM0MsQ0FBQztHQVFXLGFBQWEsQ0FXekI7U0FYWSxhQUFhOzRGQUFiLGFBQWE7a0JBUHpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs7MEJBSUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT3B0aW9uYWwsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBFbGVtZW50UmVmLCBOZ1pvbmUsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJb25CYWNrQnV0dG9uIGFzIElvbkJhY2tCdXR0b25CYXNlLCBOYXZDb250cm9sbGVyLCBDb25maWcsIFByb3h5Q21wIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGRlZmluZUN1c3RvbUVsZW1lbnQgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzL2lvbi1iYWNrLWJ1dHRvbi5qcyc7XG5cbmltcG9ydCB7IElvblJvdXRlck91dGxldCB9IGZyb20gJy4vcm91dGVyLW91dGxldCc7XG5cbkBQcm94eUNtcCh7XG4gIGRlZmluZUN1c3RvbUVsZW1lbnRGbjogZGVmaW5lQ3VzdG9tRWxlbWVudCxcbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tYmFjay1idXR0b24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBJb25CYWNrQnV0dG9uIGV4dGVuZHMgSW9uQmFja0J1dHRvbkJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSByb3V0ZXJPdXRsZXQ6IElvblJvdXRlck91dGxldCxcbiAgICBuYXZDdHJsOiBOYXZDb250cm9sbGVyLFxuICAgIGNvbmZpZzogQ29uZmlnLFxuICAgIHI6IEVsZW1lbnRSZWYsXG4gICAgejogTmdab25lLFxuICAgIGM6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHN1cGVyKHJvdXRlck91dGxldCwgbmF2Q3RybCwgY29uZmlnLCByLCB6LCBjKTtcbiAgfVxufVxuIl19