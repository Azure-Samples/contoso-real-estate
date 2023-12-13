import { CanActivateFn } from '@angular/router';
import { environment } from 'src/environments/environment';

export const canActivateChatGuard: CanActivateFn = (route, state) => {
  return Boolean(environment.aiEnableChat);
};
