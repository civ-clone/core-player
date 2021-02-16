import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Action from '../Rules/Action';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '../Player';
import PlayerAction from '../PlayerAction';
import MandatoryPlayerAction from '../MandatoryPlayerAction';
import HiddenPlayerAction from '../HiddenPlayerAction';
import { expect } from 'chai';

describe('Player', (): void => {
  it('should not include `HiddenPlayerAction`s in the return from `#actions`.', (): void => {
    const ruleRegistry = new RuleRegistry(),
      player = new Player(ruleRegistry);

    ruleRegistry.register(
      new Action(
        new Effect((): PlayerAction[] => [
          new PlayerAction(1),
          new MandatoryPlayerAction(2),
          new HiddenPlayerAction(3),
        ])
      )
    );

    const actions = player.actions(),
      hiddenActions = player.hiddenActions();

    expect(actions.length).equal(2);
    expect(hiddenActions.length).equal(1);
    expect(
      actions.some(
        (action: PlayerAction): boolean => action instanceof HiddenPlayerAction
      )
    ).false;
  });
});
