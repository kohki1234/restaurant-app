import { TestBed } from '@angular/core/testing';

import { GurunaviServiceService } from './gurunavi-service.service';

describe('GurunaviServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GurunaviServiceService = TestBed.get(GurunaviServiceService);
    expect(service).toBeTruthy();
  });
});
