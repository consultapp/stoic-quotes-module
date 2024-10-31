const LOADING_STATUS = {
  idle: "idle",
  pending: "pending",
  loaded: "loaded",
  error: "error",
} as const;

const MESSAGE_TYPES = {
  error: "error",
  quote: "quote",
  status: "status",
} as const;

const initialParams: Params = {
  positionX: "center",
  positionY: "center",
  baseClassName: "stoic",
  serverApi: "https://stoicquotes.ru/random",
};

const MINIMUM_QUOTES_POOL_LENGTH = 3;

// Singletone Class
class Stoic {
  static instance: Stoic;
  private quotes: Quote[] = [];
  private loadingStatus: LOADING_STATUS = LOADING_STATUS.idle;
  private waitTimeout = 0;
  private quoteElement: HTMLElement | null = null;
  private authorElement: HTMLElement | null = null;

  constructor(private params: Params = initialParams) {
    if (Stoic.instance) {
      Stoic.instance.#updateParams(params);
      return Stoic.instance;
    }

    this.params = { ...initialParams };
    this.#updateParams(params);
    Stoic.instance = this;

    this.#waitForQuote();

    if (!params.root) {
      this.#getOuterTemplate();
      this.#setPosition();
      this.#append();
    } else this.#setInnerTemplate();

    this.#initListeners();
  }

  #setInnerTemplate() {
    if (this.params.root) {
      this.params.root.innerHTML = `
            <backquote class="${this.params.baseClassName}__backquote">
            </backquote>
            <p class="${this.params.baseClassName}__author"></p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>`;
      this.quoteElement = this.params.root.querySelector(
        "backquote"
      ) as HTMLElement;
      this.authorElement = this.params.root.querySelector("p") as HTMLElement;
    }
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
    if (this.params.root?.classList) {
      this.params.root?.classList.remove(`${this.params.baseClassName}_left`);
      this.params.root?.classList.remove(`${this.params.baseClassName}_right`);

      switch (this.params.positionX) {
        case "left":
          this.params.root?.classList.add(`${this.params.baseClassName}_left`);
          break;
        case "right":
          this.params.root?.classList.add(`${this.params.baseClassName}_right`);
          break;
      }
    }
  }

  #setPositionY() {
    if (this.params.root?.classList) {
      this.params.root?.classList.remove(`${this.params.baseClassName}_top`);
      this.params.root?.classList.remove(`${this.params.baseClassName}_bottom`);
      switch (this.params.positionY) {
        case "top":
          this.params.root?.classList.add(`${this.params.baseClassName}_top`);
          break;
        case "bottom":
          this.params.root?.classList.add(
            `${this.params.baseClassName}_bottom`
          );
          break;
      }
    }
  }

  nextQuote() {
    this.#hideContent();
    setTimeout(() => {
      this.#fillQuotesPool();
      this.#waitForQuote();
    }, 400);
  }

  #waitForQuote() {
    clearTimeout(this.waitTimeout);
    if (this.quotes.length) return this.#showQuote();

    this.waitTimeout = setTimeout(() => {
      switch (this.loadingStatus) {
        case LOADING_STATUS.pending:
          this.#waitForQuote();
          break;

        case LOADING_STATUS.idle:
          this.#fillQuotesPool();
          this.#waitForQuote();
          break;

        case LOADING_STATUS.error:
          this.#showError();
          break;

        case LOADING_STATUS.loaded:
          this.#showQuote();
          break;

        default:
          break;
      }
    }, 200);
  }

  #showQuote() {
    if (this.quotes.length) {
      this.#setContent(this.quotes.shift());
      this.#showContent();
    }
  }
  #showError() {}

  hide() {
    this.params.root?.classList.add(`${this.params.baseClassName}_hide`);
  }

  show() {
    this.params.root?.classList.remove(`${this.params.baseClassName}_hide`);
  }

  #hideContent() {
    this.params.root?.classList.remove(`${this.params.baseClassName}_showText`);
    this.params.root?.classList.add(`${this.params.baseClassName}_hideText`);
  }

  #showContent() {
    this.params.root?.classList.remove(`${this.params.baseClassName}_hideText`);
    this.params.root?.classList.add(`${this.params.baseClassName}_showText`);
  }

  #setContent(quote: Quote | undefined) {
    if (quote) {
      if (this.quoteElement) this.quoteElement.innerHTML = quote.text;
      if (this.authorElement) this.authorElement.innerHTML = quote.author;
    }
  }

  #resetPositions() {
    if (this.params.root?.classList) {
      this.params.root?.classList.remove(`${this.params.baseClassName}_left`);
      this.params.root?.classList.remove(`${this.params.baseClassName}_right`);
      this.params.root?.classList.remove(`${this.params.baseClassName}_top`);
      this.params.root?.classList.remove(`${this.params.baseClassName}_bottom`);
    }
  }

  #fillQuotesPool() {
    for (let i = this.quotes.length; i < MINIMUM_QUOTES_POOL_LENGTH; i++)
      this.#loadRandomQuote();
  }

  #loadRandomQuote() {
    this.loadingStatus = LOADING_STATUS.pending;
    fetch(this.params.serverApi)
      .then((data) => data.json())
      .then((message: ApiMessage) => {
        if (!message || message?.type === MESSAGE_TYPES.error) {
          this.loadingStatus = LOADING_STATUS.error;
          return;
        }

        if (message && message?.type === MESSAGE_TYPES.quote) {
          this.loadingStatus = LOADING_STATUS.loaded;
          this.quotes.push(message as Quote);
          return;
        }
      })
      .catch(() => {
        this.loadingStatus = LOADING_STATUS.error;
      });
  }
}
