import { Directive, ElementRef, HostListener, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AccessTokenService } from '../service/tokenService/access-token.service'

@Directive({
  selector: '[appProfile]'
})
export class ProfileDirective {

  constructor(
    public accessToken: AccessTokenService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) { }
  @Input() set appProfile(islogin: Boolean) {
    if (islogin) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear();
    }
  }
}