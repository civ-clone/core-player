import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
export interface IPlayerAction extends IDataObject {
  value(): any;
}
export declare class PlayerAction extends DataObject implements IPlayerAction {
  #private;
  constructor(value: any);
  value(): any;
}
export default PlayerAction;
