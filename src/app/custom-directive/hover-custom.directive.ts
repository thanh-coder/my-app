import { Directive,ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[appHoverCustom]'
})
export class HoverCustomDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  @HostListener('click') onClick() {
    this.disableBtn();
}
  private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
  }

  private disableBtn(){

  }

}

