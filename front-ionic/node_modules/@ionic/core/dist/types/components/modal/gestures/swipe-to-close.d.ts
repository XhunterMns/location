import type { Animation, ModalDragEventDetail } from '../../../interface';
import type { Style as StatusBarStyle } from '../../../utils/native/status-bar';
export declare const SwipeToCloseDefaults: {
    MIN_PRESENTING_SCALE: number;
};
export declare const createSwipeToCloseGesture: (el: HTMLIonModalElement, animation: Animation, statusBarStyle: StatusBarStyle, onDismiss: () => void, onDragStart: () => void, onDragMove: (detail: ModalDragEventDetail) => void, onDragEnd: (detail: ModalDragEventDetail) => void) => import("@utils/gesture").Gesture;
