import { TestBed } from '@angular/core/testing';

import { FlagsUiService } from './flags-ui.service';

describe('FlagsUiService', () => {
  let service: FlagsUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagsUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
