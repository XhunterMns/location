import { Directive, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import * as i0 from "@angular/core";
class SelectValueAccessorDirective extends ValueAccessor {
    constructor(injector, el) {
        super(injector, el);
    }
    _handleChangeEvent(el) {
        this.handleValueChange(el, el.value);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectValueAccessorDirective, deps: [{ token: i0.Injector }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: SelectValueAccessorDirective, selector: "ion-select, ion-radio-group, ion-segment, ion-datetime", host: { listeners: { "ionChange": "_handleChangeEvent($event.target)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: SelectValueAccessorDirective,
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0 });
}
export { SelectValueAccessorDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SelectValueAccessorDirective, decorators: [{
            type: Directive,
            args: [{
                    /* tslint:disable-next-line:directive-selector */
                    selector: 'ion-select, ion-radio-group, ion-segment, ion-datetime',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: SelectValueAccessorDirective,
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.ElementRef }]; }, propDecorators: { _handleChangeEvent: [{
                type: HostListener,
                args: ['ionChange', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXZhbHVlLWFjY2Vzc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RpcmVjdGl2ZXMvY29udHJvbC12YWx1ZS1hY2Nlc3NvcnMvc2VsZWN0LXZhbHVlLWFjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBd0IsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRXRELE1BV2EsNEJBQTZCLFNBQVEsYUFBYTtJQUM3RCxZQUFZLFFBQWtCLEVBQUUsRUFBYztRQUM1QyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFHRCxrQkFBa0IsQ0FDaEIsRUFBb0c7UUFFcEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzsySEFWVSw0QkFBNEI7K0dBQTVCLDRCQUE0Qiw0SkFSNUI7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsNEJBQTRCO2dCQUN6QyxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0Y7O1NBRVUsNEJBQTRCOzRGQUE1Qiw0QkFBNEI7a0JBWHhDLFNBQVM7bUJBQUM7b0JBQ1QsaURBQWlEO29CQUNqRCxRQUFRLEVBQUUsd0RBQXdEO29CQUNsRSxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyw4QkFBOEI7NEJBQ3pDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGO3dIQU9DLGtCQUFrQjtzQkFEakIsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RvciwgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yICovXG4gIHNlbGVjdG9yOiAnaW9uLXNlbGVjdCwgaW9uLXJhZGlvLWdyb3VwLCBpb24tc2VnbWVudCwgaW9uLWRhdGV0aW1lJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogU2VsZWN0VmFsdWVBY2Nlc3NvckRpcmVjdGl2ZSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdFZhbHVlQWNjZXNzb3JEaXJlY3RpdmUgZXh0ZW5kcyBWYWx1ZUFjY2Vzc29yIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCBlbDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGluamVjdG9yLCBlbCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpb25DaGFuZ2UnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgX2hhbmRsZUNoYW5nZUV2ZW50KFxuICAgIGVsOiBIVE1MSW9uU2VsZWN0RWxlbWVudCB8IEhUTUxJb25SYWRpb0dyb3VwRWxlbWVudCB8IEhUTUxJb25TZWdtZW50RWxlbWVudCB8IEhUTUxJb25EYXRldGltZUVsZW1lbnRcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVWYWx1ZUNoYW5nZShlbCwgZWwudmFsdWUpO1xuICB9XG59XG4iXX0=