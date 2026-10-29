import type { PopoverSize, PositionAlign, PositionReference, PositionSide, TriggerAction } from './popover-interface';
export interface ReferenceCoordinates {
    top: number;
    left: number;
    width: number;
    height: number;
}
interface PopoverPosition {
    top: number;
    left: number;
    referenceCoordinates?: ReferenceCoordinates;
    arrowTop?: number;
    arrowLeft?: number;
    originX: string;
    originY: string;
}
export interface PopoverStyles {
    top: number;
    left: number;
    bottom?: number;
    originX: string;
    originY: string;
    checkSafeAreaLeft: boolean;
    checkSafeAreaRight: boolean;
    checkSafeAreaTop: boolean;
    checkSafeAreaBottom: boolean;
    arrowTop: number;
    arrowLeft: number;
    addPopoverBottomClass: boolean;
    hideArrow: boolean;
}
export interface SafeAreaInsets {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
/**
 * Resolves the current --ion-safe-area-* CSS custom property values
 * to actual pixel numbers. A temporary element is needed because
 * getComputedStyle on :root returns the declared value of custom
 * properties (e.g. "env(safe-area-inset-top)") rather than a
 * resolved number. By assigning them to standard padding properties,
 * the browser resolves the value.
 *
 * Results are cached for the current frame to avoid repeated reflows.
 */
export declare const getSafeAreaInsets: (doc: Document) => SafeAreaInsets;
/**
 * Returns the dimensions of the popover
 * arrow on `ios` mode. If arrow is disabled
 * returns (0, 0).
 */
export declare const getArrowDimensions: (arrowEl: HTMLElement | null) => {
    arrowWidth: number;
    arrowHeight: number;
};
/**
 * Returns the recommended dimensions of the popover
 * that takes into account whether or not the width
 * should match the trigger width.
 */
export declare const getPopoverDimensions: (size: PopoverSize, contentEl: HTMLElement, triggerEl?: HTMLElement) => {
    contentWidth: number;
    contentHeight: number;
};
export declare const configureDismissInteraction: (triggerEl: HTMLElement, triggerAction: TriggerAction, popoverEl: HTMLIonPopoverElement, parentPopoverEl: HTMLIonPopoverElement) => () => void;
/**
 * Configures the triggerEl to respond
 * to user interaction based upon the triggerAction
 * prop that devs have defined.
 */
export declare const configureTriggerInteraction: (triggerEl: HTMLElement, triggerAction: TriggerAction, popoverEl: HTMLIonPopoverElement) => () => void;
/**
 * Returns the index of an ion-item in an array of ion-items.
 */
export declare const getIndexOfItem: (items: HTMLIonItemElement[], item: HTMLElement | null) => number;
/**
 * Given an array of elements and a currently focused ion-item
 * returns the next ion-item relative to the focused one or
 * undefined.
 */
export declare const getNextItem: (items: HTMLIonItemElement[], currentItem: HTMLElement | null) => HTMLIonItemElement;
/**
 * Given an array of elements and a currently focused ion-item
 * returns the previous ion-item relative to the focused one or
 * undefined.
 */
export declare const getPrevItem: (items: HTMLIonItemElement[], currentItem: HTMLElement | null) => HTMLIonItemElement;
/**
 * Returns `true` if `el` has been designated
 * as a trigger element for an ion-popover.
 */
export declare const isTriggerElement: (el: HTMLElement) => boolean;
export declare const configureKeyboardInteraction: (popoverEl: HTMLIonPopoverElement) => () => void;
/**
 * Positions a popover by taking into account
 * the reference point, preferred side, alignment
 * and viewport dimensions.
 */
export declare const getPopoverPosition: (isRTL: boolean, contentWidth: number, contentHeight: number, arrowWidth: number, arrowHeight: number, reference: PositionReference, side: PositionSide, align: PositionAlign, defaultPosition: PopoverPosition, triggerEl?: HTMLElement, event?: MouseEvent | CustomEvent) => PopoverPosition;
/**
 * Adjusts popover positioning coordinates
 * such that popover does not appear offscreen
 * or overlapping safe area bounds.
 *
 * @internal - This is not part of the public API.
 */
export declare const calculateWindowAdjustment: (side: PositionSide, coordTop: number, coordLeft: number, bodyPadding: number, bodyWidth: number, bodyHeight: number, contentWidth: number, contentHeight: number, safeArea: SafeAreaInsets, contentOriginX: string, contentOriginY: string, triggerCoordinates?: ReferenceCoordinates, coordArrowTop?: number, coordArrowLeft?: number, arrowHeight?: number) => PopoverStyles;
export declare const shouldShowArrow: (side: PositionSide, didAdjustBounds?: boolean, ev?: Event, trigger?: HTMLElement) => boolean;
export {};
