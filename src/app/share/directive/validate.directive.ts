import { Directive, ElementRef, HostListener, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AccessTokenService } from '../service/tokenService/access-token.service'
@Directive({
  selector: '[appValidate]'
})
export class ValidateDirective {
  constructor(
    public accessToken: AccessTokenService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) { }
  @Input() set appValidate(islogin: Boolean) {
    let username = JSON.parse(this.accessToken.getLocalStorage('currentUser')).username;
    if (islogin==username) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear();
    }
  }
}
