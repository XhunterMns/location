import { Injectable } from '@angular/core';
import { OverlayBaseController } from '@ionic/angular/common';
import { pickerController } from '@ionic/core/components';
import { defineCustomElement } from '@ionic/core/components/ion-picker-legacy.js';
import * as i0 from "@angular/core";
/**
 * @deprecated Use the inline ion-picker component instead.
 */
class PickerController extends OverlayBaseController {
    constructor() {
        super(pickerController);
        defineCustomElement();
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PickerController, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PickerController, providedIn: 'root' });
}
export { PickerController };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PickerController, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9wcm92aWRlcnMvcGlja2VyLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7QUFFbEY7O0dBRUc7QUFDSCxNQUdhLGdCQUFpQixTQUFRLHFCQUFnRTtJQUNwRztRQUNFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hCLG1CQUFtQixFQUFFLENBQUM7SUFDeEIsQ0FBQzsySEFKVSxnQkFBZ0I7K0hBQWhCLGdCQUFnQixjQUZmLE1BQU07O1NBRVAsZ0JBQWdCOzRGQUFoQixnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3ZlcmxheUJhc2VDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB0eXBlIHsgUGlja2VyT3B0aW9ucyB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgcGlja2VyQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgZGVmaW5lQ3VzdG9tRWxlbWVudCB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMvaW9uLXBpY2tlci1sZWdhY3kuanMnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSB0aGUgaW5saW5lIGlvbi1waWNrZXIgY29tcG9uZW50IGluc3RlYWQuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQaWNrZXJDb250cm9sbGVyIGV4dGVuZHMgT3ZlcmxheUJhc2VDb250cm9sbGVyPFBpY2tlck9wdGlvbnMsIEhUTUxJb25QaWNrZXJMZWdhY3lFbGVtZW50PiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHBpY2tlckNvbnRyb2xsZXIpO1xuICAgIGRlZmluZUN1c3RvbUVsZW1lbnQoKTtcbiAgfVxufVxuIl19