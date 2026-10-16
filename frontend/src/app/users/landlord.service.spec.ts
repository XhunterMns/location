import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { LandlordService } from './landlord.service';

describe('LandlordService', () => {
  let service: LandlordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(LandlordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
