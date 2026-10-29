import { Directive } from '@angular/core';
import { RouterLinkDelegateDirective as RouterLinkDelegateBase, RouterLinkWithHrefDelegateDirective as RouterLinkHrefDelegateBase, } from '@ionic/angular/common';
import * as i0 from "@angular/core";
/**
 * Adds support for Ionic routing directions and animations to the base Angular router link directive.
 *
 * When the router link is clicked, the directive will assign the direction and
 * animation so that the routing integration will transition correctly.
 */
class RouterLinkDelegateDirective extends RouterLinkDelegateBase {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RouterLinkDelegateDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: RouterLinkDelegateDirective, selector: ":not(a):not(area)[routerLink]", usesInheritance: true, ngImport: i0 });
}
export { RouterLinkDelegateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RouterLinkDelegateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: ':not(a):not(area)[routerLink]',
                }]
        }] });
class RouterLinkWithHrefDelegateDirective extends RouterLinkHrefDelegateBase {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RouterLinkWithHrefDelegateDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: RouterLinkWithHrefDelegateDirective, selector: "a[routerLink],area[routerLink]", usesInheritance: true, ngImport: i0 });
}
export { RouterLinkWithHrefDelegateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RouterLinkWithHrefDelegateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[routerLink],area[routerLink]',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWxpbmstZGVsZWdhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL3JvdXRlci1saW5rLWRlbGVnYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUNMLDJCQUEyQixJQUFJLHNCQUFzQixFQUNyRCxtQ0FBbUMsSUFBSSwwQkFBMEIsR0FDbEUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFL0I7Ozs7O0dBS0c7QUFDSCxNQUdhLDJCQUE0QixTQUFRLHNCQUFzQjsySEFBMUQsMkJBQTJCOytHQUEzQiwyQkFBMkI7O1NBQTNCLDJCQUEyQjs0RkFBM0IsMkJBQTJCO2tCQUh2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwrQkFBK0I7aUJBQzFDOztBQUdELE1BR2EsbUNBQW9DLFNBQVEsMEJBQTBCOzJIQUF0RSxtQ0FBbUM7K0dBQW5DLG1DQUFtQzs7U0FBbkMsbUNBQW1DOzRGQUFuQyxtQ0FBbUM7a0JBSC9DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdDQUFnQztpQkFDM0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFJvdXRlckxpbmtEZWxlZ2F0ZURpcmVjdGl2ZSBhcyBSb3V0ZXJMaW5rRGVsZWdhdGVCYXNlLFxuICBSb3V0ZXJMaW5rV2l0aEhyZWZEZWxlZ2F0ZURpcmVjdGl2ZSBhcyBSb3V0ZXJMaW5rSHJlZkRlbGVnYXRlQmFzZSxcbn0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBBZGRzIHN1cHBvcnQgZm9yIElvbmljIHJvdXRpbmcgZGlyZWN0aW9ucyBhbmQgYW5pbWF0aW9ucyB0byB0aGUgYmFzZSBBbmd1bGFyIHJvdXRlciBsaW5rIGRpcmVjdGl2ZS5cbiAqXG4gKiBXaGVuIHRoZSByb3V0ZXIgbGluayBpcyBjbGlja2VkLCB0aGUgZGlyZWN0aXZlIHdpbGwgYXNzaWduIHRoZSBkaXJlY3Rpb24gYW5kXG4gKiBhbmltYXRpb24gc28gdGhhdCB0aGUgcm91dGluZyBpbnRlZ3JhdGlvbiB3aWxsIHRyYW5zaXRpb24gY29ycmVjdGx5LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICc6bm90KGEpOm5vdChhcmVhKVtyb3V0ZXJMaW5rXScsXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlckxpbmtEZWxlZ2F0ZURpcmVjdGl2ZSBleHRlbmRzIFJvdXRlckxpbmtEZWxlZ2F0ZUJhc2Uge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYVtyb3V0ZXJMaW5rXSxhcmVhW3JvdXRlckxpbmtdJyxcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyTGlua1dpdGhIcmVmRGVsZWdhdGVEaXJlY3RpdmUgZXh0ZW5kcyBSb3V0ZXJMaW5rSHJlZkRlbGVnYXRlQmFzZSB7fVxuIl19