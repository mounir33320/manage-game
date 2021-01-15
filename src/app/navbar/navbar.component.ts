import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public connected = false;
  public authSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthSubject.subscribe(
      (isAuth: boolean) => {
        this.connected = isAuth;
    });
    this.authService.emitAuth();
  }

  public disconnect(): void{
    localStorage.clear();
    this.authService.isAuth = false;
    this.authService.emitAuth();
    this.router.navigate(['signin']);
  }
}
