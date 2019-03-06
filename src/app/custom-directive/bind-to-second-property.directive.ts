import { Directive,ElementRef, HostListener, TemplateRef,ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appBindToSecondProperty]'
})
export class BindToSecondPropertyDirective {

  constructor(
    private templateRef:TemplateRef<any>,
    private viewContainerRef:ViewContainerRef) { }
  @Input() set appBindToSecondProperty(ishidden:boolean){
    if(!ishidden){
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }else if(ishidden){
      this.viewContainerRef.clear();

    }
  }

}
