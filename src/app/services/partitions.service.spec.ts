import { TestBed } from '@angular/core/testing';

import { PartitionsService } from './partitions.service';

describe('PartitionsService', () => {
  let service: PartitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
