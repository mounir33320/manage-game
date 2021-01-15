import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  private onAccountCreatedSuccess(): void {
    alert('Compte créé');
    this.router.navigate(['signin']);
  }

  public onSubmit(form): void{
    this.authService.addUser(form).then(
      (user) => this.onAccountCreatedSuccess(),
      (error) => {
        console.log(error);
        localStorage.clear();
      }
    );
  }
}
