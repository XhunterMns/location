import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'location' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('location');
  });

  it('should render the brand name in the navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo')?.textContent).toContain('Location');
  });

  it('should point to the local backend during local development', async () => {
    const { getApiBaseUrl } = await import('./api.config');
    expect(getApiBaseUrl('localhost')).toBe('http://localhost:3000/api');
    expect(getApiBaseUrl('127.0.0.1')).toBe('http://localhost:3000/api');
  });

  it('should keep a production backend URL outside local development', async () => {
    const { getApiBaseUrl } = await import('./api.config');
    expect(getApiBaseUrl('myapp.onrender.com')).toBe('https://myapp.onrender.com/api');
  });
});
