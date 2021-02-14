import { Directive, ElementRef, Renderer2 } from '@angular/core';

/*
 * Directive to set linear-gradient background color on given element.
 */
@Directive({
  selector: '[appHighlight]',
})
export class SetBackgroundColorDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  highlight(backgroundColor1: string, backgroundColor2: string) {
    const value = `linear-gradient(90deg, ${backgroundColor1} 50%, ${backgroundColor2} 100%)`;
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', value);
  }
}
