import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import Player from './Player';
export interface IPlayerAction extends IDataObject {
  player(): Player;
  value(): any;
}
export declare class PlayerAction extends DataObject implements IPlayerAction {
  #private;
  constructor(player: Player, value: any);
  player(): Player;
  value(): any;
}
export default PlayerAction;
