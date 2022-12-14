import { TestBed } from '@angular/core/testing';

import { UserPublishedService } from './user-published.service';

describe('UserPublishedService', () => {
  let service: UserPublishedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPublishedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
