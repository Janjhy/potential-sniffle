import { TestBed } from '@angular/core/testing';

import { ApiWrapperService } from './api-wrapper.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ApiWrapperService', () => {
  let service: ApiWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiWrapperService]
    });
    service = TestBed.inject(ApiWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
