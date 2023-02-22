import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ioco-carousel-lib',
  template: `
    <div class="wrapper" *ngIf="isLoaded">
      <div class="heading">
        <ng-content></ng-content>
      </div>
      <div class="carousel">
        <div class="cards">
          <div *ngFor="let item of items" class="card">
            <div class="card-img">
              <img src="{{ item.src }}" />
            </div>
            <div class="card-title">
              <h3>{{ item.title }}</h3>
            </div>
            <a class="card-link" routerLink="item.url"
              >Start here
              <i-feather name="chevron-right" class="link-icon"></i-feather
            ></a>
          </div>
        </div>
      </div>
      <div class="controls">
        <button (click)="prev()" class="nav-controls prev">
          <i-feather name="chevron-left" class="icon"></i-feather>
        </button>
        <button (click)="next()" class="nav-controls next">
          <i-feather name="chevron-right" class="icon"></i-feather>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./ioco-carousel-lib.component.scss'],
})
export class IocoCarouselLibComponent implements OnInit, AfterViewInit {
  public elementRef: ElementRef;
  public arrayOfSlides = [];
  public carouselDisplaying;
  public screenSize;
  public carousel;
  public lengthOfSlide: number = 0;
  public carouselContent;
  public slides;
  public carouselElements;
  public rightNav;
  public leftNav;
  public initialX;
  public initialPos = [];
  public initialWidth;
  public firstSlide;
  public moving = true;
  public isLoaded = true;

  @Input() title: string = '';
  @Input() items: any = [];
  @Input() configOptions: any;
  @ViewChild('nextSlide') nextSlide;
  subtitle;
  config: any;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor(private el: ElementRef) {}

  public ngOnInit() {
    if (this.configOptions) {
      this.config = this.configOptions;
    }
  }

  ngAfterViewInit() {
    this.initializeCarousel();
  }

  private addElClone() {
    this.carouselContent = document.querySelector('.cards');
    var lastSlide = this.carouselContent.lastElementChild.cloneNode(true);
    if (this.carouselDisplaying >= 5) {
      lastSlide.style.left = -this.lengthOfSlide + 'px';
    } else if (this.carouselDisplaying == 3) {
    } else {
      lastSlide.style.left = -this.lengthOfSlide + 220 + 'px';
    }
    this.carouselContent.insertBefore(
      lastSlide,
      this.carouselContent.firstChild
    );
    lastSlide = this.carouselContent.lastElementChild.cloneNode(true);
  }

  removeClone() {
    var firstSlide = this.carouselContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
  }

  moveSlidesRight() {
    var slides = document.querySelectorAll('.card');
    var slidesArray = Array.prototype.slice.call(slides);
    let width = 0;
    let lengthOfSlide = this.lengthOfSlide;
    if (this.carouselDisplaying >= 5) {
      slidesArray.forEach((el, i) => {
        el.style.left = width + 'px';
        el.classList.remove('card-1', 'card-2', 'card-3', 'active');
        if (i == 2) {
          el.classList.add('card-1', 'active');
          el.style.left = width + 50 + 'px';
        } else if (i == 1) {
          el.classList.add('card-2');
          el.style.left = width - 20 + 'px';
        } else if (i == 0) {
          el.style.left = width + 20 + 'px';
        } else if (i == 3) {
          el.classList.add('card-3');
          el.style.left = width + 120 + 'px';
        } else if (i == 4) {
          el.style.left = width + 80 + 'px';
        }

        width += lengthOfSlide;
      });
    } else if (this.carouselDisplaying == 3) {
      slidesArray.forEach((el, i) => {
        el.style.left = width + 'px';
        el.classList.remove('card-1', 'card-2', 'card-3', 'active');
        if (window.innerWidth >= 1024) {
          if (i == 2) {
            el.classList.add('card-3');
            el.style.left = width + 110 + 'px';
          } else if (i == 1) {
            el.classList.add('card-1', 'active');
            el.style.left = width + 70 + 'px';
          } else if (i == 0) {
            el.classList.add('card-2');
            el.style.left = width + 30 + 'px';
          } else if (i == 3) {
            el.classList.add('card-3');
            el.style.left = width + 150 + 'px';
          } else if (i == 4) {
            el.classList.add('card-3');
            el.style.left = width + 'px';
          } else {
            el.classList.add('card-4');
            el.style.left = width + 'px';
          }
        } else {
          if (i == 2) {
            el.classList.add('card-3-first');
            el.style.left = width + 135 + 'px';
          } else if (i == 1) {
            el.classList.add('card-1', 'active');
            el.style.left = width + 30 + 'px';
          } else if (i == 0) {
            el.classList.add('card-2');
            el.style.left = width - 80 + 'px';
          } else if (i == 3) {
            el.classList.add('card-3');
            el.style.left = width + 150 + 'px';
          } else if (i == 4) {
            el.classList.add('card-3');
            el.style.left = width + 'px';
          } else {
            el.style.left = width + 'px';
          }
        }

        width += lengthOfSlide;
      });
    } else {
      slidesArray.forEach((el, i) => {
        el.style.left = width + 'px';
        el.classList.remove(
          'card-1',
          'card-2',
          'card-3',
          'card-4',
          'card-5',
          'active'
        );
        if (i == 2) {
          el.classList.add('card-5');
          el.style.left = width + 'px';
        } else if (i == 1) {
          el.classList.add('card-2');
          el.style.left = width + 'px';
        } else if (i == 0) {
          el.classList.add('card-1', 'active');
          el.style.left = width + 110 + 'px';
        } else if (i == 3) {
          el.classList.add('card-3');
          el.style.left = width + 100 + 'px';
        } else if (i == 4) {
          el.style.left = width + 30 + 'px';
        } else {
          el.style.left = 0 + 'px';
        }
        width += lengthOfSlide;
      });
    }
    this.addElClone();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.isLoaded = false;
    setTimeout(() => {
      this.isLoaded = true;
    }, 0);

    setTimeout(() => {
      this.initializeCarousel();
    }, 1);
  }

  public initializeCarousel() {
    this.carousel = document.querySelector('.carousel');
    this.carouselContent = document.querySelector('.cards');
    this.slides = document.querySelectorAll('.card');
    this.arrayOfSlides = Array.prototype.slice.call(this.slides);

    this.setScreenSize(window.innerWidth);
    this.moveSlidesRight();
    this.next();
  }

  moveSlidesLeft() {
    var slides = document.querySelectorAll('.card');
    var slidesArray = Array.prototype.slice.call(slides);
    slidesArray = slidesArray.reverse();
    var maxWidth = (slidesArray.length - 1) * this.lengthOfSlide;
    let lengthOfSlide = this.lengthOfSlide;

    if (this.carouselDisplaying >= 5) {
      slidesArray.forEach(function (el, i) {
        maxWidth -= lengthOfSlide - 20;
        el.classList.remove('card-1', 'card-2', 'card-3', 'active');
        if (i == 2) {
          el.classList.add('card-1');

          el.style.left = maxWidth - 80 + 'px';
        } else if (i == 3) {
          el.style.left = maxWidth - 60 + 'px';
        } else if (i == 4) {
          el.classList.add('card-2');
          el.style.left = maxWidth + 150 + 'px';
        } else if (i == 0) {
          el.classList.add('card-3');

          el.style.left = maxWidth + 100 + 'px';
        } else {
          el.classList.add('active');
          el.style.left = maxWidth + 10 + 'px';
        }
      });
    } else if (this.carouselDisplaying == 3) {
      slidesArray.forEach(function (el, i) {
        maxWidth -= lengthOfSlide - 20;
        el.classList.remove(
          'card-1',
          'card-2',
          'card-3',
          'card-5',
          'card-4',
          'active'
        );
        if (window.innerWidth >= 1024) {
          if (i == 2) {
            el.classList.add('card-1', 'active');
            el.style.left = maxWidth + 15 + 'px';
          } else if (i == 3) {
            el.classList.add('card-2');
            el.style.left = maxWidth - 50 + 'px';
          } else if (i == 4) {
            el.classList.add('card-3');
            el.style.left = maxWidth + 'px';
          } else if (i == 0) {
            el.classList.add('card-3');
            el.style.left = maxWidth + 80 + 'px';
          } else {
            el.classList.add('card-4');
            el.style.left = maxWidth + 70 + 'px';
          }
        } else {
          if (i == 2) {
            el.classList.add('card-1', 'active');
            el.style.left = maxWidth - 30 + 'px';
          } else if (i == 3) {
            el.classList.add('card-5');
            el.style.left = maxWidth - 170 + 'px';
          } else if (i == 4) {
            el.classList.add('card-4');
            el.style.left = maxWidth + 'px';
          } else if (i == 0) {
            el.classList.add('card-3');
            el.style.left = maxWidth + 80 + 'px';
          } else {
            el.style.left = maxWidth + 110 + 'px';
          }
        }
      });
    } else {
      slidesArray.forEach(function (el, i) {
        maxWidth -= lengthOfSlide - 20;
        el.classList.remove('card-1', 'card-2', 'card-3', 'active');
        if (i == 2) {
          el.classList.add('card-2');
          el.style.left = maxWidth - 65 + 'px';
        } else if (i == 3) {
          el.classList.add('card-1', 'active');
          el.style.left = maxWidth + 25 + 'px';
        } else if (i == 4) {
          el.classList.add('card-3');
          el.style.left = maxWidth + 100 + 'px';
        } else if (i == 0) {
          el.classList.add('card-4');
          el.style.left = maxWidth + 110 + 'px';
        } else {
          el.style.left = maxWidth - 50 + 'px';
        }
      });
    }
  }

  setScreenSize(width: number) {
    if (width >= 1440) {
      this.carouselDisplaying = 5;
    } else if (width >= 768 && width < 1440) {
      this.carouselDisplaying = 3;
    } else {
      this.carouselDisplaying = 1;
    }
    this.getScreenSize();
  }

  getScreenSize() {
    var slides = document.querySelectorAll('.card');
    var slidesArray = Array.prototype.slice.call(slides);

    this.lengthOfSlide =
      this.carouselContent.offsetWidth / this.carouselDisplaying - 10;

    var lengthOfSlide = this.lengthOfSlide;
    var initialWidth = -this.lengthOfSlide;
    let width = this.lengthOfSlide - 35;

    if (this.carouselDisplaying >= 3) {
      slidesArray.forEach(function (el, i) {
        if (lengthOfSlide > 0) {
          el.style.width = 216 + 'px';
          el.style.left = el.offsetWidth + 'px';
          initialWidth += lengthOfSlide;
        }
      });
    } else {
      slidesArray.forEach(function (el, i) {
        if (lengthOfSlide > 0) {
          el.style.width = width / 2 + 'px';
          el.style.left = el.offsetWidth + 'px';
          initialWidth += lengthOfSlide;
        }
      });
    }
  }

  prev() {
    if (this.moving) {
      this.carouselContent = document.querySelector('.cards');
      var lastSlide = this.carouselContent.lastElementChild;
      lastSlide.parentNode.removeChild(lastSlide);
      this.carouselContent.insertBefore(
        lastSlide,
        this.carouselContent.firstChild
      );
      this.removeClone();
      var firstSlide = this.carouselContent.firstElementChild;
      firstSlide.addEventListener('transitionend', this.activateAgain);
      this.moveSlidesRight();
    }
  }

  activateAgain() {
    this.carouselContent = document.querySelector('.cards');
    var firstSlide = this.carouselContent.firstElementChild;
    firstSlide.removeEventListener('transitionend', this.activateAgain);
  }

  next() {
    if (this.moving) {
      this.removeClone();
      var firstSlide = this.carouselContent.firstElementChild;
      firstSlide.addEventListener('transitionend', this.replaceToEnd);
      this.moveSlidesLeft();
    }
  }

  public replaceToEnd = () => {
    this.carouselContent = document.querySelector('.cards');
    this.slides = document.querySelectorAll('.card');
    this.arrayOfSlides = Array.prototype.slice.call(this.slides);
    var firstSlide = this.carouselContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
    this.carouselContent.appendChild(firstSlide);
    if (this.carouselDisplaying == 3) {
      firstSlide.style.left =
        (this.arrayOfSlides.length - 1) * this.lengthOfSlide - 100 + 'px';
    } else {
      firstSlide.style.left =
        (this.arrayOfSlides.length - 1) * this.lengthOfSlide + 80 + 'px';
    }
    this.addElClone();
    this.moving = true;
    firstSlide.removeEventListener('transitionend', this.replaceToEnd);
  };

  seeMovement(e) {
    this.initialX = e.clientX;
    this.getInitialPos();
    this.carouselContent.addEventListener('mousemove', (e) =>
      this.slightMove(e)
    );
    document.addEventListener('mouseup', (e) => this.moveBasedOnMouse(e));
  }

  slightMove(e) {
    if (this.moving) {
      var movingX = e.clientX;
      var difference = this.initialX - movingX;
      if (Math.abs(difference) < this.lengthOfSlide / 4) {
        this.slightMoveSlides(difference);
      }
    }
  }

  getInitialPos() {
    var slides = document.querySelectorAll('.card');
    var slidesArray = Array.prototype.slice.call(slides);
    this.initialPos = [];
    slidesArray.forEach(function (el) {
      var left = Math.floor(parseInt(el.style.left.slice(0, -2)));
      this.initialPos.push(left);
    });
  }

  slightMoveSlides(newX) {
    var slides = document.querySelectorAll('.card');
    var slidesArray = Array.prototype.slice.call(slides);
    slidesArray.forEach(function (el, i) {
      var oldLeft = this.initialPos[i];
      el.style.left = oldLeft + newX + 'px';
    });
  }

  moveBasedOnMouse(e) {
    var finalX = e.clientX;
    if (this.initialX - finalX > 0) {
      this.prev();
    } else if (this.initialX - finalX < 0) {
      this.next();
    }
    document.removeEventListener('mouseup', (e) => this.moveBasedOnMouse(e));
    this.carouselContent.removeEventListener('mousemove', (e) =>
      this.slightMove(e)
    );
  }

  public removeClassByPrefix = (node, prefix) => {
    let regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
    node.className = node.className.replace(regx, '');
    return node;
  };
}
