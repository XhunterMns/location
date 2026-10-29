import { __decorate } from "tslib";
import { ViewChild, ViewContainerRef, Component, Attribute, Optional, SkipSelf, } from '@angular/core';
import { IonRouterOutlet as IonRouterOutletBase, ProxyCmp } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-router-outlet.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
let IonRouterOutlet = class IonRouterOutlet extends IonRouterOutletBase {
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
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRouterOutlet, isStandalone: true, selector: "ion-router-outlet", viewQueries: [{ propertyName: "outletContent", first: true, predicate: ["outletContent"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, ngImport: i0, template: '<ng-container #outletContent><ng-content></ng-content></ng-container>', isInline: true });
};
IonRouterOutlet = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
    })
], IonRouterOutlet);
export { IonRouterOutlet };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRouterOutlet, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-router-outlet',
                    standalone: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLW91dGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3N0YW5kYWxvbmUvc3JjL25hdmlnYXRpb24vcm91dGVyLW91dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxHQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLElBQUksbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7Ozs7QUFLbEYsSUFNYSxlQUFlLEdBTjVCLE1BTWEsZUFBZ0IsU0FBUSxtQkFBbUI7SUF3Qm5CO0lBdkJuQzs7Ozs7O09BTUc7SUFDbUUsYUFBYSxDQUFtQjtJQUV0Rzs7Ozs7T0FLRztJQUNILFlBQ3FCLElBQVksRUFDQSxJQUFZLEVBQzNDLGNBQXdCLEVBQ3hCLFVBQXNCLEVBQ3RCLE1BQWMsRUFDZCxJQUFZLEVBQ1osY0FBOEIsRUFDRyxZQUE4QjtRQUUvRCxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRnpELGlCQUFZLEdBQVosWUFBWSxDQUFrQjtJQUdqRSxDQUFDOzJIQTNCVSxlQUFlLGtCQWlCYixNQUFNLDhCQUNNLE1BQU07K0dBbEJwQixlQUFlLHdLQVFVLGdCQUFnQixrRUFYMUMsdUVBQXVFOztBQUd0RSxlQUFlO0lBVDNCLFFBQVEsQ0FBQztRQUNSLHFCQUFxQixFQUFFLG1CQUFtQjtLQUMzQyxDQUFDO0dBT1csZUFBZSxDQTRCM0I7U0E1QlksZUFBZTs0RkFBZixlQUFlO2tCQU4zQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsdUVBQXVFO2lCQUNsRjs7MEJBbUJJLFNBQVM7MkJBQUMsTUFBTTs7MEJBQ2hCLFFBQVE7OzBCQUFJLFNBQVM7MkJBQUMsTUFBTTs7MEJBTTVCLFFBQVE7OzBCQUFJLFFBQVE7NENBaEIrQyxhQUFhO3NCQUFsRixTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDb21wb25lbnQsXG4gIEF0dHJpYnV0ZSxcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBFbGVtZW50UmVmLFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgYXMgSW9uUm91dGVyT3V0bGV0QmFzZSwgUHJveHlDbXAgfSBmcm9tICdAaW9uaWMvYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgZGVmaW5lQ3VzdG9tRWxlbWVudCB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMvaW9uLXJvdXRlci1vdXRsZXQuanMnO1xuXG5AUHJveHlDbXAoe1xuICBkZWZpbmVDdXN0b21FbGVtZW50Rm46IGRlZmluZUN1c3RvbUVsZW1lbnQsXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXJvdXRlci1vdXRsZXQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250YWluZXIgI291dGxldENvbnRlbnQ+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctY29udGFpbmVyPicsXG59KVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgSW9uUm91dGVyT3V0bGV0IGV4dGVuZHMgSW9uUm91dGVyT3V0bGV0QmFzZSB7XG4gIC8qKlxuICAgKiBgc3RhdGljOiB0cnVlYCBtdXN0IGJlIHNldCBzbyB0aGUgcXVlcnkgcmVzdWx0cyBhcmUgcmVzb2x2ZWRcbiAgICogYmVmb3JlIGNoYW5nZSBkZXRlY3Rpb24gcnVucy4gT3RoZXJ3aXNlLCB0aGUgdmlldyBjb250YWluZXJcbiAgICogcmVmIHdpbGwgYmUgaW9uLXJvdXRlci1vdXRsZXQgaW5zdGVhZCBvZiBuZy1jb250YWluZXIsIGFuZFxuICAgKiB0aGUgZmlyc3QgdmlldyB3aWxsIGJlIGFkZGVkIGFzIGEgc2libGluZyBvZiBpb24tcm91dGVyLW91dGxldFxuICAgKiBpbnN0ZWFkIG9mIGEgY2hpbGQuXG4gICAqL1xuICBAVmlld0NoaWxkKCdvdXRsZXRDb250ZW50JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgb3V0bGV0Q29udGVudDogVmlld0NvbnRhaW5lclJlZjtcblxuICAvKipcbiAgICogV2UgbmVlZCB0byBwYXNzIGluIHRoZSBjb3JyZWN0IGluc3RhbmNlIG9mIElvblJvdXRlck91dGxldFxuICAgKiBvdGhlcndpc2UgcGFyZW50T3V0bGV0IHdpbGwgYmUgbnVsbCBpbiBhIG5lc3RlZCBvdXRsZXQgY29udGV4dC5cbiAgICogVGhpcyByZXN1bHRzIGluIEFQSXMgc3VjaCBhcyBOYXZDb250cm9sbGVyLnBvcCBub3Qgd29ya2luZ1xuICAgKiBpbiBuZXN0ZWQgb3V0bGV0cyBiZWNhdXNlIHRoZSBwYXJlbnQgb3V0bGV0IGNhbm5vdCBiZSBmb3VuZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBBdHRyaWJ1dGUoJ25hbWUnKSBuYW1lOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEF0dHJpYnV0ZSgndGFicycpIHRhYnM6IHN0cmluZyxcbiAgICBjb21tb25Mb2NhdGlvbjogTG9jYXRpb24sXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICByb3V0ZXI6IFJvdXRlcixcbiAgICB6b25lOiBOZ1pvbmUsXG4gICAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIHJlYWRvbmx5IHBhcmVudE91dGxldD86IElvblJvdXRlck91dGxldFxuICApIHtcbiAgICBzdXBlcihuYW1lLCB0YWJzLCBjb21tb25Mb2NhdGlvbiwgZWxlbWVudFJlZiwgcm91dGVyLCB6b25lLCBhY3RpdmF0ZWRSb3V0ZSwgcGFyZW50T3V0bGV0KTtcbiAgfVxufVxuIl19