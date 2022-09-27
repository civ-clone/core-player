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
  #player: Player;
  #value: T;

  constructor(player: Player, value: T) {
    super();

    this.#player = player;
    this.#value = value;

    this.addKey('value');
  }

  public player(): Player {
    return this.#player;
  }

  public value(): T {
    return this.#value;
  }
}

export default PlayerAction;
