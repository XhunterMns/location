import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostListener, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-textarea.js';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
const TEXTAREA_INPUTS = [
    'autoGrow',
    'autocapitalize',
    'autofocus',
    'clearOnEdit',
    'color',
    'cols',
    'counter',
    'counterFormatter',
    'debounce',
    'disabled',
    'enterkeyhint',
    'errorText',
    'fill',
    'helperText',
    'inputmode',
    'label',
    'labelPlacement',
    'maxlength',
    'minlength',
    'mode',
    'name',
    'placeholder',
    'readonly',
    'required',
    'rows',
    'shape',
    'spellcheck',
    'value',
    'wrap',
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
    useExisting: /*@__PURE__*/ forwardRef(() => IonTextarea),
    multi: true,
};
let IonTextarea = class IonTextarea extends ValueAccessor {
    z;
    el;
    constructor(c, r, z, injector) {
        super(injector, r);
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange', 'ionInput', 'ionBlur', 'ionFocus']);
    }
    handleIonInput(el) {
        this.handleValueChange(el, el.value);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTextarea, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonTextarea, isStandalone: true, selector: "ion-textarea", inputs: { autoGrow: "autoGrow", autocapitalize: "autocapitalize", autofocus: "autofocus", clearOnEdit: "clearOnEdit", color: "color", cols: "cols", counter: "counter", counterFormatter: "counterFormatter", debounce: "debounce", disabled: "disabled", enterkeyhint: "enterkeyhint", errorText: "errorText", fill: "fill", helperText: "helperText", inputmode: "inputmode", label: "label", labelPlacement: "labelPlacement", maxlength: "maxlength", minlength: "minlength", mode: "mode", name: "name", placeholder: "placeholder", readonly: "readonly", required: "required", rows: "rows", shape: "shape", spellcheck: "spellcheck", value: "value", wrap: "wrap" }, host: { listeners: { "ionInput": "handleIonInput($event.target)" } }, providers: [accessorProvider], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonTextarea = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
        inputs: TEXTAREA_INPUTS,
        methods: ['setFocus', 'getInputElement'],
    })
], IonTextarea);
export { IonTextarea };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTextarea, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-textarea',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: TEXTAREA_INPUTS,
                    providers: [accessorProvider],
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { handleIonInput: [{
                type: HostListener,
                args: ['ionInput', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9kaXJlY3RpdmVzL3RleHRhcmVhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFHVCxZQUFZLEVBR1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUU3RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUV2RSxNQUFNLGVBQWUsR0FBRztJQUN0QixVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxhQUFhO0lBQ2IsT0FBTztJQUNQLE1BQU07SUFDTixTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixVQUFVO0lBQ1YsY0FBYztJQUNkLFdBQVc7SUFDWCxNQUFNO0lBQ04sWUFBWTtJQUNaLFdBQVc7SUFDWCxPQUFPO0lBQ1AsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxXQUFXO0lBQ1gsTUFBTTtJQUNOLE1BQU07SUFDTixhQUFhO0lBQ2IsVUFBVTtJQUNWLFVBQVU7SUFDVixNQUFNO0lBQ04sT0FBTztJQUNQLFlBQVk7SUFDWixPQUFPO0lBQ1AsTUFBTTtDQUNQLENBQUM7QUFFRjs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFPRixJQVNhLFdBQVcsR0FUeEIsTUFTYSxXQUFZLFNBQVEsYUFBYTtJQUVlO0lBRGpELEVBQUUsQ0FBYztJQUMxQixZQUFZLENBQW9CLEVBQUUsQ0FBYSxFQUFZLENBQVMsRUFBRSxRQUFrQjtRQUN0RixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRHNDLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFFbEUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1gsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQzFCLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUdELGNBQWMsQ0FBQyxFQUEwQjtRQUN2QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOzJIQVpVLFdBQVc7K0dBQVgsV0FBVywrd0JBSFgsQ0FBQyxnQkFBZ0IsQ0FBQyxpREFIbkIsMkJBQTJCOztBQU0xQixXQUFXO0lBZHZCLFFBQVEsQ0FBQztRQUNSLHFCQUFxQixFQUFFLG1CQUFtQjtRQUMxQyxNQUFNLEVBQUUsZUFBZTtRQUN2QixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUM7S0FDekMsQ0FBQztHQVVXLFdBQVcsQ0FhdkI7U0FiWSxXQUFXOzRGQUFYLFdBQVc7a0JBVHZCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyx1RUFBdUU7b0JBQ3ZFLE1BQU0sRUFBRSxlQUFlO29CQUN2QixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOzZLQVdDLGNBQWM7c0JBRGIsWUFBWTt1QkFBQyxVQUFVLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB0eXBlIHsgVGV4dGFyZWFDaGFuZ2VFdmVudERldGFpbCwgVGV4dGFyZWFJbnB1dEV2ZW50RGV0YWlsLCBDb21wb25lbnRzIH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBkZWZpbmVDdXN0b21FbGVtZW50IH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cy9pb24tdGV4dGFyZWEuanMnO1xuXG5pbXBvcnQgeyBQcm94eUNtcCwgcHJveHlPdXRwdXRzIH0gZnJvbSAnLi9hbmd1bGFyLWNvbXBvbmVudC1saWIvdXRpbHMnO1xuXG5jb25zdCBURVhUQVJFQV9JTlBVVFMgPSBbXG4gICdhdXRvR3JvdycsXG4gICdhdXRvY2FwaXRhbGl6ZScsXG4gICdhdXRvZm9jdXMnLFxuICAnY2xlYXJPbkVkaXQnLFxuICAnY29sb3InLFxuICAnY29scycsXG4gICdjb3VudGVyJyxcbiAgJ2NvdW50ZXJGb3JtYXR0ZXInLFxuICAnZGVib3VuY2UnLFxuICAnZGlzYWJsZWQnLFxuICAnZW50ZXJrZXloaW50JyxcbiAgJ2Vycm9yVGV4dCcsXG4gICdmaWxsJyxcbiAgJ2hlbHBlclRleHQnLFxuICAnaW5wdXRtb2RlJyxcbiAgJ2xhYmVsJyxcbiAgJ2xhYmVsUGxhY2VtZW50JyxcbiAgJ21heGxlbmd0aCcsXG4gICdtaW5sZW5ndGgnLFxuICAnbW9kZScsXG4gICduYW1lJyxcbiAgJ3BsYWNlaG9sZGVyJyxcbiAgJ3JlYWRvbmx5JyxcbiAgJ3JlcXVpcmVkJyxcbiAgJ3Jvd3MnLFxuICAnc2hhcGUnLFxuICAnc3BlbGxjaGVjaycsXG4gICd2YWx1ZScsXG4gICd3cmFwJyxcbl07XG5cbi8qKlxuICogUHVsbGluZyB0aGUgcHJvdmlkZXIgaW50byBhbiBvYmplY3QgYW5kIHVzaW5nIFBVUkUgd29ya3NcbiAqIGFyb3VuZCBhbiBuZy1wYWNrYWdyIGlzc3VlIHRoYXQgY2F1c2VzXG4gKiBjb21wb25lbnRzIHdpdGggbXVsdGlwbGUgZGVjb3JhdG9ycyBhbmRcbiAqIGEgcHJvdmlkZXIgdG8gYmUgcmUtYXNzaWduZWQuIFRoaXMgcmUtYXNzaWdubWVudFxuICogaXMgbm90IHN1cHBvcnRlZCBieSBXZWJwYWNrIGFuZCBjYXVzZXMgdHJlZXNoYWtpbmdcbiAqIHRvIG5vdCB3b3JrIG9uIHRoZXNlIGtpbmRzIG9mIGNvbXBvbmVudHMuXG4gKi9cbmNvbnN0IGFjY2Vzc29yUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogLypAX19QVVJFX18qLyBmb3J3YXJkUmVmKCgpID0+IElvblRleHRhcmVhKSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AUHJveHlDbXAoe1xuICBkZWZpbmVDdXN0b21FbGVtZW50Rm46IGRlZmluZUN1c3RvbUVsZW1lbnQsXG4gIGlucHV0czogVEVYVEFSRUFfSU5QVVRTLFxuICBtZXRob2RzOiBbJ3NldEZvY3VzJywgJ2dldElucHV0RWxlbWVudCddLFxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi10ZXh0YXJlYScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFRFWFRBUkVBX0lOUFVUUyxcbiAgcHJvdmlkZXJzOiBbYWNjZXNzb3JQcm92aWRlcl0sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIElvblRleHRhcmVhIGV4dGVuZHMgVmFsdWVBY2Nlc3NvciB7XG4gIHByb3RlY3RlZCBlbDogSFRNTEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBzdXBlcihpbmplY3Rvciwgcik7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkNoYW5nZScsICdpb25JbnB1dCcsICdpb25CbHVyJywgJ2lvbkZvY3VzJ10pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW9uSW5wdXQnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgaGFuZGxlSW9uSW5wdXQoZWw6IEhUTUxJb25UZXh0YXJlYUVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZVZhbHVlQ2hhbmdlKGVsLCBlbC52YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblRleHRhcmVhIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25UZXh0YXJlYSB7XG4gIC8qKlxuICAgKiBUaGUgYGlvbkNoYW5nZWAgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBtb2RpZmllcyB0aGUgdGV4dGFyZWEncyB2YWx1ZS5cblVubGlrZSB0aGUgYGlvbklucHV0YCBldmVudCwgdGhlIGBpb25DaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIHdoZW5cbnRoZSBlbGVtZW50IGxvc2VzIGZvY3VzIGFmdGVyIGl0cyB2YWx1ZSBoYXMgYmVlbiBtb2RpZmllZC5cbiAgICovXG4gIGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PFRleHRhcmVhQ2hhbmdlRXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIFRoZSBgaW9uSW5wdXRgIGV2ZW50IGlzIGZpcmVkIGVhY2ggdGltZSB0aGUgdXNlciBtb2RpZmllcyB0aGUgdGV4dGFyZWEncyB2YWx1ZS5cblVubGlrZSB0aGUgYGlvbkNoYW5nZWAgZXZlbnQsIHRoZSBgaW9uSW5wdXRgIGV2ZW50IGlzIGZpcmVkIGZvciBlYWNoIGFsdGVyYXRpb25cbnRvIHRoZSB0ZXh0YXJlYSdzIHZhbHVlLiBUaGlzIHR5cGljYWxseSBoYXBwZW5zIGZvciBlYWNoIGtleXN0cm9rZSBhcyB0aGUgdXNlciB0eXBlcy5cblxuV2hlbiBgY2xlYXJPbkVkaXRgIGlzIGVuYWJsZWQsIHRoZSBgaW9uSW5wdXRgIGV2ZW50IHdpbGwgYmUgZmlyZWQgd2hlblxudGhlIHVzZXIgY2xlYXJzIHRoZSB0ZXh0YXJlYSBieSBwZXJmb3JtaW5nIGEga2V5ZG93biBldmVudC5cbiAgICovXG4gIGlvbklucHV0OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8VGV4dGFyZWFJbnB1dEV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGlucHV0IGxvc2VzIGZvY3VzLlxuICAgKi9cbiAgaW9uQmx1cjogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PEZvY3VzRXZlbnQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaGFzIGZvY3VzLlxuICAgKi9cbiAgaW9uRm9jdXM6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxGb2N1c0V2ZW50Pj47XG59XG4iXX0=