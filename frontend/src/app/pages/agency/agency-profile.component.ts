import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AgencyService } from '../../users/agency.service';

@Component({
  selector: 'app-agency-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agency-profile.component.html',
  styleUrl: './agency-profile.component.css'
})
export class AgencyProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private agencyService = inject(AgencyService);

  agency: any = null;
  loading = true;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (!slug) {
        this.loading = false;
        return;
      }

      this.agencyService.getPublicProfile(slug).subscribe({
        next: (res) => {
          this.agency = res;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    });
  }
}
