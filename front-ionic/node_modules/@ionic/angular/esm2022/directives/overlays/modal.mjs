import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonModal as IonModalBase } from '@ionic/angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
class IonModal extends IonModalBase {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonModal, deps: null, target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonModal, selector: "ion-modal", usesInheritance: true, ngImport: i0, template: `<div class="ion-delegate-host ion-page" *ngIf="isCmpOpen || keepContentsMounted">
    <ng-container [ngTemplateOutlet]="template"></ng-container>
  </div>`, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
export { IonModal };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonModal, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-modal',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<div class="ion-delegate-host ion-page" *ngIf="isCmpOpen || keepContentsMounted">
    <ng-container [ngTemplateOutlet]="template"></ng-container>
  </div>`,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGlyZWN0aXZlcy9vdmVybGF5cy9tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLElBQUksWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQUVqRSxNQU9hLFFBQVMsU0FBUSxZQUFZOzJIQUE3QixRQUFROytHQUFSLFFBQVEsd0VBSlQ7O1NBRUg7O1NBRUksUUFBUTs0RkFBUixRQUFRO2tCQVBwQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOztTQUVIO2lCQUNSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW9uTW9kYWwgYXMgSW9uTW9kYWxCYXNlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLW1vZGFsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImlvbi1kZWxlZ2F0ZS1ob3N0IGlvbi1wYWdlXCIgKm5nSWY9XCJpc0NtcE9wZW4gfHwga2VlcENvbnRlbnRzTW91bnRlZFwiPlxuICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgSW9uTW9kYWwgZXh0ZW5kcyBJb25Nb2RhbEJhc2Uge31cbiJdfQ==