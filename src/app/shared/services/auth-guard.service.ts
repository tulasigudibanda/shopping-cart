import { Injectable } from '@angular/core';
//import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../../auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { auth } from 'firebase';
import { map} from 'rxjs/operators';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth : AuthService, private route : Router) { }

  canActivate(route: any , state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user =>
      {if (user) return true;
    
      this.route.navigate(['/login'] , {queryParams: { returnUrl : state.url }});
      return false;
      }));
  }
}
