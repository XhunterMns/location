import { Injectable } from '@angular/core';
import { createGesture } from '@ionic/core/components';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VzdHVyZS1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3RhbmRhbG9uZS9zcmMvcHJvdmlkZXJzL2dlc3R1cmUtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFFdkQsTUFHYSxpQkFBaUI7SUFDUjtJQUFwQixZQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFHLENBQUM7SUFDcEM7O09BRUc7SUFDSCxNQUFNLENBQUMsSUFBbUIsRUFBRSxvQkFBb0IsR0FBRyxLQUFLO1FBQ3RELElBQUksb0JBQW9CLEVBQUU7WUFDeEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUMvQyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVUsRUFBRTtvQkFDbkMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDcEU7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQzsySEFoQlUsaUJBQWlCOytIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTs7U0FFUCxpQkFBaUI7NEZBQWpCLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgR2VzdHVyZSwgR2VzdHVyZUNvbmZpZyB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgY3JlYXRlR2VzdHVyZSB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2VzdHVyZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBnZXN0dXJlXG4gICAqL1xuICBjcmVhdGUob3B0czogR2VzdHVyZUNvbmZpZywgcnVuSW5zaWRlQW5ndWxhclpvbmUgPSBmYWxzZSk6IEdlc3R1cmUge1xuICAgIGlmIChydW5JbnNpZGVBbmd1bGFyWm9uZSkge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob3B0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0c1trZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY29uc3QgZm4gPSBvcHRzW2tleV07XG4gICAgICAgICAgb3B0c1trZXldID0gKC4uLnByb3BzOiBhbnlbXSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBmbiguLi5wcm9wcykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlR2VzdHVyZShvcHRzKTtcbiAgfVxufVxuIl19