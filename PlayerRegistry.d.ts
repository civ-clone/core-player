import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Player from './Player';
export interface IPlayerRegistry extends IEntityRegistry<Player> {}
export declare class PlayerRegistry
  extends EntityRegistry<Player>
  implements IPlayerRegistry {
  constructor();
}
export default PlayerRegistry;
export declare const instance: PlayerRegistry;
