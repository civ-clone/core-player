"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.PlayerRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const Player_1 = require("./Player");
class PlayerRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(Player_1.default);
    }
}
exports.PlayerRegistry = PlayerRegistry;
exports.default = PlayerRegistry;
exports.instance = new PlayerRegistry();
//# sourceMappingURL=PlayerRegistry.js.map