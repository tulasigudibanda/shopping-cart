import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth : AuthService, private userService : UserService, private router : Router) {
    console.log("Inside APP COMPONENT constructor");

    this.auth.user$.subscribe(user => {
      if (!user) return;

        userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        // console.log(returnUrl);

        if (!returnUrl) return;

        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      
    });
  }
}
