"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Player_civilization, _Player_ruleRegistry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Action_1 = require("./Rules/Action");
const Added_1 = require("./Rules/Added");
const MandatoryPlayerAction_1 = require("./MandatoryPlayerAction");
const HiddenPlayerAction_1 = require("./HiddenPlayerAction");
class Player extends DataObject_1.DataObject {
    constructor(ruleRegistry = RuleRegistry_1.instance) {
        super();
        _Player_civilization.set(this, void 0);
        _Player_ruleRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _Player_ruleRegistry, ruleRegistry, "f");
        __classPrivateFieldGet(this, _Player_ruleRegistry, "f").process(Added_1.default, this);
        this.addKey('actions', 'civilization', 'mandatoryActions');
    }
    action() {
        const [action] = this.actions();
        return action;
    }
    actions() {
        return __classPrivateFieldGet(this, _Player_ruleRegistry, "f")
            .process(Action_1.default, this)
            .flat()
            .filter((action) => !(action instanceof HiddenPlayerAction_1.default));
    }
    hasActions() {
        return !!this.action();
    }
    civilization() {
        if (__classPrivateFieldGet(this, _Player_civilization, "f") === undefined) {
            throw new TypeError('Player#civilization is unset.');
        }
        return __classPrivateFieldGet(this, _Player_civilization, "f");
    }
    setCivilization(civilization) {
        __classPrivateFieldSet(this, _Player_civilization, civilization, "f");
    }
    hiddenActions() {
        return __classPrivateFieldGet(this, _Player_ruleRegistry, "f")
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
    hasMandatoryActions() {
        return this.actions().some((action) => action instanceof MandatoryPlayerAction_1.default);
    }
}
exports.Player = Player;
_Player_civilization = new WeakMap(), _Player_ruleRegistry = new WeakMap();
exports.default = Player;
//# sourceMappingURL=Player.js.map