import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headersList = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private api: string = environment.apiUrl;

  public isAuth = false;
  public isAuthSubject = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {
    this.isAuthenticated();
  }

  public isAuthenticated(): void {
    if(localStorage.getItem('token') !== null){
      this.isAuth = true;
    }
  }

  public emitAuth(): void{
    this.isAuthSubject.next(this.isAuth);
  }

  public setToken(user: User): void{
    if (!user.password){
      const tokenClear = atob(localStorage.getItem('token'));
      user.password = tokenClear.split(':')[1];
    }

    let token = `${user.email}:${user.password}`;
    token = btoa(token);
    localStorage.setItem('token', token);
  }

  public addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${this.api}/api/user/create`, user).subscribe(
        (response: any) => resolve(response.user),
        (error) => reject(error)
      );
    });
  }

  public signin(user: User): Observable<User> {
    this.setToken(user);
    return this.getUser();
  }

  public getUser(): Observable<User> {
    this.updateHeaders();
    return this.httpClient.get<User>(`${this.api}/api/user/me`, this.headersList);
  }

  public updateUser(user: User): Promise<User> {
    this.updateHeaders();
    console.log(user);
    return new Promise((resolve, reject) => {
      this.httpClient.post<any>(`${this.api}/api/user/me`, user, this.headersList).subscribe(
        (data) => {
          console.log(data);
          this.setToken(user);
          resolve(data.user);
        },
        error => reject(error)
      );
    });
  }

  private updateHeaders(): void {
    this.headersList.headers = this.headersList.headers.set('X-Authorization', localStorage.getItem('token'));
  }
}
