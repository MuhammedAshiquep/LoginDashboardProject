import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getChartData(token: string) {
    return this.http.get(`${this.baseUrl}/chart-data`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
