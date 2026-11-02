import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';

@Injectable({ providedIn: 'root' })
export class AgencyService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private authHeaders() {
    const token = this.authService.getToken();
    return token ? { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) } : {};
  }

  private baseUrl = `${API_BASE_URL}`;

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/agency/register`, data, this.authHeaders());
  }

  getMyAgency(): Observable<any> {
    return this.http.get(`${this.baseUrl}/agency/me`, this.authHeaders());
  }

  getDashboard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/agency/dashboard`, this.authHeaders());
  }

  getPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/agency/plans`, this.authHeaders());
  }

  getPublicProfile(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/agency/public/${slug}`);
  }
}
