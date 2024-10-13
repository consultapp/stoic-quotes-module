"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stoic = void 0;
// Singletone Class
class Stoic {
    constructor(root) {
        this.root = root;
        this.instance = null;
        if (this === null || this === void 0 ? void 0 : this.instance)
            return this.instance;
        if (!root) {
            this.root = document.createElement("div");
        }
    }
}
exports.Stoic = Stoic;
//# sourceMappingURL=Stoic.class.js.map