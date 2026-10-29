import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostListener, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-select.js';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
const SELECT_INPUTS = [
    'cancelText',
    'color',
    'compareWith',
    'disabled',
    'errorText',
    'expandedIcon',
    'fill',
    'helperText',
    'interface',
    'interfaceOptions',
    'justify',
    'label',
    'labelPlacement',
    'mode',
    'multiple',
    'name',
    'okText',
    'placeholder',
    'selectedText',
    'shape',
    'toggleIcon',
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
    useExisting: /*@__PURE__*/ forwardRef(() => IonSelect),
    multi: true,
};
let IonSelect = class IonSelect extends ValueAccessor {
    z;
    el;
    constructor(c, r, z, injector) {
        super(injector, r);
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange', 'ionCancel', 'ionDismiss', 'ionFocus', 'ionBlur']);
    }
    handleIonChange(el) {
        this.handleValueChange(el, el.value);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSelect, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSelect, isStandalone: true, selector: "ion-select", inputs: { cancelText: "cancelText", color: "color", compareWith: "compareWith", disabled: "disabled", errorText: "errorText", expandedIcon: "expandedIcon", fill: "fill", helperText: "helperText", interface: "interface", interfaceOptions: "interfaceOptions", justify: "justify", label: "label", labelPlacement: "labelPlacement", mode: "mode", multiple: "multiple", name: "name", okText: "okText", placeholder: "placeholder", selectedText: "selectedText", shape: "shape", toggleIcon: "toggleIcon", value: "value" }, host: { listeners: { "ionChange": "handleIonChange($event.target)" } }, providers: [accessorProvider], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSelect = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
        inputs: SELECT_INPUTS,
        methods: ['open'],
    })
], IonSelect);
export { IonSelect };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-select',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: SELECT_INPUTS,
                    providers: [accessorProvider],
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { handleIonChange: [{
                type: HostListener,
                args: ['ionChange', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3RhbmRhbG9uZS9zcmMvZGlyZWN0aXZlcy9zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUdULFlBQVksRUFHWixVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXRELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBRXZFLE1BQU0sYUFBYSxHQUFHO0lBQ3BCLFlBQVk7SUFDWixPQUFPO0lBQ1AsYUFBYTtJQUNiLFVBQVU7SUFDVixXQUFXO0lBQ1gsY0FBYztJQUNkLE1BQU07SUFDTixZQUFZO0lBQ1osV0FBVztJQUNYLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsT0FBTztJQUNQLGdCQUFnQjtJQUNoQixNQUFNO0lBQ04sVUFBVTtJQUNWLE1BQU07SUFDTixRQUFRO0lBQ1IsYUFBYTtJQUNiLGNBQWM7SUFDZCxPQUFPO0lBQ1AsWUFBWTtJQUNaLE9BQU87Q0FDUixDQUFDO0FBRUY7Ozs7Ozs7R0FPRztBQUNILE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDdEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBT0YsSUFTYSxTQUFTLEdBVHRCLE1BU2EsU0FBVSxTQUFRLGFBQWE7SUFFaUI7SUFEakQsRUFBRSxDQUFjO0lBQzFCLFlBQVksQ0FBb0IsRUFBRSxDQUFhLEVBQVksQ0FBUyxFQUFFLFFBQWtCO1FBQ3RGLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFEc0MsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUVsRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDWCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDMUIsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUdELGVBQWUsQ0FBQyxFQUF3QjtRQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOzJIQVpVLFNBQVM7K0dBQVQsU0FBUyxtb0JBSFQsQ0FBQyxnQkFBZ0IsQ0FBQyxpREFIbkIsMkJBQTJCOztBQU0xQixTQUFTO0lBZHJCLFFBQVEsQ0FBQztRQUNSLHFCQUFxQixFQUFFLG1CQUFtQjtRQUMxQyxNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7S0FDbEIsQ0FBQztHQVVXLFNBQVMsQ0FhckI7U0FiWSxTQUFTOzRGQUFULFNBQVM7a0JBVHJCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyx1RUFBdUU7b0JBQ3ZFLE1BQU0sRUFBRSxhQUFhO29CQUNyQixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOzZLQVdDLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB0eXBlIHsgU2VsZWN0Q2hhbmdlRXZlbnREZXRhaWwsIENvbXBvbmVudHMgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcbmltcG9ydCB7IGRlZmluZUN1c3RvbUVsZW1lbnQgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzL2lvbi1zZWxlY3QuanMnO1xuXG5pbXBvcnQgeyBQcm94eUNtcCwgcHJveHlPdXRwdXRzIH0gZnJvbSAnLi9hbmd1bGFyLWNvbXBvbmVudC1saWIvdXRpbHMnO1xuXG5jb25zdCBTRUxFQ1RfSU5QVVRTID0gW1xuICAnY2FuY2VsVGV4dCcsXG4gICdjb2xvcicsXG4gICdjb21wYXJlV2l0aCcsXG4gICdkaXNhYmxlZCcsXG4gICdlcnJvclRleHQnLFxuICAnZXhwYW5kZWRJY29uJyxcbiAgJ2ZpbGwnLFxuICAnaGVscGVyVGV4dCcsXG4gICdpbnRlcmZhY2UnLFxuICAnaW50ZXJmYWNlT3B0aW9ucycsXG4gICdqdXN0aWZ5JyxcbiAgJ2xhYmVsJyxcbiAgJ2xhYmVsUGxhY2VtZW50JyxcbiAgJ21vZGUnLFxuICAnbXVsdGlwbGUnLFxuICAnbmFtZScsXG4gICdva1RleHQnLFxuICAncGxhY2Vob2xkZXInLFxuICAnc2VsZWN0ZWRUZXh0JyxcbiAgJ3NoYXBlJyxcbiAgJ3RvZ2dsZUljb24nLFxuICAndmFsdWUnLFxuXTtcblxuLyoqXG4gKiBQdWxsaW5nIHRoZSBwcm92aWRlciBpbnRvIGFuIG9iamVjdCBhbmQgdXNpbmcgUFVSRSB3b3Jrc1xuICogYXJvdW5kIGFuIG5nLXBhY2thZ3IgaXNzdWUgdGhhdCBjYXVzZXNcbiAqIGNvbXBvbmVudHMgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzIGFuZFxuICogYSBwcm92aWRlciB0byBiZSByZS1hc3NpZ25lZC4gVGhpcyByZS1hc3NpZ25tZW50XG4gKiBpcyBub3Qgc3VwcG9ydGVkIGJ5IFdlYnBhY2sgYW5kIGNhdXNlcyB0cmVlc2hha2luZ1xuICogdG8gbm90IHdvcmsgb24gdGhlc2Uga2luZHMgb2YgY29tcG9uZW50cy5cbiAqL1xuY29uc3QgYWNjZXNzb3JQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiAvKkBfX1BVUkVfXyovIGZvcndhcmRSZWYoKCkgPT4gSW9uU2VsZWN0KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AUHJveHlDbXAoe1xuICBkZWZpbmVDdXN0b21FbGVtZW50Rm46IGRlZmluZUN1c3RvbUVsZW1lbnQsXG4gIGlucHV0czogU0VMRUNUX0lOUFVUUyxcbiAgbWV0aG9kczogWydvcGVuJ10sXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXNlbGVjdCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFNFTEVDVF9JTlBVVFMsXG4gIHByb3ZpZGVyczogW2FjY2Vzc29yUHJvdmlkZXJdLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBJb25TZWxlY3QgZXh0ZW5kcyBWYWx1ZUFjY2Vzc29yIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHN1cGVyKGluamVjdG9yLCByKTtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uQ2hhbmdlJywgJ2lvbkNhbmNlbCcsICdpb25EaXNtaXNzJywgJ2lvbkZvY3VzJywgJ2lvbkJsdXInXSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpb25DaGFuZ2UnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgaGFuZGxlSW9uQ2hhbmdlKGVsOiBIVE1MSW9uU2VsZWN0RWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlVmFsdWVDaGFuZ2UoZWwsIGVsLnZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25TZWxlY3Qge1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSB2YWx1ZSBoYXMgY2hhbmdlZC5cbiAgICovXG4gIGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PFNlbGVjdENoYW5nZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGlvbiBpcyBjYW5jZWxsZWQuXG4gICAqL1xuICBpb25DYW5jZWw6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIG92ZXJsYXkgaXMgZGlzbWlzc2VkLlxuICAgKi9cbiAgaW9uRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBmb2N1cy5cbiAgICovXG4gIGlvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xufVxuIl19