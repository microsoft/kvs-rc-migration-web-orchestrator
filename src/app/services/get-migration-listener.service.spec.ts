import { TestBed } from '@angular/core/testing';

import { GetMigrationListenerService } from './get-migration-listener.service';

describe('GetMigrationListenerService', () => {
  let service: GetMigrationListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMigrationListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
