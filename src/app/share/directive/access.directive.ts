import { Directive, ElementRef, HostListener, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AccessTokenService } from '../service/tokenService/access-token.service'

@Directive({
  selector: '[appAccess]'
})
export class AccessDirective {

  constructor(

    public accessToken: AccessTokenService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) { }
  @Input() set appAccess(islogin: Boolean) {
    if (islogin) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear();
    }
  }

}


