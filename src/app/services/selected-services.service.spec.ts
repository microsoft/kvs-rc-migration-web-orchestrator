import { TestBed } from '@angular/core/testing';

import { SelectedServicesService } from './selected-services.service';

describe('SelectedServicesService', () => {
  let service: SelectedServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
