import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
