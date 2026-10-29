export declare const addEventListener: (el: any, // TODO(FW-2832): type
eventName: string, callback: EventListenerOrEventListenerObject, opts: {
    passive?: boolean;
    capture?: boolean;
}) => (() => void);
