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
        </div>
    `;
    this.params.root = wrapper?.children[0] as HTMLDivElement;
  }

  #append() {
    if (this.params.root instanceof Node)
      document.body.append(this.params.root);
  }

  nextQuote() {
    this.params.root?.classList.remove("stoic_show");
    this.params.root?.classList.add("stoic_hide");
    setTimeout(() => {
      this.params.root?.classList.remove("stoic_hide");
      this.params.root?.classList.add("stoic_show");
    }, 500);
  }
}
