import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public editForm: FormGroup;
  public user: User;
  public alert: object;
  public picture: string | ArrayBuffer;
  public apiUrl = environment.apiUrl;
  public random = this.getNumberRandom();
  public loading = true;

  constructor(private formbuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.getUser().subscribe(
      (user: User) => {
        this.user = user;
        this.editForm.patchValue({
          pseudo: this.user.pseudo,
          email: this.user.email,
        });
        this.loading = false;
      },
      (error) => {
        console.log(error);
        localStorage.clear();
        this.authService.isAuth = false;
        this.authService.emitAuth();
      }
    );

    this.initForm();
  }

  public initForm(): void{
    this.editForm = this.formbuilder.group({
    pseudo: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    profile_picture: ['']
    });
  }

  public uploadFile(file): void{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.picture = reader.result;
    };

  }

  public onSubmit(): void{
    this.loading = true;
    const file = this.editForm.value.profile_picture;
    if (file && file !== ''){
      this.editForm.value.profile_picture = this.picture;
    }
    this.authService.updateUser(this.editForm.value).then(
      (user) => {
        this.user = user;
        this.random = this.getNumberRandom();
        this.alert = {
          className: 'alert success',
          message: 'Votre profil a été mis à jour'
        };
        this.loading = false;
        this.fadeOut();
      },
      (error) => {
        this.alert = {
          className: 'alert error',
          message: 'Une erreur est survenue...'
        };
        localStorage.clear();
        this.authService.isAuth = false;
        this.authService.emitAuth();
      }
    );
  }

  public getNumberRandom(): number {
    return Math.floor(Math.random() * 9999);
  }

  private fadeOut(): void{
    setTimeout(() => {
      document.querySelector('#message').classList.add('fade-out');
      setTimeout(() => {
        document.querySelector('#message').classList.add('d-none');
        document.querySelector('#message').classList.remove('fade-out');
      }, 2000);
    }, 2000);
  }
}
