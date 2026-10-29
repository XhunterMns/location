import { Injectable } from '@angular/core';
import { createGesture } from '@ionic/core';
import * as i0 from "@angular/core";
class GestureController {
    zone;
    constructor(zone) {
        this.zone = zone;
    }
    /**
     * Create a new gesture
     */
    create(opts, runInsideAngularZone = false) {
        if (runInsideAngularZone) {
            Object.getOwnPropertyNames(opts).forEach((key) => {
                if (typeof opts[key] === 'function') {
                    const fn = opts[key];
                    opts[key] = (...props) => this.zone.run(() => fn(...props));
                }
            });
        }
        return createGesture(opts);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: GestureController, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: GestureController, providedIn: 'root' });
}
export { GestureController };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: GestureController, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VzdHVyZS1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9nZXN0dXJlLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUU1QyxNQUdhLGlCQUFpQjtJQUNSO0lBQXBCLFlBQW9CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUcsQ0FBQztJQUNwQzs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFtQixFQUFFLG9CQUFvQixHQUFHLEtBQUs7UUFDdEQsSUFBSSxvQkFBb0IsRUFBRTtZQUN4QixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQy9DLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUNuQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUNwRTtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOzJIQWhCVSxpQkFBaUI7K0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOztTQUVQLGlCQUFpQjs0RkFBakIsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBHZXN0dXJlLCBHZXN0dXJlQ29uZmlnIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlR2VzdHVyZSB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdlc3R1cmVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgZ2VzdHVyZVxuICAgKi9cbiAgY3JlYXRlKG9wdHM6IEdlc3R1cmVDb25maWcsIHJ1bkluc2lkZUFuZ3VsYXJab25lID0gZmFsc2UpOiBHZXN0dXJlIHtcbiAgICBpZiAocnVuSW5zaWRlQW5ndWxhclpvbmUpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9wdHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIG9wdHNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNvbnN0IGZuID0gb3B0c1trZXldO1xuICAgICAgICAgIG9wdHNba2V5XSA9ICguLi5wcm9wczogYW55W10pID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZm4oLi4ucHJvcHMpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUdlc3R1cmUob3B0cyk7XG4gIH1cbn1cbiJdfQ==