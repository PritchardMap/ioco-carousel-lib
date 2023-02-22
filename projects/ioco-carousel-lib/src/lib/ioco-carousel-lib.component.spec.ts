import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IocoCarouselLibComponent } from './ioco-carousel-lib.component';

describe('IocoCarouselLibComponent', () => {
  let component: IocoCarouselLibComponent;
  let fixture: ComponentFixture<IocoCarouselLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IocoCarouselLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IocoCarouselLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
