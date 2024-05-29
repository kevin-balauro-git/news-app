import { Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './features/login/login.component';
import { loginGuard } from './features/guards/login.guard';
import { BookmarkComponent } from './features/bookmark/bookmark.component';
import { bookmarkGuard } from './features/guards/bookmark.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'news/general',
    pathMatch: 'full',
  },
  {
    path: 'news/:category',
    component: NewsListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'bookmark',
    component: BookmarkComponent,
    canActivate: [bookmarkGuard],
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
