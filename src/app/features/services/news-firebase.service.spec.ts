import { TestBed } from '@angular/core/testing';

import { NewsFirebaseService } from './news-firebase.service';

describe('NewsFirebaseService', () => {
  let service: NewsFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
