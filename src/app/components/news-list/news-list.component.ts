import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { News } from '../../models/news';
import { AsyncPipe, DatePipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { NewsFirebaseService } from '../../features/services/news-firebase.service';
import { Data } from '../../models/data';
import { AuthFirebaseService } from '../../features/services/authFirebase.service';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, SlicePipe, AsyncPipe, PaginationComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
})
export class NewsListComponent implements OnInit, OnDestroy {
  private news: News | undefined;
  private keyword: string = '';
  private category: string = 'general';
  private newsSub$: Subscription | undefined;
  private keywordSub$: Subscription | undefined;
  private categorySub$: Subscription | undefined;
  private bookmarkSub$: Subscription | undefined;

  constructor(
    private readonly newsApiService: NewsApiService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private authFirebaseService: AuthFirebaseService,
    private newsFirebaseService: NewsFirebaseService
  ) {}

  public getNewsData(): News {
    return this.news!;
  }

  ngOnInit(): void {
    this.onGetCategory();
    this.onGetKeyword();
  }

  ngOnDestroy(): void {
    this.keywordSub$?.unsubscribe();
    this.categorySub$?.unsubscribe();
    this.newsSub$?.unsubscribe();
    this.bookmarkSub$?.unsubscribe();
  }

  public addToBookmark(data: Data) {
    if (this.authFirebaseService.getCurrentUserSig()) {
      this.bookmarkSub$ = this.newsFirebaseService
        .addNews({
          title: data.title,
          source: data.source,
          published: data.published_at,
          url: data.url,
        })
        .subscribe((addedNewsId) => {
          window.alert('Bookmark Added');
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  public onGetCategory(): void {
    this.categorySub$ = this.activatedRoute.paramMap.subscribe(
      (param: ParamMap) => {
        const newCategory = param.get('category')!;

        if (this.category !== newCategory || this.category === 'general') {
          this.category = newCategory;

          const filteredCategory = this.newsApiService
            .getCategories()
            .find((c) => c === this.category);

          filteredCategory
            ? this.onGetNews(this.category, this.keyword)
            : this.router.navigateByUrl('/404');
        }
      }
    );
  }

  public onGetKeyword(): void {
    this.keywordSub$ = this.activatedRoute.queryParamMap.subscribe(
      (param: ParamMap) => {
        const newKeyword = param.get('keyword')!;

        if (newKeyword) this.keyword = newKeyword;

        this.onGetNews(this.category, this.keyword);
      }
    );
  }

  public changePage(offset: number): void {
    this.onGetNews(this.category, this.keyword, offset);
  }

  public onGetNews(
    category: string,
    keyword: string,
    offset: number = 0
  ): void {
    this.newsApiService.getNews(category, keyword, offset).subscribe({
      next: (newsData: News) => {
        this.news = newsData;
      },
    });
  }
}
