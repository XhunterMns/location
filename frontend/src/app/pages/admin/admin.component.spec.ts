import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AdminComponent } from './admin.component';
import { AdminService } from '../../users/admin.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: AdminService,
          useValue: {
            getUsers: () => of([]),
            getLocals: () => of([]),
            updateLocalStatus: () => of({}),
            deleteLocal: () => of({}),
            updateLocal: () => of({}),
            updateUser: () => of({}),
            deleteUser: () => of({})
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
