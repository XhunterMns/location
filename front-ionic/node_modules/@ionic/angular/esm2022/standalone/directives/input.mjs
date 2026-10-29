import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostListener, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-input.js';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
const INPUT_INPUTS = [
    'accept',
    'autocapitalize',
    'autocomplete',
    'autocorrect',
    'autofocus',
    'clearInput',
    'clearOnEdit',
    'color',
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
    'max',
    'maxlength',
    'min',
    'minlength',
    'mode',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'readonly',
    'required',
    'shape',
    'size',
    'spellcheck',
    'step',
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
    useExisting: /*@__PURE__*/ forwardRef(() => IonInput),
    multi: true,
};
let IonInput = class IonInput extends ValueAccessor {
    z;
    el;
    constructor(c, r, z, injector) {
        super(injector, r);
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionBlur', 'ionFocus']);
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
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInput, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonInput, isStandalone: true, selector: "ion-input", inputs: { accept: "accept", autocapitalize: "autocapitalize", autocomplete: "autocomplete", autocorrect: "autocorrect", autofocus: "autofocus", clearInput: "clearInput", clearOnEdit: "clearOnEdit", color: "color", counter: "counter", counterFormatter: "counterFormatter", debounce: "debounce", disabled: "disabled", enterkeyhint: "enterkeyhint", errorText: "errorText", fill: "fill", helperText: "helperText", inputmode: "inputmode", label: "label", labelPlacement: "labelPlacement", max: "max", maxlength: "maxlength", min: "min", minlength: "minlength", mode: "mode", multiple: "multiple", name: "name", pattern: "pattern", placeholder: "placeholder", readonly: "readonly", required: "required", shape: "shape", size: "size", spellcheck: "spellcheck", step: "step", type: "type", value: "value" }, host: { listeners: { "ionInput": "handleIonInput($event.target)" } }, providers: [accessorProvider], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonInput = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
        inputs: INPUT_INPUTS,
        methods: ['setFocus', 'getInputElement'],
    })
], IonInput);
export { IonInput };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInput, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-input',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: INPUT_INPUTS,
                    providers: [accessorProvider],
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { handleIonInput: [{
                type: HostListener,
                args: ['ionInput', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9kaXJlY3RpdmVzL2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFHVCxZQUFZLEVBR1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU10RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUV2RSxNQUFNLFlBQVksR0FBRztJQUNuQixRQUFRO0lBQ1IsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxhQUFhO0lBQ2IsV0FBVztJQUNYLFlBQVk7SUFDWixhQUFhO0lBQ2IsT0FBTztJQUNQLFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFVBQVU7SUFDVixjQUFjO0lBQ2QsV0FBVztJQUNYLE1BQU07SUFDTixZQUFZO0lBQ1osV0FBVztJQUNYLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIsS0FBSztJQUNMLFdBQVc7SUFDWCxLQUFLO0lBQ0wsV0FBVztJQUNYLE1BQU07SUFDTixVQUFVO0lBQ1YsTUFBTTtJQUNOLFNBQVM7SUFDVCxhQUFhO0lBQ2IsVUFBVTtJQUNWLFVBQVU7SUFDVixPQUFPO0lBQ1AsTUFBTTtJQUNOLFlBQVk7SUFDWixNQUFNO0lBQ04sTUFBTTtJQUNOLE9BQU87Q0FDUixDQUFDO0FBRUY7Ozs7Ozs7R0FPRztBQUNILE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDckQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBT0YsSUFTYSxRQUFRLEdBVHJCLE1BU2EsUUFBUyxTQUFRLGFBQWE7SUFFa0I7SUFEakQsRUFBRSxDQUFjO0lBQzFCLFlBQVksQ0FBb0IsRUFBRSxDQUFhLEVBQVksQ0FBUyxFQUFFLFFBQWtCO1FBQ3RGLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFEc0MsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUVsRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDWCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDMUIsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBR0QsY0FBYyxDQUFDLEVBQXVCO1FBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFvQjtRQUNuQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtZQUN2QyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUMxQjs7OzttQkFJRztnQkFDSCxFQUFFLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUM3QztpQkFBTTtnQkFDTCxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDWDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzsySEEzQlUsUUFBUTsrR0FBUixRQUFRLDg1QkFIUixDQUFDLGdCQUFnQixDQUFDLGlEQUhuQiwyQkFBMkI7O0FBTTFCLFFBQVE7SUFkcEIsUUFBUSxDQUFDO1FBQ1IscUJBQXFCLEVBQUUsbUJBQW1CO1FBQzFDLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQztLQUN6QyxDQUFDO0dBVVcsUUFBUSxDQTRCcEI7U0E1QlksUUFBUTs0RkFBUixRQUFRO2tCQVRwQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsdUVBQXVFO29CQUN2RSxNQUFNLEVBQUUsWUFBWTtvQkFDcEIsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzdCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs2S0FXQyxjQUFjO3NCQURiLFlBQVk7dUJBQUMsVUFBVSxFQUFFLENBQUMsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBmb3J3YXJkUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgdHlwZSB7XG4gIElucHV0SW5wdXRFdmVudERldGFpbCBhcyBJSW9uSW5wdXRJbnB1dElucHV0RXZlbnREZXRhaWwsXG4gIElucHV0Q2hhbmdlRXZlbnREZXRhaWwgYXMgSUlvbklucHV0SW5wdXRDaGFuZ2VFdmVudERldGFpbCxcbiAgQ29tcG9uZW50cyxcbn0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBkZWZpbmVDdXN0b21FbGVtZW50IH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cy9pb24taW5wdXQuanMnO1xuXG5pbXBvcnQgeyBQcm94eUNtcCwgcHJveHlPdXRwdXRzIH0gZnJvbSAnLi9hbmd1bGFyLWNvbXBvbmVudC1saWIvdXRpbHMnO1xuXG5jb25zdCBJTlBVVF9JTlBVVFMgPSBbXG4gICdhY2NlcHQnLFxuICAnYXV0b2NhcGl0YWxpemUnLFxuICAnYXV0b2NvbXBsZXRlJyxcbiAgJ2F1dG9jb3JyZWN0JyxcbiAgJ2F1dG9mb2N1cycsXG4gICdjbGVhcklucHV0JyxcbiAgJ2NsZWFyT25FZGl0JyxcbiAgJ2NvbG9yJyxcbiAgJ2NvdW50ZXInLFxuICAnY291bnRlckZvcm1hdHRlcicsXG4gICdkZWJvdW5jZScsXG4gICdkaXNhYmxlZCcsXG4gICdlbnRlcmtleWhpbnQnLFxuICAnZXJyb3JUZXh0JyxcbiAgJ2ZpbGwnLFxuICAnaGVscGVyVGV4dCcsXG4gICdpbnB1dG1vZGUnLFxuICAnbGFiZWwnLFxuICAnbGFiZWxQbGFjZW1lbnQnLFxuICAnbWF4JyxcbiAgJ21heGxlbmd0aCcsXG4gICdtaW4nLFxuICAnbWlubGVuZ3RoJyxcbiAgJ21vZGUnLFxuICAnbXVsdGlwbGUnLFxuICAnbmFtZScsXG4gICdwYXR0ZXJuJyxcbiAgJ3BsYWNlaG9sZGVyJyxcbiAgJ3JlYWRvbmx5JyxcbiAgJ3JlcXVpcmVkJyxcbiAgJ3NoYXBlJyxcbiAgJ3NpemUnLFxuICAnc3BlbGxjaGVjaycsXG4gICdzdGVwJyxcbiAgJ3R5cGUnLFxuICAndmFsdWUnLFxuXTtcblxuLyoqXG4gKiBQdWxsaW5nIHRoZSBwcm92aWRlciBpbnRvIGFuIG9iamVjdCBhbmQgdXNpbmcgUFVSRSB3b3Jrc1xuICogYXJvdW5kIGFuIG5nLXBhY2thZ3IgaXNzdWUgdGhhdCBjYXVzZXNcbiAqIGNvbXBvbmVudHMgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzIGFuZFxuICogYSBwcm92aWRlciB0byBiZSByZS1hc3NpZ25lZC4gVGhpcyByZS1hc3NpZ25tZW50XG4gKiBpcyBub3Qgc3VwcG9ydGVkIGJ5IFdlYnBhY2sgYW5kIGNhdXNlcyB0cmVlc2hha2luZ1xuICogdG8gbm90IHdvcmsgb24gdGhlc2Uga2luZHMgb2YgY29tcG9uZW50cy5cbiAqL1xuY29uc3QgYWNjZXNzb3JQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiAvKkBfX1BVUkVfXyovIGZvcndhcmRSZWYoKCkgPT4gSW9uSW5wdXQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBQcm94eUNtcCh7XG4gIGRlZmluZUN1c3RvbUVsZW1lbnRGbjogZGVmaW5lQ3VzdG9tRWxlbWVudCxcbiAgaW5wdXRzOiBJTlBVVF9JTlBVVFMsXG4gIG1ldGhvZHM6IFsnc2V0Rm9jdXMnLCAnZ2V0SW5wdXRFbGVtZW50J10sXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWlucHV0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogSU5QVVRfSU5QVVRTLFxuICBwcm92aWRlcnM6IFthY2Nlc3NvclByb3ZpZGVyXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uSW5wdXQgZXh0ZW5kcyBWYWx1ZUFjY2Vzc29yIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHN1cGVyKGluamVjdG9yLCByKTtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uSW5wdXQnLCAnaW9uQ2hhbmdlJywgJ2lvbkJsdXInLCAnaW9uRm9jdXMnXSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpb25JbnB1dCcsIFsnJGV2ZW50LnRhcmdldCddKVxuICBoYW5kbGVJb25JbnB1dChlbDogSFRNTElvbklucHV0RWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlVmFsdWVDaGFuZ2UoZWwsIGVsLnZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBzdXBlci5yZWdpc3Rlck9uQ2hhbmdlKCh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodGhpcy50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhlIGlucHV0IHR5cGUgaXMgYG51bWJlcmAsIHdlIG5lZWQgdG8gY29udmVydCB0aGUgdmFsdWUgdG8gYSBudW1iZXJcbiAgICAgICAgICogd2hlbiB0aGUgdmFsdWUgaXMgbm90IGVtcHR5LiBJZiB0aGUgdmFsdWUgaXMgZW1wdHksIHdlIHdhbnQgdG8gdHJlYXRcbiAgICAgICAgICogdGhlIHZhbHVlIGFzIG51bGwuXG4gICAgICAgICAqL1xuICAgICAgICBmbih2YWx1ZSA9PT0gJycgPyBudWxsIDogcGFyc2VGbG9hdCh2YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm4odmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25JbnB1dCBleHRlbmRzIENvbXBvbmVudHMuSW9uSW5wdXQge1xuICAvKipcbiAgICogVGhlIGBpb25JbnB1dGAgZXZlbnQgaXMgZmlyZWQgZWFjaCB0aW1lIHRoZSB1c2VyIG1vZGlmaWVzIHRoZSBpbnB1dCdzIHZhbHVlLlxuVW5saWtlIHRoZSBgaW9uQ2hhbmdlYCBldmVudCwgdGhlIGBpb25JbnB1dGAgZXZlbnQgaXMgZmlyZWQgZm9yIGVhY2ggYWx0ZXJhdGlvblxudG8gdGhlIGlucHV0J3MgdmFsdWUuIFRoaXMgdHlwaWNhbGx5IGhhcHBlbnMgZm9yIGVhY2gga2V5c3Ryb2tlIGFzIHRoZSB1c2VyIHR5cGVzLlxuXG5Gb3IgZWxlbWVudHMgdGhhdCBhY2NlcHQgdGV4dCBpbnB1dCAoYHR5cGU9dGV4dGAsIGB0eXBlPXRlbGAsIGV0Yy4pLCB0aGUgaW50ZXJmYWNlXG5pcyBbYElucHV0RXZlbnRgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSW5wdXRFdmVudCk7IGZvciBvdGhlcnMsXG50aGUgaW50ZXJmYWNlIGlzIFtgRXZlbnRgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXZlbnQpLiBJZlxudGhlIGlucHV0IGlzIGNsZWFyZWQgb24gZWRpdCwgdGhlIHR5cGUgaXMgYG51bGxgLlxuICAgKi9cbiAgaW9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uSW5wdXRJbnB1dElucHV0RXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIFRoZSBgaW9uQ2hhbmdlYCBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIG1vZGlmaWVzIHRoZSBpbnB1dCdzIHZhbHVlLlxuVW5saWtlIHRoZSBgaW9uSW5wdXRgIGV2ZW50LCB0aGUgYGlvbkNoYW5nZWAgZXZlbnQgaXMgb25seSBmaXJlZCB3aGVuIGNoYW5nZXNcbmFyZSBjb21taXR0ZWQsIG5vdCBhcyB0aGUgdXNlciB0eXBlcy5cblxuRGVwZW5kaW5nIG9uIHRoZSB3YXkgdGhlIHVzZXJzIGludGVyYWN0cyB3aXRoIHRoZSBlbGVtZW50LCB0aGUgYGlvbkNoYW5nZWBcbmV2ZW50IGZpcmVzIGF0IGEgZGlmZmVyZW50IG1vbWVudDpcbi0gV2hlbiB0aGUgdXNlciBjb21taXRzIHRoZSBjaGFuZ2UgZXhwbGljaXRseSAoZS5nLiBieSBzZWxlY3RpbmcgYSBkYXRlXG5mcm9tIGEgZGF0ZSBwaWNrZXIgZm9yIGA8aW9uLWlucHV0IHR5cGU9XCJkYXRlXCI+YCwgcHJlc3NpbmcgdGhlIFwiRW50ZXJcIiBrZXksIGV0Yy4pLlxuLSBXaGVuIHRoZSBlbGVtZW50IGxvc2VzIGZvY3VzIGFmdGVyIGl0cyB2YWx1ZSBoYXMgY2hhbmdlZDogZm9yIGVsZW1lbnRzXG53aGVyZSB0aGUgdXNlcidzIGludGVyYWN0aW9uIGlzIHR5cGluZy5cbiAgICovXG4gIGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25JbnB1dElucHV0Q2hhbmdlRXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8Rm9jdXNFdmVudD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBoYXMgZm9jdXMuXG4gICAqL1xuICBpb25Gb2N1czogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PEZvY3VzRXZlbnQ+Pjtcbn1cbiJdfQ==