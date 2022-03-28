import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  currentCard: string = '';
  game: Game;                   // neue Variale definiert von type "Game"

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.game = new Game();     // Variable kriegt ein neues Objekt erstellt (Objektstruktur in game.ts models-Ordner)
    console.log(this.game);
  }

  takeCard(){
    if (!this.takeCardAnimation){
      this.currentCard = this.game.stack.pop();
      this.takeCardAnimation = true;
      console.log('new card:' + this.currentCard);
      console.log('game is:', this.game);

      setTimeout(()=>{
        this.game.playedCards.push(this.currentCard); //neuer string in den Array eingefügt
        this.takeCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
