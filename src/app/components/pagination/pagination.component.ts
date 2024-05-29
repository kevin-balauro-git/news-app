import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../models/pagination';
import { NewsApiService } from '../../services/news-api.service';
import { News } from '../../models/news';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, NgIf, RouterLinkActive],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() pagination!: Pagination;
  @Input() category!: string;
  @Input() keyword!: string;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  public getPageNumbers(): number {
    return Math.ceil(this.pagination?.total / this.pagination?.limit);
  }

  public changePageEvent(index: number): void {
    this.changePage.emit(this.pagination?.limit * index);
  }
}
