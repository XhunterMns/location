import { Injector, Injectable, EnvironmentInjector, inject } from '@angular/core';
import { AngularDelegate, OverlayBaseController } from '@ionic/angular/common';
import { modalController } from '@ionic/core';
import * as i0 from "@angular/core";
class ModalController extends OverlayBaseController {
    angularDelegate = inject(AngularDelegate);
    injector = inject(Injector);
    environmentInjector = inject(EnvironmentInjector);
    constructor() {
        super(modalController);
    }
    create(opts) {
        const { injector: customInjector, ...restOpts } = opts;
        return super.create({
            ...restOpts,
            delegate: this.angularDelegate.create(this.environmentInjector, this.injector, 'modal', customInjector),
        });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ModalController, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ModalController });
}
export { ModalController };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ModalController, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvbW9kYWwtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRS9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBRTlDLE1BQ2EsZUFBZ0IsU0FBUSxxQkFBd0Q7SUFDbkYsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMxQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRTFEO1FBQ0UsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBa0I7UUFDdkIsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsR0FBRyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDdkQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ2xCLEdBQUcsUUFBUTtZQUNYLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDO1NBQ3hHLENBQUMsQ0FBQztJQUNMLENBQUM7MkhBZlUsZUFBZTsrSEFBZixlQUFlOztTQUFmLGVBQWU7NEZBQWYsZUFBZTtrQkFEM0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdG9yLCBJbmplY3RhYmxlLCBFbnZpcm9ubWVudEluamVjdG9yLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuZ3VsYXJEZWxlZ2F0ZSwgT3ZlcmxheUJhc2VDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB0eXBlIHsgTW9kYWxPcHRpb25zIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IG1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udHJvbGxlciBleHRlbmRzIE92ZXJsYXlCYXNlQ29udHJvbGxlcjxNb2RhbE9wdGlvbnMsIEhUTUxJb25Nb2RhbEVsZW1lbnQ+IHtcbiAgcHJpdmF0ZSBhbmd1bGFyRGVsZWdhdGUgPSBpbmplY3QoQW5ndWxhckRlbGVnYXRlKTtcbiAgcHJpdmF0ZSBpbmplY3RvciA9IGluamVjdChJbmplY3Rvcik7XG4gIHByaXZhdGUgZW52aXJvbm1lbnRJbmplY3RvciA9IGluamVjdChFbnZpcm9ubWVudEluamVjdG9yKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihtb2RhbENvbnRyb2xsZXIpO1xuICB9XG5cbiAgY3JlYXRlKG9wdHM6IE1vZGFsT3B0aW9ucyk6IFByb21pc2U8SFRNTElvbk1vZGFsRWxlbWVudD4ge1xuICAgIGNvbnN0IHsgaW5qZWN0b3I6IGN1c3RvbUluamVjdG9yLCAuLi5yZXN0T3B0cyB9ID0gb3B0cztcbiAgICByZXR1cm4gc3VwZXIuY3JlYXRlKHtcbiAgICAgIC4uLnJlc3RPcHRzLFxuICAgICAgZGVsZWdhdGU6IHRoaXMuYW5ndWxhckRlbGVnYXRlLmNyZWF0ZSh0aGlzLmVudmlyb25tZW50SW5qZWN0b3IsIHRoaXMuaW5qZWN0b3IsICdtb2RhbCcsIGN1c3RvbUluamVjdG9yKSxcbiAgICB9KTtcbiAgfVxufVxuIl19