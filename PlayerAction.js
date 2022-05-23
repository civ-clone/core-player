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
var _PlayerAction_player, _PlayerAction_value;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerAction = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class PlayerAction extends DataObject_1.DataObject {
    constructor(player, value) {
        super();
        _PlayerAction_player.set(this, void 0);
        _PlayerAction_value.set(this, void 0);
        __classPrivateFieldSet(this, _PlayerAction_player, player, "f");
        __classPrivateFieldSet(this, _PlayerAction_value, value, "f");
        this.addKey('value');
    }
    player() {
        return __classPrivateFieldGet(this, _PlayerAction_player, "f");
    }
    value() {
        return __classPrivateFieldGet(this, _PlayerAction_value, "f");
    }
}
exports.PlayerAction = PlayerAction;
_PlayerAction_player = new WeakMap(), _PlayerAction_value = new WeakMap();
exports.default = PlayerAction;
//# sourceMappingURL=PlayerAction.js.map