import { TestBed } from '@angular/core/testing';

import { LabelserviceService } from './labelservice.service';

describe('LabelserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabelserviceService = TestBed.get(LabelserviceService);
    expect(service).toBeTruthy();
  });
});
