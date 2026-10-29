import { Directive } from '@angular/core';
import { RouterLinkDelegateDirective as RouterLinkDelegateBase, RouterLinkWithHrefDelegateDirective as RouterLinkHrefDelegateBase, } from '@ionic/angular/common';
import * as i0 from "@angular/core";
class IonRouterLink extends RouterLinkDelegateBase {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRouterLink, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: IonRouterLink, isStandalone: true, selector: ":not(a):not(area)[routerLink]", usesInheritance: true, ngImport: i0 });
}
export { IonRouterLink };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRouterLink, decorators: [{
            type: Directive,
            args: [{
                    selector: ':not(a):not(area)[routerLink]',
                    standalone: true,
                }]
        }] });
class IonRouterLinkWithHref extends RouterLinkHrefDelegateBase {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRouterLinkWithHref, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: IonRouterLinkWithHref, isStandalone: true, selector: "a[routerLink],area[routerLink]", usesInheritance: true, ngImport: i0 });
}
export { IonRouterLinkWithHref };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRouterLinkWithHref, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[routerLink],area[routerLink]',
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWxpbmstZGVsZWdhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9uYXZpZ2F0aW9uL3JvdXRlci1saW5rLWRlbGVnYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUNMLDJCQUEyQixJQUFJLHNCQUFzQixFQUNyRCxtQ0FBbUMsSUFBSSwwQkFBMEIsR0FDbEUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFL0IsTUFLYSxhQUFjLFNBQVEsc0JBQXNCOzJIQUE1QyxhQUFhOytHQUFiLGFBQWE7O1NBQWIsYUFBYTs0RkFBYixhQUFhO2tCQUx6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwrQkFBK0I7b0JBQ3pDLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs7QUFJRCxNQUthLHFCQUFzQixTQUFRLDBCQUEwQjsySEFBeEQscUJBQXFCOytHQUFyQixxQkFBcUI7O1NBQXJCLHFCQUFxQjs0RkFBckIscUJBQXFCO2tCQUxqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLFVBQVUsRUFBRSxJQUFJO2lCQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgUm91dGVyTGlua0RlbGVnYXRlRGlyZWN0aXZlIGFzIFJvdXRlckxpbmtEZWxlZ2F0ZUJhc2UsXG4gIFJvdXRlckxpbmtXaXRoSHJlZkRlbGVnYXRlRGlyZWN0aXZlIGFzIFJvdXRlckxpbmtIcmVmRGVsZWdhdGVCYXNlLFxufSBmcm9tICdAaW9uaWMvYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICc6bm90KGEpOm5vdChhcmVhKVtyb3V0ZXJMaW5rXScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgSW9uUm91dGVyTGluayBleHRlbmRzIFJvdXRlckxpbmtEZWxlZ2F0ZUJhc2Uge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYVtyb3V0ZXJMaW5rXSxhcmVhW3JvdXRlckxpbmtdJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBJb25Sb3V0ZXJMaW5rV2l0aEhyZWYgZXh0ZW5kcyBSb3V0ZXJMaW5rSHJlZkRlbGVnYXRlQmFzZSB7fVxuIl19