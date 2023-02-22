import { TestBed } from '@angular/core/testing';

import { IocoCarouselLibService } from './ioco-carousel-lib.service';

describe('IocoCarouselLibService', () => {
  let service: IocoCarouselLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IocoCarouselLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
