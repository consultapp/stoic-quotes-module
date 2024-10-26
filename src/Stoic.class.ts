const initialParams: Params = {
  margin: "20px",
  width: "300px",
  positionX: "center",
  positionY: "center",
  baseClassName: "stoic",
};

// Singletone Class
class Stoic {
  static instance: Stoic;
  constructor(private params: Params = initialParams) {
    if (Stoic.instance) {
      console.log("already exist", params);
      Stoic.instance.#updateParams(params);
      return Stoic.instance;
    }

    this.params = { ...initialParams };
    this.#updateParams(params);

    Stoic.instance = this;
    if (!params.root) {
      this.#getOuterTemplate();
      this.#setPosition();
      this.#append();
    } else this.#setInnerTemplate();

    this.#initListeners();
  }

  #setInnerTemplate() {
    if (this.params.root)
      this.params.root.innerHTML = `
            <backquote class="${this.params.baseClassName}__backquote">
                If anyone tells you that a certain person speaks ill of you, do not make
                excuses about what is said of you but answer, \"He was ignorant of my other
                faults, else he would not have mentioned these alone.\"
            </backquote>
            <p class="${this.params.baseClassName}__author">Epictetus</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>`;
  }

  #getOuterTemplate() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<div class="${this.params.baseClassName}"></div>`;
    this.params.root = wrapper?.children[0] as HTMLDivElement;
    this.#setInnerTemplate();
  }

  #initListeners() {
    this.params.root
      ?.querySelector("svg")
      ?.addEventListener("pointerup", () => {
        this.hide();
      });
  }

  #append() {
    if (this.params.root instanceof Node)
      document.body.append(this.params.root);
  }

  #setPosition() {
    this.#resetPositions();
    this.#setPositionX();
    this.#setPositionY();
  }

  #updateParams(params: Params = initialParams) {
    for (const [k, v] of Object.entries(params) as [
      k: keyof Params,
      v: any
    ][]) {
      this.params[k] = v;
    }

    this.#setPosition();
  }

  #setPositionX() {
    if (this.params.root?.style)
      switch (this.params.positionX) {
        case "left":
          this.params.root.style.left = this.params.margin ?? "0";
          break;
        case "right":
          this.params.root.style.right = this.params.margin ?? "0";
          break;

        default:
          this.params.root.style.left = `calc(50% - ${
            parseInt(this.params.width ?? "0") / 2
          }px)`;
      }
  }

  #setPositionY() {
    if (this.params.root)
      switch (this.params.positionY) {
        case "top":
          this.params.root.style.top = this.params.margin ?? "0";
          break;

        case "bottom":
          this.params.root.style.bottom = this.params.margin ?? "0";
          break;

        default:
          this.params.root.style.top = "40%";
      }
  }
  #resetPositions() {
    if (this.params.root) {
      this.params.root.style.top = "initial";
      this.params.root.style.bottom = "initial";
      this.params.root.style.left = "initial";
      this.params.root.style.right = "initial";
    }
  }

  nextQuote() {
    this.params.root?.classList.remove(`${this.params.baseClassName}_showText`);
    this.params.root?.classList.add(`${this.params.baseClassName}_hideText`);
    setTimeout(() => {
      this.params.root?.classList.remove(
        `${this.params.baseClassName}_hideText`
      );
      this.params.root?.classList.add(`${this.params.baseClassName}_showText`);
    }, 500);
  }

  hide() {
    this.params.root?.classList.add(`${this.params.baseClassName}_hide`);
  }

  show() {
    console.log("show");
    this.params.root?.classList.remove(`${this.params.baseClassName}_hide`);
  }
}
