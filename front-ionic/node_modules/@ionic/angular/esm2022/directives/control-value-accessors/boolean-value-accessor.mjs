import { Directive, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor, setIonicClasses } from '@ionic/angular/common';
import * as i0 from "@angular/core";
class BooleanValueAccessorDirective extends ValueAccessor {
    constructor(injector, el) {
        super(injector, el);
    }
    writeValue(value) {
        this.elementRef.nativeElement.checked = this.lastValue = value;
        setIonicClasses(this.elementRef);
    }
    _handleIonChange(el) {
        this.handleValueChange(el, el.checked);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BooleanValueAccessorDirective, deps: [{ token: i0.Injector }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: BooleanValueAccessorDirective, selector: "ion-checkbox,ion-toggle", host: { listeners: { "ionChange": "_handleIonChange($event.target)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: BooleanValueAccessorDirective,
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0 });
}
export { BooleanValueAccessorDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BooleanValueAccessorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ion-checkbox,ion-toggle',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: BooleanValueAccessorDirective,
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i0.ElementRef }]; }, propDecorators: { _handleIonChange: [{
                type: HostListener,
                args: ['ionChange', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi12YWx1ZS1hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaXJlY3RpdmVzL2NvbnRyb2wtdmFsdWUtYWNjZXNzb3JzL2Jvb2xlYW4tdmFsdWUtYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRXZFLE1BVWEsNkJBQThCLFNBQVEsYUFBYTtJQUM5RCxZQUFZLFFBQWtCLEVBQUUsRUFBYztRQUM1QyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDL0QsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBR0QsZ0JBQWdCLENBQUMsRUFBaUQ7UUFDaEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQzsySEFiVSw2QkFBNkI7K0dBQTdCLDZCQUE2QiwySEFSN0I7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsNkJBQTZCO2dCQUMxQyxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0Y7O1NBRVUsNkJBQTZCOzRGQUE3Qiw2QkFBNkI7a0JBVnpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsK0JBQStCOzRCQUMxQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRjt3SEFZQyxnQkFBZ0I7c0JBRGYsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZiwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVmFsdWVBY2Nlc3Nvciwgc2V0SW9uaWNDbGFzc2VzIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW9uLWNoZWNrYm94LGlvbi10b2dnbGUnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBCb29sZWFuVmFsdWVBY2Nlc3NvckRpcmVjdGl2ZSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJvb2xlYW5WYWx1ZUFjY2Vzc29yRGlyZWN0aXZlIGV4dGVuZHMgVmFsdWVBY2Nlc3NvciB7XG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihpbmplY3RvciwgZWwpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSB0aGlzLmxhc3RWYWx1ZSA9IHZhbHVlO1xuICAgIHNldElvbmljQ2xhc3Nlcyh0aGlzLmVsZW1lbnRSZWYpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW9uQ2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIF9oYW5kbGVJb25DaGFuZ2UoZWw6IEhUTUxJb25DaGVja2JveEVsZW1lbnQgfCBIVE1MSW9uVG9nZ2xlRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlVmFsdWVDaGFuZ2UoZWwsIGVsLmNoZWNrZWQpO1xuICB9XG59XG4iXX0=