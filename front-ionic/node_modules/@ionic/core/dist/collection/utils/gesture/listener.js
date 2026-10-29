/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
export const addEventListener = (el, // TODO(FW-2832): type
eventName, callback, opts) => {
    const listenerOpts = {
        capture: !!opts.capture,
        passive: !!opts.passive,
    };
    let add;
    let remove;
    if (el['__zone_symbol__addEventListener']) {
        add = '__zone_symbol__addEventListener';
        remove = '__zone_symbol__removeEventListener';
    }
    else {
        add = 'addEventListener';
        remove = 'removeEventListener';
    }
    el[add](eventName, callback, listenerOpts);
    return () => {
        el[remove](eventName, callback, listenerOpts);
    };
};
