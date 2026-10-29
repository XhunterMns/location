import { __decorate } from "tslib";
import { ContentChild, Directive, TemplateRef, } from '@angular/core';
import { ProxyCmp, proxyOutputs } from '../utils/proxy';
import * as i0 from "@angular/core";
const POPOVER_INPUTS = [
    'alignment',
    'animated',
    'arrow',
    'keepContentsMounted',
    'backdropDismiss',
    'cssClass',
    'dismissOnSelect',
    'enterAnimation',
    'event',
    'focusTrap',
    'isOpen',
    'keyboardClose',
    'leaveAnimation',
    'mode',
    'showBackdrop',
    'translucent',
    'trigger',
    'triggerAction',
    'reference',
    'size',
    'side',
];
const POPOVER_METHODS = ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss'];
let IonPopover = 
/**
 * @Component extends from @Directive
 * so by defining the inputs here we
 * do not need to re-define them for the
 * lazy loaded popover.
 */
class IonPopover {
    z;
    // TODO(FW-2827): type
    template;
    isCmpOpen = false;
    el;
    constructor(c, r, z) {
        this.z = z;
        this.el = r.nativeElement;
        this.el.addEventListener('ionMount', () => {
            this.isCmpOpen = true;
            c.detectChanges();
        });
        this.el.addEventListener('didDismiss', () => {
            this.isCmpOpen = false;
            c.detectChanges();
        });
        proxyOutputs(this, this.el, [
            'ionPopoverDidPresent',
            'ionPopoverWillPresent',
            'ionPopoverWillDismiss',
            'ionPopoverDidDismiss',
            'didPresent',
            'willPresent',
            'willDismiss',
            'didDismiss',
        ]);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPopover, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: IonPopover, selector: "ion-popover", inputs: { alignment: "alignment", animated: "animated", arrow: "arrow", keepContentsMounted: "keepContentsMounted", backdropDismiss: "backdropDismiss", cssClass: "cssClass", dismissOnSelect: "dismissOnSelect", enterAnimation: "enterAnimation", event: "event", focusTrap: "focusTrap", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", mode: "mode", showBackdrop: "showBackdrop", translucent: "translucent", trigger: "trigger", triggerAction: "triggerAction", reference: "reference", size: "size", side: "side" }, queries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }], ngImport: i0 });
};
IonPopover = __decorate([
    ProxyCmp({
        inputs: POPOVER_INPUTS,
        methods: POPOVER_METHODS,
    })
    /**
     * @Component extends from @Directive
     * so by defining the inputs here we
     * do not need to re-define them for the
     * lazy loaded popover.
     */
], IonPopover);
export { IonPopover };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPopover, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ion-popover',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: POPOVER_INPUTS,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: [TemplateRef, { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbW1vbi9zcmMvb3ZlcmxheXMvcG9wb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVMLFlBQVksRUFDWixTQUFTLEVBSVQsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBcUN4RCxNQUFNLGNBQWMsR0FBRztJQUNyQixXQUFXO0lBQ1gsVUFBVTtJQUNWLE9BQU87SUFDUCxxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLE9BQU87SUFDUCxXQUFXO0lBQ1gsUUFBUTtJQUNSLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsTUFBTTtJQUNOLGNBQWM7SUFDZCxhQUFhO0lBQ2IsU0FBUztJQUNULGVBQWU7SUFDZixXQUFXO0lBQ1gsTUFBTTtJQUNOLE1BQU07Q0FDUCxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztBQVloRixJQU9hLFVBQVU7QUFidkI7Ozs7O0dBS0c7QUFDSCxNQU9hLFVBQVU7SUFRc0M7SUFQM0Qsc0JBQXNCO0lBQ3dCLFFBQVEsQ0FBbUI7SUFFekUsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUVSLEVBQUUsQ0FBYztJQUUxQixZQUFZLENBQW9CLEVBQUUsQ0FBYSxFQUFZLENBQVM7UUFBVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQ2xFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUUxQixJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO1lBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUMxQixzQkFBc0I7WUFDdEIsdUJBQXVCO1lBQ3ZCLHVCQUF1QjtZQUN2QixzQkFBc0I7WUFDdEIsWUFBWTtZQUNaLGFBQWE7WUFDYixhQUFhO1lBQ2IsWUFBWTtTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7MkhBN0JVLFVBQVU7K0dBQVYsVUFBVSwybkJBRVAsV0FBVzs7QUFGZCxVQUFVO0lBakJ0QixRQUFRLENBQUM7UUFDUixNQUFNLEVBQUUsY0FBYztRQUN0QixPQUFPLEVBQUUsZUFBZTtLQUN6QixDQUFDO0lBQ0Y7Ozs7O09BS0c7R0FRVSxVQUFVLENBOEJ0QjtTQTlCWSxVQUFVOzRGQUFWLFVBQVU7a0JBUHRCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLHVFQUF1RTtvQkFDdkUsTUFBTSxFQUFFLGNBQWM7aUJBQ3ZCO3NKQUsrQyxRQUFRO3NCQUFyRCxZQUFZO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgTmdab25lLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudHMgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcblxuaW1wb3J0IHsgUHJveHlDbXAsIHByb3h5T3V0cHV0cyB9IGZyb20gJy4uL3V0aWxzL3Byb3h5JztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblBvcG92ZXIgZXh0ZW5kcyBDb21wb25lbnRzLklvblBvcG92ZXIge1xuICAvKipcbiAgICogRW1pdHRlZCBhZnRlciB0aGUgcG9wb3ZlciBoYXMgcHJlc2VudGVkLlxuICAgKi9cbiAgaW9uUG9wb3ZlckRpZFByZXNlbnQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudD47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGJlZm9yZSB0aGUgcG9wb3ZlciBoYXMgcHJlc2VudGVkLlxuICAgKi9cbiAgaW9uUG9wb3ZlcldpbGxQcmVzZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ+O1xuICAvKipcbiAgICogRW1pdHRlZCBhZnRlciB0aGUgcG9wb3ZlciBoYXMgZGlzbWlzc2VkLlxuICAgKi9cbiAgaW9uUG9wb3ZlcldpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ+O1xuICAvKipcbiAgICogRW1pdHRlZCBhZnRlciB0aGUgcG9wb3ZlciBoYXMgZGlzbWlzc2VkLlxuICAgKi9cbiAgaW9uUG9wb3ZlckRpZERpc21pc3M6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudD47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSBwb3BvdmVyIGhhcyBwcmVzZW50ZWQuIFNob3J0aGFuZCBmb3IgaW9uUG9wb3ZlckRpZFByZXNlbnQuXG4gICAqL1xuICBkaWRQcmVzZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ+O1xuICAvKipcbiAgICogRW1pdHRlZCBiZWZvcmUgdGhlIHBvcG92ZXIgaGFzIHByZXNlbnRlZC4gU2hvcnRoYW5kIGZvciBpb25Qb3BvdmVyV2lsbFByZXNlbnQuXG4gICAqL1xuICB3aWxsUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYWZ0ZXIgdGhlIHBvcG92ZXIgaGFzIHByZXNlbnRlZC4gU2hvcnRoYW5kIGZvciBpb25Qb3BvdmVyV2lsbERpc21pc3MuXG4gICAqL1xuICB3aWxsRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYWZ0ZXIgdGhlIHBvcG92ZXIgaGFzIGRpc21pc3NlZC4gU2hvcnRoYW5kIGZvciBpb25Qb3BvdmVyRGlkRGlzbWlzcy5cbiAgICovXG4gIGRpZERpc21pc3M6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudD47XG59XG5cbmNvbnN0IFBPUE9WRVJfSU5QVVRTID0gW1xuICAnYWxpZ25tZW50JyxcbiAgJ2FuaW1hdGVkJyxcbiAgJ2Fycm93JyxcbiAgJ2tlZXBDb250ZW50c01vdW50ZWQnLFxuICAnYmFja2Ryb3BEaXNtaXNzJyxcbiAgJ2Nzc0NsYXNzJyxcbiAgJ2Rpc21pc3NPblNlbGVjdCcsXG4gICdlbnRlckFuaW1hdGlvbicsXG4gICdldmVudCcsXG4gICdmb2N1c1RyYXAnLFxuICAnaXNPcGVuJyxcbiAgJ2tleWJvYXJkQ2xvc2UnLFxuICAnbGVhdmVBbmltYXRpb24nLFxuICAnbW9kZScsXG4gICdzaG93QmFja2Ryb3AnLFxuICAndHJhbnNsdWNlbnQnLFxuICAndHJpZ2dlcicsXG4gICd0cmlnZ2VyQWN0aW9uJyxcbiAgJ3JlZmVyZW5jZScsXG4gICdzaXplJyxcbiAgJ3NpZGUnLFxuXTtcblxuY29uc3QgUE9QT1ZFUl9NRVRIT0RTID0gWydwcmVzZW50JywgJ2Rpc21pc3MnLCAnb25EaWREaXNtaXNzJywgJ29uV2lsbERpc21pc3MnXTtcblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBQT1BPVkVSX0lOUFVUUyxcbiAgbWV0aG9kczogUE9QT1ZFUl9NRVRIT0RTLFxufSlcbi8qKlxuICogQENvbXBvbmVudCBleHRlbmRzIGZyb20gQERpcmVjdGl2ZVxuICogc28gYnkgZGVmaW5pbmcgdGhlIGlucHV0cyBoZXJlIHdlXG4gKiBkbyBub3QgbmVlZCB0byByZS1kZWZpbmUgdGhlbSBmb3IgdGhlXG4gKiBsYXp5IGxvYWRlZCBwb3BvdmVyLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpb24tcG9wb3ZlcicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogUE9QT1ZFUl9JTlBVVFMsXG59KVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBJb25Qb3BvdmVyIHtcbiAgLy8gVE9ETyhGVy0yODI3KTogdHlwZVxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogZmFsc2UgfSkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgaXNDbXBPcGVuID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lvbk1vdW50JywgKCkgPT4ge1xuICAgICAgdGhpcy5pc0NtcE9wZW4gPSB0cnVlO1xuICAgICAgYy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdkaWREaXNtaXNzJywgKCkgPT4ge1xuICAgICAgdGhpcy5pc0NtcE9wZW4gPSBmYWxzZTtcbiAgICAgIGMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbXG4gICAgICAnaW9uUG9wb3ZlckRpZFByZXNlbnQnLFxuICAgICAgJ2lvblBvcG92ZXJXaWxsUHJlc2VudCcsXG4gICAgICAnaW9uUG9wb3ZlcldpbGxEaXNtaXNzJyxcbiAgICAgICdpb25Qb3BvdmVyRGlkRGlzbWlzcycsXG4gICAgICAnZGlkUHJlc2VudCcsXG4gICAgICAnd2lsbFByZXNlbnQnLFxuICAgICAgJ3dpbGxEaXNtaXNzJyxcbiAgICAgICdkaWREaXNtaXNzJyxcbiAgICBdKTtcbiAgfVxufVxuIl19