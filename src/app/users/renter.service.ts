import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RenterService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders() {
    const token = this.auth.getToken();
    return token ? { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) } : {};
  }

  getAvailableLocals() {
    return this.http.get(`${this.baseUrl}/locals/available`, this.authHeaders());
  }

  getLocalImages(localId: number) {
    return this.http.get(`${this.baseUrl}/locals/${localId}/public-images`, this.authHeaders());
  }

  getMyReservations() {
    return this.http.get(`${this.baseUrl}/reservations/my`, this.authHeaders());
  }

  reserveLocal(data: { local_id: number; start_date: string; end_date: string }) {
    return this.http.post(`${this.baseUrl}/reservations`, data, this.authHeaders());
  }

  evaluateLocal(data: { local_id: number; rating: number; comment?: string }) {
    return this.http.post(`${this.baseUrl}/evaluations`, data, this.authHeaders());
  }

  deleteReservation(id: number) {
    return this.http.delete(`${this.baseUrl}/reservations/${id}`, this.authHeaders());
  }
}
