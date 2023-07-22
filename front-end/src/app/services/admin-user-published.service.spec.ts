import { TestBed } from '@angular/core/testing';

import { AdminUserPublishedService } from './admin-user-published.service';

describe('AdminUserPublishedService', () => {
  let service: AdminUserPublishedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserPublishedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
