import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Action from '../Rules/Action';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '../Player';
import PlayerAction from '../PlayerAction';
import MandatoryPlayerAction from '../MandatoryPlayerAction';
import HiddenPlayerAction from '../HiddenPlayerAction';
import Criterion from '@civ-clone/core-rule/Criterion';
import { expect } from 'chai';

describe('Player', (): void => {
  it('should not include `HiddenPlayerAction`s in the return from `#actions`.', (): void => {
    const ruleRegistry = new RuleRegistry(),
      player = new Player(ruleRegistry);

    ruleRegistry.register(
      new Action(
        new Effect((): PlayerAction[] => [
          new PlayerAction(player, 1),
          new MandatoryPlayerAction(player, 2),
          new HiddenPlayerAction(player, 3),
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

  it('should return the first mandatory action without processing the rules after it.', (): void => {
    const ruleRegistry = new RuleRegistry(),
      player = new Player(ruleRegistry),
      processed: number[] = [];

    ruleRegistry.register(
      new Action(
        new Effect((): PlayerAction[] => {
          processed.push(1);

          return [new PlayerAction(player, 1)];
        })
      ),
      new Action(
        new Criterion((): boolean => false),
        new Effect((): PlayerAction[] => {
          processed.push(2);

          return [new MandatoryPlayerAction(player, 2)];
        })
      ),
      new Action(
        new Effect((): PlayerAction[] => {
          processed.push(3);

          return [
            new HiddenPlayerAction(player, 3),
            new MandatoryPlayerAction(player, 4),
            new MandatoryPlayerAction(player, 5),
          ];
        })
      ),
      new Action(
        new Effect((): PlayerAction[] => {
          processed.push(6);

          return [new MandatoryPlayerAction(player, 6)];
        })
      )
    );

    expect(player.mandatoryAction()?.value()).equal(4);
    expect(processed).deep.equal([1, 3]);
    expect(player.hasMandatoryActions()).true;
    expect(
      player.mandatoryActions().map((action) => action.value())
    ).deep.equal([4, 5, 6]);
  });

  it('should have no mandatory action when no rule offers one.', (): void => {
    const ruleRegistry = new RuleRegistry(),
      player = new Player(ruleRegistry);

    ruleRegistry.register(
      new Action(
        new Effect((): PlayerAction[] => [new PlayerAction(player, 1)])
      )
    );

    expect(player.hasMandatoryActions()).false;
    expect(player.mandatoryAction()).undefined;
  });
});
