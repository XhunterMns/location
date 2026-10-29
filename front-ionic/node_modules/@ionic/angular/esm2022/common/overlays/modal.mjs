import { __decorate } from "tslib";
import { ContentChild, Directive, TemplateRef, } from '@angular/core';
import { ProxyCmp, proxyOutputs } from '../utils/proxy';
import * as i0 from "@angular/core";
const MODAL_INPUTS = [
    'animated',
    'keepContentsMounted',
    'backdropBreakpoint',
    'backdropDismiss',
    'breakpoints',
    'canDismiss',
    'cssClass',
    'enterAnimation',
    'expandToScroll',
    'event',
    'focusTrap',
    'handle',
    'handleBehavior',
    'initialBreakpoint',
    'isOpen',
    'keyboardClose',
    'leaveAnimation',
    'mode',
    'presentingElement',
    'showBackdrop',
    'translucent',
    'trigger',
];
const MODAL_METHODS = [
    'present',
    'dismiss',
    'onDidDismiss',
    'onWillDismiss',
    'setCurrentBreakpoint',
    'getCurrentBreakpoint',
];
let IonModal = 
/**
 * @Component extends from @Directive
 * so by defining the inputs here we
 * do not need to re-define them for the
 * lazy loaded popover.
 */
class IonModal {
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
            'ionModalDidPresent',
            'ionModalWillPresent',
            'ionModalWillDismiss',
            'ionModalDidDismiss',
            'ionBreakpointDidChange',
            'didPresent',
            'willPresent',
            'willDismiss',
            'didDismiss',
            'ionDragStart',
            'ionDragMove',
            'ionDragEnd',
        ]);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonModal, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: IonModal, selector: "ion-modal", inputs: { animated: "animated", keepContentsMounted: "keepContentsMounted", backdropBreakpoint: "backdropBreakpoint", backdropDismiss: "backdropDismiss", breakpoints: "breakpoints", canDismiss: "canDismiss", cssClass: "cssClass", enterAnimation: "enterAnimation", expandToScroll: "expandToScroll", event: "event", focusTrap: "focusTrap", handle: "handle", handleBehavior: "handleBehavior", initialBreakpoint: "initialBreakpoint", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", mode: "mode", presentingElement: "presentingElement", showBackdrop: "showBackdrop", translucent: "translucent", trigger: "trigger" }, queries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }], ngImport: i0 });
};
IonModal = __decorate([
    ProxyCmp({
        inputs: MODAL_INPUTS,
        methods: MODAL_METHODS,
    })
    /**
     * @Component extends from @Directive
     * so by defining the inputs here we
     * do not need to re-define them for the
     * lazy loaded popover.
     */
], IonModal);
export { IonModal };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonModal, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ion-modal',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: MODAL_INPUTS,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: [TemplateRef, { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21tb24vc3JjL292ZXJsYXlzL21vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBRUwsWUFBWSxFQUNaLFNBQVMsRUFJVCxXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFxRHhELE1BQU0sWUFBWSxHQUFHO0lBQ25CLFVBQVU7SUFDVixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsWUFBWTtJQUNaLFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLE9BQU87SUFDUCxXQUFXO0lBQ1gsUUFBUTtJQUNSLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsUUFBUTtJQUNSLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsTUFBTTtJQUNOLG1CQUFtQjtJQUNuQixjQUFjO0lBQ2QsYUFBYTtJQUNiLFNBQVM7Q0FDVixDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUc7SUFDcEIsU0FBUztJQUNULFNBQVM7SUFDVCxjQUFjO0lBQ2QsZUFBZTtJQUNmLHNCQUFzQjtJQUN0QixzQkFBc0I7Q0FDdkIsQ0FBQztBQVlGLElBT2EsUUFBUTtBQWJyQjs7Ozs7R0FLRztBQUNILE1BT2EsUUFBUTtJQVF3QztJQVAzRCxzQkFBc0I7SUFDd0IsUUFBUSxDQUFtQjtJQUV6RSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBRVIsRUFBRSxDQUFjO0lBRTFCLFlBQVksQ0FBb0IsRUFBRSxDQUFhLEVBQVksQ0FBUztRQUFULE1BQUMsR0FBRCxDQUFDLENBQVE7UUFDbEUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBRTFCLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtZQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQzFCLG9CQUFvQjtZQUNwQixxQkFBcUI7WUFDckIscUJBQXFCO1lBQ3JCLG9CQUFvQjtZQUNwQix3QkFBd0I7WUFDeEIsWUFBWTtZQUNaLGFBQWE7WUFDYixhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7WUFDZCxhQUFhO1lBQ2IsWUFBWTtTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7MkhBakNVLFFBQVE7K0dBQVIsUUFBUSwrdEJBRUwsV0FBVzs7QUFGZCxRQUFRO0lBakJwQixRQUFRLENBQUM7UUFDUixNQUFNLEVBQUUsWUFBWTtRQUNwQixPQUFPLEVBQUUsYUFBYTtLQUN2QixDQUFDO0lBQ0Y7Ozs7O09BS0c7R0FRVSxRQUFRLENBa0NwQjtTQWxDWSxRQUFROzRGQUFSLFFBQVE7a0JBUHBCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLHVFQUF1RTtvQkFDdkUsTUFBTSxFQUFFLFlBQVk7aUJBQ3JCO3NKQUsrQyxRQUFRO3NCQUFyRCxZQUFZO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgTmdab25lLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudHMsIE1vZGFsQnJlYWtwb2ludENoYW5nZUV2ZW50RGV0YWlsLCBNb2RhbERyYWdFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlL2NvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBQcm94eUNtcCwgcHJveHlPdXRwdXRzIH0gZnJvbSAnLi4vdXRpbHMvcHJveHknO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uTW9kYWwgZXh0ZW5kcyBDb21wb25lbnRzLklvbk1vZGFsIHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYWZ0ZXIgdGhlIG1vZGFsIGhhcyBwcmVzZW50ZWQuXG4gICAqKi9cbiAgaW9uTW9kYWxEaWRQcmVzZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ+O1xuICAvKipcbiAgICogRW1pdHRlZCBiZWZvcmUgdGhlIG1vZGFsIGhhcyBwcmVzZW50ZWQuXG4gICAqL1xuICBpb25Nb2RhbFdpbGxQcmVzZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ+O1xuICAvKipcbiAgICogRW1pdHRlZCBiZWZvcmUgdGhlIG1vZGFsIGhhcyBkaXNtaXNzZWQuXG4gICAqL1xuICBpb25Nb2RhbFdpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ+O1xuICAvKipcbiAgICogRW1pdHRlZCBhZnRlciB0aGUgbW9kYWwgaGFzIGRpc21pc3NlZC5cbiAgICovXG4gIGlvbk1vZGFsRGlkRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYWZ0ZXIgdGhlIG1vZGFsIGJyZWFrcG9pbnQgaGFzIGNoYW5nZWQuXG4gICAqL1xuICBpb25CcmVha3BvaW50RGlkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8TW9kYWxCcmVha3BvaW50Q2hhbmdlRXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgc2hlZXQgb3IgY2FyZCBtb2RhbCBoYXMgc3RhcnRlZCBiZWluZyBkcmFnZ2VkLlxuICAgKi9cbiAgaW9uRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoaWxlIHRoZSBzaGVldCBvciBjYXJkIG1vZGFsIGlzIGJlaW5nIGRyYWdnZWQuXG4gICAqL1xuICBpb25EcmFnTW92ZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PE1vZGFsRHJhZ0V2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHNoZWV0IG9yIGNhcmQgbW9kYWwgaGFzIGZpbmlzaGVkIGJlaW5nIGRyYWdnZWQuXG4gICAqL1xuICBpb25EcmFnRW5kOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8TW9kYWxEcmFnRXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYWZ0ZXIgdGhlIG1vZGFsIGhhcyBwcmVzZW50ZWQuIFNob3J0aGFuZCBmb3IgaW9uTW9kYWxEaWRQcmVzZW50LlxuICAgKi9cbiAgZGlkUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSBtb2RhbCBoYXMgcHJlc2VudGVkLiBTaG9ydGhhbmQgZm9yIGlvbk1vZGFsV2lsbFByZXNlbnQuXG4gICAqL1xuICB3aWxsUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSBtb2RhbCBoYXMgZGlzbWlzc2VkLiBTaG9ydGhhbmQgZm9yIGlvbk1vZGFsV2lsbERpc21pc3MuXG4gICAqL1xuICB3aWxsRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYWZ0ZXIgdGhlIG1vZGFsIGhhcyBkaXNtaXNzZWQuIFNob3J0aGFuZCBmb3IgaW9uTW9kYWxEaWREaXNtaXNzLlxuICAgKi9cbiAgZGlkRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50Pjtcbn1cblxuY29uc3QgTU9EQUxfSU5QVVRTID0gW1xuICAnYW5pbWF0ZWQnLFxuICAna2VlcENvbnRlbnRzTW91bnRlZCcsXG4gICdiYWNrZHJvcEJyZWFrcG9pbnQnLFxuICAnYmFja2Ryb3BEaXNtaXNzJyxcbiAgJ2JyZWFrcG9pbnRzJyxcbiAgJ2NhbkRpc21pc3MnLFxuICAnY3NzQ2xhc3MnLFxuICAnZW50ZXJBbmltYXRpb24nLFxuICAnZXhwYW5kVG9TY3JvbGwnLFxuICAnZXZlbnQnLFxuICAnZm9jdXNUcmFwJyxcbiAgJ2hhbmRsZScsXG4gICdoYW5kbGVCZWhhdmlvcicsXG4gICdpbml0aWFsQnJlYWtwb2ludCcsXG4gICdpc09wZW4nLFxuICAna2V5Ym9hcmRDbG9zZScsXG4gICdsZWF2ZUFuaW1hdGlvbicsXG4gICdtb2RlJyxcbiAgJ3ByZXNlbnRpbmdFbGVtZW50JyxcbiAgJ3Nob3dCYWNrZHJvcCcsXG4gICd0cmFuc2x1Y2VudCcsXG4gICd0cmlnZ2VyJyxcbl07XG5cbmNvbnN0IE1PREFMX01FVEhPRFMgPSBbXG4gICdwcmVzZW50JyxcbiAgJ2Rpc21pc3MnLFxuICAnb25EaWREaXNtaXNzJyxcbiAgJ29uV2lsbERpc21pc3MnLFxuICAnc2V0Q3VycmVudEJyZWFrcG9pbnQnLFxuICAnZ2V0Q3VycmVudEJyZWFrcG9pbnQnLFxuXTtcblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBNT0RBTF9JTlBVVFMsXG4gIG1ldGhvZHM6IE1PREFMX01FVEhPRFMsXG59KVxuLyoqXG4gKiBAQ29tcG9uZW50IGV4dGVuZHMgZnJvbSBARGlyZWN0aXZlXG4gKiBzbyBieSBkZWZpbmluZyB0aGUgaW5wdXRzIGhlcmUgd2VcbiAqIGRvIG5vdCBuZWVkIHRvIHJlLWRlZmluZSB0aGVtIGZvciB0aGVcbiAqIGxhenkgbG9hZGVkIHBvcG92ZXIuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lvbi1tb2RhbCcsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogTU9EQUxfSU5QVVRTLFxufSlcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgSW9uTW9kYWwge1xuICAvLyBUT0RPKEZXLTI4MjcpOiB0eXBlXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBpc0NtcE9wZW4gPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgZWw6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignaW9uTW91bnQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmlzQ21wT3BlbiA9IHRydWU7XG4gICAgICBjLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2RpZERpc21pc3MnLCAoKSA9PiB7XG4gICAgICB0aGlzLmlzQ21wT3BlbiA9IGZhbHNlO1xuICAgICAgYy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFtcbiAgICAgICdpb25Nb2RhbERpZFByZXNlbnQnLFxuICAgICAgJ2lvbk1vZGFsV2lsbFByZXNlbnQnLFxuICAgICAgJ2lvbk1vZGFsV2lsbERpc21pc3MnLFxuICAgICAgJ2lvbk1vZGFsRGlkRGlzbWlzcycsXG4gICAgICAnaW9uQnJlYWtwb2ludERpZENoYW5nZScsXG4gICAgICAnZGlkUHJlc2VudCcsXG4gICAgICAnd2lsbFByZXNlbnQnLFxuICAgICAgJ3dpbGxEaXNtaXNzJyxcbiAgICAgICdkaWREaXNtaXNzJyxcbiAgICAgICdpb25EcmFnU3RhcnQnLFxuICAgICAgJ2lvbkRyYWdNb3ZlJyxcbiAgICAgICdpb25EcmFnRW5kJyxcbiAgICBdKTtcbiAgfVxufVxuIl19