import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostListener, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import { defineCustomElement } from '@ionic/core/components/ion-searchbar.js';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
const SEARCHBAR_INPUTS = [
    'animated',
    'autocomplete',
    'autocorrect',
    'cancelButtonIcon',
    'cancelButtonText',
    'clearIcon',
    'color',
    'debounce',
    'disabled',
    'enterkeyhint',
    'inputmode',
    'mode',
    'name',
    'placeholder',
    'searchIcon',
    'showCancelButton',
    'showClearButton',
    'spellcheck',
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
    useExisting: /*@__PURE__*/ forwardRef(() => IonSearchbar),
    multi: true,
};
let IonSearchbar = class IonSearchbar extends ValueAccessor {
    z;
    el;
    constructor(c, r, z, injector) {
        super(injector, r);
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionCancel', 'ionClear', 'ionBlur', 'ionFocus']);
    }
    handleIonInput(el) {
        this.handleValueChange(el, el.value);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSearchbar, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSearchbar, isStandalone: true, selector: "ion-searchbar", inputs: { animated: "animated", autocomplete: "autocomplete", autocorrect: "autocorrect", cancelButtonIcon: "cancelButtonIcon", cancelButtonText: "cancelButtonText", clearIcon: "clearIcon", color: "color", debounce: "debounce", disabled: "disabled", enterkeyhint: "enterkeyhint", inputmode: "inputmode", mode: "mode", name: "name", placeholder: "placeholder", searchIcon: "searchIcon", showCancelButton: "showCancelButton", showClearButton: "showClearButton", spellcheck: "spellcheck", type: "type", value: "value" }, host: { listeners: { "ionInput": "handleIonInput($event.target)" } }, providers: [accessorProvider], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSearchbar = __decorate([
    ProxyCmp({
        defineCustomElementFn: defineCustomElement,
        inputs: SEARCHBAR_INPUTS,
        methods: ['setFocus', 'getInputElement'],
    })
], IonSearchbar);
export { IonSearchbar };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSearchbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-searchbar',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: SEARCHBAR_INPUTS,
                    providers: [accessorProvider],
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { handleIonInput: [{
                type: HostListener,
                args: ['ionInput', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3RhbmRhbG9uZS9zcmMvZGlyZWN0aXZlcy9zZWFyY2hiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUdULFlBQVksRUFHWixVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXRELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBRXZFLE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsVUFBVTtJQUNWLGNBQWM7SUFDZCxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsT0FBTztJQUNQLFVBQVU7SUFDVixVQUFVO0lBQ1YsY0FBYztJQUNkLFdBQVc7SUFDWCxNQUFNO0lBQ04sTUFBTTtJQUNOLGFBQWE7SUFDYixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osTUFBTTtJQUNOLE9BQU87Q0FDUixDQUFDO0FBRUY7Ozs7Ozs7R0FPRztBQUNILE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDekQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBT0YsSUFTYSxZQUFZLEdBVHpCLE1BU2EsWUFBYSxTQUFRLGFBQWE7SUFFYztJQURqRCxFQUFFLENBQWM7SUFDMUIsWUFBWSxDQUFvQixFQUFFLENBQWEsRUFBWSxDQUFTLEVBQUUsUUFBa0I7UUFDdEYsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQURzQyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBRWxFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUMxQixZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUdELGNBQWMsQ0FBQyxFQUEyQjtRQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOzJIQVpVLFlBQVk7K0dBQVosWUFBWSx3b0JBSFosQ0FBQyxnQkFBZ0IsQ0FBQyxpREFIbkIsMkJBQTJCOztBQU0xQixZQUFZO0lBZHhCLFFBQVEsQ0FBQztRQUNSLHFCQUFxQixFQUFFLG1CQUFtQjtRQUMxQyxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQztLQUN6QyxDQUFDO0dBVVcsWUFBWSxDQWF4QjtTQWJZLFlBQVk7NEZBQVosWUFBWTtrQkFUeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLHVFQUF1RTtvQkFDdkUsTUFBTSxFQUFFLGdCQUFnQjtvQkFDeEIsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzdCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs2S0FXQyxjQUFjO3NCQURiLFlBQVk7dUJBQUMsVUFBVSxFQUFFLENBQUMsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBmb3J3YXJkUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgdHlwZSB7IFNlYXJjaGJhcklucHV0RXZlbnREZXRhaWwsIFNlYXJjaGJhckNoYW5nZUV2ZW50RGV0YWlsLCBDb21wb25lbnRzIH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBkZWZpbmVDdXN0b21FbGVtZW50IH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cy9pb24tc2VhcmNoYmFyLmpzJztcblxuaW1wb3J0IHsgUHJveHlDbXAsIHByb3h5T3V0cHV0cyB9IGZyb20gJy4vYW5ndWxhci1jb21wb25lbnQtbGliL3V0aWxzJztcblxuY29uc3QgU0VBUkNIQkFSX0lOUFVUUyA9IFtcbiAgJ2FuaW1hdGVkJyxcbiAgJ2F1dG9jb21wbGV0ZScsXG4gICdhdXRvY29ycmVjdCcsXG4gICdjYW5jZWxCdXR0b25JY29uJyxcbiAgJ2NhbmNlbEJ1dHRvblRleHQnLFxuICAnY2xlYXJJY29uJyxcbiAgJ2NvbG9yJyxcbiAgJ2RlYm91bmNlJyxcbiAgJ2Rpc2FibGVkJyxcbiAgJ2VudGVya2V5aGludCcsXG4gICdpbnB1dG1vZGUnLFxuICAnbW9kZScsXG4gICduYW1lJyxcbiAgJ3BsYWNlaG9sZGVyJyxcbiAgJ3NlYXJjaEljb24nLFxuICAnc2hvd0NhbmNlbEJ1dHRvbicsXG4gICdzaG93Q2xlYXJCdXR0b24nLFxuICAnc3BlbGxjaGVjaycsXG4gICd0eXBlJyxcbiAgJ3ZhbHVlJyxcbl07XG5cbi8qKlxuICogUHVsbGluZyB0aGUgcHJvdmlkZXIgaW50byBhbiBvYmplY3QgYW5kIHVzaW5nIFBVUkUgd29ya3NcbiAqIGFyb3VuZCBhbiBuZy1wYWNrYWdyIGlzc3VlIHRoYXQgY2F1c2VzXG4gKiBjb21wb25lbnRzIHdpdGggbXVsdGlwbGUgZGVjb3JhdG9ycyBhbmRcbiAqIGEgcHJvdmlkZXIgdG8gYmUgcmUtYXNzaWduZWQuIFRoaXMgcmUtYXNzaWdubWVudFxuICogaXMgbm90IHN1cHBvcnRlZCBieSBXZWJwYWNrIGFuZCBjYXVzZXMgdHJlZXNoYWtpbmdcbiAqIHRvIG5vdCB3b3JrIG9uIHRoZXNlIGtpbmRzIG9mIGNvbXBvbmVudHMuXG4gKi9cbmNvbnN0IGFjY2Vzc29yUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogLypAX19QVVJFX18qLyBmb3J3YXJkUmVmKCgpID0+IElvblNlYXJjaGJhciksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQFByb3h5Q21wKHtcbiAgZGVmaW5lQ3VzdG9tRWxlbWVudEZuOiBkZWZpbmVDdXN0b21FbGVtZW50LFxuICBpbnB1dHM6IFNFQVJDSEJBUl9JTlBVVFMsXG4gIG1ldGhvZHM6IFsnc2V0Rm9jdXMnLCAnZ2V0SW5wdXRFbGVtZW50J10sXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXNlYXJjaGJhcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFNFQVJDSEJBUl9JTlBVVFMsXG4gIHByb3ZpZGVyczogW2FjY2Vzc29yUHJvdmlkZXJdLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBJb25TZWFyY2hiYXIgZXh0ZW5kcyBWYWx1ZUFjY2Vzc29yIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHN1cGVyKGluamVjdG9yLCByKTtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uSW5wdXQnLCAnaW9uQ2hhbmdlJywgJ2lvbkNhbmNlbCcsICdpb25DbGVhcicsICdpb25CbHVyJywgJ2lvbkZvY3VzJ10pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW9uSW5wdXQnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgaGFuZGxlSW9uSW5wdXQoZWw6IEhUTUxJb25TZWFyY2hiYXJFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVWYWx1ZUNoYW5nZShlbCwgZWwudmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25TZWFyY2hiYXIgZXh0ZW5kcyBDb21wb25lbnRzLklvblNlYXJjaGJhciB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGB2YWx1ZWAgb2YgdGhlIGBpb24tc2VhcmNoYmFyYCBlbGVtZW50IGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgaW9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxTZWFyY2hiYXJJbnB1dEV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBUaGUgYGlvbkNoYW5nZWAgZXZlbnQgaXMgZmlyZWQgZm9yIGA8aW9uLXNlYXJjaGJhcj5gIGVsZW1lbnRzIHdoZW4gdGhlIHVzZXJcbm1vZGlmaWVzIHRoZSBlbGVtZW50J3MgdmFsdWUuIFVubGlrZSB0aGUgYGlvbklucHV0YCBldmVudCwgdGhlIGBpb25DaGFuZ2VgXG5ldmVudCBpcyBub3QgbmVjZXNzYXJpbHkgZmlyZWQgZm9yIGVhY2ggYWx0ZXJhdGlvbiB0byBhbiBlbGVtZW50J3MgdmFsdWUuXG5cblRoZSBgaW9uQ2hhbmdlYCBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB2YWx1ZSBoYXMgYmVlbiBjb21taXR0ZWRcbmJ5IHRoZSB1c2VyLiBUaGlzIGNhbiBoYXBwZW4gd2hlbiB0aGUgZWxlbWVudCBsb3NlcyBmb2N1cyBvclxud2hlbiB0aGUgXCJFbnRlclwiIGtleSBpcyBwcmVzc2VkLiBgaW9uQ2hhbmdlYCBjYW4gYWxzbyBmaXJlXG53aGVuIGNsaWNraW5nIHRoZSBjbGVhciBvciBjYW5jZWwgYnV0dG9ucy5cbiAgICovXG4gIGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PFNlYXJjaGJhckNoYW5nZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICovXG4gIGlvbkNhbmNlbDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgY2xlYXIgaW5wdXQgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqL1xuICBpb25DbGVhcjogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBoYXMgZm9jdXMuXG4gICAqL1xuICBpb25Gb2N1czogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+Pjtcbn1cbiJdfQ==