import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import Player from './Player';
export interface IPlayerAction extends IDataObject {
  player(): Player;
  value(): any;
}
export declare class PlayerAction<T = any>
  extends DataObject
  implements IPlayerAction
{
  private _player;
  private _value;
  constructor(player: Player, value: T);
  player(): Player;
  value(): T;
}
export default PlayerAction;
