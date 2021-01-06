import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import MandatoryPlayerAction from './MandatoryPlayerAction';
import PlayerAction from './PlayerAction';
interface IPlayer extends IDataObject {
  getAction(): PlayerAction;
  getActions(): PlayerAction[];
  hasActions(): boolean;
  civilization(): Civilization;
  setCivilization(civilization: Civilization): void;
  id(): number;
  getMandatoryAction(): MandatoryPlayerAction;
  getMandatoryActions(): MandatoryPlayerAction[];
  hasMandatoryActions(): boolean;
}
export declare class Player extends DataObject implements IPlayer {
  #private;
  static id: number;
  constructor(ruleRegistry?: RuleRegistry);
  getAction(): PlayerAction;
  getActions(): PlayerAction[];
  hasActions(): boolean;
  civilization(): Civilization;
  setCivilization(civilization: Civilization): void;
  id(): number;
  getMandatoryAction(): MandatoryPlayerAction;
  getMandatoryActions(): MandatoryPlayerAction[];
  hasMandatoryActions(): boolean;
}
export default Player;
