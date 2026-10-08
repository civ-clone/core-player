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
  mandatoryAction(): MandatoryPlayerAction | undefined;
  mandatoryActions(): MandatoryPlayerAction[];
  setCivilization(civilization: Civilization): void;
}

export class Player extends DataObject implements IPlayer {
  static readonly transient = ['_ruleRegistry'];
  private _civilization: Civilization | null = null;
  private _ruleRegistry: RuleRegistry;

  constructor(ruleRegistry: RuleRegistry = ruleRegistryInstance) {
    super();

    this._ruleRegistry = ruleRegistry;

    this._ruleRegistry.process(Added, this);

    this.addKey('actions', 'civilization', 'mandatoryActions');
  }

  action(): PlayerAction {
    const [action] = this.actions();

    return action;
  }

  actions(): PlayerAction[] {
    return this._ruleRegistry
      .process(Action, this)
      .flat()
      .filter(
        (action: PlayerAction): boolean =>
          !(action instanceof HiddenPlayerAction)
      );
  }

  civilization(): Civilization {
    if (this._civilization === null) {
      throw new TypeError('Player#civilization is unset.');
    }

    return this._civilization;
  }

  hasActions(): boolean {
    return !!this.action();
  }

  hasMandatoryActions(): boolean {
    return this.firstMandatoryAction() !== undefined;
  }

  hiddenActions(): HiddenPlayerAction[] {
    return this._ruleRegistry
      .process(Action, this)
      .flat()
      .filter(
        (action: PlayerAction): boolean => action instanceof HiddenPlayerAction
      );
  }

  /** `undefined` when there are none. */
  mandatoryAction(): MandatoryPlayerAction | undefined {
    return this.firstMandatoryAction();
  }

  /**
   * The first of `mandatoryActions()`, without building the rest.
   *
   * The `Action` rules run in order and this stops at the first one that
   * offers a `MandatoryPlayerAction`. An AI asks for the next action once per
   * action it takes, and building every action each time was most of the cost
   * of a late-game turn's action handling (civ-clone/web-renderer#314).
   *
   * Unlike `RuleRegistry.process`, each rule is processed before the next one
   * is validated. `Action` rules only build `PlayerAction`s, so the action
   * found is the same as `mandatoryActions()[0]`.
   */
  private firstMandatoryAction(): MandatoryPlayerAction | undefined {
    const rules = this._ruleRegistry.get(Action);

    for (let index = 0; index < rules.length; index++) {
      if (!rules[index].validate(this)) {
        continue;
      }

      const actions = [rules[index].process(this) ?? []].flat();

      for (let actionIndex = 0; actionIndex < actions.length; actionIndex++) {
        if (actions[actionIndex] instanceof MandatoryPlayerAction) {
          return actions[actionIndex] as MandatoryPlayerAction;
        }
      }
    }

    return undefined;
  }

  mandatoryActions(): MandatoryPlayerAction[] {
    return this.actions().filter(
      (action: PlayerAction): boolean => action instanceof MandatoryPlayerAction
    );
  }

  setCivilization(civilization: Civilization): void {
    this._civilization = civilization;
  }
}

export default Player;
