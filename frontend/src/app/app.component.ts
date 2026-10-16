import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'location';

  authService = inject(AuthService);
  router = inject(Router);

  readonly navMap: Record<string, NavItem[]> = {
    admin: [
      { label: 'Dashboard', route: '/admin', icon: '▣' },
      { label: 'Users', route: '/admin', icon: '👥' },
      { label: 'Properties', route: '/admin', icon: '🏠' },
      { label: 'Profile', route: '/profile', icon: '👤' }
    ],
    landlord: [
      { label: 'Dashboard', route: '/landlord', icon: '▣' },
      { label: 'My Listings', route: '/landlord', icon: '🏡' },
      { label: 'Add Local', route: '/landlord/add', icon: '＋' },
      { label: 'Profile', route: '/profile', icon: '👤' }
    ],
    renter: [
      { label: 'Explore', route: '/renter', icon: '⌂' },
      { label: 'My Reservations', route: '/renter', icon: '📅' },
      { label: 'Favorites', route: '/renter', icon: '♥' },
      { label: 'Profile', route: '/profile', icon: '👤' }
    ]
  };

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get currentRole(): string | null {
    return this.authService.getRole();
  }

  get headerItems(): NavItem[] {
    const role = this.currentRole || 'renter';
    return this.navMap[role] || this.navMap['renter'];
  }

  get sideBarItems(): NavItem[] {
    return this.headerItems;
  }

  showAppLayout(): boolean {
    return this.authService.isLoggedIn() &&
      !this.router.url.includes('/login') &&
      !this.router.url.includes('/signup');
  }

  showBrandHeader(): boolean {
    return !this.router.url.includes('/login') || !this.router.url.includes('/signup');
  }
}