import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';
import { AngularDelegate, ConfigToken, provideComponentInputBinding } from '@ionic/angular/common';
import { initialize } from '@ionic/core/components';
import { ModalController } from './modal-controller';
import { PopoverController } from './popover-controller';
export const provideIonicAngular = (config = {}) => {
    return makeEnvironmentProviders([
        {
            provide: ConfigToken,
            useValue: config,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeIonicAngular,
            multi: true,
            deps: [ConfigToken, DOCUMENT],
        },
        provideComponentInputBinding(),
        AngularDelegate,
        ModalController,
        PopoverController,
    ]);
};
const initializeIonicAngular = (config, doc) => {
    return () => {
        /**
         * By default Ionic Framework hides elements that
         * are not hydrated, but in the CE build there is no
         * hydration.
         * TODO FW-2797: Remove when all integrations have been
         * migrated to CE build.
         */
        doc.documentElement.classList.add('ion-ce');
        initialize(config);
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWMtYW5ndWxhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3N0YW5kYWxvbmUvc3JjL3Byb3ZpZGVycy9pb25pYy1hbmd1bGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQU16RCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLFNBQTZDLEVBQUUsRUFBd0IsRUFBRTtJQUMzRyxPQUFPLHdCQUF3QixDQUFDO1FBQzlCO1lBQ0UsT0FBTyxFQUFFLFdBQVc7WUFDcEIsUUFBUSxFQUFFLE1BQU07U0FDakI7UUFDRDtZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxzQkFBc0I7WUFDbEMsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDO1NBQzlCO1FBQ0QsNEJBQTRCLEVBQUU7UUFDOUIsZUFBZTtRQUNmLGVBQWU7UUFDZixpQkFBaUI7S0FDbEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLE1BQW1CLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDcEUsT0FBTyxHQUFHLEVBQUU7UUFDVjs7Ozs7O1dBTUc7UUFDSCxHQUFHLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFQUF9JTklUSUFMSVpFUiwgbWFrZUVudmlyb25tZW50UHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7IEVudmlyb25tZW50UHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmd1bGFyRGVsZWdhdGUsIENvbmZpZ1Rva2VuLCBwcm92aWRlQ29tcG9uZW50SW5wdXRCaW5kaW5nIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGluaXRpYWxpemUgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcbmltcG9ydCB0eXBlIHsgSW9uaWNDb25maWcgfSBmcm9tICdAaW9uaWMvY29yZS9jb21wb25lbnRzJztcblxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnLi9tb2RhbC1jb250cm9sbGVyJztcbmltcG9ydCB7IFBvcG92ZXJDb250cm9sbGVyIH0gZnJvbSAnLi9wb3BvdmVyLWNvbnRyb2xsZXInO1xuXG50eXBlIE9wdEluQW5ndWxhckZlYXR1cmVzID0ge1xuICB1c2VTZXRJbnB1dEFQST86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY29uc3QgcHJvdmlkZUlvbmljQW5ndWxhciA9IChjb25maWc6IElvbmljQ29uZmlnICYgT3B0SW5Bbmd1bGFyRmVhdHVyZXMgPSB7fSk6IEVudmlyb25tZW50UHJvdmlkZXJzID0+IHtcbiAgcmV0dXJuIG1ha2VFbnZpcm9ubWVudFByb3ZpZGVycyhbXG4gICAge1xuICAgICAgcHJvdmlkZTogQ29uZmlnVG9rZW4sXG4gICAgICB1c2VWYWx1ZTogY29uZmlnLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgdXNlRmFjdG9yeTogaW5pdGlhbGl6ZUlvbmljQW5ndWxhcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW0NvbmZpZ1Rva2VuLCBET0NVTUVOVF0sXG4gICAgfSxcbiAgICBwcm92aWRlQ29tcG9uZW50SW5wdXRCaW5kaW5nKCksXG4gICAgQW5ndWxhckRlbGVnYXRlLFxuICAgIE1vZGFsQ29udHJvbGxlcixcbiAgICBQb3BvdmVyQ29udHJvbGxlcixcbiAgXSk7XG59O1xuXG5jb25zdCBpbml0aWFsaXplSW9uaWNBbmd1bGFyID0gKGNvbmZpZzogSW9uaWNDb25maWcsIGRvYzogRG9jdW1lbnQpID0+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICAvKipcbiAgICAgKiBCeSBkZWZhdWx0IElvbmljIEZyYW1ld29yayBoaWRlcyBlbGVtZW50cyB0aGF0XG4gICAgICogYXJlIG5vdCBoeWRyYXRlZCwgYnV0IGluIHRoZSBDRSBidWlsZCB0aGVyZSBpcyBub1xuICAgICAqIGh5ZHJhdGlvbi5cbiAgICAgKiBUT0RPIEZXLTI3OTc6IFJlbW92ZSB3aGVuIGFsbCBpbnRlZ3JhdGlvbnMgaGF2ZSBiZWVuXG4gICAgICogbWlncmF0ZWQgdG8gQ0UgYnVpbGQuXG4gICAgICovXG4gICAgZG9jLmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpb24tY2UnKTtcblxuICAgIGluaXRpYWxpemUoY29uZmlnKTtcbiAgfTtcbn07XG4iXX0=