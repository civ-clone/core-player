import { PlayerRegistry, IPlayerRegistry } from './PlayerRegistry';

export class CurrentPlayerRegistry
  extends PlayerRegistry
  implements IPlayerRegistry {}

export default CurrentPlayerRegistry;

export const instance: CurrentPlayerRegistry = new CurrentPlayerRegistry();
