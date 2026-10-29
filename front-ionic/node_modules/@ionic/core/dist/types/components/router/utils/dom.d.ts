import type { AnimationBuilder } from '../../../interface';
import type { NavOutletElement, RouteChain, RouteID, RouterDirection } from './interface';
/**
 * Activates the passed route chain.
 *
 * There must be exactly one outlet per route entry in the chain.
 *
 * The methods calls setRouteId on each of the outlet with the corresponding route entry in the chain.
 * setRouteId will create or select the view in the outlet.
 */
export declare const writeNavState: (root: HTMLElement | undefined, chain: RouteChain, direction: RouterDirection, index: number, changed?: boolean, animation?: AnimationBuilder) => Promise<boolean>;
/**
 * Recursively walks the outlet in the DOM.
 *
 * The function returns a list of RouteID corresponding to each of the outlet and the last outlet without a RouteID.
 */
export declare const readNavState: (root: HTMLElement | undefined) => Promise<{
    ids: RouteID[];
    outlet: NavOutletElement | undefined;
}>;
/**
 * Scrolls to the element whose id matches `fragment`, falling back to a legacy
 * `<a name="...">` target. When the target lives inside an `ion-content`, the
 * scroll uses its smooth-animated scroll API; otherwise it falls back to
 * `Element.scrollIntoView`.
 *
 * `shouldContinue` lets callers cancel in-flight scrolls when a newer
 * navigation supersedes this one. It is checked between async steps.
 */
export declare const scrollToFragment: (fragment: string | undefined, shouldContinue?: () => boolean) => Promise<boolean>;
export declare const waitUntilNavNode: () => Promise<void>;
