import { Directive, ElementRef, HostListener, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AccessTokenService } from '../service/tokenService/access-token.service'
@Directive({
  selector: '[appNoUser]'
})
export class NoUserDirective {

  constructor(
    public accessToken: AccessTokenService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) { }
  @Input() set appNoUser(islogin: Boolean) {
    let username = JSON.parse(this.accessToken.getLocalStorage('currentUser')).username;
    if (islogin!=username) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear();
    }
  }
}
