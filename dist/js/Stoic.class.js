"use strict";
const LOADING_STATUS = {
    idle: "idle",
    pending: "pending",
    loaded: "loaded",
    error: "error",
};
const MESSAGE_TYPES = {
    error: "error",
    quote: "quote",
    status: "status",
};
const initialParams = {
    positionX: "center",
    positionY: "center",
    baseClassName: "stoic",
    delay: "60",
    serverApi: "https://stoicquotes.ru/random",
};
const MINIMUM_QUOTES_POOL_LENGTH = 3;
class Stoic {
    params;
    static instance;
    quotes = [];
    loadingStatus = LOADING_STATUS.idle;
    waitTimeout = 0;
    quoteElement = null;
    authorElement = null;
    interval = 0;
    constructor(params = initialParams) {
        this.params = params;
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
        }
        else
            this.#setInnerTemplate();
        this.#initListeners();
        this.play();
    }
    nextQuote() {
        this.#hideContent();
        setTimeout(() => {
            this.#fillQuotesPool();
            this.#waitForQuote();
        }, 400);
    }
    hide() {
        this.params.root?.classList.add(`${this.params.baseClassName}_hide`);
    }
    show() {
        this.params.root?.classList.remove(`${this.params.baseClassName}_hide`);
    }
    play() {
        this.stop();
        if (this.params.delay)
            this.interval = setInterval(() => {
                this.nextQuote();
            }, parseInt(this.params.delay) * 1000);
    }
    stop() {
        clearInterval(this.interval);
        this.interval = 0;
    }
    reset() {
        this.stop();
        this.play();
    }
    #setInnerTemplate() {
        if (this.params.root) {
            this.params.root.innerHTML = `
            <backquote class="${this.params.baseClassName}__backquote">
            </backquote>
            <p class="${this.params.baseClassName}__author"></p>
            <div class="${this.params.baseClassName}__controlls">
              <svg id="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="transparent"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              <svg id="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="1.5" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </div>
`;
            this.quoteElement = this.params.root.querySelector("backquote");
            this.authorElement = this.params.root.querySelector("p");
        }
    }
    #getOuterTemplate() {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<div class="${this.params.baseClassName}"></div>`;
        this.params.root = wrapper?.children[0];
        this.#setInnerTemplate();
    }
    #initListeners() {
        this.params.root
            ?.querySelector("[id='close']")
            ?.addEventListener("pointerup", () => {
            this.hide();
        });
        this.params.root
            ?.querySelector("[id='next']")
            ?.addEventListener("pointerup", () => {
            this.reset();
            this.nextQuote();
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
    #updateParams(params = initialParams) {
        this.params = { ...this.params, ...params };
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
                    this.params.root?.classList.add(`${this.params.baseClassName}_bottom`);
                    break;
            }
        }
    }
    #waitForQuote() {
        clearTimeout(this.waitTimeout);
        if (this.quotes.length)
            return this.#showQuote();
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
    #showError() { }
    #hideContent() {
        this.params.root?.classList.remove(`${this.params.baseClassName}_showText`);
        this.params.root?.classList.add(`${this.params.baseClassName}_hideText`);
    }
    #showContent() {
        this.params.root?.classList.remove(`${this.params.baseClassName}_hideText`);
        this.params.root?.classList.add(`${this.params.baseClassName}_showText`);
    }
    #setContent(quote) {
        if (quote) {
            if (this.quoteElement)
                this.quoteElement.innerHTML = quote.text;
            if (this.authorElement)
                this.authorElement.innerHTML = quote.author;
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
            .then((message) => {
            if (!message || message?.type === MESSAGE_TYPES.error) {
                this.loadingStatus = LOADING_STATUS.error;
                return;
            }
            if (message && message?.type === MESSAGE_TYPES.quote) {
                this.loadingStatus = LOADING_STATUS.loaded;
                this.quotes.push(message);
                return;
            }
        })
            .catch(() => {
            this.loadingStatus = LOADING_STATUS.error;
        });
    }
}
//# sourceMappingURL=Stoic.class.js.map