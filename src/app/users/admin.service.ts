import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/admin';

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  getLocals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/locals`);
  }

  updateLocalStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/locals/${id}/status`, { status });
  }

  updateLocal(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/locals/${id}`, data);
  }

  deleteLocal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/locals/${id}`);
  }
}
