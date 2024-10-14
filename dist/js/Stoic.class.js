"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Stoic_instances, _Stoic_getOuterTemplate, _Stoic_setInnerTemplate, _Stoic_initListeners, _Stoic_append, _Stoic_setPosition, _Stoic_setPositionX, _Stoic_setPositionY, _Stoic_resetPositions;
const initialParams = {
    margin: "20px",
    width: "300px",
    positionX: "center",
    positionY: "center",
};
class Stoic {
    constructor(params = initialParams) {
        var _a;
        _Stoic_instances.add(this);
        this.params = params;
        if (Stoic.instance) {
            console.log("already exist", params);
            Stoic.instance.params = Object.assign(Object.assign({}, initialParams), params);
            __classPrivateFieldGet((_a = Stoic.instance), _Stoic_instances, "m", _Stoic_setPosition).call(_a);
            return Stoic.instance;
        }
        this.params = Object.assign(Object.assign({}, initialParams), params);
        Stoic.instance = this;
        console.log("first", Stoic.instance);
        if (!params.root) {
            __classPrivateFieldGet(this, _Stoic_instances, "m", _Stoic_getOuterTemplate).call(this);
            __classPrivateFieldGet(this, _Stoic_instances, "m", _Stoic_setPosition).call(this);
            __classPrivateFieldGet(this, _Stoic_instances, "m", _Stoic_append).call(this);
        }
        else
            __classPrivateFieldGet(this, _Stoic_instances, "m", _Stoic_setInnerTemplate).call(this);
        __classPrivateFieldGet(this, _Stoic_instances, "m", _Stoic_initListeners).call(this);
    }
    nextQuote() {
        var _a, _b;
        (_a = this.params.root) === null || _a === void 0 ? void 0 : _a.classList.remove("stoic_showText");
        (_b = this.params.root) === null || _b === void 0 ? void 0 : _b.classList.add("stoic_hideText");
        setTimeout(() => {
            var _a, _b;
            (_a = this.params.root) === null || _a === void 0 ? void 0 : _a.classList.remove("stoic_hideText");
            (_b = this.params.root) === null || _b === void 0 ? void 0 : _b.classList.add("stoic_showText");
        }, 500);
    }
    hide() {
        var _a;
        (_a = this.params.root) === null || _a === void 0 ? void 0 : _a.classList.add("stoic_hide");
    }
    show() {
        var _a;
        (_a = this.params.root) === null || _a === void 0 ? void 0 : _a.classList.remove("stoic_hide");
    }
}
_Stoic_instances = new WeakSet(), _Stoic_getOuterTemplate = function _Stoic_getOuterTemplate() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
        <div class="stoic">
            <backquote class="stoic__backquote">
                If anyone tells you that a certain person speaks ill of you, do not make
                excuses about what is said of you but answer, \"He was ignorant of my other
                faults, else he would not have mentioned these alone.\"
            </backquote>
            <p class="stoic__author">Epictetus</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    `;
    this.params.root = wrapper === null || wrapper === void 0 ? void 0 : wrapper.children[0];
}, _Stoic_setInnerTemplate = function _Stoic_setInnerTemplate() {
    if (this.params.root)
        this.params.root.innerHTML = `
            <backquote class="stoic__backquote">
                If anyone tells you that a certain person speaks ill of you, do not make
                excuses about what is said of you but answer, \"He was ignorant of my other
                faults, else he would not have mentioned these alone.\"
            </backquote>
            <p class="stoic__author">Epictetus</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    `;
}, _Stoic_initListeners = function _Stoic_initListeners() {
    var _a, _b;
    (_b = (_a = this.params.root) === null || _a === void 0 ? void 0 : _a.querySelector("svg")) === null || _b === void 0 ? void 0 : _b.addEventListener("pointerup", () => {
        console.log("first");
        this.hide();
    });
}, _Stoic_append = function _Stoic_append() {
    if (this.params.root instanceof Node)
        document.body.append(this.params.root);
}, _Stoic_setPosition = function _Stoic_setPosition() {
    __classPrivateFieldGet(this, _Stoic_instances, "m", _Stoic_resetPositions).call(this);
    __classPrivateFieldGet(this, _Stoic_instances, "m", _Stoic_setPositionX).call(this);
    __classPrivateFieldGet(this, _Stoic_instances, "m", _Stoic_setPositionY).call(this);
}, _Stoic_setPositionX = function _Stoic_setPositionX() {
    var _a, _b, _c, _d;
    if ((_a = this.params.root) === null || _a === void 0 ? void 0 : _a.style)
        switch (this.params.positionX) {
            case "left":
                this.params.root.style.left = (_b = this.params.margin) !== null && _b !== void 0 ? _b : "0";
                break;
            // return { left: this.params.margin };
            case "right":
                this.params.root.style.right = (_c = this.params.margin) !== null && _c !== void 0 ? _c : "0";
                break;
            default:
                this.params.root.style.left = `calc(50% - ${parseInt((_d = this.params.width) !== null && _d !== void 0 ? _d : "0") / 2}px)`;
        }
}, _Stoic_setPositionY = function _Stoic_setPositionY() {
    var _a, _b;
    if (this.params.root)
        switch (this.params.positionY) {
            case "top":
                this.params.root.style.top = (_a = this.params.margin) !== null && _a !== void 0 ? _a : "0";
                break;
            case "bottom":
                this.params.root.style.bottom = (_b = this.params.margin) !== null && _b !== void 0 ? _b : "0";
                break;
            default:
                this.params.root.style.top = "40%";
        }
}, _Stoic_resetPositions = function _Stoic_resetPositions() {
    if (this.params.root) {
        this.params.root.style.top = "initial";
        this.params.root.style.bottom = "initial";
        this.params.root.style.left = "initial";
        this.params.root.style.right = "initial";
    }
};
//# sourceMappingURL=Stoic.class.js.map