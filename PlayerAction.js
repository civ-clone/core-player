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
var _value;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerAction = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class PlayerAction extends DataObject_1.DataObject {
    constructor(value) {
        super();
        _value.set(this, void 0);
        __classPrivateFieldSet(this, _value, value);
        this.addKey('value');
    }
    value() {
        return __classPrivateFieldGet(this, _value);
    }
}
exports.PlayerAction = PlayerAction;
_value = new WeakMap();
exports.default = PlayerAction;
//# sourceMappingURL=PlayerAction.js.map