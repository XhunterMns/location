import { Directive, forwardRef } from '@angular/core';
import { MaxValidator, NG_VALIDATORS } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * @description
 * Provider which adds `MaxValidator` to the `NG_VALIDATORS` multi-provider list.
 */
export const ION_MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IonMaxValidator),
    multi: true,
};
class IonMaxValidator extends MaxValidator {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonMaxValidator, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: IonMaxValidator, selector: "ion-input[type=number][max][formControlName],ion-input[type=number][max][formControl],ion-input[type=number][max][ngModel]", host: { properties: { "attr.max": "_enabled ? max : null" } }, providers: [ION_MAX_VALIDATOR], usesInheritance: true, ngImport: i0 });
}
export { IonMaxValidator };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonMaxValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ion-input[type=number][max][formControlName],ion-input[type=number][max][formControl],ion-input[type=number][max][ngModel]',
                    providers: [ION_MAX_VALIDATOR],
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: { '[attr.max]': '_enabled ? max : null' },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4LXZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMvbWF4LXZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUU3RDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBYTtJQUN6QyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQztJQUM5QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixNQVFhLGVBQWdCLFNBQVEsWUFBWTsySEFBcEMsZUFBZTsrR0FBZixlQUFlLG9OQUxmLENBQUMsaUJBQWlCLENBQUM7O1NBS25CLGVBQWU7NEZBQWYsZUFBZTtrQkFSM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQ04sNEhBQTRIO29CQUM5SCxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDOUIscUVBQXFFO29CQUNyRSxJQUFJLEVBQUUsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUU7aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF4VmFsaWRhdG9yLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogUHJvdmlkZXIgd2hpY2ggYWRkcyBgTWF4VmFsaWRhdG9yYCB0byB0aGUgYE5HX1ZBTElEQVRPUlNgIG11bHRpLXByb3ZpZGVyIGxpc3QuXG4gKi9cbmV4cG9ydCBjb25zdCBJT05fTUFYX1ZBTElEQVRPUjogUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElvbk1heFZhbGlkYXRvciksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOlxuICAgICdpb24taW5wdXRbdHlwZT1udW1iZXJdW21heF1bZm9ybUNvbnRyb2xOYW1lXSxpb24taW5wdXRbdHlwZT1udW1iZXJdW21heF1bZm9ybUNvbnRyb2xdLGlvbi1pbnB1dFt0eXBlPW51bWJlcl1bbWF4XVtuZ01vZGVsXScsXG4gIHByb3ZpZGVyczogW0lPTl9NQVhfVkFMSURBVE9SXSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHsgJ1thdHRyLm1heF0nOiAnX2VuYWJsZWQgPyBtYXggOiBudWxsJyB9LFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIElvbk1heFZhbGlkYXRvciBleHRlbmRzIE1heFZhbGlkYXRvciB7fVxuIl19