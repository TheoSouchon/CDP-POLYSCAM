import { TestBed } from '@angular/core/testing';

import { AnnounceService } from './announce.service';
import { HttpClientModule } from '@angular/common/http';

describe('AnnounceService', () => {
  let service: AnnounceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AnnounceService]
    });
    service = TestBed.inject(AnnounceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
