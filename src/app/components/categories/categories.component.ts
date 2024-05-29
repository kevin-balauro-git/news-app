import { Component } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TitleCasePipe, NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private categories: string[] = [];

  public getCategories(): string[] {
    return this.categories;
  }
  constructor(private readonly newsApiService: NewsApiService) {}

  ngOnInit(): void {
    this.categories = this.newsApiService.getCategories();
  }
}
