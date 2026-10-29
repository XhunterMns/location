import { Injectable, Optional } from '@angular/core';
import { NavigationStart, NavigationCancel, NavigationError, } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "./platform";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
class NavController {
    location;
    serializer;
    router;
    topOutlet;
    direction = DEFAULT_DIRECTION;
    animated = DEFAULT_ANIMATED;
    animationBuilder;
    guessDirection = 'forward';
    guessAnimation;
    lastNavId = -1;
    constructor(platform, location, serializer, router) {
        this.location = location;
        this.serializer = serializer;
        this.router = router;
        // Subscribe to router events to detect direction
        if (router) {
            router.events.subscribe((ev) => {
                if (ev instanceof NavigationStart) {
                    // restoredState is set if the browser back/forward button is used
                    const id = ev.restoredState ? ev.restoredState.navigationId : ev.id;
                    this.guessDirection = this.guessAnimation = id < this.lastNavId ? 'back' : 'forward';
                    this.lastNavId = this.guessDirection === 'forward' ? ev.id : id;
                }
                // Reset explicit direction when navigation is canceled (e.g., guard rejection)
                // to prevent stale direction from leaking into the next navigation
                if (ev instanceof NavigationCancel || ev instanceof NavigationError) {
                    this.direction = DEFAULT_DIRECTION;
                    this.animated = DEFAULT_ANIMATED;
                    this.animationBuilder = undefined;
                }
            });
        }
        // Subscribe to backButton events
        platform.backButton.subscribeWithPriority(0, (processNextHandler) => {
            this.pop();
            processNextHandler();
        });
    }
    /**
     * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
     * it's equivalent to calling `this.router.navigateByUrl()`, but it's explicit about the **direction** of the transition.
     *
     * Going **forward** means that a new page is going to be pushed to the stack of the outlet (ion-router-outlet),
     * and that it will show a "forward" animation by default.
     *
     * Navigating forward can also be triggered in a declarative manner by using the `[routerDirection]` directive:
     *
     * ```html
     * <a routerLink="/path/to/page" routerDirection="forward">Link</a>
     * ```
     */
    navigateForward(url, options = {}) {
        this.setDirection('forward', options.animated, options.animationDirection, options.animation);
        return this.navigate(url, options);
    }
    /**
     * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
     * it's equivalent to calling:
     *
     * ```ts
     * this.navController.setDirection('back');
     * this.router.navigateByUrl(path);
     * ```
     *
     * Going **back** means that all the pages in the stack until the navigated page is found will be popped,
     * and that it will show a "back" animation by default.
     *
     * Navigating back can also be triggered in a declarative manner by using the `[routerDirection]` directive:
     *
     * ```html
     * <a routerLink="/path/to/page" routerDirection="back">Link</a>
     * ```
     */
    navigateBack(url, options = {}) {
        this.setDirection('back', options.animated, options.animationDirection, options.animation);
        return this.navigate(url, options);
    }
    /**
     * This method uses Angular's [Router](https://angular.io/api/router/Router) under the hood,
     * it's equivalent to calling:
     *
     * ```ts
     * this.navController.setDirection('root');
     * this.router.navigateByUrl(path);
     * ```
     *
     * Going **root** means that all existing pages in the stack will be removed,
     * and the navigated page will become the single page in the stack.
     *
     * Navigating root can also be triggered in a declarative manner by using the `[routerDirection]` directive:
     *
     * ```html
     * <a routerLink="/path/to/page" routerDirection="root">Link</a>
     * ```
     */
    navigateRoot(url, options = {}) {
        this.setDirection('root', options.animated, options.animationDirection, options.animation);
        return this.navigate(url, options);
    }
    /**
     * Same as [Location](https://angular.io/api/common/Location)'s back() method.
     * It will use the standard `window.history.back()` under the hood, but featuring a `back` animation
     * by default.
     */
    back(options = { animated: true, animationDirection: 'back' }) {
        this.setDirection('back', options.animated, options.animationDirection, options.animation);
        return this.location.back();
    }
    /**
     * This methods goes back in the context of Ionic's stack navigation.
     *
     * It recursively finds the top active `ion-router-outlet` and calls `pop()`.
     * This is the recommended way to go back when you are using `ion-router-outlet`.
     *
     * Resolves to `true` if it was able to pop.
     */
    async pop() {
        let outlet = this.topOutlet;
        while (outlet) {
            if (await outlet.pop()) {
                return true;
            }
            else {
                outlet = outlet.parentOutlet;
            }
        }
        return false;
    }
    /**
     * This methods specifies the direction of the next navigation performed by the Angular router.
     *
     * `setDirection()` does not trigger any transition, it just sets some flags to be consumed by `ion-router-outlet`.
     *
     * It's recommended to use `navigateForward()`, `navigateBack()` and `navigateRoot()` instead of `setDirection()`.
     */
    setDirection(direction, animated, animationDirection, animationBuilder) {
        this.direction = direction;
        this.animated = getAnimation(direction, animated, animationDirection);
        this.animationBuilder = animationBuilder;
    }
    /**
     * @internal
     */
    setTopOutlet(outlet) {
        this.topOutlet = outlet;
    }
    /**
     * @internal
     */
    consumeTransition() {
        let direction = 'root';
        let animation;
        const animationBuilder = this.animationBuilder;
        if (this.direction === 'auto') {
            direction = this.guessDirection;
            animation = this.guessAnimation;
        }
        else {
            animation = this.animated;
            direction = this.direction;
        }
        this.direction = DEFAULT_DIRECTION;
        this.animated = DEFAULT_ANIMATED;
        this.animationBuilder = undefined;
        return {
            direction,
            animation,
            animationBuilder,
        };
    }
    navigate(url, options) {
        if (Array.isArray(url)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.router.navigate(url, options);
        }
        else {
            /**
             * navigateByUrl ignores any properties that
             * would change the url, so things like queryParams
             * would be ignored unless we create a url tree
             * More Info: https://github.com/angular/angular/issues/18798
             */
            const urlTree = this.serializer.parse(url.toString());
            if (options.queryParams !== undefined) {
                urlTree.queryParams = { ...options.queryParams };
            }
            if (options.fragment !== undefined) {
                urlTree.fragment = options.fragment;
            }
            /**
             * `navigateByUrl` will still apply `NavigationExtras` properties
             * that do not modify the url, such as `replaceUrl` which is why
             * `options` is passed in here.
             */
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.router.navigateByUrl(urlTree, options);
        }
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NavController, deps: [{ token: i1.Platform }, { token: i2.Location }, { token: i3.UrlSerializer }, { token: i3.Router, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NavController, providedIn: 'root' });
}
export { NavController };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NavController, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Platform }, { type: i2.Location }, { type: i3.UrlSerializer }, { type: i3.Router, decorators: [{
                    type: Optional
                }] }]; } });
const getAnimation = (direction, animated, animationDirection) => {
    if (animated === false) {
        return undefined;
    }
    if (animationDirection !== undefined) {
        return animationDirection;
    }
    if (direction === 'forward' || direction === 'back') {
        return direction;
    }
    else if (direction === 'root' && animated === true) {
        return 'forward';
    }
    return undefined;
};
const DEFAULT_DIRECTION = 'auto';
const DEFAULT_ANIMATED = undefined;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21tb24vc3JjL3Byb3ZpZGVycy9uYXYtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBS0wsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixlQUFlLEdBQ2hCLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBZXpCLE1BR2EsYUFBYTtJQVdkO0lBQ0E7SUFDWTtJQVpkLFNBQVMsQ0FBbUI7SUFDNUIsU0FBUyxHQUF5QyxpQkFBaUIsQ0FBQztJQUNwRSxRQUFRLEdBQWtCLGdCQUFnQixDQUFDO0lBQzNDLGdCQUFnQixDQUFvQjtJQUNwQyxjQUFjLEdBQW9CLFNBQVMsQ0FBQztJQUM1QyxjQUFjLENBQWdCO0lBQzlCLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUV2QixZQUNFLFFBQWtCLEVBQ1YsUUFBa0IsRUFDbEIsVUFBeUIsRUFDYixNQUFlO1FBRjNCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUNiLFdBQU0sR0FBTixNQUFNLENBQVM7UUFFbkMsaURBQWlEO1FBQ2pELElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxFQUFFLFlBQVksZUFBZSxFQUFFO29CQUNqQyxrRUFBa0U7b0JBQ2xFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNwRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxHQUFHLElBQUks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QVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFFRixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUNqQyxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOYXZpZ2F0aW9uRXh0cmFzLFxuICBSb3V0ZXIsXG4gIFVybFNlcmlhbGl6ZXIsXG4gIFVybFRyZWUsXG4gIE5hdmlnYXRpb25TdGFydCxcbiAgTmF2aWdhdGlvbkNhbmNlbCxcbiAgTmF2aWdhdGlvbkVycm9yLFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHR5cGUgeyBBbmltYXRpb25CdWlsZGVyLCBOYXZEaXJlY3Rpb24sIFJvdXRlckRpcmVjdGlvbiB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgfSBmcm9tICcuLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vcm91dGVyLW91dGxldCc7XG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9wbGF0Zm9ybSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uT3B0aW9ucyB7XG4gIGFuaW1hdGVkPzogYm9vbGVhbjtcbiAgYW5pbWF0aW9uPzogQW5pbWF0aW9uQnVpbGRlcjtcbiAgYW5pbWF0aW9uRGlyZWN0aW9uPzogJ2ZvcndhcmQnIHwgJ2JhY2snO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5hdmlnYXRpb25PcHRpb25zIGV4dGVuZHMgTmF2aWdhdGlvbkV4dHJhcywgQW5pbWF0aW9uT3B0aW9ucyB7fVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTmF2Q29udHJvbGxlciB7XG4gIHByaXZhdGUgdG9wT3V0bGV0PzogSW9uUm91dGVyT3V0bGV0O1xuICBwcml2YXRlIGRpcmVjdGlvbjogJ2ZvcndhcmQnIHwgJ2JhY2snIHwgJ3Jvb3QnIHwgJ2F1dG8nID0gREVGQVVMVF9ESVJFQ1RJT047XG4gIHByaXZhdGUgYW5pbWF0ZWQ/OiBOYXZEaXJlY3Rpb24gPSBERUZBVUxUX0FOSU1BVEVEO1xuICBwcml2YXRlIGFuaW1hdGlvbkJ1aWxkZXI/OiBBbmltYXRpb25CdWlsZGVyO1xuICBwcml2YXRlIGd1ZXNzRGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb24gPSAnZm9yd2FyZCc7XG4gIHByaXZhdGUgZ3Vlc3NBbmltYXRpb24/OiBOYXZEaXJlY3Rpb247XG4gIHByaXZhdGUgbGFzdE5hdklkID0gLTE7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIHByaXZhdGUgc2VyaWFsaXplcjogVXJsU2VyaWFsaXplcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlcj86IFJvdXRlclxuICApIHtcbiAgICAvLyBTdWJzY3JpYmUgdG8gcm91dGVyIGV2ZW50cyB0byBkZXRlY3QgZGlyZWN0aW9uXG4gICAgaWYgKHJvdXRlcikge1xuICAgICAgcm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2KSA9PiB7XG4gICAgICAgIGlmIChldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xuICAgICAgICAgIC8vIHJlc3RvcmVkU3RhdGUgaXMgc2V0IGlmIHRoZSBicm93c2VyIGJhY2svZm9yd2FyZCBidXR0b24gaXMgdXNlZFxuICAgICAgICAgIGNvbnN0IGlkID0gZXYucmVzdG9yZWRTdGF0ZSA/IGV2LnJlc3RvcmVkU3RhdGUubmF2aWdhdGlvbklkIDogZXYuaWQ7XG4gICAgICAgICAgdGhpcy5ndWVzc0RpcmVjdGlvbiA9IHRoaXMuZ3Vlc3NBbmltYXRpb24gPSBpZCA8IHRoaXMubGFzdE5hdklkID8gJ2JhY2snIDogJ2ZvcndhcmQnO1xuICAgICAgICAgIHRoaXMubGFzdE5hdklkID0gdGhpcy5ndWVzc0RpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gZXYuaWQgOiBpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc2V0IGV4cGxpY2l0IGRpcmVjdGlvbiB3aGVuIG5hdmlnYXRpb24gaXMgY2FuY2VsZWQgKGUuZy4sIGd1YXJkIHJlamVjdGlvbilcbiAgICAgICAgLy8gdG8gcHJldmVudCBzdGFsZSBkaXJlY3Rpb24gZnJvbSBsZWFraW5nIGludG8gdGhlIG5leHQgbmF2aWdhdGlvblxuICAgICAgICBpZiAoZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQ2FuY2VsIHx8IGV2IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yKSB7XG4gICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBERUZBVUxUX0RJUkVDVElPTjtcbiAgICAgICAgICB0aGlzLmFuaW1hdGVkID0gREVGQVVMVF9BTklNQVRFRDtcbiAgICAgICAgICB0aGlzLmFuaW1hdGlvbkJ1aWxkZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFN1YnNjcmliZSB0byBiYWNrQnV0dG9uIGV2ZW50c1xuICAgIHBsYXRmb3JtLmJhY2tCdXR0b24uc3Vic2NyaWJlV2l0aFByaW9yaXR5KDAsIChwcm9jZXNzTmV4dEhhbmRsZXIpID0+IHtcbiAgICAgIHRoaXMucG9wKCk7XG4gICAgICBwcm9jZXNzTmV4dEhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB1c2VzIEFuZ3VsYXIncyBbUm91dGVyXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL3JvdXRlci9Sb3V0ZXIpIHVuZGVyIHRoZSBob29kLFxuICAgKiBpdCdzIGVxdWl2YWxlbnQgdG8gY2FsbGluZyBgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCgpYCwgYnV0IGl0J3MgZXhwbGljaXQgYWJvdXQgdGhlICoqZGlyZWN0aW9uKiogb2YgdGhlIHRyYW5zaXRpb24uXG4gICAqXG4gICAqIEdvaW5nICoqZm9yd2FyZCoqIG1lYW5zIHRoYXQgYSBuZXcgcGFnZSBpcyBnb2luZyB0byBiZSBwdXNoZWQgdG8gdGhlIHN0YWNrIG9mIHRoZSBvdXRsZXQgKGlvbi1yb3V0ZXItb3V0bGV0KSxcbiAgICogYW5kIHRoYXQgaXQgd2lsbCBzaG93IGEgXCJmb3J3YXJkXCIgYW5pbWF0aW9uIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIE5hdmlnYXRpbmcgZm9yd2FyZCBjYW4gYWxzbyBiZSB0cmlnZ2VyZWQgaW4gYSBkZWNsYXJhdGl2ZSBtYW5uZXIgYnkgdXNpbmcgdGhlIGBbcm91dGVyRGlyZWN0aW9uXWAgZGlyZWN0aXZlOlxuICAgKlxuICAgKiBgYGBodG1sXG4gICAqIDxhIHJvdXRlckxpbms9XCIvcGF0aC90by9wYWdlXCIgcm91dGVyRGlyZWN0aW9uPVwiZm9yd2FyZFwiPkxpbms8L2E+XG4gICAqIGBgYFxuICAgKi9cbiAgbmF2aWdhdGVGb3J3YXJkKHVybDogc3RyaW5nIHwgVXJsVHJlZSB8IGFueVtdLCBvcHRpb25zOiBOYXZpZ2F0aW9uT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhpcy5zZXREaXJlY3Rpb24oJ2ZvcndhcmQnLCBvcHRpb25zLmFuaW1hdGVkLCBvcHRpb25zLmFuaW1hdGlvbkRpcmVjdGlvbiwgb3B0aW9ucy5hbmltYXRpb24pO1xuICAgIHJldHVybiB0aGlzLm5hdmlnYXRlKHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgdXNlcyBBbmd1bGFyJ3MgW1JvdXRlcl0oaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9yb3V0ZXIvUm91dGVyKSB1bmRlciB0aGUgaG9vZCxcbiAgICogaXQncyBlcXVpdmFsZW50IHRvIGNhbGxpbmc6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIHRoaXMubmF2Q29udHJvbGxlci5zZXREaXJlY3Rpb24oJ2JhY2snKTtcbiAgICogdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChwYXRoKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEdvaW5nICoqYmFjayoqIG1lYW5zIHRoYXQgYWxsIHRoZSBwYWdlcyBpbiB0aGUgc3RhY2sgdW50aWwgdGhlIG5hdmlnYXRlZCBwYWdlIGlzIGZvdW5kIHdpbGwgYmUgcG9wcGVkLFxuICAgKiBhbmQgdGhhdCBpdCB3aWxsIHNob3cgYSBcImJhY2tcIiBhbmltYXRpb24gYnkgZGVmYXVsdC5cbiAgICpcbiAgICogTmF2aWdhdGluZyBiYWNrIGNhbiBhbHNvIGJlIHRyaWdnZXJlZCBpbiBhIGRlY2xhcmF0aXZlIG1hbm5lciBieSB1c2luZyB0aGUgYFtyb3V0ZXJEaXJlY3Rpb25dYCBkaXJlY3RpdmU6XG4gICAqXG4gICAqIGBgYGh0bWxcbiAgICogPGEgcm91dGVyTGluaz1cIi9wYXRoL3RvL3BhZ2VcIiByb3V0ZXJEaXJlY3Rpb249XCJiYWNrXCI+TGluazwvYT5cbiAgICogYGBgXG4gICAqL1xuICBuYXZpZ2F0ZUJhY2sodXJsOiBzdHJpbmcgfCBVcmxUcmVlIHwgYW55W10sIG9wdGlvbnM6IE5hdmlnYXRpb25PcHRpb25zID0ge30pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLnNldERpcmVjdGlvbignYmFjaycsIG9wdGlvbnMuYW5pbWF0ZWQsIG9wdGlvbnMuYW5pbWF0aW9uRGlyZWN0aW9uLCBvcHRpb25zLmFuaW1hdGlvbik7XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGUodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB1c2VzIEFuZ3VsYXIncyBbUm91dGVyXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL3JvdXRlci9Sb3V0ZXIpIHVuZGVyIHRoZSBob29kLFxuICAgKiBpdCdzIGVxdWl2YWxlbnQgdG8gY2FsbGluZzpcbiAgICpcbiAgICogYGBgdHNcbiAgICogdGhpcy5uYXZDb250cm9sbGVyLnNldERpcmVjdGlvbigncm9vdCcpO1xuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHBhdGgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogR29pbmcgKipyb290KiogbWVhbnMgdGhhdCBhbGwgZXhpc3RpbmcgcGFnZXMgaW4gdGhlIHN0YWNrIHdpbGwgYmUgcmVtb3ZlZCxcbiAgICogYW5kIHRoZSBuYXZpZ2F0ZWQgcGFnZSB3aWxsIGJlY29tZSB0aGUgc2luZ2xlIHBhZ2UgaW4gdGhlIHN0YWNrLlxuICAgKlxuICAgKiBOYXZpZ2F0aW5nIHJvb3QgY2FuIGFsc28gYmUgdHJpZ2dlcmVkIGluIGEgZGVjbGFyYXRpdmUgbWFubmVyIGJ5IHVzaW5nIHRoZSBgW3JvdXRlckRpcmVjdGlvbl1gIGRpcmVjdGl2ZTpcbiAgICpcbiAgICogYGBgaHRtbFxuICAgKiA8YSByb3V0ZXJMaW5rPVwiL3BhdGgvdG8vcGFnZVwiIHJvdXRlckRpcmVjdGlvbj1cInJvb3RcIj5MaW5rPC9hPlxuICAgKiBgYGBcbiAgICovXG4gIG5hdmlnYXRlUm9vdCh1cmw6IHN0cmluZyB8IFVybFRyZWUgfCBhbnlbXSwgb3B0aW9uczogTmF2aWdhdGlvbk9wdGlvbnMgPSB7fSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRoaXMuc2V0RGlyZWN0aW9uKCdyb290Jywgb3B0aW9ucy5hbmltYXRlZCwgb3B0aW9ucy5hbmltYXRpb25EaXJlY3Rpb24sIG9wdGlvbnMuYW5pbWF0aW9uKTtcbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZSh1cmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbWUgYXMgW0xvY2F0aW9uXShodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvbW1vbi9Mb2NhdGlvbikncyBiYWNrKCkgbWV0aG9kLlxuICAgKiBJdCB3aWxsIHVzZSB0aGUgc3RhbmRhcmQgYHdpbmRvdy5oaXN0b3J5LmJhY2soKWAgdW5kZXIgdGhlIGhvb2QsIGJ1dCBmZWF0dXJpbmcgYSBgYmFja2AgYW5pbWF0aW9uXG4gICAqIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBiYWNrKG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnMgPSB7IGFuaW1hdGVkOiB0cnVlLCBhbmltYXRpb25EaXJlY3Rpb246ICdiYWNrJyB9KTogdm9pZCB7XG4gICAgdGhpcy5zZXREaXJlY3Rpb24oJ2JhY2snLCBvcHRpb25zLmFuaW1hdGVkLCBvcHRpb25zLmFuaW1hdGlvbkRpcmVjdGlvbiwgb3B0aW9ucy5hbmltYXRpb24pO1xuICAgIHJldHVybiB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZHMgZ29lcyBiYWNrIGluIHRoZSBjb250ZXh0IG9mIElvbmljJ3Mgc3RhY2sgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogSXQgcmVjdXJzaXZlbHkgZmluZHMgdGhlIHRvcCBhY3RpdmUgYGlvbi1yb3V0ZXItb3V0bGV0YCBhbmQgY2FsbHMgYHBvcCgpYC5cbiAgICogVGhpcyBpcyB0aGUgcmVjb21tZW5kZWQgd2F5IHRvIGdvIGJhY2sgd2hlbiB5b3UgYXJlIHVzaW5nIGBpb24tcm91dGVyLW91dGxldGAuXG4gICAqXG4gICAqIFJlc29sdmVzIHRvIGB0cnVlYCBpZiBpdCB3YXMgYWJsZSB0byBwb3AuXG4gICAqL1xuICBhc3luYyBwb3AoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgbGV0IG91dGxldCA9IHRoaXMudG9wT3V0bGV0O1xuXG4gICAgd2hpbGUgKG91dGxldCkge1xuICAgICAgaWYgKGF3YWl0IG91dGxldC5wb3AoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dGxldCA9IG91dGxldC5wYXJlbnRPdXRsZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kcyBzcGVjaWZpZXMgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbmV4dCBuYXZpZ2F0aW9uIHBlcmZvcm1lZCBieSB0aGUgQW5ndWxhciByb3V0ZXIuXG4gICAqXG4gICAqIGBzZXREaXJlY3Rpb24oKWAgZG9lcyBub3QgdHJpZ2dlciBhbnkgdHJhbnNpdGlvbiwgaXQganVzdCBzZXRzIHNvbWUgZmxhZ3MgdG8gYmUgY29uc3VtZWQgYnkgYGlvbi1yb3V0ZXItb3V0bGV0YC5cbiAgICpcbiAgICogSXQncyByZWNvbW1lbmRlZCB0byB1c2UgYG5hdmlnYXRlRm9yd2FyZCgpYCwgYG5hdmlnYXRlQmFjaygpYCBhbmQgYG5hdmlnYXRlUm9vdCgpYCBpbnN0ZWFkIG9mIGBzZXREaXJlY3Rpb24oKWAuXG4gICAqL1xuICBzZXREaXJlY3Rpb24oXG4gICAgZGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb24sXG4gICAgYW5pbWF0ZWQ/OiBib29sZWFuLFxuICAgIGFuaW1hdGlvbkRpcmVjdGlvbj86ICdmb3J3YXJkJyB8ICdiYWNrJyxcbiAgICBhbmltYXRpb25CdWlsZGVyPzogQW5pbWF0aW9uQnVpbGRlclxuICApOiB2b2lkIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLmFuaW1hdGVkID0gZ2V0QW5pbWF0aW9uKGRpcmVjdGlvbiwgYW5pbWF0ZWQsIGFuaW1hdGlvbkRpcmVjdGlvbik7XG4gICAgdGhpcy5hbmltYXRpb25CdWlsZGVyID0gYW5pbWF0aW9uQnVpbGRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHNldFRvcE91dGxldChvdXRsZXQ6IElvblJvdXRlck91dGxldCk6IHZvaWQge1xuICAgIHRoaXMudG9wT3V0bGV0ID0gb3V0bGV0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3VtZVRyYW5zaXRpb24oKToge1xuICAgIGRpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uO1xuICAgIGFuaW1hdGlvbjogTmF2RGlyZWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIGFuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIgfCB1bmRlZmluZWQ7XG4gIH0ge1xuICAgIGxldCBkaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbiA9ICdyb290JztcbiAgICBsZXQgYW5pbWF0aW9uOiBOYXZEaXJlY3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgY29uc3QgYW5pbWF0aW9uQnVpbGRlciA9IHRoaXMuYW5pbWF0aW9uQnVpbGRlcjtcblxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2F1dG8nKSB7XG4gICAgICBkaXJlY3Rpb24gPSB0aGlzLmd1ZXNzRGlyZWN0aW9uO1xuICAgICAgYW5pbWF0aW9uID0gdGhpcy5ndWVzc0FuaW1hdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgYW5pbWF0aW9uID0gdGhpcy5hbmltYXRlZDtcbiAgICAgIGRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uO1xuICAgIH1cbiAgICB0aGlzLmRpcmVjdGlvbiA9IERFRkFVTFRfRElSRUNUSU9OO1xuICAgIHRoaXMuYW5pbWF0ZWQgPSBERUZBVUxUX0FOSU1BVEVEO1xuICAgIHRoaXMuYW5pbWF0aW9uQnVpbGRlciA9IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB7XG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBhbmltYXRpb24sXG4gICAgICBhbmltYXRpb25CdWlsZGVyLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIG5hdmlnYXRlKHVybDogc3RyaW5nIHwgVXJsVHJlZSB8IGFueVtdLCBvcHRpb25zOiBOYXZpZ2F0aW9uT3B0aW9ucykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHVybCkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZXIhLm5hdmlnYXRlKHVybCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qKlxuICAgICAgICogbmF2aWdhdGVCeVVybCBpZ25vcmVzIGFueSBwcm9wZXJ0aWVzIHRoYXRcbiAgICAgICAqIHdvdWxkIGNoYW5nZSB0aGUgdXJsLCBzbyB0aGluZ3MgbGlrZSBxdWVyeVBhcmFtc1xuICAgICAgICogd291bGQgYmUgaWdub3JlZCB1bmxlc3Mgd2UgY3JlYXRlIGEgdXJsIHRyZWVcbiAgICAgICAqIE1vcmUgSW5mbzogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTg3OThcbiAgICAgICAqL1xuICAgICAgY29uc3QgdXJsVHJlZSA9IHRoaXMuc2VyaWFsaXplci5wYXJzZSh1cmwudG9TdHJpbmcoKSk7XG5cbiAgICAgIGlmIChvcHRpb25zLnF1ZXJ5UGFyYW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXJsVHJlZS5xdWVyeVBhcmFtcyA9IHsgLi4ub3B0aW9ucy5xdWVyeVBhcmFtcyB9O1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5mcmFnbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVybFRyZWUuZnJhZ21lbnQgPSBvcHRpb25zLmZyYWdtZW50O1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIGBuYXZpZ2F0ZUJ5VXJsYCB3aWxsIHN0aWxsIGFwcGx5IGBOYXZpZ2F0aW9uRXh0cmFzYCBwcm9wZXJ0aWVzXG4gICAgICAgKiB0aGF0IGRvIG5vdCBtb2RpZnkgdGhlIHVybCwgc3VjaCBhcyBgcmVwbGFjZVVybGAgd2hpY2ggaXMgd2h5XG4gICAgICAgKiBgb3B0aW9uc2AgaXMgcGFzc2VkIGluIGhlcmUuXG4gICAgICAgKi9cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZXIhLm5hdmlnYXRlQnlVcmwodXJsVHJlZSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGdldEFuaW1hdGlvbiA9IChcbiAgZGlyZWN0aW9uOiBSb3V0ZXJEaXJlY3Rpb24sXG4gIGFuaW1hdGVkOiBib29sZWFuIHwgdW5kZWZpbmVkLFxuICBhbmltYXRpb25EaXJlY3Rpb246ICdmb3J3YXJkJyB8ICdiYWNrJyB8IHVuZGVmaW5lZFxuKTogTmF2RGlyZWN0aW9uIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGFuaW1hdGVkID09PSBmYWxzZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGFuaW1hdGlvbkRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGFuaW1hdGlvbkRpcmVjdGlvbjtcbiAgfVxuICBpZiAoZGlyZWN0aW9uID09PSAnZm9yd2FyZCcgfHwgZGlyZWN0aW9uID09PSAnYmFjaycpIHtcbiAgICByZXR1cm4gZGlyZWN0aW9uO1xuICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3Jvb3QnICYmIGFuaW1hdGVkID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICdmb3J3YXJkJztcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuY29uc3QgREVGQVVMVF9ESVJFQ1RJT04gPSAnYXV0byc7XG5jb25zdCBERUZBVUxUX0FOSU1BVEVEID0gdW5kZWZpbmVkO1xuIl19