import { __decorate } from "tslib";
import { HostListener, Optional, Directive } from '@angular/core';
import { ProxyCmp } from '../../utils/proxy';
import * as i0 from "@angular/core";
import * as i1 from "./router-outlet";
import * as i2 from "../../providers/nav-controller";
import * as i3 from "../../providers/config";
const BACK_BUTTON_INPUTS = ['color', 'defaultHref', 'disabled', 'icon', 'mode', 'routerAnimation', 'text', 'type'];
let IonBackButton = class IonBackButton {
    routerOutlet;
    navCtrl;
    config;
    r;
    z;
    el;
    constructor(routerOutlet, navCtrl, config, r, z, c) {
        this.routerOutlet = routerOutlet;
        this.navCtrl = navCtrl;
        this.config = config;
        this.r = r;
        this.z = z;
        c.detach();
        this.el = this.r.nativeElement;
    }
    /**
     * @internal
     */
    onClick(ev) {
        const defaultHref = this.defaultHref || this.config.get('backButtonDefaultHref');
        if (this.routerOutlet?.canGoBack()) {
            this.navCtrl.setDirection('back', undefined, undefined, this.routerAnimation);
            this.routerOutlet.pop();
            ev.preventDefault();
        }
        else if (defaultHref != null) {
            this.navCtrl.navigateBack(defaultHref, { animation: this.routerAnimation });
            ev.preventDefault();
        }
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBackButton, deps: [{ token: i1.IonRouterOutlet, optional: true }, { token: i2.NavController }, { token: i3.Config }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: IonBackButton, inputs: { color: "color", defaultHref: "defaultHref", disabled: "disabled", icon: "icon", mode: "mode", routerAnimation: "routerAnimation", text: "text", type: "type" }, host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 });
};
IonBackButton = __decorate([
    ProxyCmp({
        inputs: BACK_BUTTON_INPUTS,
    })
], IonBackButton);
export { IonBackButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBackButton, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: BACK_BUTTON_INPUTS,
                }]
        }], ctorParameters: function () { return [{ type: i1.IonRouterOutlet, decorators: [{
                    type: Optional
                }] }, { type: i2.NavController }, { type: i3.Config }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21tb24vc3JjL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9iYWNrLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQXlDLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUt6RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBSTdDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQVFuSCxJQUthLGFBQWEsR0FMMUIsTUFLYSxhQUFhO0lBSUY7SUFDWjtJQUNBO0lBQ0E7SUFDRTtJQVBGLEVBQUUsQ0FBYztJQUUxQixZQUNzQixZQUE2QixFQUN6QyxPQUFzQixFQUN0QixNQUFjLEVBQ2QsQ0FBYSxFQUNYLENBQVMsRUFDbkIsQ0FBb0I7UUFMQSxpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFDekMsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsTUFBQyxHQUFELENBQUMsQ0FBWTtRQUNYLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFHbkIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1gsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFFSCxPQUFPLENBQUMsRUFBUztRQUNmLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUVqRixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEIsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztZQUM1RSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDOzJIQTlCVSxhQUFhOytHQUFiLGFBQWE7O0FBQWIsYUFBYTtJQVJ6QixRQUFRLENBQUM7UUFDUixNQUFNLEVBQUUsa0JBQWtCO0tBQzNCLENBQUM7R0FNVyxhQUFhLENBK0J6QjtTQS9CWSxhQUFhOzRGQUFiLGFBQWE7a0JBTHpCLFNBQVM7bUJBQUM7b0JBQ1QsdUVBQXVFO29CQUN2RSxNQUFNLEVBQUUsa0JBQWtCO2lCQUMzQjs7MEJBTUksUUFBUTsyS0FlWCxPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSG9zdExpc3RlbmVyLCBPcHRpb25hbCwgRWxlbWVudFJlZiwgTmdab25lLCBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudHMgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9jb25maWcnO1xuaW1wb3J0IHsgTmF2Q29udHJvbGxlciB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9uYXYtY29udHJvbGxlcic7XG5pbXBvcnQgeyBQcm94eUNtcCB9IGZyb20gJy4uLy4uL3V0aWxzL3Byb3h5JztcblxuaW1wb3J0IHsgSW9uUm91dGVyT3V0bGV0IH0gZnJvbSAnLi9yb3V0ZXItb3V0bGV0JztcblxuY29uc3QgQkFDS19CVVRUT05fSU5QVVRTID0gWydjb2xvcicsICdkZWZhdWx0SHJlZicsICdkaXNhYmxlZCcsICdpY29uJywgJ21vZGUnLCAncm91dGVyQW5pbWF0aW9uJywgJ3RleHQnLCAndHlwZSddO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWludGVyZmFjZVxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkJhY2tCdXR0b24gZXh0ZW5kcyBDb21wb25lbnRzLklvbkJhY2tCdXR0b24ge31cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBCQUNLX0JVVFRPTl9JTlBVVFMsXG59KVxuQERpcmVjdGl2ZSh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogQkFDS19CVVRUT05fSU5QVVRTLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIElvbkJhY2tCdXR0b24ge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyT3V0bGV0OiBJb25Sb3V0ZXJPdXRsZXQsXG4gICAgcHJpdmF0ZSBuYXZDdHJsOiBOYXZDb250cm9sbGVyLFxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWcsXG4gICAgcHJpdmF0ZSByOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCB6OiBOZ1pvbmUsXG4gICAgYzogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gdGhpcy5yLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soZXY6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZGVmYXVsdEhyZWYgPSB0aGlzLmRlZmF1bHRIcmVmIHx8IHRoaXMuY29uZmlnLmdldCgnYmFja0J1dHRvbkRlZmF1bHRIcmVmJyk7XG5cbiAgICBpZiAodGhpcy5yb3V0ZXJPdXRsZXQ/LmNhbkdvQmFjaygpKSB7XG4gICAgICB0aGlzLm5hdkN0cmwuc2V0RGlyZWN0aW9uKCdiYWNrJywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMucm91dGVyQW5pbWF0aW9uKTtcbiAgICAgIHRoaXMucm91dGVyT3V0bGV0LnBvcCgpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2UgaWYgKGRlZmF1bHRIcmVmICE9IG51bGwpIHtcbiAgICAgIHRoaXMubmF2Q3RybC5uYXZpZ2F0ZUJhY2soZGVmYXVsdEhyZWYsIHsgYW5pbWF0aW9uOiB0aGlzLnJvdXRlckFuaW1hdGlvbiB9KTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=