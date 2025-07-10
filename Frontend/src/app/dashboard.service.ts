import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

interface ChartData {
  status: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.apiBaseUrl}/Dashboard`; // Correct usage of template string

  constructor(private http: HttpClient) {}

  getChartData(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(this.apiUrl);
  }
}
