import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonPopover as IonPopoverBase, ProxyCmp } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-popover.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
let IonPopover = class IonPopover extends IonPopoverBase {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPopover, deps: null, target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonPopover, isStandalone: true, selector: "ion-popover", usesInheritance: true, ngImport: i0, template: `<ng-container [ngTemplateOutlet]="template" *ngIf="isCmpOpen || keepContentsMounted"></ng-container>`, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonPopover = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
    })
], IonPopover);
export { IonPopover };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPopover, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-popover',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<ng-container [ngTemplateOutlet]="template" *ngIf="isCmpOpen || keepContentsMounted"></ng-container>`,
                    standalone: true,
                    imports: [CommonModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3N0YW5kYWxvbmUvc3JjL292ZXJsYXlzL3BvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxVQUFVLElBQUksY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7QUFLNUUsSUFPYSxVQUFVLEdBUHZCLE1BT2EsVUFBVyxTQUFRLGNBQWM7MkhBQWpDLFVBQVU7K0dBQVYsVUFBVSw4RkFKWCxzR0FBc0csMkRBRXRHLFlBQVk7O0FBRVgsVUFBVTtJQVZ0QixRQUFRLENBQUM7UUFDUixxQkFBcUIsRUFBRSxtQkFBbUI7S0FDM0MsQ0FBQztHQVFXLFVBQVUsQ0FBMEI7U0FBcEMsVUFBVTs0RkFBVixVQUFVO2tCQVB0QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLHNHQUFzRztvQkFDaEgsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW9uUG9wb3ZlciBhcyBJb25Qb3BvdmVyQmFzZSwgUHJveHlDbXAgfSBmcm9tICdAaW9uaWMvYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgZGVmaW5lQ3VzdG9tRWxlbWVudCB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMvaW9uLXBvcG92ZXIuanMnO1xuXG5AUHJveHlDbXAoe1xuICBkZWZpbmVDdXN0b21FbGVtZW50Rm46IGRlZmluZUN1c3RvbUVsZW1lbnQsXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXBvcG92ZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCIgKm5nSWY9XCJpc0NtcE9wZW4gfHwga2VlcENvbnRlbnRzTW91bnRlZFwiPjwvbmctY29udGFpbmVyPmAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBJb25Qb3BvdmVyIGV4dGVuZHMgSW9uUG9wb3ZlckJhc2Uge31cbiJdfQ==