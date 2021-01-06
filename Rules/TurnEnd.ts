import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Player from '../Player';
import Rule from '@civ-clone/core-rule/Rule';

type TurnEndArgs = [Player];

export class TurnEnd extends Rule<TurnEndArgs, void> {}

export default TurnEnd;

export interface ITurnEndRegistry
  extends IRuleRegistry<TurnEnd, TurnEndArgs, void> {}
