import { Directive, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import * as i0 from "@angular/core";
class NumericValueAccessorDirective extends ValueAccessor {
    el;
    constructor(injector, el) {
        super(injector, el);
        this.el = el;
    }
    handleInputEvent(el) {
        this.handleValueChange(el, el.value);
    }
    registerOnChange(fn) {
        if (this.el.nativeElement.tagName === 'ION-INPUT' || this.el.nativeElement.tagName === 'ION-INPUT-OTP') {
            super.registerOnChange((value) => {
                fn(value === '' ? null : parseFloat(value));
            });
        }
        else {
            super.registerOnChange(fn);
        }
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NumericValueAccessorDirective, deps: [{ token: i0.Injector }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NumericValueAccessorDirective, selector: "ion-input[type=number],ion-input-otp:not([type=text]),ion-range", host: { listeners: { "ionInput": "handleInputEvent($event.target)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: NumericValueAccessorDirective,
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0 });
}
export { NumericValueAccessorDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NumericValueAccessorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ion-input[type=number],ion-input-otp:not([type=text]),ion-range',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: NumericValueAccessorDirective,
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.ElementRef }]; }, propDecorators: { handleInputEvent: [{
                type: HostListener,
                args: ['ionInput', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy12YWx1ZS1hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaXJlY3RpdmVzL2NvbnRyb2wtdmFsdWUtYWNjZXNzb3JzL251bWVyaWMtdmFsdWUtYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFdEQsTUFVYSw2QkFBOEIsU0FBUSxhQUFhO0lBQ3RCO0lBQXhDLFlBQVksUUFBa0IsRUFBVSxFQUFzRDtRQUM1RixLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRGtCLE9BQUUsR0FBRixFQUFFLENBQW9EO0lBRTlGLENBQUM7SUFHRCxnQkFBZ0IsQ0FBQyxFQUFzRTtRQUNyRixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBOEI7UUFDN0MsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sS0FBSyxlQUFlLEVBQUU7WUFDdEcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7Z0JBQ3ZDLEVBQUUsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7MkhBbEJVLDZCQUE2QjsrR0FBN0IsNkJBQTZCLGtLQVI3QjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjs7U0FFVSw2QkFBNkI7NEZBQTdCLDZCQUE2QjtrQkFWekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUVBQWlFO29CQUMzRSxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVywrQkFBK0I7NEJBQzFDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGO3dIQU9DLGdCQUFnQjtzQkFEZixZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW9uLWlucHV0W3R5cGU9bnVtYmVyXSxpb24taW5wdXQtb3RwOm5vdChbdHlwZT10ZXh0XSksaW9uLXJhbmdlJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogTnVtZXJpY1ZhbHVlQWNjZXNzb3JEaXJlY3RpdmUsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOdW1lcmljVmFsdWVBY2Nlc3NvckRpcmVjdGl2ZSBleHRlbmRzIFZhbHVlQWNjZXNzb3Ige1xuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudCB8IEhUTUxJb25SYW5nZUVsZW1lbnQ+KSB7XG4gICAgc3VwZXIoaW5qZWN0b3IsIGVsKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lvbklucHV0JywgWyckZXZlbnQudGFyZ2V0J10pXG4gIGhhbmRsZUlucHV0RXZlbnQoZWw6IEhUTUxJb25JbnB1dEVsZW1lbnQgfCBIVE1MSW9uSW5wdXRPdHBFbGVtZW50IHwgSFRNTElvblJhbmdlRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlVmFsdWVDaGFuZ2UoZWwsIGVsLnZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBudW1iZXIgfCBudWxsKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZWwubmF0aXZlRWxlbWVudC50YWdOYW1lID09PSAnSU9OLUlOUFVUJyB8fCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudGFnTmFtZSA9PT0gJ0lPTi1JTlBVVC1PVFAnKSB7XG4gICAgICBzdXBlci5yZWdpc3Rlck9uQ2hhbmdlKCh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGZuKHZhbHVlID09PSAnJyA/IG51bGwgOiBwYXJzZUZsb2F0KHZhbHVlKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucmVnaXN0ZXJPbkNoYW5nZShmbik7XG4gICAgfVxuICB9XG59XG4iXX0=