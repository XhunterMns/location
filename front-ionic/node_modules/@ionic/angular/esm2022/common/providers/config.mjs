import { Injectable, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
class Config {
    get(key, fallback) {
        const c = getConfig();
        if (c) {
            return c.get(key, fallback);
        }
        return null;
    }
    getBoolean(key, fallback) {
        const c = getConfig();
        if (c) {
            return c.getBoolean(key, fallback);
        }
        return false;
    }
    getNumber(key, fallback) {
        const c = getConfig();
        if (c) {
            return c.getNumber(key, fallback);
        }
        return 0;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: Config, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: Config, providedIn: 'root' });
}
export { Config };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: Config, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
export const ConfigToken = new InjectionToken('USERCONFIG');
const getConfig = () => {
    if (typeof window !== 'undefined') {
        const Ionic = window.Ionic;
        if (Ionic?.config) {
            return Ionic.config;
        }
    }
    return null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tbW9uL3NyYy9wcm92aWRlcnMvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszRCxNQUdhLE1BQU07SUFDakIsR0FBRyxDQUFDLEdBQXNCLEVBQUUsUUFBYztRQUN4QyxNQUFNLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBc0IsRUFBRSxRQUFrQjtRQUNuRCxNQUFNLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxTQUFTLENBQUMsR0FBc0IsRUFBRSxRQUFpQjtRQUNqRCxNQUFNLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbkM7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7MkhBdkJVLE1BQU07K0hBQU4sTUFBTSxjQUZMLE1BQU07O1NBRVAsTUFBTTs0RkFBTixNQUFNO2tCQUhsQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7QUEyQkQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFNLFlBQVksQ0FBQyxDQUFDO0FBRWpFLE1BQU0sU0FBUyxHQUFHLEdBQXNCLEVBQUU7SUFDeEMsSUFBSSxPQUFRLE1BQWMsS0FBSyxXQUFXLEVBQUU7UUFDMUMsTUFBTSxLQUFLLEdBQUksTUFBNkIsQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSSxLQUFLLEVBQUUsTUFBTSxFQUFFO1lBQ2pCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNyQjtLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBDb25maWcgYXMgQ29yZUNvbmZpZywgSW9uaWNDb25maWcgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcblxuaW1wb3J0IHsgSW9uaWNXaW5kb3cgfSBmcm9tICcuLi90eXBlcy9pbnRlcmZhY2VzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XG4gIGdldChrZXk6IGtleW9mIElvbmljQ29uZmlnLCBmYWxsYmFjaz86IGFueSk6IGFueSB7XG4gICAgY29uc3QgYyA9IGdldENvbmZpZygpO1xuICAgIGlmIChjKSB7XG4gICAgICByZXR1cm4gYy5nZXQoa2V5LCBmYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0Qm9vbGVhbihrZXk6IGtleW9mIElvbmljQ29uZmlnLCBmYWxsYmFjaz86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBjb25zdCBjID0gZ2V0Q29uZmlnKCk7XG4gICAgaWYgKGMpIHtcbiAgICAgIHJldHVybiBjLmdldEJvb2xlYW4oa2V5LCBmYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldE51bWJlcihrZXk6IGtleW9mIElvbmljQ29uZmlnLCBmYWxsYmFjaz86IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgYyA9IGdldENvbmZpZygpO1xuICAgIGlmIChjKSB7XG4gICAgICByZXR1cm4gYy5nZXROdW1iZXIoa2V5LCBmYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDb25maWdUb2tlbiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdVU0VSQ09ORklHJyk7XG5cbmNvbnN0IGdldENvbmZpZyA9ICgpOiBDb3JlQ29uZmlnIHwgbnVsbCA9PiB7XG4gIGlmICh0eXBlb2YgKHdpbmRvdyBhcyBhbnkpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnN0IElvbmljID0gKHdpbmRvdyBhcyBhbnkgYXMgSW9uaWNXaW5kb3cpLklvbmljO1xuICAgIGlmIChJb25pYz8uY29uZmlnKSB7XG4gICAgICByZXR1cm4gSW9uaWMuY29uZmlnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG4iXX0=