import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ProfileComponent} from './profile/profile.component';
import {CreateGameComponent} from './create-game/create-game.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin',  component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'profile/edit', canActivate: [AuthGuard], component: EditProfileComponent },
  { path: 'game/create', canActivate: [AuthGuard], component: CreateGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
