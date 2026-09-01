"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerAction = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class PlayerAction extends DataObject_1.DataObject {
    constructor(player, value) {
        super();
        this._player = player;
        this._value = value;
        this.addKey('value');
    }
    player() {
        return this._player;
    }
    value() {
        return this._value;
    }
}
exports.PlayerAction = PlayerAction;
exports.default = PlayerAction;
//# sourceMappingURL=PlayerAction.js.map