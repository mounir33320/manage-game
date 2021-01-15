import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Game} from '../models/game';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api = environment.apiUrl;
  private headersList = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public createGame(game: Game): Observable<any> {
    this.updateHeaders();
    return this.httpClient.post<any>(`${this.api}/api/game`, game, this.headersList);
  }

  private updateHeaders(): void {
    this.headersList.headers = this.headersList.headers.set('X-Authorization', localStorage.getItem('token'));
  }

  public getGames(id: number): Observable<any[]> {
    this.updateHeaders();
    return this.httpClient.get<any[]>(`${this.api}/api/user/${id}/home`, this.headersList);
  }
}
