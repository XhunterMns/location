/**
 * @description
 * NavParams are an object that exists on a page and can contain data for that particular view.
 * Similar to how data was pass to a view in V1 with `$stateParams`, NavParams offer a much more flexible
 * option with a simple `get` method.
 *
 * @usage
 * ```ts
 * import { NavParams } from '@ionic/angular';
 *
 * export class MyClass{
 *
 *  constructor(navParams: NavParams){
 *    // userParams is an object we have in our nav-parameters
 *    navParams.get('userParams');
 *  }
 *
 * }
 * ```
 */
export class NavParams {
    data;
    constructor(data = {}) {
        this.data = data;
        console.warn(`[Ionic Warning]: NavParams has been deprecated in favor of using Angular's input API. Developers should migrate to either the @Input decorator or the Signals-based input API.`);
    }
    /**
     * Get the value of a nav-parameter for the current view
     *
     * ```ts
     * import { NavParams } from 'ionic-angular';
     *
     * export class MyClass{
     *  constructor(public navParams: NavParams){
     *    // userParams is an object we have in our nav-parameters
     *    this.navParams.get('userParams');
     *  }
     * }
     * ```
     *
     * @param param Which param you want to look up
     */
    get(param) {
        return this.data[param];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LXBhcmFtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvbW1vbi9zcmMvZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL25hdi1wYXJhbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLE9BQU8sU0FBUztJQUNEO0lBQW5CLFlBQW1CLE9BQStCLEVBQUU7UUFBakMsU0FBSSxHQUFKLElBQUksQ0FBNkI7UUFDbEQsT0FBTyxDQUFDLElBQUksQ0FDVixnTEFBZ0wsQ0FDakwsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxHQUFHLENBQVUsS0FBYTtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIE5hdlBhcmFtcyBhcmUgYW4gb2JqZWN0IHRoYXQgZXhpc3RzIG9uIGEgcGFnZSBhbmQgY2FuIGNvbnRhaW4gZGF0YSBmb3IgdGhhdCBwYXJ0aWN1bGFyIHZpZXcuXG4gKiBTaW1pbGFyIHRvIGhvdyBkYXRhIHdhcyBwYXNzIHRvIGEgdmlldyBpbiBWMSB3aXRoIGAkc3RhdGVQYXJhbXNgLCBOYXZQYXJhbXMgb2ZmZXIgYSBtdWNoIG1vcmUgZmxleGlibGVcbiAqIG9wdGlvbiB3aXRoIGEgc2ltcGxlIGBnZXRgIG1ldGhvZC5cbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBOYXZQYXJhbXMgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG4gKlxuICogZXhwb3J0IGNsYXNzIE15Q2xhc3N7XG4gKlxuICogIGNvbnN0cnVjdG9yKG5hdlBhcmFtczogTmF2UGFyYW1zKXtcbiAqICAgIC8vIHVzZXJQYXJhbXMgaXMgYW4gb2JqZWN0IHdlIGhhdmUgaW4gb3VyIG5hdi1wYXJhbWV0ZXJzXG4gKiAgICBuYXZQYXJhbXMuZ2V0KCd1c2VyUGFyYW1zJyk7XG4gKiAgfVxuICpcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgTmF2UGFyYW1zIHtcbiAgY29uc3RydWN0b3IocHVibGljIGRhdGE6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fSkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBbSW9uaWMgV2FybmluZ106IE5hdlBhcmFtcyBoYXMgYmVlbiBkZXByZWNhdGVkIGluIGZhdm9yIG9mIHVzaW5nIEFuZ3VsYXIncyBpbnB1dCBBUEkuIERldmVsb3BlcnMgc2hvdWxkIG1pZ3JhdGUgdG8gZWl0aGVyIHRoZSBASW5wdXQgZGVjb3JhdG9yIG9yIHRoZSBTaWduYWxzLWJhc2VkIGlucHV0IEFQSS5gXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIGEgbmF2LXBhcmFtZXRlciBmb3IgdGhlIGN1cnJlbnQgdmlld1xuICAgKlxuICAgKiBgYGB0c1xuICAgKiBpbXBvcnQgeyBOYXZQYXJhbXMgfSBmcm9tICdpb25pYy1hbmd1bGFyJztcbiAgICpcbiAgICogZXhwb3J0IGNsYXNzIE15Q2xhc3N7XG4gICAqICBjb25zdHJ1Y3RvcihwdWJsaWMgbmF2UGFyYW1zOiBOYXZQYXJhbXMpe1xuICAgKiAgICAvLyB1c2VyUGFyYW1zIGlzIGFuIG9iamVjdCB3ZSBoYXZlIGluIG91ciBuYXYtcGFyYW1ldGVyc1xuICAgKiAgICB0aGlzLm5hdlBhcmFtcy5nZXQoJ3VzZXJQYXJhbXMnKTtcbiAgICogIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHBhcmFtIFdoaWNoIHBhcmFtIHlvdSB3YW50IHRvIGxvb2sgdXBcbiAgICovXG4gIGdldDxUID0gYW55PihwYXJhbTogc3RyaW5nKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVtwYXJhbV07XG4gIH1cbn1cbiJdfQ==