import { Action, IActionRegistry } from './Rules/Action';
import { Added, IAddedRegistry } from './Rules/Added';
import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import MandatoryPlayerAction from './MandatoryPlayerAction';
import PlayerAction from './PlayerAction';

interface IPlayer extends IDataObject {
  getAction(): PlayerAction;
  getActions(): PlayerAction[];
  hasActions(): boolean;
  civilization(): Civilization;
  setCivilization(civilization: Civilization): void;
  id(): number;
  getMandatoryAction(): MandatoryPlayerAction;
  getMandatoryActions(): MandatoryPlayerAction[];
  hasMandatoryActions(): boolean;
}

export class Player extends DataObject implements IPlayer {
  static id: number = 0;

  #civilization: Civilization | null = null;
  #id: number;
  #ruleRegistry: RuleRegistry;

  constructor(ruleRegistry: RuleRegistry = ruleRegistryInstance) {
    super();

    this.#id = Player.id++;
    this.#ruleRegistry = ruleRegistry;

    (this.#ruleRegistry as IAddedRegistry).process(Added, this);

    this.addKey('civilization');
  }

  getAction(): PlayerAction {
    const [action] = this.getActions();

    return action;
  }

  getActions(): PlayerAction[] {
    return (this.#ruleRegistry as IActionRegistry).process(Action, this).flat();
  }

  hasActions(): boolean {
    return !!this.getAction();
  }

  civilization(): Civilization {
    if (this.#civilization === null) {
      throw new TypeError('Player#civilization is unset.');
    }

    return this.#civilization;
  }

  setCivilization(civilization: Civilization): void {
    this.#civilization = civilization;
  }

  id(): number {
    return this.#id;
  }

  getMandatoryAction(): MandatoryPlayerAction {
    const [action] = this.getMandatoryActions();

    return action;
  }

  getMandatoryActions(): MandatoryPlayerAction[] {
    return this.getActions().filter(
      (action: PlayerAction): boolean => action instanceof MandatoryPlayerAction
    );
  }

  hasMandatoryActions(): boolean {
    return this.getActions().some(
      (action: PlayerAction): boolean => action instanceof MandatoryPlayerAction
    );
  }
}

export default Player;
