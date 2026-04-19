import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RenterComponent } from './renter.component';
import { RenterService } from '../../users/renter.service';

describe('RenterComponent', () => {
  let component: RenterComponent;
  let fixture: ComponentFixture<RenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenterComponent],
      providers: [
        {
          provide: RenterService,
          useValue: {
            getAvailableLocals: () => of([]),
            getMyReservations: () => of([]),
            getLocalImages: () => of([]),
            reserveLocal: () => of({ message: 'Reservation created' }),
            evaluateLocal: () => of({ message: 'Evaluation saved' })
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
