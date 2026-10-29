import { Directive, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import * as i0 from "@angular/core";
class TextValueAccessorDirective extends ValueAccessor {
    constructor(injector, el) {
        super(injector, el);
    }
    _handleInputEvent(el) {
        this.handleValueChange(el, el.value);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TextValueAccessorDirective, deps: [{ token: i0.Injector }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TextValueAccessorDirective, selector: "ion-input:not([type=number]),ion-input-otp[type=text],ion-textarea,ion-searchbar", host: { listeners: { "ionInput": "_handleInputEvent($event.target)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: TextValueAccessorDirective,
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0 });
}
export { TextValueAccessorDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TextValueAccessorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ion-input:not([type=number]),ion-input-otp[type=text],ion-textarea,ion-searchbar',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: TextValueAccessorDirective,
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.ElementRef }]; }, propDecorators: { _handleInputEvent: [{
                type: HostListener,
                args: ['ionInput', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS1hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaXJlY3RpdmVzL2NvbnRyb2wtdmFsdWUtYWNjZXNzb3JzL3RleHQtdmFsdWUtYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF3QixTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFdEQsTUFVYSwwQkFBMkIsU0FBUSxhQUFhO0lBQzNELFlBQVksUUFBa0IsRUFBRSxFQUFjO1FBQzVDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUdELGlCQUFpQixDQUNmLEVBQW1HO1FBRW5HLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7MkhBVlUsMEJBQTBCOytHQUExQiwwQkFBMEIsb0xBUjFCO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLDBCQUEwQjtnQkFDdkMsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGOztTQUVVLDBCQUEwQjs0RkFBMUIsMEJBQTBCO2tCQVZ0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrRkFBa0Y7b0JBQzVGLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLDRCQUE0Qjs0QkFDdkMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7d0hBT0MsaUJBQWlCO3NCQURoQixZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdG9yLCBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW9uLWlucHV0Om5vdChbdHlwZT1udW1iZXJdKSxpb24taW5wdXQtb3RwW3R5cGU9dGV4dF0saW9uLXRleHRhcmVhLGlvbi1zZWFyY2hiYXInLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBUZXh0VmFsdWVBY2Nlc3NvckRpcmVjdGl2ZSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFRleHRWYWx1ZUFjY2Vzc29yRGlyZWN0aXZlIGV4dGVuZHMgVmFsdWVBY2Nlc3NvciB7XG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihpbmplY3RvciwgZWwpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW9uSW5wdXQnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgX2hhbmRsZUlucHV0RXZlbnQoXG4gICAgZWw6IEhUTUxJb25JbnB1dEVsZW1lbnQgfCBIVE1MSW9uSW5wdXRPdHBFbGVtZW50IHwgSFRNTElvblRleHRhcmVhRWxlbWVudCB8IEhUTUxJb25TZWFyY2hiYXJFbGVtZW50XG4gICk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlVmFsdWVDaGFuZ2UoZWwsIGVsLnZhbHVlKTtcbiAgfVxufVxuIl19