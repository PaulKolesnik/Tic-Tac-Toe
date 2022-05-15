import { GameStatus } from "./game-status";

export class GameLogic {
      gameField: Array<number> = [];

      currentTurn!: number;

      gameStatus: GameStatus;

      winSituationsOne: Array<Array<number>> = [
            [1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 1, 0, 0],
            [1, 0, 0, 0, 1, 0, 0, 0, 1]
      ]

      winSituationsTwo: Array<Array<number>> = [
            [2, 2, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 2, 2],
            [2, 0, 0, 2, 0, 0, 2, 0, 0],
            [0, 2, 0, 0, 2, 0, 0, 2, 0],
            [0, 0, 2, 0, 0, 2, 0, 0, 2],
            [0, 0, 2, 0, 2, 0, 2, 0, 0],
            [2, 0, 0, 0, 2, 0, 0, 0, 2]
      ]

      constructor() {
            this.gameStatus = GameStatus.Stop;
            this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      }

      gameStart(): void {
            this.gameStatus = GameStatus.Start;
            this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.currentTurn = this.randomPlayerStart();
      }


      randomPlayerStart() {
            return Math.floor(Math.random() * 2) + 1;
      }

      setField(position: number, value: number): void {
            this.gameField[position] = value;
      }

      getPlayerColorClass(): string {
            return this.currentTurn === 2 ? 'player-two' : 'player-one'
      }

      changePlayer(): void {
            this.currentTurn = this.currentTurn === 2 ? 1 : 2;
      }

      async checkGameEndFull(): Promise<boolean> {
            let isFull = true;
            if (this.gameField.includes(0)) {
                  isFull = false;
            }
            if (isFull) {
                  this.gameEnd()
                  return true;
            }
            else {
                  return false;
            }
      }

      gameEnd(): void {
            this.gameStatus = GameStatus.Stop;
      }

      async checkIfHaveWinner(): Promise<boolean> {
            let isWinner = false;

            const winnigArray = (this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo;
            const currentArray: Array<number> = [];
            this.gameField.forEach((subfield, index) => {
                  if (subfield !== this.currentTurn) {
                        currentArray[index] = 0;
                  }
                  else {
                        currentArray[index] = subfield;
                  }
            });

            winnigArray.forEach((checkField, index) => {
                  if (this.arrayEquals(checkField, currentArray)) {
                        isWinner = true;
                  }
            });
            console.log(currentArray);
            if (isWinner) {
                  this.gameEnd()
                  return true;
            }
            else {
                  return false;
            }
      }


      arrayEquals(a: Array<any>, b: Array<any>): boolean {
            return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, index) => {
                return  value == b[index]
            });
      }
}
