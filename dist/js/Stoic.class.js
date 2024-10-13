"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Stoic_instances, _Stoic_getTemplate, _Stoic_append;
class Stoic {
    constructor(params = {}) {
        _Stoic_instances.add(this);
        this.params = params;
        this.instance = null;
        if (this === null || this === void 0 ? void 0 : this.instance)
            return this.instance;
        this.instance = this;
        console.log("first", this.instance);
        if (!params.root) {
            __classPrivateFieldGet(this, _Stoic_instances, "m", _Stoic_getTemplate).call(this);
            __classPrivateFieldGet(this, _Stoic_instances, "m", _Stoic_append).call(this);
        }
    }
    nextQuote() {
        var _a, _b;
        (_a = this.params.root) === null || _a === void 0 ? void 0 : _a.classList.remove("stoic_show");
        (_b = this.params.root) === null || _b === void 0 ? void 0 : _b.classList.add("stoic_hide");
        setTimeout(() => {
            var _a, _b;
            (_a = this.params.root) === null || _a === void 0 ? void 0 : _a.classList.remove("stoic_hide");
            (_b = this.params.root) === null || _b === void 0 ? void 0 : _b.classList.add("stoic_show");
        }, 500);
    }
}
_Stoic_instances = new WeakSet(), _Stoic_getTemplate = function _Stoic_getTemplate() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
        <div class="stoic">
            <backquote class="stoic__backquote">
                If anyone tells you that a certain person speaks ill of you, do not make
                excuses about what is said of you but answer, \"He was ignorant of my other
                faults, else he would not have mentioned these alone.\"
            </backquote>
            <p class="stoic__author">Epictetus</p>
        </div>
    `;
    this.params.root = wrapper === null || wrapper === void 0 ? void 0 : wrapper.children[0];
}, _Stoic_append = function _Stoic_append() {
    if (this.params.root instanceof Node)
        document.body.append(this.params.root);
};
//# sourceMappingURL=Stoic.class.js.map