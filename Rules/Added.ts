import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Player from '../Player';
import Rule from '@civ-clone/core-rule/Rule';

export class Added extends Rule<[Player], void> {}

export default Added;

export interface IAddedRegistry extends IRuleRegistry<Added, [Player], void> {}
