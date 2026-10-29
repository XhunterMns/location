import { NgIf } from '@angular/common';
import { Component, ContentChild, ContentChildren, ViewChild } from '@angular/core';
import { IonTabs as IonTabsBase } from '@ionic/angular/common';
import { IonTabBar, IonTab } from '../directives/proxies';
import { IonRouterOutlet } from './router-outlet';
import * as i0 from "@angular/core";
class IonTabs extends IonTabsBase {
    outlet;
    tabBar;
    tabBars;
    tabs;
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTabs, deps: null, target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonTabs, isStandalone: true, selector: "ion-tabs", queries: [{ propertyName: "tabBar", first: true, predicate: IonTabBar, descendants: true }, { propertyName: "tabBars", predicate: IonTabBar }, { propertyName: "tabs", predicate: IonTab }], viewQueries: [{ propertyName: "outlet", first: true, predicate: ["outlet"], descendants: true, read: IonRouterOutlet }], usesInheritance: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{display:flex;position:absolute;inset:0;flex-direction:column;width:100%;height:100%;contain:layout size style}.tabs-inner{position:relative;flex:1;contain:layout size style}\n"], dependencies: [{ kind: "component", type: IonRouterOutlet, selector: "ion-router-outlet" }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
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
  `, standalone: true, imports: [IonRouterOutlet, NgIf], styles: [":host{display:flex;position:absolute;inset:0;flex-direction:column;width:100%;height:100%;contain:layout size style}.tabs-inner{position:relative;flex:1;contain:layout size style}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3N0YW5kYWxvbmUvc3JjL25hdmlnYXRpb24vdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsT0FBTyxJQUFJLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUVsRCxNQThDYSxPQUFRLFNBQVEsV0FBVztJQUN5QixNQUFNLENBQWtCO0lBRTNDLE1BQU0sQ0FBd0I7SUFDOUMsT0FBTyxDQUF1QjtJQUNqQyxJQUFJLENBQW9COzJIQUx0QyxPQUFPOytHQUFQLE9BQU8sd0dBR0osU0FBUyw2REFDTixTQUFTLHVDQUNULE1BQU0sMEdBSk0sZUFBZSxvREE3Q2xDOzs7Ozs7Ozs7Ozs7O0dBYVQsK1BBNEJTLGVBQWUsOERBQUUsSUFBSTs7U0FHcEIsT0FBTzs0RkFBUCxPQUFPO2tCQTlDbkIsU0FBUzsrQkFDRSxVQUFVLFlBQ1Y7Ozs7Ozs7Ozs7Ozs7R0FhVCxjQUNXLElBQUksV0EyQlAsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDOzhCQUkrQixNQUFNO3NCQUFwRSxTQUFTO3VCQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFakIsTUFBTTtzQkFBakQsWUFBWTt1QkFBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUNkLE9BQU87c0JBQWxDLGVBQWU7dUJBQUMsU0FBUztnQkFDRCxJQUFJO3NCQUE1QixlQUFlO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ0lmIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIFZpZXdDaGlsZCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJb25UYWJzIGFzIElvblRhYnNCYXNlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgSW9uVGFiQmFyLCBJb25UYWIgfSBmcm9tICcuLi9kaXJlY3RpdmVzL3Byb3hpZXMnO1xuXG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgfSBmcm9tICcuL3JvdXRlci1vdXRsZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tdGFicycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9dG9wXVwiPjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwidGFicy1pbm5lclwiICN0YWJzSW5uZXI+XG4gICAgICA8aW9uLXJvdXRlci1vdXRsZXRcbiAgICAgICAgKm5nSWY9XCJ0YWJzLmxlbmd0aCA9PT0gMFwiXG4gICAgICAgICNvdXRsZXRcbiAgICAgICAgdGFicz1cInRydWVcIlxuICAgICAgICAoc3RhY2tXaWxsQ2hhbmdlKT1cIm9uU3RhY2tXaWxsQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAoc3RhY2tEaWRDaGFuZ2UpPVwib25TdGFja0RpZENoYW5nZSgkZXZlbnQpXCJcbiAgICAgID48L2lvbi1yb3V0ZXItb3V0bGV0PlxuICAgICAgPG5nLWNvbnRlbnQgKm5nSWY9XCJ0YWJzLmxlbmd0aCA+IDBcIiBzZWxlY3Q9XCJpb24tdGFiXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcblxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG5cbiAgICAgICAgY29udGFpbjogbGF5b3V0IHNpemUgc3R5bGU7XG4gICAgICB9XG4gICAgICAudGFicy1pbm5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICAgICBmbGV4OiAxO1xuXG4gICAgICAgIGNvbnRhaW46IGxheW91dCBzaXplIHN0eWxlO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG4gIGltcG9ydHM6IFtJb25Sb3V0ZXJPdXRsZXQsIE5nSWZdLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIElvblRhYnMgZXh0ZW5kcyBJb25UYWJzQmFzZSB7XG4gIEBWaWV3Q2hpbGQoJ291dGxldCcsIHsgcmVhZDogSW9uUm91dGVyT3V0bGV0LCBzdGF0aWM6IGZhbHNlIH0pIG91dGxldDogSW9uUm91dGVyT3V0bGV0O1xuXG4gIEBDb250ZW50Q2hpbGQoSW9uVGFiQmFyLCB7IHN0YXRpYzogZmFsc2UgfSkgdGFiQmFyOiBJb25UYWJCYXIgfCB1bmRlZmluZWQ7XG4gIEBDb250ZW50Q2hpbGRyZW4oSW9uVGFiQmFyKSB0YWJCYXJzOiBRdWVyeUxpc3Q8SW9uVGFiQmFyPjtcbiAgQENvbnRlbnRDaGlsZHJlbihJb25UYWIpIHRhYnM6IFF1ZXJ5TGlzdDxJb25UYWI+O1xufVxuIl19