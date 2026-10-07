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
  static readonly transient: string[];
  private _civilization;
  private _ruleRegistry;
  constructor(ruleRegistry?: RuleRegistry);
  action(): PlayerAction;
  actions(): PlayerAction[];
  civilization(): Civilization;
  hasActions(): boolean;
  hasMandatoryActions(): boolean;
  hiddenActions(): HiddenPlayerAction[];
  /** `undefined` when there are none, as before. */
  mandatoryAction(): MandatoryPlayerAction;
  /**
   * The first of `mandatoryActions()`, without building the rest.
   *
   * The `Action` rules run in order and this stops at the first one that
   * offers a `MandatoryPlayerAction`. An AI asks for the next action once per
   * action it takes, and building every action each time was most of the cost
   * of a late-game turn's action handling (civ-clone/web-renderer#314).
   *
   * Unlike `RuleRegistry.process`, each rule is processed before the next one
   * is validated. `Action` rules only build `PlayerAction`s, so the action
   * found is the same as `mandatoryActions()[0]`.
   */
  private firstMandatoryAction;
  mandatoryActions(): MandatoryPlayerAction[];
  setCivilization(civilization: Civilization): void;
}
export default Player;
