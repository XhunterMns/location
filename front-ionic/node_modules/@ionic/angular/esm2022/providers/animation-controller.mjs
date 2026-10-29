import { Injectable } from '@angular/core';
import { createAnimation, getTimeGivenProgression } from '@ionic/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL2FuaW1hdGlvbi1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFHdkUsTUFHYSxtQkFBbUI7SUFDOUI7O09BRUc7SUFDSCxNQUFNLENBQUMsV0FBb0I7UUFDekIsT0FBTyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxVQUFVLENBQUMsRUFBWSxFQUFFLEVBQVksRUFBRSxFQUFZLEVBQUUsRUFBWSxFQUFFLFdBQW1CO1FBQ3BGLE9BQU8sdUJBQXVCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzlELENBQUM7MkhBeEJVLG1CQUFtQjsrSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07O1NBRVAsbUJBQW1COzRGQUFuQixtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlQW5pbWF0aW9uLCBnZXRUaW1lR2l2ZW5Qcm9ncmVzc2lvbiB9IGZyb20gJ0Bpb25pYy9jb3JlJztcbmltcG9ydCB0eXBlIHsgQW5pbWF0aW9uIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYW5pbWF0aW9uXG4gICAqL1xuICBjcmVhdGUoYW5pbWF0aW9uSWQ/OiBzdHJpbmcpOiBBbmltYXRpb24ge1xuICAgIHJldHVybiBjcmVhdGVBbmltYXRpb24oYW5pbWF0aW9uSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVYUEVSSU1FTlRBTFxuICAgKlxuICAgKiBHaXZlbiBhIHByb2dyZXNzaW9uIGFuZCBhIGN1YmljIGJlemllciBmdW5jdGlvbixcbiAgICogdGhpcyB1dGlsaXR5IHJldHVybnMgdGhlIHRpbWUgdmFsdWUocykgYXQgd2hpY2ggdGhlXG4gICAqIGN1YmljIGJlemllciByZWFjaGVzIHRoZSBnaXZlbiB0aW1lIHByb2dyZXNzaW9uLlxuICAgKlxuICAgKiBJZiB0aGUgY3ViaWMgYmV6aWVyIG5ldmVyIHJlYWNoZXMgdGhlIHByb2dyZXNzaW9uXG4gICAqIHRoZSByZXN1bHQgd2lsbCBiZSBhbiBlbXB0eSBhcnJheS5cbiAgICpcbiAgICogVGhpcyBpcyBtb3N0IHVzZWZ1bCBmb3Igc3dpdGNoaW5nIGJldHdlZW4gZWFzaW5nIGN1cnZlc1xuICAgKiB3aGVuIGRvaW5nIGEgZ2VzdHVyZSBhbmltYXRpb24gKGkuZS4gZ29pbmcgZnJvbSBsaW5lYXIgZWFzaW5nXG4gICAqIGR1cmluZyBhIGRyYWcsIHRvIGFub3RoZXIgZWFzaW5nIHdoZW4gYHByb2dyZXNzRW5kYCBpcyBjYWxsZWQpXG4gICAqL1xuICBlYXNpbmdUaW1lKHAwOiBudW1iZXJbXSwgcDE6IG51bWJlcltdLCBwMjogbnVtYmVyW10sIHAzOiBudW1iZXJbXSwgcHJvZ3Jlc3Npb246IG51bWJlcik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZ2V0VGltZUdpdmVuUHJvZ3Jlc3Npb24ocDAsIHAxLCBwMiwgcDMsIHByb2dyZXNzaW9uKTtcbiAgfVxufVxuIl19