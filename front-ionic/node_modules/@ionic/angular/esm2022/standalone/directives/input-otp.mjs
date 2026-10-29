import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostListener, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-input-otp.js';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
const INPUT_OTP_INPUTS = [
    'autocapitalize',
    'color',
    'disabled',
    'fill',
    'inputmode',
    'length',
    'pattern',
    'readonly',
    'separators',
    'shape',
    'size',
    'type',
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
    useExisting: /*@__PURE__*/ forwardRef(() => IonInputOtp),
    multi: true,
};
let IonInputOtp = class IonInputOtp extends ValueAccessor {
    z;
    el;
    constructor(c, r, z, injector) {
        super(injector, r);
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionComplete', 'ionBlur', 'ionFocus']);
    }
    handleIonInput(el) {
        this.handleValueChange(el, el.value);
    }
    registerOnChange(fn) {
        super.registerOnChange((value) => {
            if (this.type === 'number') {
                /**
                 * If the input type is `number`, we need to convert the value to a number
                 * when the value is not empty. If the value is empty, we want to treat
                 * the value as null.
                 */
                fn(value === '' ? null : parseFloat(value));
            }
            else {
                fn(value);
            }
        });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInputOtp, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonInputOtp, isStandalone: true, selector: "ion-input-otp", inputs: { autocapitalize: "autocapitalize", color: "color", disabled: "disabled", fill: "fill", inputmode: "inputmode", length: "length", pattern: "pattern", readonly: "readonly", separators: "separators", shape: "shape", size: "size", type: "type", value: "value" }, host: { listeners: { "ionInput": "handleIonInput($event.target)" } }, providers: [accessorProvider], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonInputOtp = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
        inputs: INPUT_OTP_INPUTS,
        methods: ['setFocus'],
    })
], IonInputOtp);
export { IonInputOtp };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInputOtp, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-input-otp',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: INPUT_OTP_INPUTS,
                    providers: [accessorProvider],
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { handleIonInput: [{
                type: HostListener,
                args: ['ionInput', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtb3RwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3RhbmRhbG9uZS9zcmMvZGlyZWN0aXZlcy9pbnB1dC1vdHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUdULFlBQVksRUFHWixVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBT3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBRXZFLE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsZ0JBQWdCO0lBQ2hCLE9BQU87SUFDUCxVQUFVO0lBQ1YsTUFBTTtJQUNOLFdBQVc7SUFDWCxRQUFRO0lBQ1IsU0FBUztJQUNULFVBQVU7SUFDVixZQUFZO0lBQ1osT0FBTztJQUNQLE1BQU07SUFDTixNQUFNO0lBQ04sT0FBTztDQUNSLENBQUM7QUFFRjs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFPRixJQVNhLFdBQVcsR0FUeEIsTUFTYSxXQUFZLFNBQVEsYUFBYTtJQUVlO0lBRGpELEVBQUUsQ0FBYztJQUMxQixZQUFZLENBQW9CLEVBQUUsQ0FBYSxFQUFZLENBQVMsRUFBRSxRQUFrQjtRQUN0RixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRHNDLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFFbEUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1gsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQzFCLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFHRCxjQUFjLENBQUMsRUFBMEI7UUFDdkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQW9CO1FBQ25DLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO1lBQ3ZDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzFCOzs7O21CQUlHO2dCQUNILEVBQUUsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzdDO2lCQUFNO2dCQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNYO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzJIQTNCVSxXQUFXOytHQUFYLFdBQVcsOFlBSFgsQ0FBQyxnQkFBZ0IsQ0FBQyxpREFIbkIsMkJBQTJCOztBQU0xQixXQUFXO0lBZHZCLFFBQVEsQ0FBQztRQUNSLHFCQUFxQixFQUFFLG1CQUFtQjtRQUMxQyxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztLQUN0QixDQUFDO0dBVVcsV0FBVyxDQTRCdkI7U0E1QlksV0FBVzs0RkFBWCxXQUFXO2tCQVR2QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsdUVBQXVFO29CQUN2RSxNQUFNLEVBQUUsZ0JBQWdCO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOzZLQVdDLGNBQWM7c0JBRGIsWUFBWTt1QkFBQyxVQUFVLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB0eXBlIHtcbiAgSW5wdXRPdHBJbnB1dEV2ZW50RGV0YWlsIGFzIElJb25JbnB1dE90cElucHV0RXZlbnREZXRhaWwsXG4gIElucHV0T3RwQ2hhbmdlRXZlbnREZXRhaWwgYXMgSUlvbklucHV0T3RwQ2hhbmdlRXZlbnREZXRhaWwsXG4gIElucHV0T3RwQ29tcGxldGVFdmVudERldGFpbCBhcyBJSW9uSW5wdXRPdHBDb21wbGV0ZUV2ZW50RGV0YWlsLFxuICBDb21wb25lbnRzLFxufSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcbmltcG9ydCB7IGRlZmluZUN1c3RvbUVsZW1lbnQgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzL2lvbi1pbnB1dC1vdHAuanMnO1xuXG5pbXBvcnQgeyBQcm94eUNtcCwgcHJveHlPdXRwdXRzIH0gZnJvbSAnLi9hbmd1bGFyLWNvbXBvbmVudC1saWIvdXRpbHMnO1xuXG5jb25zdCBJTlBVVF9PVFBfSU5QVVRTID0gW1xuICAnYXV0b2NhcGl0YWxpemUnLFxuICAnY29sb3InLFxuICAnZGlzYWJsZWQnLFxuICAnZmlsbCcsXG4gICdpbnB1dG1vZGUnLFxuICAnbGVuZ3RoJyxcbiAgJ3BhdHRlcm4nLFxuICAncmVhZG9ubHknLFxuICAnc2VwYXJhdG9ycycsXG4gICdzaGFwZScsXG4gICdzaXplJyxcbiAgJ3R5cGUnLFxuICAndmFsdWUnLFxuXTtcblxuLyoqXG4gKiBQdWxsaW5nIHRoZSBwcm92aWRlciBpbnRvIGFuIG9iamVjdCBhbmQgdXNpbmcgUFVSRSB3b3Jrc1xuICogYXJvdW5kIGFuIG5nLXBhY2thZ3IgaXNzdWUgdGhhdCBjYXVzZXNcbiAqIGNvbXBvbmVudHMgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzIGFuZFxuICogYSBwcm92aWRlciB0byBiZSByZS1hc3NpZ25lZC4gVGhpcyByZS1hc3NpZ25tZW50XG4gKiBpcyBub3Qgc3VwcG9ydGVkIGJ5IFdlYnBhY2sgYW5kIGNhdXNlcyB0cmVlc2hha2luZ1xuICogdG8gbm90IHdvcmsgb24gdGhlc2Uga2luZHMgb2YgY29tcG9uZW50cy5cbiAqL1xuY29uc3QgYWNjZXNzb3JQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiAvKkBfX1BVUkVfXyovIGZvcndhcmRSZWYoKCkgPT4gSW9uSW5wdXRPdHApLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBQcm94eUNtcCh7XG4gIGRlZmluZUN1c3RvbUVsZW1lbnRGbjogZGVmaW5lQ3VzdG9tRWxlbWVudCxcbiAgaW5wdXRzOiBJTlBVVF9PVFBfSU5QVVRTLFxuICBtZXRob2RzOiBbJ3NldEZvY3VzJ10sXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWlucHV0LW90cCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IElOUFVUX09UUF9JTlBVVFMsXG4gIHByb3ZpZGVyczogW2FjY2Vzc29yUHJvdmlkZXJdLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBJb25JbnB1dE90cCBleHRlbmRzIFZhbHVlQWNjZXNzb3Ige1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgc3VwZXIoaW5qZWN0b3IsIHIpO1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgWydpb25JbnB1dCcsICdpb25DaGFuZ2UnLCAnaW9uQ29tcGxldGUnLCAnaW9uQmx1cicsICdpb25Gb2N1cyddKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lvbklucHV0JywgWyckZXZlbnQudGFyZ2V0J10pXG4gIGhhbmRsZUlvbklucHV0KGVsOiBIVE1MSW9uSW5wdXRPdHBFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVWYWx1ZUNoYW5nZShlbCwgZWwudmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHN1cGVyLnJlZ2lzdGVyT25DaGFuZ2UoKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGUgaW5wdXQgdHlwZSBpcyBgbnVtYmVyYCwgd2UgbmVlZCB0byBjb252ZXJ0IHRoZSB2YWx1ZSB0byBhIG51bWJlclxuICAgICAgICAgKiB3aGVuIHRoZSB2YWx1ZSBpcyBub3QgZW1wdHkuIElmIHRoZSB2YWx1ZSBpcyBlbXB0eSwgd2Ugd2FudCB0byB0cmVhdFxuICAgICAgICAgKiB0aGUgdmFsdWUgYXMgbnVsbC5cbiAgICAgICAgICovXG4gICAgICAgIGZuKHZhbHVlID09PSAnJyA/IG51bGwgOiBwYXJzZUZsb2F0KHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbih2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbklucHV0T3RwIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25JbnB1dE90cCB7XG4gIC8qKlxuICAgKiBUaGUgYGlvbklucHV0YCBldmVudCBpcyBmaXJlZCBlYWNoIHRpbWUgdGhlIHVzZXIgbW9kaWZpZXMgdGhlIGlucHV0J3MgdmFsdWUuXG4gICAqIFVubGlrZSB0aGUgYGlvbkNoYW5nZWAgZXZlbnQsIHRoZSBgaW9uSW5wdXRgIGV2ZW50IGlzIGZpcmVkIGZvciBlYWNoIGFsdGVyYXRpb25cbiAgICogdG8gdGhlIGlucHV0J3MgdmFsdWUuIFRoaXMgdHlwaWNhbGx5IGhhcHBlbnMgZm9yIGVhY2gga2V5c3Ryb2tlIGFzIHRoZSB1c2VyIHR5cGVzLlxuICAgKlxuICAgKiBGb3IgZWxlbWVudHMgdGhhdCBhY2NlcHQgdGV4dCBpbnB1dCAoYHR5cGU9dGV4dGAsIGB0eXBlPXRlbGAsIGV0Yy4pLCB0aGUgaW50ZXJmYWNlXG4gICAqIGlzIFtgSW5wdXRFdmVudGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9JbnB1dEV2ZW50KTsgZm9yIG90aGVycyxcbiAgICogdGhlIGludGVyZmFjZSBpcyBbYEV2ZW50YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50KS4gSWZcbiAgICogdGhlIGlucHV0IGlzIGNsZWFyZWQgb24gZWRpdCwgdGhlIHR5cGUgaXMgYG51bGxgLlxuICAgKi9cbiAgaW9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uSW5wdXRPdHBJbnB1dEV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBUaGUgYGlvbkNoYW5nZWAgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBtb2RpZmllcyB0aGUgaW5wdXQncyB2YWx1ZS5cbiAgICogVW5saWtlIHRoZSBgaW9uSW5wdXRgIGV2ZW50LCB0aGUgYGlvbkNoYW5nZWAgZXZlbnQgaXMgb25seSBmaXJlZCB3aGVuIGNoYW5nZXNcbiAgICogYXJlIGNvbW1pdHRlZCwgbm90IGFzIHRoZSB1c2VyIHR5cGVzLlxuICAgKlxuICAgKiBUaGUgYGlvbkNoYW5nZWAgZXZlbnQgZmlyZXMgd2hlbiB0aGUgYDxpb24taW5wdXQtb3RwPmAgY29tcG9uZW50IGxvc2VzXG4gICAqIGZvY3VzIGFmdGVyIGl0cyB2YWx1ZSBoYXMgY2hhbmdlZC5cbiAgICpcbiAgICogVGhpcyBldmVudCB3aWxsIG5vdCBlbWl0IHdoZW4gcHJvZ3JhbW1hdGljYWxseSBzZXR0aW5nIHRoZSBgdmFsdWVgIHByb3BlcnR5LlxuICAgKi9cbiAgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbklucHV0T3RwQ2hhbmdlRXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiBhbGwgaW5wdXQgYm94ZXMgaGF2ZSBiZWVuIGZpbGxlZCB3aXRoIHZhbGlkIHZhbHVlcy5cbiAgICovXG4gIGlvbkNvbXBsZXRlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbklucHV0T3RwQ29tcGxldGVFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBncm91cCBsb3NlcyBmb2N1cy5cbiAgICovXG4gIGlvbkJsdXI6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxGb2N1c0V2ZW50Pj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGlucHV0IGdyb3VwIGhhcyBmb2N1cy5cbiAgICovXG4gIGlvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8Rm9jdXNFdmVudD4+O1xufVxuIl19