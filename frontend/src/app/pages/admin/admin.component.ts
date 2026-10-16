import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../../users/admin.service';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  authService = inject(AuthService);
  adminService = inject(AdminService);
  router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  users: any[] = [];
  locals: any[] = [];
  activeTab: 'locals' | 'users' = 'locals';
  loading = false;
  errorMessage = '';
  searchTerm = '';

  editingUser: any = null;
  editingLocal: any = null;

  get filteredLocals(): any[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.locals;

    return this.locals.filter((local) => {
      const fields = [
        local?.title,
        local?.address,
        local?.status,
        local?.landlord_email,
        local?.price?.toString()
      ];

      return fields.some((value) => String(value ?? '').toLowerCase().includes(term));
    });
  }

  get filteredUsers(): any[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.users;

    return this.users.filter((user) => {
      const fields = [
        user?.name,
        user?.email,
        user?.role,
        user?.id?.toString()
      ];

      return fields.some((value) => String(value ?? '').toLowerCase().includes(term));
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadData();
    }
  }

  loadData() {
    this.loading = true;
    this.errorMessage = '';
    
    forkJoin({
      users: this.adminService.getUsers(),
      locals: this.adminService.getLocals()
    }).subscribe({
      next: (results) => {
        console.log('Admin data loaded successfully:', results);
        this.users = Array.isArray(results.users) ? results.users : [];
        this.locals = Array.isArray(results.locals) ? results.locals : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading admin data:', err);
        this.errorMessage = 'Failed to load dashboard data. ' + (err.error?.message || err.message || '');
        this.loading = false;
      }
    });
  }

  setTab(tab: 'locals' | 'users') {
    this.activeTab = tab;
  }

  deleteLocal(id: number) {
    if (confirm('Are you sure you want to delete this local?')) {
      this.adminService.deleteLocal(id).subscribe(() => this.loadData());
    }
  }

  editLocal(local: any) {
    this.editingLocal = { ...local };
  }

  saveLocal() {
    if (this.editingLocal) {
      this.adminService.updateLocal(this.editingLocal.id, this.editingLocal).subscribe(() => {
        this.editingLocal = null;
        this.loadData();
      });
    }
  }

  // User actions
  editUser(user: any) {
    this.editingUser = { ...user };
  }

  saveUser() {
    if (this.editingUser) {
      this.adminService.updateUser(this.editingUser.id, this.editingUser).subscribe(() => {
        this.editingUser = null;
        this.loadData();
      });
    }
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe(() => this.loadData());
    }
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

