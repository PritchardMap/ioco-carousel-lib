import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChevronLeft, ChevronRight } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

// Select some icons (use an object, not an array)
const icons = {
  ChevronLeft,
  ChevronRight,
};

@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
