import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostListener, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor, setIonicClasses } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-toggle.js';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
const TOGGLE_INPUTS = [
    'checked',
    'color',
    'disabled',
    'enableOnOffLabels',
    'errorText',
    'helperText',
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
    useExisting: /*@__PURE__*/ forwardRef(() => IonToggle),
    multi: true,
};
let IonToggle = class IonToggle extends ValueAccessor {
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
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonToggle, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonToggle, isStandalone: true, selector: "ion-toggle", inputs: { checked: "checked", color: "color", disabled: "disabled", enableOnOffLabels: "enableOnOffLabels", errorText: "errorText", helperText: "helperText", justify: "justify", labelPlacement: "labelPlacement", mode: "mode", name: "name", value: "value" }, host: { listeners: { "ionChange": "handleIonChange($event.target)" } }, providers: [accessorProvider], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonToggle = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
        inputs: TOGGLE_INPUTS,
    })
], IonToggle);
export { IonToggle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonToggle, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-toggle',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: TOGGLE_INPUTS,
                    providers: [accessorProvider],
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { handleIonChange: [{
                type: HostListener,
                args: ['ionChange', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3RhbmRhbG9uZS9zcmMvZGlyZWN0aXZlcy90b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUdULFlBQVksRUFHWixVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUzRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUV2RSxNQUFNLGFBQWEsR0FBRztJQUNwQixTQUFTO0lBQ1QsT0FBTztJQUNQLFVBQVU7SUFDVixtQkFBbUI7SUFDbkIsV0FBVztJQUNYLFlBQVk7SUFDWixTQUFTO0lBQ1QsZ0JBQWdCO0lBQ2hCLE1BQU07SUFDTixNQUFNO0lBQ04sT0FBTztDQUNSLENBQUM7QUFFRjs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN0RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFNRixJQVNhLFNBQVMsR0FUdEIsTUFTYSxTQUFVLFNBQVEsYUFBYTtJQUVpQjtJQURqRCxFQUFFLENBQWM7SUFDMUIsWUFBWSxDQUFvQixFQUFFLENBQWEsRUFBWSxDQUFTLEVBQUUsUUFBa0I7UUFDdEYsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQURzQyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBRWxFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUMxQixZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMvRCxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFHRCxlQUFlLENBQUMsRUFBd0I7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQzsySEFqQlUsU0FBUzsrR0FBVCxTQUFTLG1ZQUhULENBQUMsZ0JBQWdCLENBQUMsaURBSG5CLDJCQUEyQjs7QUFNMUIsU0FBUztJQWJyQixRQUFRLENBQUM7UUFDUixxQkFBcUIsRUFBRSxtQkFBbUI7UUFDMUMsTUFBTSxFQUFFLGFBQWE7S0FDdEIsQ0FBQztHQVVXLFNBQVMsQ0FrQnJCO1NBbEJZLFNBQVM7NEZBQVQsU0FBUztrQkFUckIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLHVFQUF1RTtvQkFDdkUsTUFBTSxFQUFFLGFBQWE7b0JBQ3JCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUM3QixVQUFVLEVBQUUsSUFBSTtpQkFDakI7NktBZ0JDLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWYWx1ZUFjY2Vzc29yLCBzZXRJb25pY0NsYXNzZXMgfSBmcm9tICdAaW9uaWMvYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHR5cGUgeyBUb2dnbGVDaGFuZ2VFdmVudERldGFpbCwgQ29tcG9uZW50cyB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgZGVmaW5lQ3VzdG9tRWxlbWVudCB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMvaW9uLXRvZ2dsZS5qcyc7XG5cbmltcG9ydCB7IFByb3h5Q21wLCBwcm94eU91dHB1dHMgfSBmcm9tICcuL2FuZ3VsYXItY29tcG9uZW50LWxpYi91dGlscyc7XG5cbmNvbnN0IFRPR0dMRV9JTlBVVFMgPSBbXG4gICdjaGVja2VkJyxcbiAgJ2NvbG9yJyxcbiAgJ2Rpc2FibGVkJyxcbiAgJ2VuYWJsZU9uT2ZmTGFiZWxzJyxcbiAgJ2Vycm9yVGV4dCcsXG4gICdoZWxwZXJUZXh0JyxcbiAgJ2p1c3RpZnknLFxuICAnbGFiZWxQbGFjZW1lbnQnLFxuICAnbW9kZScsXG4gICduYW1lJyxcbiAgJ3ZhbHVlJyxcbl07XG5cbi8qKlxuICogUHVsbGluZyB0aGUgcHJvdmlkZXIgaW50byBhbiBvYmplY3QgYW5kIHVzaW5nIFBVUkUgd29ya3NcbiAqIGFyb3VuZCBhbiBuZy1wYWNrYWdyIGlzc3VlIHRoYXQgY2F1c2VzXG4gKiBjb21wb25lbnRzIHdpdGggbXVsdGlwbGUgZGVjb3JhdG9ycyBhbmRcbiAqIGEgcHJvdmlkZXIgdG8gYmUgcmUtYXNzaWduZWQuIFRoaXMgcmUtYXNzaWdubWVudFxuICogaXMgbm90IHN1cHBvcnRlZCBieSBXZWJwYWNrIGFuZCBjYXVzZXMgdHJlZXNoYWtpbmdcbiAqIHRvIG5vdCB3b3JrIG9uIHRoZXNlIGtpbmRzIG9mIGNvbXBvbmVudHMuXG4gKi9cbmNvbnN0IGFjY2Vzc29yUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogLypAX19QVVJFX18qLyBmb3J3YXJkUmVmKCgpID0+IElvblRvZ2dsZSksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQFByb3h5Q21wKHtcbiAgZGVmaW5lQ3VzdG9tRWxlbWVudEZuOiBkZWZpbmVDdXN0b21FbGVtZW50LFxuICBpbnB1dHM6IFRPR0dMRV9JTlBVVFMsXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXRvZ2dsZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFRPR0dMRV9JTlBVVFMsXG4gIHByb3ZpZGVyczogW2FjY2Vzc29yUHJvdmlkZXJdLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBJb25Ub2dnbGUgZXh0ZW5kcyBWYWx1ZUFjY2Vzc29yIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHN1cGVyKGluamVjdG9yLCByKTtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uQ2hhbmdlJywgJ2lvbkZvY3VzJywgJ2lvbkJsdXInXSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IHRoaXMubGFzdFZhbHVlID0gdmFsdWU7XG4gICAgc2V0SW9uaWNDbGFzc2VzKHRoaXMuZWxlbWVudFJlZik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpb25DaGFuZ2UnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgaGFuZGxlSW9uQ2hhbmdlKGVsOiBIVE1MSW9uVG9nZ2xlRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlVmFsdWVDaGFuZ2UoZWwsIGVsLmNoZWNrZWQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25Ub2dnbGUgZXh0ZW5kcyBDb21wb25lbnRzLklvblRvZ2dsZSB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgc3dpdGNoZXMgdGhlIHRvZ2dsZSBvbiBvciBvZmYuIERvZXMgbm90IGVtaXRcbndoZW4gcHJvZ3JhbW1hdGljYWxseSBjaGFuZ2luZyB0aGUgdmFsdWUgb2YgdGhlIGBjaGVja2VkYCBwcm9wZXJ0eS5cbiAgICovXG4gIGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PFRvZ2dsZUNoYW5nZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHRvZ2dsZSBoYXMgZm9jdXMuXG4gICAqL1xuICBpb25Gb2N1czogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgdG9nZ2xlIGxvc2VzIGZvY3VzLlxuICAgKi9cbiAgaW9uQmx1cjogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+Pjtcbn1cbiJdfQ==