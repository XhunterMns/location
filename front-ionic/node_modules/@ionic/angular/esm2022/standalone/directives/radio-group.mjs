import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostListener, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-radio-group.js';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
const RADIO_GROUP_INPUTS = ['allowEmptySelection', 'compareWith', 'errorText', 'helperText', 'name', 'value'];
/**
 * Pulling the provider into an object and using PURE  works
 * around an ng-packagr issue that causes
 * components with multiple decorators and
 * a provider to be re-assigned. This re-assignment
 * is not supported by Webpack and causes treeshaking
 * to not work on these kinds of components.
 */
const accessorProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: /*@__PURE__*/ forwardRef(() => IonRadioGroup),
    multi: true,
};
let IonRadioGroup = class IonRadioGroup extends ValueAccessor {
    z;
    el;
    constructor(c, r, z, injector) {
        super(injector, r);
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange']);
    }
    handleIonChange(el) {
        this.handleValueChange(el, el.value);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRadioGroup, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRadioGroup, isStandalone: true, selector: "ion-radio-group", inputs: { allowEmptySelection: "allowEmptySelection", compareWith: "compareWith", errorText: "errorText", helperText: "helperText", name: "name", value: "value" }, host: { listeners: { "ionChange": "handleIonChange($event.target)" } }, providers: [accessorProvider], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonRadioGroup = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
        inputs: RADIO_GROUP_INPUTS,
    })
], IonRadioGroup);
export { IonRadioGroup };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRadioGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-radio-group',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: RADIO_GROUP_INPUTS,
                    providers: [accessorProvider],
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { handleIonChange: [{
                type: HostListener,
                args: ['ionChange', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9kaXJlY3RpdmVzL3JhZGlvLWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFHVCxZQUFZLEVBR1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVoRixPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUV2RSxNQUFNLGtCQUFrQixHQUFHLENBQUMscUJBQXFCLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRTlHOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQzFELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQU1GLElBU2EsYUFBYSxHQVQxQixNQVNhLGFBQWMsU0FBUSxhQUFhO0lBRWE7SUFEakQsRUFBRSxDQUFjO0lBQzFCLFlBQVksQ0FBb0IsRUFBRSxDQUFhLEVBQVksQ0FBUyxFQUFFLFFBQWtCO1FBQ3RGLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFEc0MsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUVsRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDWCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDMUIsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBR0QsZUFBZSxDQUFDLEVBQTRCO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7MkhBWlUsYUFBYTsrR0FBYixhQUFhLDBTQUhiLENBQUMsZ0JBQWdCLENBQUMsaURBSG5CLDJCQUEyQjs7QUFNMUIsYUFBYTtJQWJ6QixRQUFRLENBQUM7UUFDUixxQkFBcUIsRUFBRSxtQkFBbUI7UUFDMUMsTUFBTSxFQUFFLGtCQUFrQjtLQUMzQixDQUFDO0dBVVcsYUFBYSxDQWF6QjtTQWJZLGFBQWE7NEZBQWIsYUFBYTtrQkFUekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsdUVBQXVFO29CQUN2RSxNQUFNLEVBQUUsa0JBQWtCO29CQUMxQixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOzZLQVdDLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB0eXBlIHsgUmFkaW9Hcm91cENoYW5nZUV2ZW50RGV0YWlsLCBDb21wb25lbnRzIH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBkZWZpbmVDdXN0b21FbGVtZW50IH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cy9pb24tcmFkaW8tZ3JvdXAuanMnO1xuXG5pbXBvcnQgeyBQcm94eUNtcCwgcHJveHlPdXRwdXRzIH0gZnJvbSAnLi9hbmd1bGFyLWNvbXBvbmVudC1saWIvdXRpbHMnO1xuXG5jb25zdCBSQURJT19HUk9VUF9JTlBVVFMgPSBbJ2FsbG93RW1wdHlTZWxlY3Rpb24nLCAnY29tcGFyZVdpdGgnLCAnZXJyb3JUZXh0JywgJ2hlbHBlclRleHQnLCAnbmFtZScsICd2YWx1ZSddO1xuXG4vKipcbiAqIFB1bGxpbmcgdGhlIHByb3ZpZGVyIGludG8gYW4gb2JqZWN0IGFuZCB1c2luZyBQVVJFICB3b3Jrc1xuICogYXJvdW5kIGFuIG5nLXBhY2thZ3IgaXNzdWUgdGhhdCBjYXVzZXNcbiAqIGNvbXBvbmVudHMgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzIGFuZFxuICogYSBwcm92aWRlciB0byBiZSByZS1hc3NpZ25lZC4gVGhpcyByZS1hc3NpZ25tZW50XG4gKiBpcyBub3Qgc3VwcG9ydGVkIGJ5IFdlYnBhY2sgYW5kIGNhdXNlcyB0cmVlc2hha2luZ1xuICogdG8gbm90IHdvcmsgb24gdGhlc2Uga2luZHMgb2YgY29tcG9uZW50cy5cbiAqL1xuY29uc3QgYWNjZXNzb3JQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiAvKkBfX1BVUkVfXyovIGZvcndhcmRSZWYoKCkgPT4gSW9uUmFkaW9Hcm91cCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQFByb3h5Q21wKHtcbiAgZGVmaW5lQ3VzdG9tRWxlbWVudEZuOiBkZWZpbmVDdXN0b21FbGVtZW50LFxuICBpbnB1dHM6IFJBRElPX0dST1VQX0lOUFVUUyxcbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tcmFkaW8tZ3JvdXAnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBSQURJT19HUk9VUF9JTlBVVFMsXG4gIHByb3ZpZGVyczogW2FjY2Vzc29yUHJvdmlkZXJdLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBJb25SYWRpb0dyb3VwIGV4dGVuZHMgVmFsdWVBY2Nlc3NvciB7XG4gIHByb3RlY3RlZCBlbDogSFRNTEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBzdXBlcihpbmplY3Rvciwgcik7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkNoYW5nZSddKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lvbkNoYW5nZScsIFsnJGV2ZW50LnRhcmdldCddKVxuICBoYW5kbGVJb25DaGFuZ2UoZWw6IEhUTUxJb25SYWRpb0dyb3VwRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlVmFsdWVDaGFuZ2UoZWwsIGVsLnZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uUmFkaW9Hcm91cCBleHRlbmRzIENvbXBvbmVudHMuSW9uUmFkaW9Hcm91cCB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8UmFkaW9Hcm91cENoYW5nZUV2ZW50RGV0YWlsPj47XG59XG4iXX0=