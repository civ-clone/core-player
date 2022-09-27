import Player from '../Player';
import Rule from '@civ-clone/core-rule/Rule';

type TurnStartArgs = [Player];

export class TurnStart extends Rule<TurnStartArgs, void> {}

export default TurnStart;
