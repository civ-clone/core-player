import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import MandatoryPlayerAction from './MandatoryPlayerAction';
import PlayerAction from './PlayerAction';
import HiddenPlayerAction from './HiddenPlayerAction';
interface IPlayer extends IDataObject {
  action(): PlayerAction;
  actions(): PlayerAction[];
  hasActions(): boolean;
  civilization(): Civilization;
  setCivilization(civilization: Civilization): void;
  hiddenActions(): HiddenPlayerAction[];
  mandatoryAction(): MandatoryPlayerAction;
  mandatoryActions(): MandatoryPlayerAction[];
  hasMandatoryActions(): boolean;
}
export declare class Player extends DataObject implements IPlayer {
  #private;
  constructor(ruleRegistry?: RuleRegistry);
  action(): PlayerAction;
  actions(): PlayerAction[];
  hasActions(): boolean;
  civilization(): Civilization;
  setCivilization(civilization: Civilization): void;
  hiddenActions(): HiddenPlayerAction[];
  mandatoryAction(): MandatoryPlayerAction;
  mandatoryActions(): MandatoryPlayerAction[];
  hasMandatoryActions(): boolean;
}
export default Player;
