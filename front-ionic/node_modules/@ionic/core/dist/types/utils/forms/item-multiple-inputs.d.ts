/**
 * `item-multiple-inputs` is toggled on the item after its form controls render,
 * so a control whose focus styling depends on it needs to re-render when it flips.
 *
 * @internal
 * @param el The form control whose closest `ion-item` should be observed.
 * @param onChange Called whenever one of `classNames` is added or removed.
 * @param classNames The item classes the caller's rendering depends on. A caller
 * reading more than one must list them all, or changes to the rest are ignored.
 * @returns The observer to disconnect in `disconnectedCallback`, or `undefined`
 * if it could not be created.
 */
export declare const createItemMultipleInputsObserver: (el: HTMLElement, onChange: () => void, classNames?: string[]) => MutationObserver | undefined;
