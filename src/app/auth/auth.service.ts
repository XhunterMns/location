import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:3000';

  private hasStorage() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private authHeaders() {
    const token = this.getToken();
    return token ? { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) } : {};
  }

  private decodeToken() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
      return JSON.parse(atob(padded));
    } catch {
      return null;
    }
  }

  signup(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }
  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, data).pipe(
      tap((res: any) => {
        if (this.hasStorage() && res?.token) {
          localStorage.setItem('token', res.token);
        }
        if (this.hasStorage() && res?.role) {
          localStorage.setItem('role', res.role);
        }
      })
    );
  }

  logout() {
    if (!this.hasStorage()) return;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn() {
    if (!this.hasStorage()) return false;
    return !!localStorage.getItem('token');
  }

  getRole() {
    if (!this.hasStorage()) return null;
    return localStorage.getItem('role');
  }

  getToken() {
    if (!this.hasStorage()) return null;
    return localStorage.getItem('token');
  }

  getCurrentUserId() {
    const payload = this.decodeToken();
    return payload?.id ? Number(payload.id) : null;
  }

  getProfile() {
    return this.httpClient.get(`${this.baseUrl}/profile`, this.authHeaders());
  }

  updateProfile(data: any) {
    return this.httpClient.put(`${this.baseUrl}/profile`, data, this.authHeaders());
  }
}
