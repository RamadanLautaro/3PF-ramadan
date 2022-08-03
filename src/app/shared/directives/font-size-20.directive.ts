import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontSize20]'
})
export class FontSize20Directive {

  constructor(renderer: Renderer2, elementRef: ElementRef) { 
    renderer.setStyle(elementRef.nativeElement, 'font-size', '20px');
  }
}
