import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostListener, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-range.js';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
const RANGE_INPUTS = [
    'activeBarStart',
    'color',
    'debounce',
    'disabled',
    'dualKnobs',
    'label',
    'labelPlacement',
    'max',
    'min',
    'mode',
    'name',
    'pin',
    'pinFormatter',
    'snaps',
    'step',
    'ticks',
    'value',
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
    useExisting: /*@__PURE__*/ forwardRef(() => IonRange),
    multi: true,
};
let IonRange = class IonRange extends ValueAccessor {
    z;
    el;
    constructor(c, r, z, injector) {
        super(injector, r);
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange', 'ionInput', 'ionFocus', 'ionBlur', 'ionKnobMoveStart', 'ionKnobMoveEnd']);
    }
    handleIonInput(el) {
        this.handleValueChange(el, el.value);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRange, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRange, isStandalone: true, selector: "ion-range", inputs: { activeBarStart: "activeBarStart", color: "color", debounce: "debounce", disabled: "disabled", dualKnobs: "dualKnobs", label: "label", labelPlacement: "labelPlacement", max: "max", min: "min", mode: "mode", name: "name", pin: "pin", pinFormatter: "pinFormatter", snaps: "snaps", step: "step", ticks: "ticks", value: "value" }, host: { listeners: { "ionInput": "handleIonInput($event.target)" } }, providers: [accessorProvider], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonRange = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
        inputs: RANGE_INPUTS,
    })
], IonRange);
export { IonRange };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRange, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-range',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: RANGE_INPUTS,
                    providers: [accessorProvider],
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { handleIonInput: [{
                type: HostListener,
                args: ['ionInput', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9kaXJlY3RpdmVzL3JhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFHVCxZQUFZLEVBR1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU90RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUV2RSxNQUFNLFlBQVksR0FBRztJQUNuQixnQkFBZ0I7SUFDaEIsT0FBTztJQUNQLFVBQVU7SUFDVixVQUFVO0lBQ1YsV0FBVztJQUNYLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIsS0FBSztJQUNMLEtBQUs7SUFDTCxNQUFNO0lBQ04sTUFBTTtJQUNOLEtBQUs7SUFDTCxjQUFjO0lBQ2QsT0FBTztJQUNQLE1BQU07SUFDTixPQUFPO0lBQ1AsT0FBTztDQUNSLENBQUM7QUFFRjs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUNyRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFNRixJQVNhLFFBQVEsR0FUckIsTUFTYSxRQUFTLFNBQVEsYUFBYTtJQUVrQjtJQURqRCxFQUFFLENBQWM7SUFDMUIsWUFBWSxDQUFvQixFQUFFLENBQWEsRUFBWSxDQUFTLEVBQUUsUUFBa0I7UUFDdEYsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQURzQyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBRWxFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUMxQixZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3RILENBQUM7SUFHRCxjQUFjLENBQUMsRUFBdUI7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzsySEFaVSxRQUFROytHQUFSLFFBQVEsOGNBSFIsQ0FBQyxnQkFBZ0IsQ0FBQyxpREFIbkIsMkJBQTJCOztBQU0xQixRQUFRO0lBYnBCLFFBQVEsQ0FBQztRQUNSLHFCQUFxQixFQUFFLG1CQUFtQjtRQUMxQyxNQUFNLEVBQUUsWUFBWTtLQUNyQixDQUFDO0dBVVcsUUFBUSxDQWFwQjtTQWJZLFFBQVE7NEZBQVIsUUFBUTtrQkFUcEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLHVFQUF1RTtvQkFDdkUsTUFBTSxFQUFFLFlBQVk7b0JBQ3BCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUM3QixVQUFVLEVBQUUsSUFBSTtpQkFDakI7NktBV0MsY0FBYztzQkFEYixZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgZm9yd2FyZFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAaW9uaWMvYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHR5cGUge1xuICBSYW5nZUNoYW5nZUV2ZW50RGV0YWlsLFxuICBSYW5nZUtub2JNb3ZlU3RhcnRFdmVudERldGFpbCxcbiAgUmFuZ2VLbm9iTW92ZUVuZEV2ZW50RGV0YWlsLFxuICBDb21wb25lbnRzLFxufSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcbmltcG9ydCB7IGRlZmluZUN1c3RvbUVsZW1lbnQgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzL2lvbi1yYW5nZS5qcyc7XG5cbmltcG9ydCB7IFByb3h5Q21wLCBwcm94eU91dHB1dHMgfSBmcm9tICcuL2FuZ3VsYXItY29tcG9uZW50LWxpYi91dGlscyc7XG5cbmNvbnN0IFJBTkdFX0lOUFVUUyA9IFtcbiAgJ2FjdGl2ZUJhclN0YXJ0JyxcbiAgJ2NvbG9yJyxcbiAgJ2RlYm91bmNlJyxcbiAgJ2Rpc2FibGVkJyxcbiAgJ2R1YWxLbm9icycsXG4gICdsYWJlbCcsXG4gICdsYWJlbFBsYWNlbWVudCcsXG4gICdtYXgnLFxuICAnbWluJyxcbiAgJ21vZGUnLFxuICAnbmFtZScsXG4gICdwaW4nLFxuICAncGluRm9ybWF0dGVyJyxcbiAgJ3NuYXBzJyxcbiAgJ3N0ZXAnLFxuICAndGlja3MnLFxuICAndmFsdWUnLFxuXTtcblxuLyoqXG4gKiBQdWxsaW5nIHRoZSBwcm92aWRlciBpbnRvIGFuIG9iamVjdCBhbmQgdXNpbmcgUFVSRSB3b3Jrc1xuICogYXJvdW5kIGFuIG5nLXBhY2thZ3IgaXNzdWUgdGhhdCBjYXVzZXNcbiAqIGNvbXBvbmVudHMgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzIGFuZFxuICogYSBwcm92aWRlciB0byBiZSByZS1hc3NpZ25lZC4gVGhpcyByZS1hc3NpZ25tZW50XG4gKiBpcyBub3Qgc3VwcG9ydGVkIGJ5IFdlYnBhY2sgYW5kIGNhdXNlcyB0cmVlc2hha2luZ1xuICogdG8gbm90IHdvcmsgb24gdGhlc2Uga2luZHMgb2YgY29tcG9uZW50cy5cbiAqL1xuY29uc3QgYWNjZXNzb3JQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiAvKkBfX1BVUkVfXyovIGZvcndhcmRSZWYoKCkgPT4gSW9uUmFuZ2UpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBQcm94eUNtcCh7XG4gIGRlZmluZUN1c3RvbUVsZW1lbnRGbjogZGVmaW5lQ3VzdG9tRWxlbWVudCxcbiAgaW5wdXRzOiBSQU5HRV9JTlBVVFMsXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXJhbmdlJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogUkFOR0VfSU5QVVRTLFxuICBwcm92aWRlcnM6IFthY2Nlc3NvclByb3ZpZGVyXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uUmFuZ2UgZXh0ZW5kcyBWYWx1ZUFjY2Vzc29yIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHN1cGVyKGluamVjdG9yLCByKTtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uQ2hhbmdlJywgJ2lvbklucHV0JywgJ2lvbkZvY3VzJywgJ2lvbkJsdXInLCAnaW9uS25vYk1vdmVTdGFydCcsICdpb25Lbm9iTW92ZUVuZCddKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lvbklucHV0JywgWyckZXZlbnQudGFyZ2V0J10pXG4gIGhhbmRsZUlvbklucHV0KGVsOiBIVE1MSW9uUmFuZ2VFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVWYWx1ZUNoYW5nZShlbCwgZWwudmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25SYW5nZSBleHRlbmRzIENvbXBvbmVudHMuSW9uUmFuZ2Uge1xuICAvKipcbiAgICogVGhlIGBpb25DaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIGZvciBgPGlvbi1yYW5nZT5gIGVsZW1lbnRzIHdoZW4gdGhlIHVzZXJcbm1vZGlmaWVzIHRoZSBlbGVtZW50J3MgdmFsdWU6XG4tIFdoZW4gdGhlIHVzZXIgcmVsZWFzZXMgdGhlIGtub2IgYWZ0ZXIgZHJhZ2dpbmc7XG4tIFdoZW4gdGhlIHVzZXIgbW92ZXMgdGhlIGtub2Igd2l0aCBrZXlib2FyZCBhcnJvd3NcblxuYGlvbkNoYW5nZWAgaXMgbm90IGZpcmVkIHdoZW4gdGhlIHZhbHVlIGlzIGNoYW5nZWQgcHJvZ3JhbW1hdGljYWxseS5cbiAgICovXG4gIGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PFJhbmdlQ2hhbmdlRXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIFRoZSBgaW9uSW5wdXRgIGV2ZW50IGlzIGZpcmVkIGZvciBgPGlvbi1yYW5nZT5gIGVsZW1lbnRzIHdoZW4gdGhlIHZhbHVlXG5pcyBtb2RpZmllZC4gVW5saWtlIGBpb25DaGFuZ2VgLCBgaW9uSW5wdXRgIGlzIGZpcmVkIGNvbnRpbnVvdXNseVxud2hpbGUgdGhlIHVzZXIgaXMgZHJhZ2dpbmcgdGhlIGtub2IuXG4gICAqL1xuICBpb25JbnB1dDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PFJhbmdlQ2hhbmdlRXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgcmFuZ2UgaGFzIGZvY3VzLlxuICAgKi9cbiAgaW9uRm9jdXM6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHJhbmdlIGxvc2VzIGZvY3VzLlxuICAgKi9cbiAgaW9uQmx1cjogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgbW92aW5nIHRoZSByYW5nZSBrbm9iLCB3aGV0aGVyIHRocm91Z2hcbm1vdXNlIGRyYWcsIHRvdWNoIGdlc3R1cmUsIG9yIGtleWJvYXJkIGludGVyYWN0aW9uLlxuICAgKi9cbiAgaW9uS25vYk1vdmVTdGFydDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PFJhbmdlS25vYk1vdmVTdGFydEV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgZmluaXNoZXMgbW92aW5nIHRoZSByYW5nZSBrbm9iLCB3aGV0aGVyIHRocm91Z2hcbm1vdXNlIGRyYWcsIHRvdWNoIGdlc3R1cmUsIG9yIGtleWJvYXJkIGludGVyYWN0aW9uLlxuICAgKi9cbiAgaW9uS25vYk1vdmVFbmQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxSYW5nZUtub2JNb3ZlRW5kRXZlbnREZXRhaWw+Pjtcbn1cbiJdfQ==