import Player from '../Player';
import Rule from '@civ-clone/core-rule/Rule';

export class Defeated extends Rule<[Player, Player | null], void> {}

export default Defeated;
