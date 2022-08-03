import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontSize20Directive } from './font-size-20.directive';


@NgModule({
  declarations: [FontSize20Directive],
  imports: [
    CommonModule,
  ],
  exports: [
    FontSize20Directive
  ]
})
export class DirectivesModule { }
