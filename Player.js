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
var _civilization, _id, _ruleRegistry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Action_1 = require("./Rules/Action");
const Added_1 = require("./Rules/Added");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const MandatoryPlayerAction_1 = require("./MandatoryPlayerAction");
class Player extends DataObject_1.DataObject {
    constructor(ruleRegistry = RuleRegistry_1.instance) {
        super();
        _civilization.set(this, null);
        _id.set(this, void 0);
        _ruleRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _id, Player.id++);
        __classPrivateFieldSet(this, _ruleRegistry, ruleRegistry);
        __classPrivateFieldGet(this, _ruleRegistry).process(Added_1.Added, this);
        this.addKey('civilization');
    }
    getAction() {
        const [action] = this.getActions();
        return action;
    }
    getActions() {
        return __classPrivateFieldGet(this, _ruleRegistry).process(Action_1.Action, this).flat();
    }
    hasActions() {
        return !!this.getAction();
    }
    civilization() {
        if (__classPrivateFieldGet(this, _civilization) === null) {
            throw new TypeError('Player#civilization is unset.');
        }
        return __classPrivateFieldGet(this, _civilization);
    }
    setCivilization(civilization) {
        __classPrivateFieldSet(this, _civilization, civilization);
    }
    id() {
        return __classPrivateFieldGet(this, _id);
    }
    getMandatoryAction() {
        const [action] = this.getMandatoryActions();
        return action;
    }
    getMandatoryActions() {
        return this.getActions().filter((action) => action instanceof MandatoryPlayerAction_1.default);
    }
    hasMandatoryActions() {
        return this.getActions().some((action) => action instanceof MandatoryPlayerAction_1.default);
    }
}
exports.Player = Player;
_civilization = new WeakMap(), _id = new WeakMap(), _ruleRegistry = new WeakMap();
Player.id = 0;
exports.default = Player;
//# sourceMappingURL=Player.js.map