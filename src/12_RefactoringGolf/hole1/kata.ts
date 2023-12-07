/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyPlay) {
      if (player == playerO) {
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
    if (this._board.TileAt(x, y).Player != emptyPlay) {
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
    return this._board.Winner();
  }
}

class Tile {
  private x: number = 0;
  private y: number = 0;
  private player: string = emptyPlay;

  constructor(x: number, y: number, player: string) {
    this.x = x;
    this.y = y;
    this.player = player;
  }

  get Player() {
    return this.player;
  }

  get isNotEmpty() {
    return this.player !== emptyPlay;
  }

  hasSamePlayerAs(other: Tile) {
    return this.player === other.player;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updatePlayer(newPlayer: string) {
    this.player = newPlayer;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        this._plays.push(new Tile(i, j, emptyPlay));
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, emptyPlay)))!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, symbol)))!
    .updatePlayer(symbol);
  }

  public Winner(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this.TileAt(firstRow, firstColumn)!.Player;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this.TileAt(secondRow, firstColumn)!.Player;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this.TileAt(thirdRow, firstColumn)!.Player;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      this.TileAt(row, firstColumn)!.Player != emptyPlay &&
      this.TileAt(row, secondColumn)!.Player != emptyPlay &&
      this.TileAt(row, thirdColumn)!.Player != emptyPlay
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.TileAt(row, firstColumn)!.Player ==
        this.TileAt(row, secondColumn)!.Player &&
      this.TileAt(row, thirdColumn)!.Player == this.TileAt(row, secondColumn)!.Player
    );
  }
}
