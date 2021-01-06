"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CurrentPlayerRegistry = void 0;
const PlayerRegistry_1 = require("./PlayerRegistry");
class CurrentPlayerRegistry extends PlayerRegistry_1.PlayerRegistry {
}
exports.CurrentPlayerRegistry = CurrentPlayerRegistry;
exports.default = CurrentPlayerRegistry;
exports.instance = new CurrentPlayerRegistry();
//# sourceMappingURL=CurrentPlayerRegistry.js.map