import { Injectable } from '@angular/core';
import { OverlayBaseController } from '@ionic/angular/common';
import { alertController } from '@ionic/core/components';
import { defineCustomElement } from '@ionic/core/components/ion-alert.js';
import * as i0 from "@angular/core";
class AlertController extends OverlayBaseController {
    constructor() {
        super(alertController);
        defineCustomElement();
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AlertController, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AlertController, providedIn: 'root' });
}
export { AlertController };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AlertController, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3N0YW5kYWxvbmUvc3JjL3Byb3ZpZGVycy9hbGVydC1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQUUxRSxNQUdhLGVBQWdCLFNBQVEscUJBQXdEO0lBQzNGO1FBQ0UsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZCLG1CQUFtQixFQUFFLENBQUM7SUFDeEIsQ0FBQzsySEFKVSxlQUFlOytIQUFmLGVBQWUsY0FGZCxNQUFNOztTQUVQLGVBQWU7NEZBQWYsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPdmVybGF5QmFzZUNvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHR5cGUgeyBBbGVydE9wdGlvbnMgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcbmltcG9ydCB7IGFsZXJ0Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgZGVmaW5lQ3VzdG9tRWxlbWVudCB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMvaW9uLWFsZXJ0LmpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFsZXJ0Q29udHJvbGxlciBleHRlbmRzIE92ZXJsYXlCYXNlQ29udHJvbGxlcjxBbGVydE9wdGlvbnMsIEhUTUxJb25BbGVydEVsZW1lbnQ+IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoYWxlcnRDb250cm9sbGVyKTtcbiAgICBkZWZpbmVDdXN0b21FbGVtZW50KCk7XG4gIH1cbn1cbiJdfQ==