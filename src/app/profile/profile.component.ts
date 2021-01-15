import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Game} from '../models/game';
import {GameService} from '../services/game.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public games: Game[];
  public api = environment.apiUrl;

  constructor(private authService: AuthService, private gameService: GameService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (user: User) => {
        this.user = user;
        this.getGamesByUser();
      },
      (error) => {
        console.log(error);
        localStorage.clear();
      }
    );
  }

  public getGamesByUser(): void{
    this.gameService.getGames(this.user.id).subscribe(
      (response) => {
        this.games = response[0].games;
        console.log(response[0].games);
      }
    );
  }

}
