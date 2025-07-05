import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http'; // For HttpClient and interceptors
import { NgChartsModule } from 'ng2-charts'; // For NgChartsModule
import { AuthInterceptor } from './auth.interceptor'; // Your custom interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes'; // Import your standalone routes

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configure routing
    provideHttpClient(withInterceptorsFromDi()), // Configure HttpClient with DI-based interceptors
    // Provide your custom interceptor
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // Import NgChartsModule for its providers (if any) and directives/components
    importProvidersFrom(NgChartsModule),
  ],
};
