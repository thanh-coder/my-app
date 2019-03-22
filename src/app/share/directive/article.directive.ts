import { Directive, ElementRef, HostListener, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appArticle]'
})
export class ArticleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) { }
  @Input() set appArticle(islogin: Boolean) {
    if (islogin) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear();
    }
  }
}
