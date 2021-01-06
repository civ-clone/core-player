import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Player from '../Player';
import PlayerAction from '../PlayerAction';
import Rule from '@civ-clone/core-rule/Rule';
export declare class Action extends Rule<[Player], PlayerAction[]> {}
export default Action;
export interface IActionRegistry
  extends IRuleRegistry<Action, [Player], PlayerAction[]> {}
