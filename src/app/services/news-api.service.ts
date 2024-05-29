import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private readonly apiKey: string = environment.apiKey;
  private readonly apiUrl: string = environment.apiUrl;

  private readonly categories: string[] = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];

  constructor(private readonly http: HttpClient) {}

  public getCategories(): string[] {
    return this.categories;
  }

  getNews(
    category: string,
    keyword: string,
    offset: number = 0
  ): Observable<News> {
    const params = new HttpParams()
      .set('access_key', this.apiKey)
      .set('languages', 'en')
      .set('countries', 'ph')
      .set('limit', 24)
      .set('offset', offset)
      .set('categories', category)
      .set('keywords', keyword);
    return this.http.get<News>(`${this.apiUrl}?`, { params });
  }
}
