import { TestBed } from '@angular/core/testing';

import { PurchaseService } from './purchase.service';
import { HttpClientModule } from '@angular/common/http';

describe('PurchaseService', () => {
  let service: PurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule],});
    service = TestBed.inject(PurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
