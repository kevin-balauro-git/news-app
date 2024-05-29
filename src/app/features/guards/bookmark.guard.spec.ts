import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { bookmarkGuard } from './bookmark.guard';

describe('bookmarkGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => bookmarkGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
