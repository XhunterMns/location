import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostListener, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor, setIonicClasses } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-checkbox.js';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
const CHECKBOX_INPUTS = [
    'checked',
    'color',
    'disabled',
    'errorText',
    'helperText',
    'indeterminate',
    'justify',
    'labelPlacement',
    'mode',
    'name',
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
    useExisting: /*@__PURE__*/ forwardRef(() => IonCheckbox),
    multi: true,
};
let IonCheckbox = class IonCheckbox extends ValueAccessor {
    z;
    el;
    constructor(c, r, z, injector) {
        super(injector, r);
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur']);
    }
    writeValue(value) {
        this.elementRef.nativeElement.checked = this.lastValue = value;
        setIonicClasses(this.elementRef);
    }
    handleIonChange(el) {
        this.handleValueChange(el, el.checked);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCheckbox, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonCheckbox, isStandalone: true, selector: "ion-checkbox", inputs: { checked: "checked", color: "color", disabled: "disabled", errorText: "errorText", helperText: "helperText", indeterminate: "indeterminate", justify: "justify", labelPlacement: "labelPlacement", mode: "mode", name: "name", value: "value" }, host: { listeners: { "ionChange": "handleIonChange($event.target)" } }, providers: [accessorProvider], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonCheckbox = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
        inputs: CHECKBOX_INPUTS,
    })
], IonCheckbox);
export { IonCheckbox };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-checkbox',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: CHECKBOX_INPUTS,
                    providers: [accessorProvider],
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { handleIonChange: [{
                type: HostListener,
                args: ['ionChange', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9kaXJlY3RpdmVzL2NoZWNrYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFHVCxZQUFZLEVBR1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFN0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7QUFFdkUsTUFBTSxlQUFlLEdBQUc7SUFDdEIsU0FBUztJQUNULE9BQU87SUFDUCxVQUFVO0lBQ1YsV0FBVztJQUNYLFlBQVk7SUFDWixlQUFlO0lBQ2YsU0FBUztJQUNULGdCQUFnQjtJQUNoQixNQUFNO0lBQ04sTUFBTTtJQUNOLE9BQU87Q0FDUixDQUFDO0FBRUY7Ozs7Ozs7R0FPRztBQUNILE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDeEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBTUYsSUFTYSxXQUFXLEdBVHhCLE1BU2EsV0FBWSxTQUFRLGFBQWE7SUFFZTtJQURqRCxFQUFFLENBQWM7SUFDMUIsWUFBWSxDQUFvQixFQUFFLENBQWEsRUFBWSxDQUFTLEVBQUUsUUFBa0I7UUFDdEYsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQURzQyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBRWxFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUMxQixZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMvRCxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFHRCxlQUFlLENBQUMsRUFBaUQ7UUFDL0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQzsySEFqQlUsV0FBVzsrR0FBWCxXQUFXLDZYQUhYLENBQUMsZ0JBQWdCLENBQUMsaURBSG5CLDJCQUEyQjs7QUFNMUIsV0FBVztJQWJ2QixRQUFRLENBQUM7UUFDUixxQkFBcUIsRUFBRSxtQkFBbUI7UUFDMUMsTUFBTSxFQUFFLGVBQWU7S0FDeEIsQ0FBQztHQVVXLFdBQVcsQ0FrQnZCO1NBbEJZLFdBQVc7NEZBQVgsV0FBVztrQkFUdkIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLHVFQUF1RTtvQkFDdkUsTUFBTSxFQUFFLGVBQWU7b0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUM3QixVQUFVLEVBQUUsSUFBSTtpQkFDakI7NktBZ0JDLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWYWx1ZUFjY2Vzc29yLCBzZXRJb25pY0NsYXNzZXMgfSBmcm9tICdAaW9uaWMvYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHR5cGUgeyBDaGVja2JveENoYW5nZUV2ZW50RGV0YWlsLCBDb21wb25lbnRzIH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBkZWZpbmVDdXN0b21FbGVtZW50IH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cy9pb24tY2hlY2tib3guanMnO1xuXG5pbXBvcnQgeyBQcm94eUNtcCwgcHJveHlPdXRwdXRzIH0gZnJvbSAnLi9hbmd1bGFyLWNvbXBvbmVudC1saWIvdXRpbHMnO1xuXG5jb25zdCBDSEVDS0JPWF9JTlBVVFMgPSBbXG4gICdjaGVja2VkJyxcbiAgJ2NvbG9yJyxcbiAgJ2Rpc2FibGVkJyxcbiAgJ2Vycm9yVGV4dCcsXG4gICdoZWxwZXJUZXh0JyxcbiAgJ2luZGV0ZXJtaW5hdGUnLFxuICAnanVzdGlmeScsXG4gICdsYWJlbFBsYWNlbWVudCcsXG4gICdtb2RlJyxcbiAgJ25hbWUnLFxuICAndmFsdWUnLFxuXTtcblxuLyoqXG4gKiBQdWxsaW5nIHRoZSBwcm92aWRlciBpbnRvIGFuIG9iamVjdCBhbmQgdXNpbmcgUFVSRSB3b3Jrc1xuICogYXJvdW5kIGFuIG5nLXBhY2thZ3IgaXNzdWUgdGhhdCBjYXVzZXNcbiAqIGNvbXBvbmVudHMgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzIGFuZFxuICogYSBwcm92aWRlciB0byBiZSByZS1hc3NpZ25lZC4gVGhpcyByZS1hc3NpZ25tZW50XG4gKiBpcyBub3Qgc3VwcG9ydGVkIGJ5IFdlYnBhY2sgYW5kIGNhdXNlcyB0cmVlc2hha2luZ1xuICogdG8gbm90IHdvcmsgb24gdGhlc2Uga2luZHMgb2YgY29tcG9uZW50cy5cbiAqL1xuY29uc3QgYWNjZXNzb3JQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiAvKkBfX1BVUkVfXyovIGZvcndhcmRSZWYoKCkgPT4gSW9uQ2hlY2tib3gpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBQcm94eUNtcCh7XG4gIGRlZmluZUN1c3RvbUVsZW1lbnRGbjogZGVmaW5lQ3VzdG9tRWxlbWVudCxcbiAgaW5wdXRzOiBDSEVDS0JPWF9JTlBVVFMsXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWNoZWNrYm94JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogQ0hFQ0tCT1hfSU5QVVRTLFxuICBwcm92aWRlcnM6IFthY2Nlc3NvclByb3ZpZGVyXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uQ2hlY2tib3ggZXh0ZW5kcyBWYWx1ZUFjY2Vzc29yIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHN1cGVyKGluamVjdG9yLCByKTtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uQ2hhbmdlJywgJ2lvbkZvY3VzJywgJ2lvbkJsdXInXSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IHRoaXMubGFzdFZhbHVlID0gdmFsdWU7XG4gICAgc2V0SW9uaWNDbGFzc2VzKHRoaXMuZWxlbWVudFJlZik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpb25DaGFuZ2UnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgaGFuZGxlSW9uQ2hhbmdlKGVsOiBIVE1MSW9uQ2hlY2tib3hFbGVtZW50IHwgSFRNTElvblRvZ2dsZUVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZVZhbHVlQ2hhbmdlKGVsLCBlbC5jaGVja2VkKTtcbiAgfVxufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uQ2hlY2tib3ggZXh0ZW5kcyBDb21wb25lbnRzLklvbkNoZWNrYm94IHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgY2hlY2tlZCBwcm9wZXJ0eSBoYXMgY2hhbmdlZFxuYXMgYSByZXN1bHQgb2YgYSB1c2VyIGFjdGlvbiBzdWNoIGFzIGEgY2xpY2suXG5UaGlzIGV2ZW50IHdpbGwgbm90IGVtaXQgd2hlbiBwcm9ncmFtbWF0aWNhbGx5XG5zZXR0aW5nIHRoZSBjaGVja2VkIHByb3BlcnR5LlxuICAgKi9cbiAgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8Q2hlY2tib3hDaGFuZ2VFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBjaGVja2JveCBoYXMgZm9jdXMuXG4gICAqL1xuICBpb25Gb2N1czogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgY2hlY2tib3ggbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xufVxuIl19