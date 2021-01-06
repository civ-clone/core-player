import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Player from './Player';

export interface IPlayerRegistry extends IEntityRegistry<Player> {}

export class PlayerRegistry
  extends EntityRegistry<Player>
  implements IPlayerRegistry {
  constructor() {
    super(Player);
  }
}

export default PlayerRegistry;

export const instance: PlayerRegistry = new PlayerRegistry();
