import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import Player from './Player';

export interface IPlayerAction extends IDataObject {
  player(): Player;
  value(): any;
}

export class PlayerAction<T = any> extends DataObject implements IPlayerAction {
  private _player: Player;
  private _value: T;

  constructor(player: Player, value: T) {
    super();

    this._player = player;
    this._value = value;

    this.addKey('value');
  }

  public player(): Player {
    return this._player;
  }

  public value(): T {
    return this._value;
  }
}

export default PlayerAction;
