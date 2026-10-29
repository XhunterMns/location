import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonPopover as IonPopoverBase } from '@ionic/angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
class IonPopover extends IonPopoverBase {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPopover, deps: null, target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonPopover, selector: "ion-popover", usesInheritance: true, ngImport: i0, template: `<ng-container [ngTemplateOutlet]="template" *ngIf="isCmpOpen || keepContentsMounted"></ng-container>`, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
export { IonPopover };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPopover, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-popover',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<ng-container [ngTemplateOutlet]="template" *ngIf="isCmpOpen || keepContentsMounted"></ng-container>`,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaXJlY3RpdmVzL292ZXJsYXlzL3BvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxJQUFJLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFFckUsTUFLYSxVQUFXLFNBQVEsY0FBYzsySEFBakMsVUFBVTsrR0FBVixVQUFVLDBFQUZYLHNHQUFzRzs7U0FFckcsVUFBVTs0RkFBVixVQUFVO2tCQUx0QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLHNHQUFzRztpQkFDakgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJb25Qb3BvdmVyIGFzIElvblBvcG92ZXJCYXNlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXBvcG92ZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCIgKm5nSWY9XCJpc0NtcE9wZW4gfHwga2VlcENvbnRlbnRzTW91bnRlZFwiPjwvbmctY29udGFpbmVyPmAsXG59KVxuZXhwb3J0IGNsYXNzIElvblBvcG92ZXIgZXh0ZW5kcyBJb25Qb3BvdmVyQmFzZSB7fVxuIl19