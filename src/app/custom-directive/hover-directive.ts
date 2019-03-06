import { Directive,ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[appHoverDirective]'
})
export class HoverDirective {
    private _defaultColor = 'red';

  constructor(private el: ElementRef, private renderer: Renderer) { }
  @Input('appHoverDirective') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this._defaultColor);
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
    this.renderer.setElementProperty(this.el.nativeElement, 'disabled', true);

      setTimeout(() => {
        this.renderer.setElementProperty(this.el.nativeElement, 'disabled', false);

      }, 3000);

}
}

