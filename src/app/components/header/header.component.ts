import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthFirebaseService } from '../../features/services/authFirebase.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authFirebaseService: AuthFirebaseService
  ) {}

  public getCurrentSig() {
    return this.authFirebaseService.getCurrentUserSig();
  }

  getNewsWithKeyword(keyword: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { keyword: keyword },
    });
  }

  public logout(): void {
    this.authFirebaseService.logout();
    this.router.navigate(['/']);
  }
}
