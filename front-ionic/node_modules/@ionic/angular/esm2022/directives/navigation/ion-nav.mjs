import { Component, ChangeDetectionStrategy, } from '@angular/core';
import { IonNav as IonNavBase } from '@ionic/angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular/common";
class IonNav extends IonNavBase {
    constructor(ref, environmentInjector, injector, angularDelegate, z, c) {
        super(ref, environmentInjector, injector, angularDelegate, z, c);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonNav, deps: [{ token: i0.ElementRef }, { token: i0.EnvironmentInjector }, { token: i0.Injector }, { token: i1.AngularDelegate }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonNav, selector: "ion-nav", usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
export { IonNav };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonNav, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-nav',
                    template: '<ng-content></ng-content>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.EnvironmentInjector }, { type: i0.Injector }, { type: i1.AngularDelegate }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLW5hdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaXJlY3RpdmVzL25hdmlnYXRpb24vaW9uLW5hdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBTUwsU0FBUyxFQUNULHVCQUF1QixHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxJQUFJLFVBQVUsRUFBbUIsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBRTlFLE1BTWEsTUFBTyxTQUFRLFVBQVU7SUFDcEMsWUFDRSxHQUFlLEVBQ2YsbUJBQXdDLEVBQ3hDLFFBQWtCLEVBQ2xCLGVBQWdDLEVBQ2hDLENBQVMsRUFDVCxDQUFvQjtRQUVwQixLQUFLLENBQUMsR0FBRyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7MkhBVlUsTUFBTTsrR0FBTixNQUFNLHNFQUpQLDJCQUEyQjs7U0FJMUIsTUFBTTs0RkFBTixNQUFNO2tCQU5sQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbGVtZW50UmVmLFxuICBJbmplY3RvcixcbiAgRW52aXJvbm1lbnRJbmplY3RvcixcbiAgTmdab25lLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJb25OYXYgYXMgSW9uTmF2QmFzZSwgQW5ndWxhckRlbGVnYXRlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLW5hdicsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIElvbk5hdiBleHRlbmRzIElvbk5hdkJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICByZWY6IEVsZW1lbnRSZWYsXG4gICAgZW52aXJvbm1lbnRJbmplY3RvcjogRW52aXJvbm1lbnRJbmplY3RvcixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgYW5ndWxhckRlbGVnYXRlOiBBbmd1bGFyRGVsZWdhdGUsXG4gICAgejogTmdab25lLFxuICAgIGM6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHN1cGVyKHJlZiwgZW52aXJvbm1lbnRJbmplY3RvciwgaW5qZWN0b3IsIGFuZ3VsYXJEZWxlZ2F0ZSwgeiwgYyk7XG4gIH1cbn1cbiJdfQ==