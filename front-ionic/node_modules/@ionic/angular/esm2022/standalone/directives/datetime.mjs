import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostListener, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-datetime.js';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
const DATETIME_INPUTS = [
    'cancelText',
    'clearText',
    'color',
    'dayValues',
    'disabled',
    'doneText',
    'firstDayOfWeek',
    'formatOptions',
    'highlightedDates',
    'hourCycle',
    'hourValues',
    'isDateEnabled',
    'locale',
    'max',
    'min',
    'minuteValues',
    'mode',
    'monthValues',
    'multiple',
    'name',
    'preferWheel',
    'presentation',
    'readonly',
    'showAdjacentDays',
    'showClearButton',
    'showDefaultButtons',
    'showDefaultTimeLabel',
    'showDefaultTitle',
    'size',
    'titleSelectedDatesFormatter',
    'value',
    'yearValues',
];
/**
 * Pulling the provider into an object and using PURE works
 * around an ng-packagr issue that causes
 * components with multiple decorators and
 * a provider to be re-assigned. This re-assignment
 * is not supported by Webpack and causes treeshaking
 * to not work on these kinds of components.

 */
const accessorProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: /*@__PURE__*/ forwardRef(() => IonDatetime),
    multi: true,
};
let IonDatetime = class IonDatetime extends ValueAccessor {
    z;
    el;
    constructor(c, r, z, injector) {
        super(injector, r);
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionCancel', 'ionChange', 'ionFocus', 'ionBlur']);
    }
    handleIonChange(el) {
        this.handleValueChange(el, el.value);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonDatetime, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonDatetime, isStandalone: true, selector: "ion-datetime", inputs: { cancelText: "cancelText", clearText: "clearText", color: "color", dayValues: "dayValues", disabled: "disabled", doneText: "doneText", firstDayOfWeek: "firstDayOfWeek", formatOptions: "formatOptions", highlightedDates: "highlightedDates", hourCycle: "hourCycle", hourValues: "hourValues", isDateEnabled: "isDateEnabled", locale: "locale", max: "max", min: "min", minuteValues: "minuteValues", mode: "mode", monthValues: "monthValues", multiple: "multiple", name: "name", preferWheel: "preferWheel", presentation: "presentation", readonly: "readonly", showAdjacentDays: "showAdjacentDays", showClearButton: "showClearButton", showDefaultButtons: "showDefaultButtons", showDefaultTimeLabel: "showDefaultTimeLabel", showDefaultTitle: "showDefaultTitle", size: "size", titleSelectedDatesFormatter: "titleSelectedDatesFormatter", value: "value", yearValues: "yearValues" }, host: { listeners: { "ionChange": "handleIonChange($event.target)" } }, providers: [accessorProvider], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonDatetime = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
        inputs: DATETIME_INPUTS,
        methods: ['confirm', 'reset', 'cancel'],
    })
], IonDatetime);
export { IonDatetime };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonDatetime, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-datetime',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: DATETIME_INPUTS,
                    providers: [accessorProvider],
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { handleIonChange: [{
                type: HostListener,
                args: ['ionChange', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9kaXJlY3RpdmVzL2RhdGV0aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFHVCxZQUFZLEVBR1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUU3RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUV2RSxNQUFNLGVBQWUsR0FBRztJQUN0QixZQUFZO0lBQ1osV0FBVztJQUNYLE9BQU87SUFDUCxXQUFXO0lBQ1gsVUFBVTtJQUNWLFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsWUFBWTtJQUNaLGVBQWU7SUFDZixRQUFRO0lBQ1IsS0FBSztJQUNMLEtBQUs7SUFDTCxjQUFjO0lBQ2QsTUFBTTtJQUNOLGFBQWE7SUFDYixVQUFVO0lBQ1YsTUFBTTtJQUNOLGFBQWE7SUFDYixjQUFjO0lBQ2QsVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLDZCQUE2QjtJQUM3QixPQUFPO0lBQ1AsWUFBWTtDQUNiLENBQUM7QUFFRjs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDeEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBT0YsSUFTYSxXQUFXLEdBVHhCLE1BU2EsV0FBWSxTQUFRLGFBQWE7SUFFZTtJQURqRCxFQUFFLENBQWM7SUFDMUIsWUFBWSxDQUFvQixFQUFFLENBQWEsRUFBWSxDQUFTLEVBQUUsUUFBa0I7UUFDdEYsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQURzQyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBRWxFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUMxQixZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFHRCxlQUFlLENBQUMsRUFBMEI7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzsySEFaVSxXQUFXOytHQUFYLFdBQVcsaS9CQUhYLENBQUMsZ0JBQWdCLENBQUMsaURBSG5CLDJCQUEyQjs7QUFNMUIsV0FBVztJQWR2QixRQUFRLENBQUM7UUFDUixxQkFBcUIsRUFBRSxtQkFBbUI7UUFDMUMsTUFBTSxFQUFFLGVBQWU7UUFDdkIsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7S0FDeEMsQ0FBQztHQVVXLFdBQVcsQ0FhdkI7U0FiWSxXQUFXOzRGQUFYLFdBQVc7a0JBVHZCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyx1RUFBdUU7b0JBQ3ZFLE1BQU0sRUFBRSxlQUFlO29CQUN2QixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOzZLQVdDLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB0eXBlIHsgRGF0ZXRpbWVDaGFuZ2VFdmVudERldGFpbCwgQ29tcG9uZW50cyB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgZGVmaW5lQ3VzdG9tRWxlbWVudCB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMvaW9uLWRhdGV0aW1lLmpzJztcblxuaW1wb3J0IHsgUHJveHlDbXAsIHByb3h5T3V0cHV0cyB9IGZyb20gJy4vYW5ndWxhci1jb21wb25lbnQtbGliL3V0aWxzJztcblxuY29uc3QgREFURVRJTUVfSU5QVVRTID0gW1xuICAnY2FuY2VsVGV4dCcsXG4gICdjbGVhclRleHQnLFxuICAnY29sb3InLFxuICAnZGF5VmFsdWVzJyxcbiAgJ2Rpc2FibGVkJyxcbiAgJ2RvbmVUZXh0JyxcbiAgJ2ZpcnN0RGF5T2ZXZWVrJyxcbiAgJ2Zvcm1hdE9wdGlvbnMnLFxuICAnaGlnaGxpZ2h0ZWREYXRlcycsXG4gICdob3VyQ3ljbGUnLFxuICAnaG91clZhbHVlcycsXG4gICdpc0RhdGVFbmFibGVkJyxcbiAgJ2xvY2FsZScsXG4gICdtYXgnLFxuICAnbWluJyxcbiAgJ21pbnV0ZVZhbHVlcycsXG4gICdtb2RlJyxcbiAgJ21vbnRoVmFsdWVzJyxcbiAgJ211bHRpcGxlJyxcbiAgJ25hbWUnLFxuICAncHJlZmVyV2hlZWwnLFxuICAncHJlc2VudGF0aW9uJyxcbiAgJ3JlYWRvbmx5JyxcbiAgJ3Nob3dBZGphY2VudERheXMnLFxuICAnc2hvd0NsZWFyQnV0dG9uJyxcbiAgJ3Nob3dEZWZhdWx0QnV0dG9ucycsXG4gICdzaG93RGVmYXVsdFRpbWVMYWJlbCcsXG4gICdzaG93RGVmYXVsdFRpdGxlJyxcbiAgJ3NpemUnLFxuICAndGl0bGVTZWxlY3RlZERhdGVzRm9ybWF0dGVyJyxcbiAgJ3ZhbHVlJyxcbiAgJ3llYXJWYWx1ZXMnLFxuXTtcblxuLyoqXG4gKiBQdWxsaW5nIHRoZSBwcm92aWRlciBpbnRvIGFuIG9iamVjdCBhbmQgdXNpbmcgUFVSRSB3b3Jrc1xuICogYXJvdW5kIGFuIG5nLXBhY2thZ3IgaXNzdWUgdGhhdCBjYXVzZXNcbiAqIGNvbXBvbmVudHMgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzIGFuZFxuICogYSBwcm92aWRlciB0byBiZSByZS1hc3NpZ25lZC4gVGhpcyByZS1hc3NpZ25tZW50XG4gKiBpcyBub3Qgc3VwcG9ydGVkIGJ5IFdlYnBhY2sgYW5kIGNhdXNlcyB0cmVlc2hha2luZ1xuICogdG8gbm90IHdvcmsgb24gdGhlc2Uga2luZHMgb2YgY29tcG9uZW50cy5cblxuICovXG5jb25zdCBhY2Nlc3NvclByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IC8qQF9fUFVSRV9fKi8gZm9yd2FyZFJlZigoKSA9PiBJb25EYXRldGltZSksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQFByb3h5Q21wKHtcbiAgZGVmaW5lQ3VzdG9tRWxlbWVudEZuOiBkZWZpbmVDdXN0b21FbGVtZW50LFxuICBpbnB1dHM6IERBVEVUSU1FX0lOUFVUUyxcbiAgbWV0aG9kczogWydjb25maXJtJywgJ3Jlc2V0JywgJ2NhbmNlbCddLFxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1kYXRldGltZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IERBVEVUSU1FX0lOUFVUUyxcbiAgcHJvdmlkZXJzOiBbYWNjZXNzb3JQcm92aWRlcl0sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIElvbkRhdGV0aW1lIGV4dGVuZHMgVmFsdWVBY2Nlc3NvciB7XG4gIHByb3RlY3RlZCBlbDogSFRNTEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBzdXBlcihpbmplY3Rvciwgcik7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkNhbmNlbCcsICdpb25DaGFuZ2UnLCAnaW9uRm9jdXMnLCAnaW9uQmx1ciddKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lvbkNoYW5nZScsIFsnJGV2ZW50LnRhcmdldCddKVxuICBoYW5kbGVJb25DaGFuZ2UoZWw6IEhUTUxJb25EYXRldGltZUVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZVZhbHVlQ2hhbmdlKGVsLCBlbC52YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkRhdGV0aW1lIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25EYXRldGltZSB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGRhdGV0aW1lIHNlbGVjdGlvbiB3YXMgY2FuY2VsbGVkLlxuICAgKi9cbiAgaW9uQ2FuY2VsOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSB2YWx1ZSAoc2VsZWN0ZWQgZGF0ZSkgaGFzIGNoYW5nZWQuXG4gICAqL1xuICBpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxEYXRldGltZUNoYW5nZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGRhdGV0aW1lIGhhcyBmb2N1cy5cbiAgICovXG4gIGlvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBkYXRldGltZSBsb3NlcyBmb2N1cy5cbiAgICovXG4gIGlvbkJsdXI6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG59XG4iXX0=