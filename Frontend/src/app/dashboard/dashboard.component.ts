import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { DashboardService } from '../dashboard.service';
import { AuthService } from '../auth.service';
// import { RouterLink } from '@angular/router'; // Removed as it's not used in template

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule], // RouterLink removed from imports
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        bodyColor: '#fff',
        titleColor: '#fff',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Item Count by Status',
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
        borderColor: ['#388E3C', '#FFA000', '#1976D2'],
        borderWidth: 1,
      },
    ],
  };

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.dashboardService.getChartData().subscribe({
      next: (data) => {
        this.barChartData.labels = data.map((item) => item.status);
        this.barChartData.datasets[0].data = data.map((item) => item.count);
        this.barChartData = { ...this.barChartData };
      },
      error: (error) => {
        console.error('Failed to fetch chart data:', error);
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
        }
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
