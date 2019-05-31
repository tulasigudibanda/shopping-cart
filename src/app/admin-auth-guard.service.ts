import { Injectable } from '@angular/core';
//import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { map, switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth : AuthService, private userService : UserService) { }

  canActivate() : Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => {
        console.log(appUser);
        return appUser.isAdmin;}));
  }
}
