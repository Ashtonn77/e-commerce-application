import { TestBed } from '@angular/core/testing';

import { GothamNetworkFormService } from './gotham-network-form.service';

describe('GothamNetworkFormService', () => {
  let service: GothamNetworkFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GothamNetworkFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
