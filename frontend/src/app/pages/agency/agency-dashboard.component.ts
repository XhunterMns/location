import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyService } from '../../users/agency.service';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agency-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './agency-dashboard.component.html',
  styleUrl: './agency-dashboard.component.css'
})
export class AgencyDashboardComponent implements OnInit {
  private agencyService = inject(AgencyService);
  private authService = inject(AuthService);
  private router = inject(Router);

  dashboard: any = null;
  loading = true;

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.agencyService.getDashboard().subscribe({
      next: (res) => {
        this.dashboard = res || null;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.dashboard = null;

        if (err?.status === 404) {
          this.router.navigate(['/agency/register']);
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
