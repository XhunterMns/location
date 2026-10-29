import { Component, ContentChild, ContentChildren, ViewChild } from '@angular/core';
import { IonTabs as IonTabsBase } from '@ionic/angular/common';
import { IonTabBar, IonTab } from '../proxies';
import { IonRouterOutlet } from './ion-router-outlet';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./ion-router-outlet";
class IonTabs extends IonTabsBase {
    outlet;
    tabBar;
    tabBars;
    tabs;
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTabs, deps: null, target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonTabs, selector: "ion-tabs", queries: [{ propertyName: "tabBar", first: true, predicate: IonTabBar, descendants: true }, { propertyName: "tabBars", predicate: IonTabBar }, { propertyName: "tabs", predicate: IonTab }], viewQueries: [{ propertyName: "outlet", first: true, predicate: ["outlet"], descendants: true, read: IonRouterOutlet }], usesInheritance: true, ngImport: i0, template: `
    <ng-content select="[slot=top]"></ng-content>
    <div class="tabs-inner" #tabsInner>
      <ion-router-outlet
        *ngIf="tabs.length === 0"
        #outlet
        tabs="true"
        (stackWillChange)="onStackWillChange($event)"
        (stackDidChange)="onStackDidChange($event)"
      ></ion-router-outlet>
      <ng-content *ngIf="tabs.length > 0" select="ion-tab"></ng-content>
    </div>
    <ng-content></ng-content>
  `, isInline: true, styles: [":host{display:flex;position:absolute;inset:0;flex-direction:column;width:100%;height:100%;contain:layout size style}.tabs-inner{position:relative;flex:1;contain:layout size style}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IonRouterOutlet, selector: "ion-router-outlet" }] });
}
export { IonTabs };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTabs, decorators: [{
            type: Component,
            args: [{ selector: 'ion-tabs', template: `
    <ng-content select="[slot=top]"></ng-content>
    <div class="tabs-inner" #tabsInner>
      <ion-router-outlet
        *ngIf="tabs.length === 0"
        #outlet
        tabs="true"
        (stackWillChange)="onStackWillChange($event)"
        (stackDidChange)="onStackDidChange($event)"
      ></ion-router-outlet>
      <ng-content *ngIf="tabs.length > 0" select="ion-tab"></ng-content>
    </div>
    <ng-content></ng-content>
  `, styles: [":host{display:flex;position:absolute;inset:0;flex-direction:column;width:100%;height:100%;contain:layout size style}.tabs-inner{position:relative;flex:1;contain:layout size style}\n"] }]
        }], propDecorators: { outlet: [{
                type: ViewChild,
                args: ['outlet', { read: IonRouterOutlet, static: false }]
            }], tabBar: [{
                type: ContentChild,
                args: [IonTabBar, { static: false }]
            }], tabBars: [{
                type: ContentChildren,
                args: [IonTabBar]
            }], tabs: [{
                type: ContentChildren,
                args: [IonTab]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLXRhYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGlyZWN0aXZlcy9uYXZpZ2F0aW9uL2lvbi10YWJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFFLE9BQU8sSUFBSSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFFdEQsTUE0Q2EsT0FBUSxTQUFRLFdBQVc7SUFDeUIsTUFBTSxDQUFrQjtJQUUzQyxNQUFNLENBQXdCO0lBQzlDLE9BQU8sQ0FBdUI7SUFDakMsSUFBSSxDQUFvQjsySEFMdEMsT0FBTzsrR0FBUCxPQUFPLG9GQUdKLFNBQVMsNkRBQ04sU0FBUyx1Q0FDVCxNQUFNLDBHQUpNLGVBQWUsb0RBM0NsQzs7Ozs7Ozs7Ozs7OztHQWFUOztTQTZCVSxPQUFPOzRGQUFQLE9BQU87a0JBNUNuQixTQUFTOytCQUNFLFVBQVUsWUFDVjs7Ozs7Ozs7Ozs7OztHQWFUOzhCQThCOEQsTUFBTTtzQkFBcEUsU0FBUzt1QkFBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRWpCLE1BQU07c0JBQWpELFlBQVk7dUJBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDZCxPQUFPO3NCQUFsQyxlQUFlO3VCQUFDLFNBQVM7Z0JBQ0QsSUFBSTtzQkFBNUIsZUFBZTt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgVmlld0NoaWxkLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElvblRhYnMgYXMgSW9uVGFic0Jhc2UgfSBmcm9tICdAaW9uaWMvYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBJb25UYWJCYXIsIElvblRhYiB9IGZyb20gJy4uL3Byb3hpZXMnO1xuXG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgfSBmcm9tICcuL2lvbi1yb3V0ZXItb3V0bGV0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXRhYnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PXRvcF1cIj48L25nLWNvbnRlbnQ+XG4gICAgPGRpdiBjbGFzcz1cInRhYnMtaW5uZXJcIiAjdGFic0lubmVyPlxuICAgICAgPGlvbi1yb3V0ZXItb3V0bGV0XG4gICAgICAgICpuZ0lmPVwidGFicy5sZW5ndGggPT09IDBcIlxuICAgICAgICAjb3V0bGV0XG4gICAgICAgIHRhYnM9XCJ0cnVlXCJcbiAgICAgICAgKHN0YWNrV2lsbENoYW5nZSk9XCJvblN0YWNrV2lsbENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgKHN0YWNrRGlkQ2hhbmdlKT1cIm9uU3RhY2tEaWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICA+PC9pb24tcm91dGVyLW91dGxldD5cbiAgICAgIDxuZy1jb250ZW50ICpuZ0lmPVwidGFicy5sZW5ndGggPiAwXCIgc2VsZWN0PVwiaW9uLXRhYlwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBib3R0b206IDA7XG5cbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgICAgIGNvbnRhaW46IGxheW91dCBzaXplIHN0eWxlO1xuICAgICAgfVxuICAgICAgLnRhYnMtaW5uZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAgICAgZmxleDogMTtcblxuICAgICAgICBjb250YWluOiBsYXlvdXQgc2l6ZSBzdHlsZTtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIElvblRhYnMgZXh0ZW5kcyBJb25UYWJzQmFzZSB7XG4gIEBWaWV3Q2hpbGQoJ291dGxldCcsIHsgcmVhZDogSW9uUm91dGVyT3V0bGV0LCBzdGF0aWM6IGZhbHNlIH0pIG91dGxldDogSW9uUm91dGVyT3V0bGV0O1xuXG4gIEBDb250ZW50Q2hpbGQoSW9uVGFiQmFyLCB7IHN0YXRpYzogZmFsc2UgfSkgdGFiQmFyOiBJb25UYWJCYXIgfCB1bmRlZmluZWQ7XG4gIEBDb250ZW50Q2hpbGRyZW4oSW9uVGFiQmFyKSB0YWJCYXJzOiBRdWVyeUxpc3Q8SW9uVGFiQmFyPjtcbiAgQENvbnRlbnRDaGlsZHJlbihJb25UYWIpIHRhYnM6IFF1ZXJ5TGlzdDxJb25UYWI+O1xufVxuIl19