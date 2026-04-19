import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LandlordService } from '../../users/landlord.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-landlord',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.css']
})
export class LandlordComponent {

  locals: any[] = [];
  selectedLocal: any | null = null;
  editLocal: any = null;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private service: LandlordService, @Inject(PLATFORM_ID) private platformId: Object) { }

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
  update(local: any) {
    this.editLocal = { ...local };
    this.selectedLocal = { ...local, images: [], imagesLoading: true };
    this.service.updateLocal(local.id, local).subscribe(() => {
      this.loadLocals();
    });
  }
  saveEdit() {
    this.service.updateLocal(this.editLocal.id, this.editLocal)
      .subscribe(() => {
        this.loadLocals();
        this.closeView();
      });
  }
  currentImageIndex = 0;

  // next image
  nextImage() {
    if (!this.selectedLocal?.images?.length) return;
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.selectedLocal.images.length;
  }

  // previous image
  prevImage() {
    if (!this.selectedLocal?.images?.length) return;
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.selectedLocal.images.length) %
      this.selectedLocal.images.length;
  }

  // reset when opening modal
  openView(local: any) {
    this.selectedLocal = local;
    this.currentImageIndex = 0;
  }
  closeView() {
    this.selectedLocal = null;
  }
  closeEdit() {
    this.editLocal = null;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
