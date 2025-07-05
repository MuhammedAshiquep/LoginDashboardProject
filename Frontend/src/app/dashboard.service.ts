import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define a type for your chart data
interface ChartData {
  status: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:5192/api/Dashboard'; // Your backend DashboardController URL

  constructor(private http: HttpClient) {}

  // Fetch chart data from the backend
  getChartData(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(this.apiUrl);
  }
}
