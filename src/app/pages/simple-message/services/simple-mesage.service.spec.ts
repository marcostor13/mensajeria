import { TestBed } from '@angular/core/testing';

import { SimpleMesageService } from './simple-mesage.service';

describe('SimpleMesageService', () => {
  let service: SimpleMesageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleMesageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
