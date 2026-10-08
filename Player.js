"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Action_1 = require("./Rules/Action");
const Added_1 = require("./Rules/Added");
const HiddenPlayerAction_1 = require("./HiddenPlayerAction");
const MandatoryPlayerAction_1 = require("./MandatoryPlayerAction");
class Player extends DataObject_1.DataObject {
    constructor(ruleRegistry = RuleRegistry_1.instance) {
        super();
        this._civilization = null;
        this._ruleRegistry = ruleRegistry;
        this._ruleRegistry.process(Added_1.default, this);
        this.addKey('actions', 'civilization', 'mandatoryActions');
    }
    action() {
        const [action] = this.actions();
        return action;
    }
    actions() {
        return this._ruleRegistry
            .process(Action_1.default, this)
            .flat()
            .filter((action) => !(action instanceof HiddenPlayerAction_1.default));
    }
    civilization() {
        if (this._civilization === null) {
            throw new TypeError('Player#civilization is unset.');
        }
        return this._civilization;
    }
    hasActions() {
        return !!this.action();
    }
    hasMandatoryActions() {
        return this.firstMandatoryAction() !== undefined;
    }
    hiddenActions() {
        return this._ruleRegistry
            .process(Action_1.default, this)
            .flat()
            .filter((action) => action instanceof HiddenPlayerAction_1.default);
    }
    /** `undefined` when there are none. */
    mandatoryAction() {
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
    firstMandatoryAction() {
        var _a;
        const rules = this._ruleRegistry.get(Action_1.default);
        for (let index = 0; index < rules.length; index++) {
            if (!rules[index].validate(this)) {
                continue;
            }
            const actions = [(_a = rules[index].process(this)) !== null && _a !== void 0 ? _a : []].flat();
            for (let actionIndex = 0; actionIndex < actions.length; actionIndex++) {
                if (actions[actionIndex] instanceof MandatoryPlayerAction_1.default) {
                    return actions[actionIndex];
                }
            }
        }
        return undefined;
    }
    mandatoryActions() {
        return this.actions().filter((action) => action instanceof MandatoryPlayerAction_1.default);
    }
    setCivilization(civilization) {
        this._civilization = civilization;
    }
}
exports.Player = Player;
Player.transient = ['_ruleRegistry'];
exports.default = Player;
//# sourceMappingURL=Player.js.map