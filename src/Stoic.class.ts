// Singletone Class
interface Params {
  root: HTMLDivElement;
  width: string;
}

export class Stoic {
  private instance: Stoic | null = null;
  constructor(private params: Params) {
    if (this?.instance) return this.instance;

    if (!params.root) {
      this.params.root = document.createElement("div");
      this.params.root.classList.add("stoic");
    }
  }
}
