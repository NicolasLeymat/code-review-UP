
const tileVide = ' ';
const tilePleine = 'O';
const size = 3;
const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

export class Game {
  private _lastSymbol = tileVide;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == tileVide) {
      if (player == tilePleine) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol !=tileVide) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(thirdRow, firstColumn)!.Symbol;
    }

    return tileVide;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(firstRow, firstColumn)!.Symbol !=tileVide &&
      this._board.TileAt(firstRow, secondColumn)!.Symbol !=tileVide &&
      this._board.TileAt(firstRow, thirdColumn)!.Symbol !=tileVide
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(firstRow, firstColumn)!.Symbol == this._board.TileAt(0, 1)!.Symbol &&
      this._board.TileAt(firstRow, thirdColumn)!.Symbol == this._board.TileAt(0, 1)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(secondRow, firstColumn)!.Symbol !=tileVide &&
      this._board.TileAt(secondRow, secondColumn)!.Symbol !=tileVide &&
      this._board.TileAt(secondRow, thirdColumn)!.Symbol !=tileVide
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(secondRow, firstColumn)!.Symbol == this._board.TileAt(1, 1)!.Symbol &&
      this._board.TileAt(secondRow, thirdColumn)!.Symbol == this._board.TileAt(1, 1)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(thirdRow, firstColumn)!.Symbol !=tileVide &&
      this._board.TileAt(thirdRow, secondColumn)!.Symbol !=tileVide &&
      this._board.TileAt(thirdRow, thirdColumn)!.Symbol !=tileVide
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(thirdRow, firstColumn)!.Symbol == this._board.TileAt(2, 1)!.Symbol &&
      this._board.TileAt(thirdRow, thirdColumn)!.Symbol == this._board.TileAt(2, 1)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];
  constructor() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {  
        const tile: Tile = { X: i, Y: j, Symbol:tileVide };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
