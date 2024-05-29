import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoginComponent } from './features/login/login.component';
import { AuthFirebaseService } from './features/services/authFirebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CategoriesComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    NewsListComponent,
    PageNotFoundComponent,
    PaginationComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private authFirebaseService: AuthFirebaseService) {}

  ngOnInit(): void {
    this.authFirebaseService.getUserObs().subscribe((user) => {
      if (user) {
        this.authFirebaseService.setCurrentUserSig({ email: user.email });
      } else {
        this.authFirebaseService.setCurrentUserSig(null);
      }
    });
  }
}
