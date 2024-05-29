import { TestBed } from '@angular/core/testing';

import { AuthFirebaseService } from './authFirebase.service';

describe('AuthFirebaseService', () => {
  let service: AuthFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
