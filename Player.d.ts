import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import HiddenPlayerAction from './HiddenPlayerAction';
import MandatoryPlayerAction from './MandatoryPlayerAction';
import PlayerAction from './PlayerAction';
interface IPlayer extends IDataObject {
  action(): PlayerAction;
  actions(): PlayerAction[];
  civilization(): Civilization;
  hasActions(): boolean;
  hasMandatoryActions(): boolean;
  hiddenActions(): HiddenPlayerAction[];
  mandatoryAction(): MandatoryPlayerAction;
  mandatoryActions(): MandatoryPlayerAction[];
  setCivilization(civilization: Civilization): void;
}
export declare class Player extends DataObject implements IPlayer {
  #private;
  constructor(ruleRegistry?: RuleRegistry);
  action(): PlayerAction;
  actions(): PlayerAction[];
  civilization(): Civilization;
  hasActions(): boolean;
  hasMandatoryActions(): boolean;
  hiddenActions(): HiddenPlayerAction[];
  mandatoryAction(): MandatoryPlayerAction;
  mandatoryActions(): MandatoryPlayerAction[];
  setCivilization(civilization: Civilization): void;
}
export default Player;
