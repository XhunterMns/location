import { Optional, Component, ChangeDetectionStrategy } from '@angular/core';
import { IonBackButton as IonBackButtonBase } from '@ionic/angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./ion-router-outlet";
import * as i2 from "@ionic/angular/common";
class IonBackButton extends IonBackButtonBase {
    constructor(routerOutlet, navCtrl, config, r, z, c) {
        super(routerOutlet, navCtrl, config, r, z, c);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBackButton, deps: [{ token: i1.IonRouterOutlet, optional: true }, { token: i2.NavController }, { token: i2.Config }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonBackButton, selector: "ion-back-button", usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
export { IonBackButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBackButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-back-button',
                    template: '<ng-content></ng-content>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.IonRouterOutlet, decorators: [{
                    type: Optional
                }] }, { type: i2.NavController }, { type: i2.Config }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLWJhY2stYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tYmFjay1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBeUMsU0FBUyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxhQUFhLElBQUksaUJBQWlCLEVBQXlCLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFJbEcsTUFNYSxhQUFjLFNBQVEsaUJBQWlCO0lBQ2xELFlBQ2MsWUFBNkIsRUFDekMsT0FBc0IsRUFDdEIsTUFBYyxFQUNkLENBQWEsRUFDYixDQUFTLEVBQ1QsQ0FBb0I7UUFFcEIsS0FBSyxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzsySEFWVSxhQUFhOytHQUFiLGFBQWEsOEVBSmQsMkJBQTJCOztTQUkxQixhQUFhOzRGQUFiLGFBQWE7a0JBTnpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkFJSSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3B0aW9uYWwsIEVsZW1lbnRSZWYsIE5nWm9uZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElvbkJhY2tCdXR0b24gYXMgSW9uQmFja0J1dHRvbkJhc2UsIE5hdkNvbnRyb2xsZXIsIENvbmZpZyB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IElvblJvdXRlck91dGxldCB9IGZyb20gJy4vaW9uLXJvdXRlci1vdXRsZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tYmFjay1idXR0b24nLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBJb25CYWNrQnV0dG9uIGV4dGVuZHMgSW9uQmFja0J1dHRvbkJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSByb3V0ZXJPdXRsZXQ6IElvblJvdXRlck91dGxldCxcbiAgICBuYXZDdHJsOiBOYXZDb250cm9sbGVyLFxuICAgIGNvbmZpZzogQ29uZmlnLFxuICAgIHI6IEVsZW1lbnRSZWYsXG4gICAgejogTmdab25lLFxuICAgIGM6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHN1cGVyKHJvdXRlck91dGxldCwgbmF2Q3RybCwgY29uZmlnLCByLCB6LCBjKTtcbiAgfVxufVxuIl19