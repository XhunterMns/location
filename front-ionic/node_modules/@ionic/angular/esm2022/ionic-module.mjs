import { CommonModule, DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, NgModule, NgZone } from '@angular/core';
import { ConfigToken, AngularDelegate, provideComponentInputBinding } from '@ionic/angular/common';
import { appInitialize } from './app-initialize';
import { BooleanValueAccessorDirective, NumericValueAccessorDirective, SelectValueAccessorDirective, TextValueAccessorDirective, } from './directives/control-value-accessors';
import { IonBackButton } from './directives/navigation/ion-back-button';
import { IonNav } from './directives/navigation/ion-nav';
import { IonRouterOutlet } from './directives/navigation/ion-router-outlet';
import { IonTabs } from './directives/navigation/ion-tabs';
import { RouterLinkDelegateDirective, RouterLinkWithHrefDelegateDirective, } from './directives/navigation/router-link-delegate';
import { IonModal } from './directives/overlays/modal';
import { IonPopover } from './directives/overlays/popover';
import { DIRECTIVES } from './directives/proxies-list';
import { IonMaxValidator, IonMinValidator } from './directives/validators';
import { ModalController } from './providers/modal-controller';
import { PopoverController } from './providers/popover-controller';
import * as i0 from "@angular/core";
import * as i1 from "./directives/proxies";
const DECLARATIONS = [
    // generated proxies
    ...DIRECTIVES,
    // manual proxies
    IonModal,
    IonPopover,
    // ngModel accessors
    BooleanValueAccessorDirective,
    NumericValueAccessorDirective,
    SelectValueAccessorDirective,
    TextValueAccessorDirective,
    // navigation
    IonTabs,
    IonRouterOutlet,
    IonBackButton,
    IonNav,
    RouterLinkDelegateDirective,
    RouterLinkWithHrefDelegateDirective,
    // validators
    IonMinValidator,
    IonMaxValidator,
];
class IonicModule {
    static forRoot(config = {}) {
        return {
            ngModule: IonicModule,
            providers: [
                {
                    provide: ConfigToken,
                    useValue: config,
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: appInitialize,
                    multi: true,
                    deps: [ConfigToken, DOCUMENT, NgZone],
                },
                AngularDelegate,
                provideComponentInputBinding(),
            ],
        };
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonicModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: IonicModule, declarations: [i1.IonAccordion, i1.IonAccordionGroup, i1.IonActionSheet, i1.IonAlert, i1.IonApp, i1.IonAvatar, i1.IonBackdrop, i1.IonBadge, i1.IonBreadcrumb, i1.IonBreadcrumbs, i1.IonButton, i1.IonButtons, i1.IonCard, i1.IonCardContent, i1.IonCardHeader, i1.IonCardSubtitle, i1.IonCardTitle, i1.IonCheckbox, i1.IonChip, i1.IonCol, i1.IonContent, i1.IonDatetime, i1.IonDatetimeButton, i1.IonFab, i1.IonFabButton, i1.IonFabList, i1.IonFooter, i1.IonGrid, i1.IonHeader, i1.IonIcon, i1.IonImg, i1.IonInfiniteScroll, i1.IonInfiniteScrollContent, i1.IonInput, i1.IonInputOtp, i1.IonInputPasswordToggle, i1.IonItem, i1.IonItemDivider, i1.IonItemGroup, i1.IonItemOption, i1.IonItemOptions, i1.IonItemSliding, i1.IonLabel, i1.IonList, i1.IonListHeader, i1.IonLoading, i1.IonMenu, i1.IonMenuButton, i1.IonMenuToggle, i1.IonNavLink, i1.IonNote, i1.IonPicker, i1.IonPickerColumn, i1.IonPickerColumnOption, i1.IonPickerLegacy, i1.IonProgressBar, i1.IonRadio, i1.IonRadioGroup, i1.IonRange, i1.IonRefresher, i1.IonRefresherContent, i1.IonReorder, i1.IonReorderGroup, i1.IonRippleEffect, i1.IonRow, i1.IonSearchbar, i1.IonSegment, i1.IonSegmentButton, i1.IonSegmentContent, i1.IonSegmentView, i1.IonSelect, i1.IonSelectModal, i1.IonSelectOption, i1.IonSkeletonText, i1.IonSpinner, i1.IonSplitPane, i1.IonTab, i1.IonTabBar, i1.IonTabButton, i1.IonText, i1.IonTextarea, i1.IonThumbnail, i1.IonTitle, i1.IonToast, i1.IonToggle, i1.IonToolbar, 
            // manual proxies
            IonModal,
            IonPopover,
            // ngModel accessors
            BooleanValueAccessorDirective,
            NumericValueAccessorDirective,
            SelectValueAccessorDirective,
            TextValueAccessorDirective,
            // navigation
            IonTabs,
            IonRouterOutlet,
            IonBackButton,
            IonNav,
            RouterLinkDelegateDirective,
            RouterLinkWithHrefDelegateDirective,
            // validators
            IonMinValidator,
            IonMaxValidator], imports: [CommonModule], exports: [i1.IonAccordion, i1.IonAccordionGroup, i1.IonActionSheet, i1.IonAlert, i1.IonApp, i1.IonAvatar, i1.IonBackdrop, i1.IonBadge, i1.IonBreadcrumb, i1.IonBreadcrumbs, i1.IonButton, i1.IonButtons, i1.IonCard, i1.IonCardContent, i1.IonCardHeader, i1.IonCardSubtitle, i1.IonCardTitle, i1.IonCheckbox, i1.IonChip, i1.IonCol, i1.IonContent, i1.IonDatetime, i1.IonDatetimeButton, i1.IonFab, i1.IonFabButton, i1.IonFabList, i1.IonFooter, i1.IonGrid, i1.IonHeader, i1.IonIcon, i1.IonImg, i1.IonInfiniteScroll, i1.IonInfiniteScrollContent, i1.IonInput, i1.IonInputOtp, i1.IonInputPasswordToggle, i1.IonItem, i1.IonItemDivider, i1.IonItemGroup, i1.IonItemOption, i1.IonItemOptions, i1.IonItemSliding, i1.IonLabel, i1.IonList, i1.IonListHeader, i1.IonLoading, i1.IonMenu, i1.IonMenuButton, i1.IonMenuToggle, i1.IonNavLink, i1.IonNote, i1.IonPicker, i1.IonPickerColumn, i1.IonPickerColumnOption, i1.IonPickerLegacy, i1.IonProgressBar, i1.IonRadio, i1.IonRadioGroup, i1.IonRange, i1.IonRefresher, i1.IonRefresherContent, i1.IonReorder, i1.IonReorderGroup, i1.IonRippleEffect, i1.IonRow, i1.IonSearchbar, i1.IonSegment, i1.IonSegmentButton, i1.IonSegmentContent, i1.IonSegmentView, i1.IonSelect, i1.IonSelectModal, i1.IonSelectOption, i1.IonSkeletonText, i1.IonSpinner, i1.IonSplitPane, i1.IonTab, i1.IonTabBar, i1.IonTabButton, i1.IonText, i1.IonTextarea, i1.IonThumbnail, i1.IonTitle, i1.IonToast, i1.IonToggle, i1.IonToolbar, 
            // manual proxies
            IonModal,
            IonPopover,
            // ngModel accessors
            BooleanValueAccessorDirective,
            NumericValueAccessorDirective,
            SelectValueAccessorDirective,
            TextValueAccessorDirective,
            // navigation
            IonTabs,
            IonRouterOutlet,
            IonBackButton,
            IonNav,
            RouterLinkDelegateDirective,
            RouterLinkWithHrefDelegateDirective,
            // validators
            IonMinValidator,
            IonMaxValidator] });
    /** @nocollapse */ static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonicModule, providers: [ModalController, PopoverController], imports: [CommonModule] });
}
export { IonicModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonicModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: DECLARATIONS,
                    exports: DECLARATIONS,
                    providers: [ModalController, PopoverController],
                    imports: [CommonModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2lvbmljLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBdUIsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUduRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUNMLDZCQUE2QixFQUM3Qiw2QkFBNkIsRUFDN0IsNEJBQTRCLEVBQzVCLDBCQUEwQixHQUMzQixNQUFNLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRCxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLG1DQUFtQyxHQUNwQyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7QUFFbkUsTUFBTSxZQUFZLEdBQUc7SUFDbkIsb0JBQW9CO0lBQ3BCLEdBQUcsVUFBVTtJQUViLGlCQUFpQjtJQUNqQixRQUFRO0lBQ1IsVUFBVTtJQUVWLG9CQUFvQjtJQUNwQiw2QkFBNkI7SUFDN0IsNkJBQTZCO0lBQzdCLDRCQUE0QjtJQUM1QiwwQkFBMEI7SUFFMUIsYUFBYTtJQUNiLE9BQU87SUFDUCxlQUFlO0lBQ2YsYUFBYTtJQUNiLE1BQU07SUFDTiwyQkFBMkI7SUFDM0IsbUNBQW1DO0lBRW5DLGFBQWE7SUFDYixlQUFlO0lBQ2YsZUFBZTtDQUNoQixDQUFDO0FBTUYsTUFNYSxXQUFXO0lBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBNkMsRUFBRTtRQUM1RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLFdBQVc7WUFDckIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixRQUFRLEVBQUUsTUFBTTtpQkFDakI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixLQUFLLEVBQUUsSUFBSTtvQkFDWCxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztpQkFDdEM7Z0JBQ0QsZUFBZTtnQkFDZiw0QkFBNEIsRUFBRTthQUMvQjtTQUNGLENBQUM7SUFDSixDQUFDOzJIQW5CVSxXQUFXOzRIQUFYLFdBQVc7WUFqQ3RCLGlCQUFpQjtZQUNqQixRQUFRO1lBQ1IsVUFBVTtZQUVWLG9CQUFvQjtZQUNwQiw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLDRCQUE0QjtZQUM1QiwwQkFBMEI7WUFFMUIsYUFBYTtZQUNiLE9BQU87WUFDUCxlQUFlO1lBQ2YsYUFBYTtZQUNiLE1BQU07WUFDTiwyQkFBMkI7WUFDM0IsbUNBQW1DO1lBRW5DLGFBQWE7WUFDYixlQUFlO1lBQ2YsZUFBZSxhQVdMLFlBQVk7WUEvQnRCLGlCQUFpQjtZQUNqQixRQUFRO1lBQ1IsVUFBVTtZQUVWLG9CQUFvQjtZQUNwQiw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLDRCQUE0QjtZQUM1QiwwQkFBMEI7WUFFMUIsYUFBYTtZQUNiLE9BQU87WUFDUCxlQUFlO1lBQ2YsYUFBYTtZQUNiLE1BQU07WUFDTiwyQkFBMkI7WUFDM0IsbUNBQW1DO1lBRW5DLGFBQWE7WUFDYixlQUFlO1lBQ2YsZUFBZTs0SEFhSixXQUFXLGFBSFgsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsWUFDckMsWUFBWTs7U0FFWCxXQUFXOzRGQUFYLFdBQVc7a0JBTnZCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLFlBQVk7b0JBQzFCLE9BQU8sRUFBRSxZQUFZO29CQUNyQixTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUM7b0JBQy9DLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIEFQUF9JTklUSUFMSVpFUiwgTmdNb2R1bGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnVG9rZW4sIEFuZ3VsYXJEZWxlZ2F0ZSwgcHJvdmlkZUNvbXBvbmVudElucHV0QmluZGluZyB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJb25pY0NvbmZpZyB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuaW1wb3J0IHsgYXBwSW5pdGlhbGl6ZSB9IGZyb20gJy4vYXBwLWluaXRpYWxpemUnO1xuaW1wb3J0IHtcbiAgQm9vbGVhblZhbHVlQWNjZXNzb3JEaXJlY3RpdmUsXG4gIE51bWVyaWNWYWx1ZUFjY2Vzc29yRGlyZWN0aXZlLFxuICBTZWxlY3RWYWx1ZUFjY2Vzc29yRGlyZWN0aXZlLFxuICBUZXh0VmFsdWVBY2Nlc3NvckRpcmVjdGl2ZSxcbn0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRyb2wtdmFsdWUtYWNjZXNzb3JzJztcbmltcG9ydCB7IElvbkJhY2tCdXR0b24gfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tYmFjay1idXR0b24nO1xuaW1wb3J0IHsgSW9uTmF2IH0gZnJvbSAnLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vaW9uLW5hdic7XG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tcm91dGVyLW91dGxldCc7XG5pbXBvcnQgeyBJb25UYWJzIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vaW9uLXRhYnMnO1xuaW1wb3J0IHtcbiAgUm91dGVyTGlua0RlbGVnYXRlRGlyZWN0aXZlLFxuICBSb3V0ZXJMaW5rV2l0aEhyZWZEZWxlZ2F0ZURpcmVjdGl2ZSxcbn0gZnJvbSAnLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vcm91dGVyLWxpbmstZGVsZWdhdGUnO1xuaW1wb3J0IHsgSW9uTW9kYWwgfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3ZlcmxheXMvbW9kYWwnO1xuaW1wb3J0IHsgSW9uUG9wb3ZlciB9IGZyb20gJy4vZGlyZWN0aXZlcy9vdmVybGF5cy9wb3BvdmVyJztcbmltcG9ydCB7IERJUkVDVElWRVMgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcHJveGllcy1saXN0JztcbmltcG9ydCB7IElvbk1heFZhbGlkYXRvciwgSW9uTWluVmFsaWRhdG9yIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvbW9kYWwtY29udHJvbGxlcic7XG5pbXBvcnQgeyBQb3BvdmVyQ29udHJvbGxlciB9IGZyb20gJy4vcHJvdmlkZXJzL3BvcG92ZXItY29udHJvbGxlcic7XG5cbmNvbnN0IERFQ0xBUkFUSU9OUyA9IFtcbiAgLy8gZ2VuZXJhdGVkIHByb3hpZXNcbiAgLi4uRElSRUNUSVZFUyxcblxuICAvLyBtYW51YWwgcHJveGllc1xuICBJb25Nb2RhbCxcbiAgSW9uUG9wb3ZlcixcblxuICAvLyBuZ01vZGVsIGFjY2Vzc29yc1xuICBCb29sZWFuVmFsdWVBY2Nlc3NvckRpcmVjdGl2ZSxcbiAgTnVtZXJpY1ZhbHVlQWNjZXNzb3JEaXJlY3RpdmUsXG4gIFNlbGVjdFZhbHVlQWNjZXNzb3JEaXJlY3RpdmUsXG4gIFRleHRWYWx1ZUFjY2Vzc29yRGlyZWN0aXZlLFxuXG4gIC8vIG5hdmlnYXRpb25cbiAgSW9uVGFicyxcbiAgSW9uUm91dGVyT3V0bGV0LFxuICBJb25CYWNrQnV0dG9uLFxuICBJb25OYXYsXG4gIFJvdXRlckxpbmtEZWxlZ2F0ZURpcmVjdGl2ZSxcbiAgUm91dGVyTGlua1dpdGhIcmVmRGVsZWdhdGVEaXJlY3RpdmUsXG5cbiAgLy8gdmFsaWRhdG9yc1xuICBJb25NaW5WYWxpZGF0b3IsXG4gIElvbk1heFZhbGlkYXRvcixcbl07XG5cbnR5cGUgT3B0SW5Bbmd1bGFyRmVhdHVyZXMgPSB7XG4gIHVzZVNldElucHV0QVBJPzogYm9vbGVhbjtcbn07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogREVDTEFSQVRJT05TLFxuICBleHBvcnRzOiBERUNMQVJBVElPTlMsXG4gIHByb3ZpZGVyczogW01vZGFsQ29udHJvbGxlciwgUG9wb3ZlckNvbnRyb2xsZXJdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uaWNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IElvbmljQ29uZmlnICYgT3B0SW5Bbmd1bGFyRmVhdHVyZXMgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8SW9uaWNNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IElvbmljTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDb25maWdUb2tlbixcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGFwcEluaXRpYWxpemUsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgZGVwczogW0NvbmZpZ1Rva2VuLCBET0NVTUVOVCwgTmdab25lXSxcbiAgICAgICAgfSxcbiAgICAgICAgQW5ndWxhckRlbGVnYXRlLFxuICAgICAgICBwcm92aWRlQ29tcG9uZW50SW5wdXRCaW5kaW5nKCksXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==