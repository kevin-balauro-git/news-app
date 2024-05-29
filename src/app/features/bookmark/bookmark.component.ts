import { Component, OnInit } from '@angular/core';
import { NewsFirebaseService } from '../services/news-firebase.service';
import { NewsFirebase } from '../models/newsFirebase';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [NgFor],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css',
})
export class BookmarkComponent implements OnInit {
  private newsList: NewsFirebase[] | undefined;
  constructor(private newsFirebaseService: NewsFirebaseService) {}

  public getNewsList(): NewsFirebase[] {
    return this.newsList!;
  }

  ngOnInit(): void {
    this.get();
  }

  public get(): void {
    this.newsFirebaseService.getNews().subscribe({
      next: (newsDatas) => {
        this.newsList = newsDatas;
      },
      error: (error) => console.log(error),
    });
  }

  public delete(id: string): void {
    console.log(id);
    if (confirm('Delete selected news?'))
      this.newsFirebaseService
        .removeNews(id)
        .subscribe({ complete: () => console.log('NEws deleted') });
    else console.log(false);
  }
}
