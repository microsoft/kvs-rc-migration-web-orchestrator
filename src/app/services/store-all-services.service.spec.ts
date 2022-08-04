import { TestBed } from '@angular/core/testing';

import { StoreAllServicesService } from './store-all-services.service';

describe('StoreAllServicesService', () => {
  let service: StoreAllServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreAllServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
