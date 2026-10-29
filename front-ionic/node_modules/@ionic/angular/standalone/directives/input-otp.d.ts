import { ChangeDetectorRef, ElementRef, EventEmitter, Injector, NgZone } from '@angular/core';
import { ValueAccessor } from '@ionic/angular/common';
import type { InputOtpInputEventDetail as IIonInputOtpInputEventDetail, InputOtpChangeEventDetail as IIonInputOtpChangeEventDetail, InputOtpCompleteEventDetail as IIonInputOtpCompleteEventDetail, Components } from '@ionic/core/components';
import * as i0 from "@angular/core";
export declare class IonInputOtp extends ValueAccessor {
    protected z: NgZone;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone, injector: Injector);
    handleIonInput(el: HTMLIonInputOtpElement): void;
    registerOnChange(fn: (_: any) => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IonInputOtp, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IonInputOtp, "ion-input-otp", never, { "autocapitalize": { "alias": "autocapitalize"; "required": false; }; "color": { "alias": "color"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "fill": { "alias": "fill"; "required": false; }; "inputmode": { "alias": "inputmode"; "required": false; }; "length": { "alias": "length"; "required": false; }; "pattern": { "alias": "pattern"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "separators": { "alias": "separators"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; "size": { "alias": "size"; "required": false; }; "type": { "alias": "type"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, ["*"], true, never>;
}
export declare interface IonInputOtp extends Components.IonInputOtp {
    /**
     * The `ionInput` event is fired each time the user modifies the input's value.
     * Unlike the `ionChange` event, the `ionInput` event is fired for each alteration
     * to the input's value. This typically happens for each keystroke as the user types.
     *
     * For elements that accept text input (`type=text`, `type=tel`, etc.), the interface
     * is [`InputEvent`](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent); for others,
     * the interface is [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event). If
     * the input is cleared on edit, the type is `null`.
     */
    ionInput: EventEmitter<CustomEvent<IIonInputOtpInputEventDetail>>;
    /**
     * The `ionChange` event is fired when the user modifies the input's value.
     * Unlike the `ionInput` event, the `ionChange` event is only fired when changes
     * are committed, not as the user types.
     *
     * The `ionChange` event fires when the `<ion-input-otp>` component loses
     * focus after its value has changed.
     *
     * This event will not emit when programmatically setting the `value` property.
     */
    ionChange: EventEmitter<CustomEvent<IIonInputOtpChangeEventDetail>>;
    /**
     * Emitted when all input boxes have been filled with valid values.
     */
    ionComplete: EventEmitter<CustomEvent<IIonInputOtpCompleteEventDetail>>;
    /**
     * Emitted when the input group loses focus.
     */
    ionBlur: EventEmitter<CustomEvent<FocusEvent>>;
    /**
     * Emitted when the input group has focus.
     */
    ionFocus: EventEmitter<CustomEvent<FocusEvent>>;
}
