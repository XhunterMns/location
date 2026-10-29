import type { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import type { AnimationBuilder, FrameworkDelegate, OverlayInterface } from '../../interface';
import type { OverlayEventDetail } from '../../utils/overlays-interface';
import type { ActionSheetButton } from './action-sheet-interface';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export declare class ActionSheet implements ComponentInterface, OverlayInterface {
    private readonly delegateController;
    private readonly lockController;
    private readonly triggerController;
    private wrapperEl?;
    private groupEl?;
    private gesture?;
    private hasRadioButtons;
    presented: boolean;
    lastFocus?: HTMLElement;
    animation?: any;
    /**
     * The ID of the currently active/selected radio button.
     * Used for keyboard navigation and ARIA attributes.
     */
    activeRadioId?: string;
    el: HTMLIonActionSheetElement;
    /** @internal */
    overlayIndex: number;
    /** @internal */
    delegate?: FrameworkDelegate;
    /** @internal */
    hasController: boolean;
    /**
     * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
     */
    keyboardClose: boolean;
    /**
     * Animation to use when the action sheet is presented.
     */
    enterAnimation?: AnimationBuilder;
    /**
     * Animation to use when the action sheet is dismissed.
     */
    leaveAnimation?: AnimationBuilder;
    /**
     * An array of buttons for the action sheet.
     */
    buttons: (ActionSheetButton | string)[];
    buttonsChanged(): void;
    /**
     * Additional classes to apply for custom CSS. If multiple classes are
     * provided they should be separated by spaces.
     */
    cssClass?: string | string[];
    /**
     * If `true`, the action sheet will be dismissed when the backdrop is clicked.
     */
    backdropDismiss: boolean;
    /**
     * Title for the action sheet.
     */
    header?: string;
    /**
     * Subtitle for the action sheet.
     */
    subHeader?: string;
    /**
     * If `true`, the action sheet will be translucent.
     * Only applies when the mode is `"ios"` and the device supports
     * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
     */
    translucent: boolean;
    /**
     * If `true`, the action sheet will animate.
     */
    animated: boolean;
    /**
     * Additional attributes to pass to the action sheet.
     */
    htmlAttributes?: {
        [key: string]: any;
    };
    /**
     * If `true`, the action sheet will open. If `false`, the action sheet will close.
     * Use this if you need finer grained control over presentation, otherwise
     * just use the actionSheetController or the `trigger` property.
     * Note: `isOpen` will not automatically be set back to `false` when
     * the action sheet dismisses. You will need to do that in your code.
     */
    isOpen: boolean;
    onIsOpenChange(newValue: boolean, oldValue: boolean): void;
    /**
     * An ID corresponding to the trigger element that
     * causes the action sheet to open when clicked.
     */
    trigger: string | undefined;
    triggerChanged(): void;
    /**
     * Emitted after the action sheet has presented.
     */
    didPresent: EventEmitter<void>;
    /**
     * Emitted before the action sheet has presented.
     */
    willPresent: EventEmitter<void>;
    /**
     * Emitted before the action sheet has dismissed.
     */
    willDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the action sheet has dismissed.
     */
    didDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the action sheet has presented.
     * Shorthand for ionActionSheetWillDismiss.
     */
    didPresentShorthand: EventEmitter<void>;
    /**
     * Emitted before the action sheet has presented.
     * Shorthand for ionActionSheetWillPresent.
     */
    willPresentShorthand: EventEmitter<void>;
    /**
     * Emitted before the action sheet has dismissed.
     * Shorthand for ionActionSheetWillDismiss.
     */
    willDismissShorthand: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the action sheet has dismissed.
     * Shorthand for ionActionSheetDidDismiss.
     */
    didDismissShorthand: EventEmitter<OverlayEventDetail>;
    /**
     * Present the action sheet overlay after it has been created.
     */
    present(): Promise<void>;
    /**
     * Dismiss the action sheet overlay after it has been presented.
     * This is a no-op if the overlay has not been presented yet. If you want
     * to remove an overlay from the DOM that was never presented, use the
     * [remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the action sheet.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the action sheet. Some examples include:
     * `"cancel"`, `"destructive"`, `"selected"`, and `"backdrop"`.
     */
    dismiss(data?: any, role?: string): Promise<boolean>;
    /**
     * Returns a promise that resolves when the action sheet did dismiss.
     */
    onDidDismiss<T = any>(): Promise<OverlayEventDetail<T>>;
    /**
     * Returns a promise that resolves when the action sheet will dismiss.
     *
     */
    onWillDismiss<T = any>(): Promise<OverlayEventDetail<T>>;
    private buttonClick;
    private callButtonHandler;
    /**
     * Get all buttons regardless of role.
     */
    private getButtons;
    /**
     * Get all radio buttons (buttons with role="radio").
     */
    private getRadioButtons;
    /**
     * Handle radio button selection and update aria-checked state.
     *
     * @param button The radio button that was selected.
     */
    private selectRadioButton;
    /**
     * Get or generate an ID for a button.
     *
     * @param button The button for which to get the ID.
     * @param index Optional index of the button in the buttons array.
     * @returns The ID of the button.
     */
    private getButtonId;
    private onBackdropTap;
    private dispatchCancelHandler;
    /**
     * When the action sheet has radio buttons, we want to follow the
     * keyboard navigation pattern for radio groups:
     * - Arrow Down/Right: Move to the next radio button (wrap to first if at end)
     * - Arrow Up/Left: Move to the previous radio button (wrap to last if at start)
     * - Space/Enter: Select the focused radio button and trigger its handler
     */
    onKeydown(ev: KeyboardEvent): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private renderActionSheetButtons;
    render(): any;
}
