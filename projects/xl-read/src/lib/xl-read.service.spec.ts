import { TestBed } from '@angular/core/testing';

import { XlReadService } from './xl-read.service';

describe('XlReadService', () => {
  let service: XlReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XlReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
