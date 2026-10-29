import { __decorate } from "tslib";
import { Directive, } from '@angular/core';
import { ProxyCmp, proxyOutputs } from '../../utils/proxy';
import * as i0 from "@angular/core";
import * as i1 from "../../providers/angular-delegate";
const NAV_INPUTS = ['animated', 'animation', 'root', 'rootParams', 'swipeGesture'];
const NAV_METHODS = [
    'push',
    'insert',
    'insertPages',
    'pop',
    'popTo',
    'popToRoot',
    'removeIndex',
    'setRoot',
    'setPages',
    'getActive',
    'getByIndex',
    'canGoBack',
    'getPrevious',
];
let IonNav = class IonNav {
    z;
    el;
    constructor(ref, environmentInjector, injector, angularDelegate, z, c) {
        this.z = z;
        c.detach();
        this.el = ref.nativeElement;
        ref.nativeElement.delegate = angularDelegate.create(environmentInjector, injector);
        proxyOutputs(this, this.el, ['ionNavDidChange', 'ionNavWillChange']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonNav, deps: [{ token: i0.ElementRef }, { token: i0.EnvironmentInjector }, { token: i0.Injector }, { token: i1.AngularDelegate }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: IonNav, inputs: { animated: "animated", animation: "animation", root: "root", rootParams: "rootParams", swipeGesture: "swipeGesture" }, ngImport: i0 });
};
IonNav = __decorate([
    ProxyCmp({
        inputs: NAV_INPUTS,
        methods: NAV_METHODS,
    })
], IonNav);
export { IonNav };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonNav, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: NAV_INPUTS,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.EnvironmentInjector }, { type: i0.Injector }, { type: i1.AngularDelegate }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tbW9uL3NyYy9kaXJlY3RpdmVzL25hdmlnYXRpb24vbmF2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBTUwsU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7OztBQUUzRCxNQUFNLFVBQVUsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztBQUVuRixNQUFNLFdBQVcsR0FBRztJQUNsQixNQUFNO0lBQ04sUUFBUTtJQUNSLGFBQWE7SUFDYixLQUFLO0lBQ0wsT0FBTztJQUNQLFdBQVc7SUFDWCxhQUFhO0lBQ2IsU0FBUztJQUNULFVBQVU7SUFDVixXQUFXO0lBQ1gsWUFBWTtJQUNaLFdBQVc7SUFDWCxhQUFhO0NBQ2QsQ0FBQztBQWlCRixJQUthLE1BQU0sR0FMbkIsTUFLYSxNQUFNO0lBT0w7SUFORixFQUFFLENBQWM7SUFDMUIsWUFDRSxHQUFlLEVBQ2YsbUJBQXdDLEVBQ3hDLFFBQWtCLEVBQ2xCLGVBQWdDLEVBQ3RCLENBQVMsRUFDbkIsQ0FBb0I7UUFEVixNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBR25CLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUM1QixHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25GLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDOzJIQWRVLE1BQU07K0dBQU4sTUFBTTs7QUFBTixNQUFNO0lBVGxCLFFBQVEsQ0FBQztRQUNSLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRSxXQUFXO0tBQ3JCLENBQUM7R0FNVyxNQUFNLENBZWxCO1NBZlksTUFBTTs0RkFBTixNQUFNO2tCQUxsQixTQUFTO21CQUFDO29CQUNULHVFQUF1RTtvQkFDdkUsTUFBTSxFQUFFLFVBQVU7aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0b3IsXG4gIEVudmlyb25tZW50SW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgQ29tcG9uZW50cyB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhckRlbGVnYXRlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2FuZ3VsYXItZGVsZWdhdGUnO1xuaW1wb3J0IHsgUHJveHlDbXAsIHByb3h5T3V0cHV0cyB9IGZyb20gJy4uLy4uL3V0aWxzL3Byb3h5JztcblxuY29uc3QgTkFWX0lOUFVUUyA9IFsnYW5pbWF0ZWQnLCAnYW5pbWF0aW9uJywgJ3Jvb3QnLCAncm9vdFBhcmFtcycsICdzd2lwZUdlc3R1cmUnXTtcblxuY29uc3QgTkFWX01FVEhPRFMgPSBbXG4gICdwdXNoJyxcbiAgJ2luc2VydCcsXG4gICdpbnNlcnRQYWdlcycsXG4gICdwb3AnLFxuICAncG9wVG8nLFxuICAncG9wVG9Sb290JyxcbiAgJ3JlbW92ZUluZGV4JyxcbiAgJ3NldFJvb3QnLFxuICAnc2V0UGFnZXMnLFxuICAnZ2V0QWN0aXZlJyxcbiAgJ2dldEJ5SW5kZXgnLFxuICAnY2FuR29CYWNrJyxcbiAgJ2dldFByZXZpb3VzJyxcbl07XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25OYXYgZXh0ZW5kcyBDb21wb25lbnRzLklvbk5hdiB7XG4gIC8qKlxuICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBuYXYgd2lsbCBjaGFuZ2UgY29tcG9uZW50c1xuICAgKi9cbiAgaW9uTmF2V2lsbENoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIG5hdiBoYXMgY2hhbmdlZCBjb21wb25lbnRzXG4gICAqL1xuICBpb25OYXZEaWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG59XG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogTkFWX0lOUFVUUyxcbiAgbWV0aG9kczogTkFWX01FVEhPRFMsXG59KVxuQERpcmVjdGl2ZSh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogTkFWX0lOUFVUUyxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBJb25OYXYge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihcbiAgICByZWY6IEVsZW1lbnRSZWYsXG4gICAgZW52aXJvbm1lbnRJbmplY3RvcjogRW52aXJvbm1lbnRJbmplY3RvcixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgYW5ndWxhckRlbGVnYXRlOiBBbmd1bGFyRGVsZWdhdGUsXG4gICAgcHJvdGVjdGVkIHo6IE5nWm9uZSxcbiAgICBjOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByZWYubmF0aXZlRWxlbWVudDtcbiAgICByZWYubmF0aXZlRWxlbWVudC5kZWxlZ2F0ZSA9IGFuZ3VsYXJEZWxlZ2F0ZS5jcmVhdGUoZW52aXJvbm1lbnRJbmplY3RvciwgaW5qZWN0b3IpO1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbk5hdkRpZENoYW5nZScsICdpb25OYXZXaWxsQ2hhbmdlJ10pO1xuICB9XG59XG4iXX0=