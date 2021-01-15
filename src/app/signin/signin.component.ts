import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public authForm: FormGroup;
  public signupUrl: string[] = ['/signup'];
  public alert: object;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void{
    const user: User = this.authForm.value;
    this.authService.signin(user).subscribe(
      () => {
        this.authService.isAuth = true;
        this.authService.emitAuth();
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.alert = {
          className: 'alert error',
          message: 'Votre identifiant ou votre mot de passe est incorrect'
        };
        localStorage.clear();
        this.authService.isAuth = false;
        this.authService.emitAuth();
      }
    );
  }

}
