"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _civilization, _ruleRegistry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Action_1 = require("./Rules/Action");
const Added_1 = require("./Rules/Added");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const MandatoryPlayerAction_1 = require("./MandatoryPlayerAction");
const HiddenPlayerAction_1 = require("./HiddenPlayerAction");
class Player extends DataObject_1.DataObject {
    constructor(ruleRegistry = RuleRegistry_1.instance) {
        super();
        _civilization.set(this, void 0);
        _ruleRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _ruleRegistry, ruleRegistry);
        __classPrivateFieldGet(this, _ruleRegistry).process(Added_1.Added, this);
        this.addKey('civilization');
    }
    action() {
        const [action] = this.actions();
        return action;
    }
    actions() {
        return __classPrivateFieldGet(this, _ruleRegistry)
            .process(Action_1.Action, this)
            .flat()
            .filter((action) => !(action instanceof HiddenPlayerAction_1.default));
    }
    hasActions() {
        return !!this.action();
    }
    civilization() {
        if (__classPrivateFieldGet(this, _civilization) === undefined) {
            throw new TypeError('Player#civilization is unset.');
        }
        return __classPrivateFieldGet(this, _civilization);
    }
    setCivilization(civilization) {
        __classPrivateFieldSet(this, _civilization, civilization);
    }
    hiddenActions() {
        return __classPrivateFieldGet(this, _ruleRegistry)
            .process(Action_1.Action, this)
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
    hasMandatoryActions() {
        return this.actions().some((action) => action instanceof MandatoryPlayerAction_1.default);
    }
}
exports.Player = Player;
_civilization = new WeakMap(), _ruleRegistry = new WeakMap();
exports.default = Player;
//# sourceMappingURL=Player.js.map