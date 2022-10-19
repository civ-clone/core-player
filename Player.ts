import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Action from './Rules/Action';
import Added from './Rules/Added';
import Civilization from '@civ-clone/core-civilization/Civilization';
import HiddenPlayerAction from './HiddenPlayerAction';
import MandatoryPlayerAction from './MandatoryPlayerAction';
import PlayerAction from './PlayerAction';

interface IPlayer extends IDataObject {
  action(): PlayerAction;
  actions(): PlayerAction[];
  civilization(): Civilization;
  hasActions(): boolean;
  hasMandatoryActions(): boolean;
  hiddenActions(): HiddenPlayerAction[];
  mandatoryAction(): MandatoryPlayerAction;
  mandatoryActions(): MandatoryPlayerAction[];
  setCivilization(civilization: Civilization): void;
}

export class Player extends DataObject implements IPlayer {
  #civilization: Civilization | null = null;
  #ruleRegistry: RuleRegistry;

  constructor(ruleRegistry: RuleRegistry = ruleRegistryInstance) {
    super();

    this.#ruleRegistry = ruleRegistry;

    this.#ruleRegistry.process(Added, this);

    this.addKey('actions', 'civilization', 'mandatoryActions');
  }

  action(): PlayerAction {
    const [action] = this.actions();

    return action;
  }

  actions(): PlayerAction[] {
    return this.#ruleRegistry
      .process(Action, this)
      .flat()
      .filter(
        (action: PlayerAction): boolean =>
          !(action instanceof HiddenPlayerAction)
      );
  }

  civilization(): Civilization {
    if (this.#civilization === null) {
      throw new TypeError('Player#civilization is unset.');
    }

    return this.#civilization;
  }

  hasActions(): boolean {
    return !!this.action();
  }

  hasMandatoryActions(): boolean {
    return this.actions().some(
      (action: PlayerAction): boolean => action instanceof MandatoryPlayerAction
    );
  }

  hiddenActions(): HiddenPlayerAction[] {
    return this.#ruleRegistry
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

  setCivilization(civilization: Civilization): void {
    this.#civilization = civilization;
  }
}

export default Player;
