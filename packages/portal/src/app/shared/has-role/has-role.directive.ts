import { Directive, Input, TemplateRef, ViewContainerRef, inject } from "@angular/core";
import { AuthService } from "../authentication/auth.service";
import { UserRole } from "../user/user.service";

@Directive({
  selector: "[appHasRole]",
  standalone: true,
})
export class HasRoleDirective {
  @Input() set appHasRole(roles: UserRole[]) {
    if (this.authService.hasRole(roles)) {
      this.show();
    } else {
      this.hide();
    }
  }

  private authService = inject(AuthService);

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef
  ) {}

  hide() {
    this.viewContainerRef.clear();
  }

  show() {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }
}
