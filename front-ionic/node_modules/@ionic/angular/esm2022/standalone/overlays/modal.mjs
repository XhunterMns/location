import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonModal as IonModalBase, ProxyCmp } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-modal.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
let IonModal = class IonModal extends IonModalBase {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonModal, deps: null, target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonModal, isStandalone: true, selector: "ion-modal", usesInheritance: true, ngImport: i0, template: `<div class="ion-delegate-host ion-page" *ngIf="isCmpOpen || keepContentsMounted">
    <ng-container [ngTemplateOutlet]="template"></ng-container>
  </div>`, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonModal = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
    })
], IonModal);
export { IonModal };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonModal, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-modal',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<div class="ion-delegate-host ion-page" *ngIf="isCmpOpen || keepContentsMounted">
    <ng-container [ngTemplateOutlet]="template"></ng-container>
  </div>`,
                    standalone: true,
                    imports: [CommonModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9vdmVybGF5cy9tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsSUFBSSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7OztBQUsxRSxJQVNhLFFBQVEsR0FUckIsTUFTYSxRQUFTLFNBQVEsWUFBWTsySEFBN0IsUUFBUTsrR0FBUixRQUFRLDRGQU5UOztTQUVILDJEQUVHLFlBQVk7O0FBRVgsUUFBUTtJQVpwQixRQUFRLENBQUM7UUFDUixxQkFBcUIsRUFBRSxtQkFBbUI7S0FDM0MsQ0FBQztHQVVXLFFBQVEsQ0FBd0I7U0FBaEMsUUFBUTs0RkFBUixRQUFRO2tCQVRwQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOztTQUVIO29CQUNQLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElvbk1vZGFsIGFzIElvbk1vZGFsQmFzZSwgUHJveHlDbXAgfSBmcm9tICdAaW9uaWMvYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgZGVmaW5lQ3VzdG9tRWxlbWVudCB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMvaW9uLW1vZGFsLmpzJztcblxuQFByb3h5Q21wKHtcbiAgZGVmaW5lQ3VzdG9tRWxlbWVudEZuOiBkZWZpbmVDdXN0b21FbGVtZW50LFxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1tb2RhbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJpb24tZGVsZWdhdGUtaG9zdCBpb24tcGFnZVwiICpuZ0lmPVwiaXNDbXBPcGVuIHx8IGtlZXBDb250ZW50c01vdW50ZWRcIj5cbiAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gIDwvZGl2PmAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBJb25Nb2RhbCBleHRlbmRzIElvbk1vZGFsQmFzZSB7fVxuIl19