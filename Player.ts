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
import HiddenPlayerAction from './HiddenPlayerAction';

interface IPlayer extends IDataObject {
  action(): PlayerAction;
  actions(): PlayerAction[];
  hasActions(): boolean;
  civilization(): Civilization;
  setCivilization(civilization: Civilization): void;
  hiddenActions(): HiddenPlayerAction[];
  mandatoryAction(): MandatoryPlayerAction;
  mandatoryActions(): MandatoryPlayerAction[];
  hasMandatoryActions(): boolean;
}

export class Player extends DataObject implements IPlayer {
  #civilization: Civilization | undefined;
  #ruleRegistry: RuleRegistry;

  constructor(ruleRegistry: RuleRegistry = ruleRegistryInstance) {
    super();

    this.#ruleRegistry = ruleRegistry;

    (this.#ruleRegistry as IAddedRegistry).process(Added, this);

    this.addKey('actions', 'civilization', 'mandatoryActions');
  }

  action(): PlayerAction {
    const [action] = this.actions();

    return action;
  }

  actions(): PlayerAction[] {
    return (this.#ruleRegistry as IActionRegistry)
      .process(Action, this)
      .flat()
      .filter(
        (action: PlayerAction): boolean =>
          !(action instanceof HiddenPlayerAction)
      );
  }

  hasActions(): boolean {
    return !!this.action();
  }

  civilization(): Civilization {
    if (this.#civilization === undefined) {
      throw new TypeError('Player#civilization is unset.');
    }

    return this.#civilization;
  }

  setCivilization(civilization: Civilization): void {
    this.#civilization = civilization;
  }

  hiddenActions(): HiddenPlayerAction[] {
    return (this.#ruleRegistry as IActionRegistry)
      .process(Action, this)
      .flat()
      .filter(
        (action: PlayerAction): boolean => action instanceof HiddenPlayerAction
      );
  }

  mandatoryAction(): MandatoryPlayerAction {
    const [action] = this.mandatoryActions();

    return action;
  }

  mandatoryActions(): MandatoryPlayerAction[] {
    return this.actions().filter(
      (action: PlayerAction): boolean => action instanceof MandatoryPlayerAction
    );
  }

  hasMandatoryActions(): boolean {
    return this.actions().some(
      (action: PlayerAction): boolean => action instanceof MandatoryPlayerAction
    );
  }
}

export default Player;
