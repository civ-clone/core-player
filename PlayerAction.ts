import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';

export interface IPlayerAction extends IDataObject {
  value(): any;
}

export class PlayerAction extends DataObject implements IPlayerAction {
  #value: any;

  constructor(value: any) {
    super();

    this.#value = value;

    this.addKey('value');
  }

  value(): any {
    return this.#value;
  }
}

export default PlayerAction;
