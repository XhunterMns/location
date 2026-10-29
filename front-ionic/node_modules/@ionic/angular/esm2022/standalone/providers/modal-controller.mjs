import { Injector, Injectable, EnvironmentInjector, inject } from '@angular/core';
import { AngularDelegate, OverlayBaseController } from '@ionic/angular/common';
import { modalController } from '@ionic/core/components';
import { defineCustomElement } from '@ionic/core/components/ion-modal.js';
import * as i0 from "@angular/core";
class ModalController extends OverlayBaseController {
    angularDelegate = inject(AngularDelegate);
    injector = inject(Injector);
    environmentInjector = inject(EnvironmentInjector);
    constructor() {
        super(modalController);
        defineCustomElement();
    }
    create(opts) {
        const { injector: customInjector, ...restOpts } = opts;
        return super.create({
            ...restOpts,
            delegate: this.angularDelegate.create(this.environmentInjector, this.injector, 'modal', customInjector),
        });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ModalController, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ModalController });
}
export { ModalController };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ModalController, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3N0YW5kYWxvbmUvc3JjL3Byb3ZpZGVycy9tb2RhbC1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQUUxRSxNQUNhLGVBQWdCLFNBQVEscUJBQXdEO0lBQ25GLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDMUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixtQkFBbUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUUxRDtRQUNFLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QixtQkFBbUIsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBa0I7UUFDdkIsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsR0FBRyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDdkQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ2xCLEdBQUcsUUFBUTtZQUNYLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDO1NBQ3hHLENBQUMsQ0FBQztJQUNMLENBQUM7MkhBaEJVLGVBQWU7K0hBQWYsZUFBZTs7U0FBZixlQUFlOzRGQUFmLGVBQWU7a0JBRDNCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RvciwgSW5qZWN0YWJsZSwgRW52aXJvbm1lbnRJbmplY3RvciwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmd1bGFyRGVsZWdhdGUsIE92ZXJsYXlCYXNlQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgdHlwZSB7IE1vZGFsT3B0aW9ucyB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBtb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcbmltcG9ydCB7IGRlZmluZUN1c3RvbUVsZW1lbnQgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzL2lvbi1tb2RhbC5qcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRyb2xsZXIgZXh0ZW5kcyBPdmVybGF5QmFzZUNvbnRyb2xsZXI8TW9kYWxPcHRpb25zLCBIVE1MSW9uTW9kYWxFbGVtZW50PiB7XG4gIHByaXZhdGUgYW5ndWxhckRlbGVnYXRlID0gaW5qZWN0KEFuZ3VsYXJEZWxlZ2F0ZSk7XG4gIHByaXZhdGUgaW5qZWN0b3IgPSBpbmplY3QoSW5qZWN0b3IpO1xuICBwcml2YXRlIGVudmlyb25tZW50SW5qZWN0b3IgPSBpbmplY3QoRW52aXJvbm1lbnRJbmplY3Rvcik7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIobW9kYWxDb250cm9sbGVyKTtcbiAgICBkZWZpbmVDdXN0b21FbGVtZW50KCk7XG4gIH1cblxuICBjcmVhdGUob3B0czogTW9kYWxPcHRpb25zKTogUHJvbWlzZTxIVE1MSW9uTW9kYWxFbGVtZW50PiB7XG4gICAgY29uc3QgeyBpbmplY3RvcjogY3VzdG9tSW5qZWN0b3IsIC4uLnJlc3RPcHRzIH0gPSBvcHRzO1xuICAgIHJldHVybiBzdXBlci5jcmVhdGUoe1xuICAgICAgLi4ucmVzdE9wdHMsXG4gICAgICBkZWxlZ2F0ZTogdGhpcy5hbmd1bGFyRGVsZWdhdGUuY3JlYXRlKHRoaXMuZW52aXJvbm1lbnRJbmplY3RvciwgdGhpcy5pbmplY3RvciwgJ21vZGFsJywgY3VzdG9tSW5qZWN0b3IpLFxuICAgIH0pO1xuICB9XG59XG4iXX0=