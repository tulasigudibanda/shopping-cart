import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { map, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.User>;

  constructor(public afAuth : AngularFireAuth, private route : ActivatedRoute, private userService : UserService) {
    this.user$ = afAuth.authState;

    console.log("In Auth Service constructor");
    
   }
   
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(
      switchMap( user => {
        if (user) return this.userService.get(user.uid).valueChanges();
        return of(null);
        
      }));
  }
}
