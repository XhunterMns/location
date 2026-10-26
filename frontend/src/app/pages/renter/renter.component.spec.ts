import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
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
        provideHttpClient(),
        provideRouter([]),
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

  it('should default the country to Tunisia and include it in the location label', () => {
    expect(component.getCountry({ city: 'Tunis' })).toBe('Tunisia');
    expect(component.getLocationLabel({ city: 'Tunis', delegation: 'La Goulette', country: 'France' })).toBe('Tunis, La Goulette, France');
  });

  it('should filter colocation and individual listings correctly', () => {
    component.locals = [
      { id: 1, title: 'Room A', is_colocation: true },
      { id: 2, title: 'Flat B', is_colocation: false },
      { id: 3, title: 'Room C', is_colocation: true }
    ];

    component.leaseTypeFilter = 'colocation';
    expect(component.filteredLocals.map((local) => local.id)).toEqual([1, 3]);

    component.leaseTypeFilter = 'individual';
    expect(component.filteredLocals.map((local) => local.id)).toEqual([2]);
  });
});
