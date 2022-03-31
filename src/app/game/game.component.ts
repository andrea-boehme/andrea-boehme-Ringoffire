import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  currentCard: string = '';
  game: Game;                   // neue Variale definiert von type "Game"

  constructor(private route: ActivatedRoute, private firestone: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
  
      this.firestone
      .collection('games')
      .doc(params['id'])
      .valueChanges()
      .subscribe((game : any) => {
        console.log('Game update', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;

      });
  });

  }

  newGame(){
    this.game = new Game();     // Variable kriegt ein neues Objekt erstellt (Objektstruktur in game.ts models-Ordner)
    //this.firestone
    //.collection('games')
    //.add(this.game.toJson());
  }

  takeCard(){
    this.game.gameStarted = true;
    if (!this.takeCardAnimation){
    
      this.currentCard = this.game.stack.pop();
      this.takeCardAnimation = true;

      console.log('new card:' + this.currentCard);
      console.log('game is:', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(()=>{
        this.game.playedCards.push(this.currentCard); //neuer string in den Array eingefügt
        this.takeCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0){
        this.game.players.push(name);
      }  
    });
  }
}
