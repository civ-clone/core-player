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
        return this.actions().some((action) => action instanceof MandatoryPlayerAction_1.default);
    }
    hiddenActions() {
        return this._ruleRegistry
            .process(Action_1.default, this)
            .flat()
            .filter((action) => action instanceof HiddenPlayerAction_1.default);
    }
    mandatoryAction() {
        const [action] = this.mandatoryActions();
        return action;
    }
    mandatoryActions() {
        return this.actions().filter((action) => action instanceof MandatoryPlayerAction_1.default);
    }
    setCivilization(civilization) {
        this._civilization = civilization;
    }
}
exports.Player = Player;
exports.default = Player;
//# sourceMappingURL=Player.js.map