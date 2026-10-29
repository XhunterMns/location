import { Injectable } from '@angular/core';
import { createAnimation, getTimeGivenProgression } from '@ionic/core/components';
import * as i0 from "@angular/core";
class AnimationController {
    /**
     * Create a new animation
     */
    create(animationId) {
        return createAnimation(animationId);
    }
    /**
     * EXPERIMENTAL
     *
     * Given a progression and a cubic bezier function,
     * this utility returns the time value(s) at which the
     * cubic bezier reaches the given time progression.
     *
     * If the cubic bezier never reaches the progression
     * the result will be an empty array.
     *
     * This is most useful for switching between easing curves
     * when doing a gesture animation (i.e. going from linear easing
     * during a drag, to another easing when `progressEnd` is called)
     */
    easingTime(p0, p1, p2, p3, progression) {
        return getTimeGivenProgression(p0, p1, p2, p3, progression);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AnimationController, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AnimationController, providedIn: 'root' });
}
export { AnimationController };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AnimationController, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zdGFuZGFsb25lL3NyYy9wcm92aWRlcnMvYW5pbWF0aW9uLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBRWxGLE1BR2EsbUJBQW1CO0lBQzlCOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFdBQW9CO1FBQ3pCLE9BQU8sZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsVUFBVSxDQUFDLEVBQVksRUFBRSxFQUFZLEVBQUUsRUFBWSxFQUFFLEVBQVksRUFBRSxXQUFtQjtRQUNwRixPQUFPLHVCQUF1QixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM5RCxDQUFDOzJIQXhCVSxtQkFBbUI7K0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOztTQUVQLG1CQUFtQjs0RkFBbkIsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgQW5pbWF0aW9uIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlQW5pbWF0aW9uLCBnZXRUaW1lR2l2ZW5Qcm9ncmVzc2lvbiB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYW5pbWF0aW9uXG4gICAqL1xuICBjcmVhdGUoYW5pbWF0aW9uSWQ/OiBzdHJpbmcpOiBBbmltYXRpb24ge1xuICAgIHJldHVybiBjcmVhdGVBbmltYXRpb24oYW5pbWF0aW9uSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVYUEVSSU1FTlRBTFxuICAgKlxuICAgKiBHaXZlbiBhIHByb2dyZXNzaW9uIGFuZCBhIGN1YmljIGJlemllciBmdW5jdGlvbixcbiAgICogdGhpcyB1dGlsaXR5IHJldHVybnMgdGhlIHRpbWUgdmFsdWUocykgYXQgd2hpY2ggdGhlXG4gICAqIGN1YmljIGJlemllciByZWFjaGVzIHRoZSBnaXZlbiB0aW1lIHByb2dyZXNzaW9uLlxuICAgKlxuICAgKiBJZiB0aGUgY3ViaWMgYmV6aWVyIG5ldmVyIHJlYWNoZXMgdGhlIHByb2dyZXNzaW9uXG4gICAqIHRoZSByZXN1bHQgd2lsbCBiZSBhbiBlbXB0eSBhcnJheS5cbiAgICpcbiAgICogVGhpcyBpcyBtb3N0IHVzZWZ1bCBmb3Igc3dpdGNoaW5nIGJldHdlZW4gZWFzaW5nIGN1cnZlc1xuICAgKiB3aGVuIGRvaW5nIGEgZ2VzdHVyZSBhbmltYXRpb24gKGkuZS4gZ29pbmcgZnJvbSBsaW5lYXIgZWFzaW5nXG4gICAqIGR1cmluZyBhIGRyYWcsIHRvIGFub3RoZXIgZWFzaW5nIHdoZW4gYHByb2dyZXNzRW5kYCBpcyBjYWxsZWQpXG4gICAqL1xuICBlYXNpbmdUaW1lKHAwOiBudW1iZXJbXSwgcDE6IG51bWJlcltdLCBwMjogbnVtYmVyW10sIHAzOiBudW1iZXJbXSwgcHJvZ3Jlc3Npb246IG51bWJlcik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZ2V0VGltZUdpdmVuUHJvZ3Jlc3Npb24ocDAsIHAxLCBwMiwgcDMsIHByb2dyZXNzaW9uKTtcbiAgfVxufVxuIl19