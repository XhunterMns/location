import { Injectable } from '@angular/core';
import { OverlayBaseController } from '@ionic/angular/common';
import { loadingController } from '@ionic/core/components';
import { defineCustomElement } from '@ionic/core/components/ion-loading.js';
import * as i0 from "@angular/core";
class LoadingController extends OverlayBaseController {
    constructor() {
        super(loadingController);
        defineCustomElement();
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LoadingController, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LoadingController, providedIn: 'root' });
}
export { LoadingController };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LoadingController, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3RhbmRhbG9uZS9zcmMvcHJvdmlkZXJzL2xvYWRpbmctY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQUU1RSxNQUdhLGlCQUFrQixTQUFRLHFCQUE0RDtJQUNqRztRQUNFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pCLG1CQUFtQixFQUFFLENBQUM7SUFDeEIsQ0FBQzsySEFKVSxpQkFBaUI7K0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOztTQUVQLGlCQUFpQjs0RkFBakIsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE92ZXJsYXlCYXNlQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgdHlwZSB7IExvYWRpbmdPcHRpb25zIH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBsb2FkaW5nQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgZGVmaW5lQ3VzdG9tRWxlbWVudCB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMvaW9uLWxvYWRpbmcuanMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ0NvbnRyb2xsZXIgZXh0ZW5kcyBPdmVybGF5QmFzZUNvbnRyb2xsZXI8TG9hZGluZ09wdGlvbnMsIEhUTUxJb25Mb2FkaW5nRWxlbWVudD4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihsb2FkaW5nQ29udHJvbGxlcik7XG4gICAgZGVmaW5lQ3VzdG9tRWxlbWVudCgpO1xuICB9XG59XG4iXX0=