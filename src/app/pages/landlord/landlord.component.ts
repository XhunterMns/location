import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LandlordService } from '../../users/landlord.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landlord',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.css']
})
export class LandlordComponent {

  locals: any[] = [];
  selectedLocal: any | null = null;

  constructor(private service: LandlordService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadLocals();
  }
  
   

  loadLocals() {
    this.service.getMyLocals().subscribe((res: any) => {
      this.locals = res;
    });
  }

  delete(id: number) {
    this.service.deleteLocal(id).subscribe(() => {
      this.loadLocals();
    });
  }

  view(local: any) {
    this.selectedLocal = { ...local, images: [], imagesLoading: true };
    this.service.getLocalImages(local.id).subscribe({
      next: (res: any) => {
        if (!this.selectedLocal || this.selectedLocal.id !== local.id) return;
        this.selectedLocal.images = Array.isArray(res) ? res : [];
        this.selectedLocal.imagesLoading = false;
      },
      error: () => {
        if (!this.selectedLocal || this.selectedLocal.id !== local.id) return;
        this.selectedLocal.images = [];
        this.selectedLocal.imagesLoading = false;
      }
    });
  }

  closeView() {
    this.selectedLocal = null;
  }

}
