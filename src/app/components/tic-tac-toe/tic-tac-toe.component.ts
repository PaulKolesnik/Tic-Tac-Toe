import { Component, OnInit } from '@angular/core';
import { GameLogic } from 'src/app/helper/game-logic';
import { GameStatus } from 'src/app/helper/game-status';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss'],
  providers: [GameLogic]
})
export class TicTacToeComponent implements OnInit {

  constructor(
    public game: GameLogic
  ) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.game.gameStart();
    const currentPlayer = "Current turn: Player: " + this.game.currentTurn;
    const info = document.querySelector('.current-status');
    if (info) {
      info.innerHTML = currentPlayer;
    }
  }

  async clickSubField(subfield: any): Promise<void> {
    if (this.isGameStart()) {
      const position = subfield.currentTarget.getAttribute('position');
      const info = document.querySelector('.current-status');

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.game.checkGameEndFull().then((end: boolean) => {
        if (this.game.gameStatus === GameStatus.Stop && end) {
          if (info) {
            info.innerHTML = "No winner, draw";
          }
        }
      });

      await this.game.checkIfHaveWinner().then((winner: boolean) => {
        if (this.game.gameStatus === GameStatus.Stop && winner) {
          if (info) {
            info.innerHTML = "The Winner is Player:  " + this.game.currentTurn;
          }
        }
      });


      this.game.changePlayer();
      if (this.isGameStart()) {
        const currentPlayer = "Current turn: Player: " + this.game.currentTurn;
        if (info)
          info.innerHTML = currentPlayer;
      }
    }
  }

  isGameStart(): boolean {
    return this.game.gameStatus === GameStatus.Start;
  }

}
