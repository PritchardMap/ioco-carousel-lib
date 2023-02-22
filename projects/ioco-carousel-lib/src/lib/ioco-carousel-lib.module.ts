import { IconsModule } from './icons/icons.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IocoCarouselLibComponent } from './ioco-carousel-lib.component';

@NgModule({
  declarations: [IocoCarouselLibComponent],
  imports: [CommonModule, IconsModule],
  exports: [IocoCarouselLibComponent],
})
export class IocoCarouselLibModule {}
