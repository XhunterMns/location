import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LandlordService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders() {
    const token = this.auth.getToken();
    return token ? { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) } : {};
  }

  getMyLocals() {
    return this.http.get(`${this.baseUrl}/locals/my`, this.authHeaders());
  }

  addLocal(data: any) {
    return this.http.post(`${this.baseUrl}/locals`, data, this.authHeaders());
  }

  deleteLocal(id: number) {
    return this.http.delete(`${this.baseUrl}/locals/${id}`, this.authHeaders());
  }

  updateLocal(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/locals/${id}`, data, this.authHeaders());
  }

  uploadImageFile(localId: number, file: File) {
    const token = this.auth.getToken();
    let headers = new HttpHeaders()
      .set('X-Image-Mime', file.type || 'image/jpeg')
      .set('Content-Type', 'application/octet-stream');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post(`${this.baseUrl}/locals/${localId}/image-binary`, file, { headers });
  }

  uploadImage(localId: number, image: string) {
    return this.http.post(`${this.baseUrl}/locals/${localId}/images`, { images: [image] }, this.authHeaders());
  }

  uploadImages(localId: number, images: string[]) {
    return this.http.post(`${this.baseUrl}/locals/${localId}/images`, { images }, this.authHeaders());
  }

  getLocalImages(localId: number) {
    return this.http.get(`${this.baseUrl}/locals/${localId}/images`, this.authHeaders());
  }
}
