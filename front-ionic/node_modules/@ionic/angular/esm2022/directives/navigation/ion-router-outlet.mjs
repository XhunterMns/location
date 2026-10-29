import { ViewChild, ViewContainerRef, Component, Attribute, Optional, SkipSelf, } from '@angular/core';
import { IonRouterOutlet as IonRouterOutletBase } from '@ionic/angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
class IonRouterOutlet extends IonRouterOutletBase {
    parentOutlet;
    /**
     * `static: true` must be set so the query results are resolved
     * before change detection runs. Otherwise, the view container
     * ref will be ion-router-outlet instead of ng-container, and
     * the first view will be added as a sibling of ion-router-outlet
     * instead of a child.
     */
    outletContent;
    /**
     * We need to pass in the correct instance of IonRouterOutlet
     * otherwise parentOutlet will be null in a nested outlet context.
     * This results in APIs such as NavController.pop not working
     * in nested outlets because the parent outlet cannot be found.
     */
    constructor(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet) {
        super(name, tabs, commonLocation, elementRef, router, zone, activatedRoute, parentOutlet);
        this.parentOutlet = parentOutlet;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRouterOutlet, deps: [{ token: 'name', attribute: true }, { token: 'tabs', attribute: true, optional: true }, { token: i1.Location }, { token: i0.ElementRef }, { token: i2.Router }, { token: i0.NgZone }, { token: i2.ActivatedRoute }, { token: IonRouterOutlet, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRouterOutlet, selector: "ion-router-outlet", viewQueries: [{ propertyName: "outletContent", first: true, predicate: ["outletContent"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, ngImport: i0, template: '<ng-container #outletContent><ng-content></ng-content></ng-container>', isInline: true });
}
export { IonRouterOutlet };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRouterOutlet, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-router-outlet',
                    template: '<ng-container #outletContent><ng-content></ng-content></ng-container>',
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
                }] }]; }, propDecorators: { outletContent: [{
                type: ViewChild,
                args: ['outletContent', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLXJvdXRlci1vdXRsZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL2lvbi1yb3V0ZXItb3V0bGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsR0FHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxJQUFJLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFFL0UsTUFLYSxlQUFnQixTQUFRLG1CQUFtQjtJQXdCbkI7SUF2Qm5DOzs7Ozs7T0FNRztJQUNtRSxhQUFhLENBQW1CO0lBRXRHOzs7OztPQUtHO0lBQ0gsWUFDcUIsSUFBWSxFQUNBLElBQVksRUFDM0MsY0FBd0IsRUFDeEIsVUFBc0IsRUFDdEIsTUFBYyxFQUNkLElBQVksRUFDWixjQUE4QixFQUNHLFlBQThCO1FBRS9ELEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFGekQsaUJBQVksR0FBWixZQUFZLENBQWtCO0lBR2pFLENBQUM7MkhBM0JVLGVBQWUsa0JBaUJiLE1BQU0sOEJBQ00sTUFBTTsrR0FsQnBCLGVBQWUsb0pBUVUsZ0JBQWdCLGtFQVgxQyx1RUFBdUU7O1NBR3RFLGVBQWU7NEZBQWYsZUFBZTtrQkFMM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsdUVBQXVFO2lCQUNsRjs7MEJBbUJJLFNBQVM7MkJBQUMsTUFBTTs7MEJBQ2hCLFFBQVE7OzBCQUFJLFNBQVM7MkJBQUMsTUFBTTs7MEJBTTVCLFFBQVE7OzBCQUFJLFFBQVE7NENBaEIrQyxhQUFhO3NCQUFsRixTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDb21wb25lbnQsXG4gIEF0dHJpYnV0ZSxcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBFbGVtZW50UmVmLFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgYXMgSW9uUm91dGVyT3V0bGV0QmFzZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1yb3V0ZXItb3V0bGV0JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGFpbmVyICNvdXRsZXRDb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L25nLWNvbnRhaW5lcj4nLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIElvblJvdXRlck91dGxldCBleHRlbmRzIElvblJvdXRlck91dGxldEJhc2Uge1xuICAvKipcbiAgICogYHN0YXRpYzogdHJ1ZWAgbXVzdCBiZSBzZXQgc28gdGhlIHF1ZXJ5IHJlc3VsdHMgYXJlIHJlc29sdmVkXG4gICAqIGJlZm9yZSBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMuIE90aGVyd2lzZSwgdGhlIHZpZXcgY29udGFpbmVyXG4gICAqIHJlZiB3aWxsIGJlIGlvbi1yb3V0ZXItb3V0bGV0IGluc3RlYWQgb2YgbmctY29udGFpbmVyLCBhbmRcbiAgICogdGhlIGZpcnN0IHZpZXcgd2lsbCBiZSBhZGRlZCBhcyBhIHNpYmxpbmcgb2YgaW9uLXJvdXRlci1vdXRsZXRcbiAgICogaW5zdGVhZCBvZiBhIGNoaWxkLlxuICAgKi9cbiAgQFZpZXdDaGlsZCgnb3V0bGV0Q29udGVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIG91dGxldENvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgLyoqXG4gICAqIFdlIG5lZWQgdG8gcGFzcyBpbiB0aGUgY29ycmVjdCBpbnN0YW5jZSBvZiBJb25Sb3V0ZXJPdXRsZXRcbiAgICogb3RoZXJ3aXNlIHBhcmVudE91dGxldCB3aWxsIGJlIG51bGwgaW4gYSBuZXN0ZWQgb3V0bGV0IGNvbnRleHQuXG4gICAqIFRoaXMgcmVzdWx0cyBpbiBBUElzIHN1Y2ggYXMgTmF2Q29udHJvbGxlci5wb3Agbm90IHdvcmtpbmdcbiAgICogaW4gbmVzdGVkIG91dGxldHMgYmVjYXVzZSB0aGUgcGFyZW50IG91dGxldCBjYW5ub3QgYmUgZm91bmQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAQXR0cmlidXRlKCduYW1lJykgbmFtZTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBBdHRyaWJ1dGUoJ3RhYnMnKSB0YWJzOiBzdHJpbmcsXG4gICAgY29tbW9uTG9jYXRpb246IExvY2F0aW9uLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgem9uZTogTmdab25lLFxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSByZWFkb25seSBwYXJlbnRPdXRsZXQ/OiBJb25Sb3V0ZXJPdXRsZXRcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgdGFicywgY29tbW9uTG9jYXRpb24sIGVsZW1lbnRSZWYsIHJvdXRlciwgem9uZSwgYWN0aXZhdGVkUm91dGUsIHBhcmVudE91dGxldCk7XG4gIH1cbn1cbiJdfQ==