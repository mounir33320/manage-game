import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Game} from '../models/game';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  public gameForm: FormGroup;
  public games: Game;
  public pictures: any[] = [];

  constructor(private formBuilder: FormBuilder, private gameService: GameService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void{
    this.gameForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  public uploadFiles(files): void{
    for (let i = 0; i < files.length; i++){
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        const picture = {
          position: i,
          file: reader.result
        };
        this.pictures.push(picture);
      };
    }
  }

  public onSubmit(): void{
    const game = this.gameForm.value;
    game.pictures = this.pictures;
    this.gameService.createGame(game).subscribe(
      (response) => {
        console.log(response);
      },
      error => console.log(error)
    );
  }
}
