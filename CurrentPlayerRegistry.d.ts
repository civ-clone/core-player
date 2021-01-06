import { PlayerRegistry, IPlayerRegistry } from './PlayerRegistry';
export declare class CurrentPlayerRegistry
  extends PlayerRegistry
  implements IPlayerRegistry {}
export default CurrentPlayerRegistry;
export declare const instance: CurrentPlayerRegistry;
