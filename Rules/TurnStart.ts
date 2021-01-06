import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Player from '../Player';
import Rule from '@civ-clone/core-rule/Rule';

type TurnStartArgs = [Player];

export class TurnStart extends Rule<TurnStartArgs, void> {}

export default TurnStart;

export interface ITurnStartRegistry
  extends IRuleRegistry<TurnStart, TurnStartArgs, void> {}
