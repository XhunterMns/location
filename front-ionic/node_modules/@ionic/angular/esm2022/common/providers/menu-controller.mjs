export class MenuController {
    menuController;
    constructor(menuController) {
        this.menuController = menuController;
    }
    /**
     * Programmatically open the Menu.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return returns a promise when the menu is fully opened
     */
    open(menuId) {
        return this.menuController.open(menuId);
    }
    /**
     * Programmatically close the Menu. If no `menuId` is given as the first
     * argument then it'll close any menu which is open. If a `menuId`
     * is given then it'll close that exact menu.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return returns a promise when the menu is fully closed
     */
    close(menuId) {
        return this.menuController.close(menuId);
    }
    /**
     * Toggle the menu. If it's closed, it will open, and if opened, it
     * will close.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return returns a promise when the menu has been toggled
     */
    toggle(menuId) {
        return this.menuController.toggle(menuId);
    }
    /**
     * Used to enable or disable a menu. For example, there could be multiple
     * left menus, but only one of them should be able to be opened at the same
     * time. If there are multiple menus on the same side, then enabling one menu
     * will also automatically disable all the others that are on the same side.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return Returns the instance of the menu, which is useful for chaining.
     */
    enable(shouldEnable, menuId) {
        return this.menuController.enable(shouldEnable, menuId);
    }
    /**
     * Used to enable or disable the ability to swipe open the menu.
     * @param shouldEnable  True if it should be swipe-able, false if not.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return Returns the instance of the menu, which is useful for chaining.
     */
    swipeGesture(shouldEnable, menuId) {
        return this.menuController.swipeGesture(shouldEnable, menuId);
    }
    /**
     * @param [menuId] Optionally get the menu by its id, or side.
     * @return Returns true if the specified menu is currently open, otherwise false.
     * If the menuId is not specified, it returns true if ANY menu is currenly open.
     */
    isOpen(menuId) {
        return this.menuController.isOpen(menuId);
    }
    /**
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return Returns true if the menu is currently enabled, otherwise false.
     */
    isEnabled(menuId) {
        return this.menuController.isEnabled(menuId);
    }
    /**
     * Used to get a menu instance. If a `menuId` is not provided then it'll
     * return the first menu found. If a `menuId` is `left` or `right`, then
     * it'll return the enabled menu on that side. Otherwise, if a `menuId` is
     * provided, then it'll try to find the menu using the menu's `id`
     * property. If a menu is not found then it'll return `null`.
     * @param [menuId]  Optionally get the menu by its id, or side.
     * @return Returns the instance of the menu if found, otherwise `null`.
     */
    get(menuId) {
        return this.menuController.get(menuId);
    }
    /**
     * @return Returns the instance of the menu already opened, otherwise `null`.
     */
    getOpen() {
        return this.menuController.getOpen();
    }
    /**
     * @return Returns an array of all menu instances.
     */
    getMenus() {
        return this.menuController.getMenus();
    }
    registerAnimation(name, animation) {
        return this.menuController.registerAnimation(name, animation);
    }
    isAnimating() {
        return this.menuController.isAnimating();
    }
    _getOpenSync() {
        return this.menuController._getOpenSync();
    }
    _createAnimation(type, menuCmp) {
        return this.menuController._createAnimation(type, menuCmp);
    }
    _register(menu) {
        return this.menuController._register(menu);
    }
    _unregister(menu) {
        return this.menuController._unregister(menu);
    }
    _setOpen(menu, shouldOpen, animated) {
        return this.menuController._setOpen(menu, shouldOpen, animated);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tbW9uL3NyYy9wcm92aWRlcnMvbWVudS1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sT0FBTyxjQUFjO0lBQ0w7SUFBcEIsWUFBb0IsY0FBK0I7UUFBL0IsbUJBQWMsR0FBZCxjQUFjLENBQWlCO0lBQUcsQ0FBQztJQUV2RDs7OztPQUlHO0lBQ0gsSUFBSSxDQUFDLE1BQWU7UUFDbEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLE1BQWU7UUFDbkIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsTUFBZTtRQUNwQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLFlBQXFCLEVBQUUsTUFBZTtRQUMzQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxZQUFZLENBQUMsWUFBcUIsRUFBRSxNQUFlO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLE1BQWU7UUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUyxDQUFDLE1BQWU7UUFDdkIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsTUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBWSxFQUFFLFNBQTJCO1FBQ3pELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQVksRUFBRSxPQUFjO1FBQzNDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFXO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFXO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFXLEVBQUUsVUFBbUIsRUFBRSxRQUFpQjtRQUMxRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBNZW51Q29udHJvbGxlckksIEFuaW1hdGlvbkJ1aWxkZXIsIE1lbnVJLCBBbmltYXRpb24gfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcblxuZXhwb3J0IGNsYXNzIE1lbnVDb250cm9sbGVyIGltcGxlbWVudHMgTWVudUNvbnRyb2xsZXJJIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtZW51Q29udHJvbGxlcjogTWVudUNvbnRyb2xsZXJJKSB7fVxuXG4gIC8qKlxuICAgKiBQcm9ncmFtbWF0aWNhbGx5IG9wZW4gdGhlIE1lbnUuXG4gICAqIEBwYXJhbSBbbWVudUlkXSAgT3B0aW9uYWxseSBnZXQgdGhlIG1lbnUgYnkgaXRzIGlkLCBvciBzaWRlLlxuICAgKiBAcmV0dXJuIHJldHVybnMgYSBwcm9taXNlIHdoZW4gdGhlIG1lbnUgaXMgZnVsbHkgb3BlbmVkXG4gICAqL1xuICBvcGVuKG1lbnVJZD86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLm1lbnVDb250cm9sbGVyLm9wZW4obWVudUlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9ncmFtbWF0aWNhbGx5IGNsb3NlIHRoZSBNZW51LiBJZiBubyBgbWVudUlkYCBpcyBnaXZlbiBhcyB0aGUgZmlyc3RcbiAgICogYXJndW1lbnQgdGhlbiBpdCdsbCBjbG9zZSBhbnkgbWVudSB3aGljaCBpcyBvcGVuLiBJZiBhIGBtZW51SWRgXG4gICAqIGlzIGdpdmVuIHRoZW4gaXQnbGwgY2xvc2UgdGhhdCBleGFjdCBtZW51LlxuICAgKiBAcGFyYW0gW21lbnVJZF0gIE9wdGlvbmFsbHkgZ2V0IHRoZSBtZW51IGJ5IGl0cyBpZCwgb3Igc2lkZS5cbiAgICogQHJldHVybiByZXR1cm5zIGEgcHJvbWlzZSB3aGVuIHRoZSBtZW51IGlzIGZ1bGx5IGNsb3NlZFxuICAgKi9cbiAgY2xvc2UobWVudUlkPzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMubWVudUNvbnRyb2xsZXIuY2xvc2UobWVudUlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIG1lbnUuIElmIGl0J3MgY2xvc2VkLCBpdCB3aWxsIG9wZW4sIGFuZCBpZiBvcGVuZWQsIGl0XG4gICAqIHdpbGwgY2xvc2UuXG4gICAqIEBwYXJhbSBbbWVudUlkXSAgT3B0aW9uYWxseSBnZXQgdGhlIG1lbnUgYnkgaXRzIGlkLCBvciBzaWRlLlxuICAgKiBAcmV0dXJuIHJldHVybnMgYSBwcm9taXNlIHdoZW4gdGhlIG1lbnUgaGFzIGJlZW4gdG9nZ2xlZFxuICAgKi9cbiAgdG9nZ2xlKG1lbnVJZD86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLm1lbnVDb250cm9sbGVyLnRvZ2dsZShtZW51SWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZW5hYmxlIG9yIGRpc2FibGUgYSBtZW51LiBGb3IgZXhhbXBsZSwgdGhlcmUgY291bGQgYmUgbXVsdGlwbGVcbiAgICogbGVmdCBtZW51cywgYnV0IG9ubHkgb25lIG9mIHRoZW0gc2hvdWxkIGJlIGFibGUgdG8gYmUgb3BlbmVkIGF0IHRoZSBzYW1lXG4gICAqIHRpbWUuIElmIHRoZXJlIGFyZSBtdWx0aXBsZSBtZW51cyBvbiB0aGUgc2FtZSBzaWRlLCB0aGVuIGVuYWJsaW5nIG9uZSBtZW51XG4gICAqIHdpbGwgYWxzbyBhdXRvbWF0aWNhbGx5IGRpc2FibGUgYWxsIHRoZSBvdGhlcnMgdGhhdCBhcmUgb24gdGhlIHNhbWUgc2lkZS5cbiAgICogQHBhcmFtIFttZW51SWRdICBPcHRpb25hbGx5IGdldCB0aGUgbWVudSBieSBpdHMgaWQsIG9yIHNpZGUuXG4gICAqIEByZXR1cm4gUmV0dXJucyB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1lbnUsIHdoaWNoIGlzIHVzZWZ1bCBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBlbmFibGUoc2hvdWxkRW5hYmxlOiBib29sZWFuLCBtZW51SWQ/OiBzdHJpbmcpOiBQcm9taXNlPEhUTUxJb25NZW51RWxlbWVudCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLm1lbnVDb250cm9sbGVyLmVuYWJsZShzaG91bGRFbmFibGUsIG1lbnVJZCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBlbmFibGUgb3IgZGlzYWJsZSB0aGUgYWJpbGl0eSB0byBzd2lwZSBvcGVuIHRoZSBtZW51LlxuICAgKiBAcGFyYW0gc2hvdWxkRW5hYmxlICBUcnVlIGlmIGl0IHNob3VsZCBiZSBzd2lwZS1hYmxlLCBmYWxzZSBpZiBub3QuXG4gICAqIEBwYXJhbSBbbWVudUlkXSAgT3B0aW9uYWxseSBnZXQgdGhlIG1lbnUgYnkgaXRzIGlkLCBvciBzaWRlLlxuICAgKiBAcmV0dXJuIFJldHVybnMgdGhlIGluc3RhbmNlIG9mIHRoZSBtZW51LCB3aGljaCBpcyB1c2VmdWwgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgc3dpcGVHZXN0dXJlKHNob3VsZEVuYWJsZTogYm9vbGVhbiwgbWVudUlkPzogc3RyaW5nKTogUHJvbWlzZTxIVE1MSW9uTWVudUVsZW1lbnQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5tZW51Q29udHJvbGxlci5zd2lwZUdlc3R1cmUoc2hvdWxkRW5hYmxlLCBtZW51SWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBbbWVudUlkXSBPcHRpb25hbGx5IGdldCB0aGUgbWVudSBieSBpdHMgaWQsIG9yIHNpZGUuXG4gICAqIEByZXR1cm4gUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgbWVudSBpcyBjdXJyZW50bHkgb3Blbiwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgKiBJZiB0aGUgbWVudUlkIGlzIG5vdCBzcGVjaWZpZWQsIGl0IHJldHVybnMgdHJ1ZSBpZiBBTlkgbWVudSBpcyBjdXJyZW5seSBvcGVuLlxuICAgKi9cbiAgaXNPcGVuKG1lbnVJZD86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLm1lbnVDb250cm9sbGVyLmlzT3BlbihtZW51SWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBbbWVudUlkXSAgT3B0aW9uYWxseSBnZXQgdGhlIG1lbnUgYnkgaXRzIGlkLCBvciBzaWRlLlxuICAgKiBAcmV0dXJuIFJldHVybnMgdHJ1ZSBpZiB0aGUgbWVudSBpcyBjdXJyZW50bHkgZW5hYmxlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgKi9cbiAgaXNFbmFibGVkKG1lbnVJZD86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLm1lbnVDb250cm9sbGVyLmlzRW5hYmxlZChtZW51SWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZ2V0IGEgbWVudSBpbnN0YW5jZS4gSWYgYSBgbWVudUlkYCBpcyBub3QgcHJvdmlkZWQgdGhlbiBpdCdsbFxuICAgKiByZXR1cm4gdGhlIGZpcnN0IG1lbnUgZm91bmQuIElmIGEgYG1lbnVJZGAgaXMgYGxlZnRgIG9yIGByaWdodGAsIHRoZW5cbiAgICogaXQnbGwgcmV0dXJuIHRoZSBlbmFibGVkIG1lbnUgb24gdGhhdCBzaWRlLiBPdGhlcndpc2UsIGlmIGEgYG1lbnVJZGAgaXNcbiAgICogcHJvdmlkZWQsIHRoZW4gaXQnbGwgdHJ5IHRvIGZpbmQgdGhlIG1lbnUgdXNpbmcgdGhlIG1lbnUncyBgaWRgXG4gICAqIHByb3BlcnR5LiBJZiBhIG1lbnUgaXMgbm90IGZvdW5kIHRoZW4gaXQnbGwgcmV0dXJuIGBudWxsYC5cbiAgICogQHBhcmFtIFttZW51SWRdICBPcHRpb25hbGx5IGdldCB0aGUgbWVudSBieSBpdHMgaWQsIG9yIHNpZGUuXG4gICAqIEByZXR1cm4gUmV0dXJucyB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1lbnUgaWYgZm91bmQsIG90aGVyd2lzZSBgbnVsbGAuXG4gICAqL1xuICBnZXQobWVudUlkPzogc3RyaW5nKTogUHJvbWlzZTxIVE1MSW9uTWVudUVsZW1lbnQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5tZW51Q29udHJvbGxlci5nZXQobWVudUlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIFJldHVybnMgdGhlIGluc3RhbmNlIG9mIHRoZSBtZW51IGFscmVhZHkgb3BlbmVkLCBvdGhlcndpc2UgYG51bGxgLlxuICAgKi9cbiAgZ2V0T3BlbigpOiBQcm9taXNlPEhUTUxJb25NZW51RWxlbWVudCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLm1lbnVDb250cm9sbGVyLmdldE9wZW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIFJldHVybnMgYW4gYXJyYXkgb2YgYWxsIG1lbnUgaW5zdGFuY2VzLlxuICAgKi9cbiAgZ2V0TWVudXMoKTogUHJvbWlzZTxIVE1MSW9uTWVudUVsZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLm1lbnVDb250cm9sbGVyLmdldE1lbnVzKCk7XG4gIH1cblxuICByZWdpc3RlckFuaW1hdGlvbihuYW1lOiBzdHJpbmcsIGFuaW1hdGlvbjogQW5pbWF0aW9uQnVpbGRlcik6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLm1lbnVDb250cm9sbGVyLnJlZ2lzdGVyQW5pbWF0aW9uKG5hbWUsIGFuaW1hdGlvbik7XG4gIH1cblxuICBpc0FuaW1hdGluZygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5tZW51Q29udHJvbGxlci5pc0FuaW1hdGluZygpO1xuICB9XG5cbiAgX2dldE9wZW5TeW5jKCk6IEhUTUxJb25NZW51RWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMubWVudUNvbnRyb2xsZXIuX2dldE9wZW5TeW5jKCk7XG4gIH1cblxuICBfY3JlYXRlQW5pbWF0aW9uKHR5cGU6IHN0cmluZywgbWVudUNtcDogTWVudUkpOiBQcm9taXNlPEFuaW1hdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLm1lbnVDb250cm9sbGVyLl9jcmVhdGVBbmltYXRpb24odHlwZSwgbWVudUNtcCk7XG4gIH1cblxuICBfcmVnaXN0ZXIobWVudTogTWVudUkpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5tZW51Q29udHJvbGxlci5fcmVnaXN0ZXIobWVudSk7XG4gIH1cblxuICBfdW5yZWdpc3RlcihtZW51OiBNZW51SSk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLm1lbnVDb250cm9sbGVyLl91bnJlZ2lzdGVyKG1lbnUpO1xuICB9XG5cbiAgX3NldE9wZW4obWVudTogTWVudUksIHNob3VsZE9wZW46IGJvb2xlYW4sIGFuaW1hdGVkOiBib29sZWFuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMubWVudUNvbnRyb2xsZXIuX3NldE9wZW4obWVudSwgc2hvdWxkT3BlbiwgYW5pbWF0ZWQpO1xuICB9XG59XG4iXX0=