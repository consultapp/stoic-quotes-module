// Singletone Class
interface Params {
  root?: HTMLDivElement;
  width?: string;
  positionX?: "left" | "right" | "center";
  positionY?: "top" | "bottom" | "center";
}

class Stoic {
  private instance: Stoic | null = null;
  constructor(private params: Params = {}) {
    if (this?.instance) return this.instance;
    this.instance = this;
    console.log("first", this.instance);
    if (!params.root) {
      this.#getTemplate();
      this.#append();
    }
    this.#initListeners();
  }

  #getTemplate() {
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
    this.params.root = wrapper?.children[0] as HTMLDivElement;
  }

  #initListeners() {
    this.params.root
      ?.querySelector("svg")
      ?.addEventListener("pointerup", () => {
        console.log("first");
        this.hide();
      });
  }

  #append() {
    if (this.params.root instanceof Node)
      document.body.append(this.params.root);
  }

  nextQuote() {
    this.params.root?.classList.remove("stoic_showText");
    this.params.root?.classList.add("stoic_hideText");
    setTimeout(() => {
      this.params.root?.classList.remove("stoic_hideText");
      this.params.root?.classList.add("stoic_showText");
    }, 500);
  }

  hide() {
    this.params.root?.classList.add("stoic_hide");
  }
  show() {
    this.params.root?.classList.remove("stoic_hide");
  }
}
