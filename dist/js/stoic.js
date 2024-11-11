const $4ad1b6ff64944aee$export$ba4f16b6d93085b4 = {
    idle: "idle",
    pending: "pending",
    loaded: "loaded",
    error: "error"
};
const $4ad1b6ff64944aee$export$e5fcfdba4a8ae715 = {
    error: "error",
    quote: "quote",
    status: "status"
};
const $4ad1b6ff64944aee$export$274544c296ce8782 = 5;


const $f2f7246cd229a3b3$var$initialParams = {
    positionX: "center",
    positionY: "center",
    baseClassName: "stoic",
    delay: "60",
    serverApi: "https://stoicquotes.ru/random"
};
// Singletone Class
class $f2f7246cd229a3b3$var$Stoic {
    constructor(params = $f2f7246cd229a3b3$var$initialParams){
        this.params = params;
        this.quotes = [];
        this.loadingStatus = (0, $4ad1b6ff64944aee$export$ba4f16b6d93085b4).idle;
        this.waitTimeout = 0;
        this.quoteElement = null;
        this.authorElement = null;
        this.interval = 0;
        if ($f2f7246cd229a3b3$var$Stoic.instance) {
            $f2f7246cd229a3b3$var$Stoic.instance.#updateParams(params);
            return $f2f7246cd229a3b3$var$Stoic.instance;
        }
        this.params = {
            ...$f2f7246cd229a3b3$var$initialParams
        };
        this.#updateParams(params);
        $f2f7246cd229a3b3$var$Stoic.instance = this;
        this.#waitForQuote();
        if (!params.root) {
            this.#getOuterTemplate();
            this.#setPosition();
            this.#append();
        } else this.#setInnerTemplate();
        this.#initListeners();
        this.play();
        this.#showLoading();
    }
    nextQuote() {
        this.#hideContent();
        setTimeout(()=>{
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
        if (this.params.delay) this.interval = setInterval(()=>{
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
            <div class="${this.params.baseClassName}__content">
              <backquote class="${this.params.baseClassName}__backquote"></backquote>
              <p class="${this.params.baseClassName}__author"></p>
            </div>
            <div class="${this.params.baseClassName}__loader skeleton">
              <div class="skeleton__group">
                <div class="skeleton__bar skeleton__bar_full"></div>
                <div class="skeleton__bar skeleton__bar_full"></div>
                <div class="skeleton__bar skeleton__bar_big"></div>
              </div>
              <div class="skeleton__bar skeleton__bar_small"></div>
            </div>
            
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
        this.params.root?.querySelector("[id='close']")?.addEventListener("pointerup", ()=>{
            this.hide();
        });
        this.params.root?.querySelector("[id='next']")?.addEventListener("pointerup", ()=>{
            this.reset();
            this.nextQuote();
        });
    }
    #append() {
        if (this.params.root instanceof Node) document.body.append(this.params.root);
    }
    #setPosition() {
        this.#resetPositions();
        this.#setPositionX();
        this.#setPositionY();
    }
    #updateParams(params = $f2f7246cd229a3b3$var$initialParams) {
        this.params = {
            ...this.params,
            ...params
        };
        this.#setPosition();
    }
    #setPositionX() {
        if (this.params.root?.classList) {
            this.params.root?.classList.remove(`${this.params.baseClassName}_left`);
            this.params.root?.classList.remove(`${this.params.baseClassName}_right`);
            switch(this.params.positionX){
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
            switch(this.params.positionY){
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
        if (this.quotes.length) return this.#showQuote();
        this.#showLoading();
        this.waitTimeout = setTimeout(()=>{
            switch(this.loadingStatus){
                case (0, $4ad1b6ff64944aee$export$ba4f16b6d93085b4).pending:
                    this.#waitForQuote();
                    break;
                case (0, $4ad1b6ff64944aee$export$ba4f16b6d93085b4).idle:
                    this.#fillQuotesPool();
                    this.#waitForQuote();
                    break;
                case (0, $4ad1b6ff64944aee$export$ba4f16b6d93085b4).error:
                    this.#showError();
                    break;
                case (0, $4ad1b6ff64944aee$export$ba4f16b6d93085b4).loaded:
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
            this.#hideLoading();
        }
    }
    #showError() {}
    #hideContent() {
        this.params.root?.classList.remove(`${this.params.baseClassName}_showContent`);
        this.params.root?.classList.add(`${this.params.baseClassName}_hideContent`);
    }
    #showContent() {
        this.params.root?.classList.remove(`${this.params.baseClassName}_hideContent`);
        this.params.root?.classList.add(`${this.params.baseClassName}_showContent`);
    }
    #showLoading() {
        this.params.root?.classList.add(`${this.params.baseClassName}_loading`);
    }
    #hideLoading() {
        this.params.root?.classList.remove(`${this.params.baseClassName}_loading`);
    }
    #setContent(quote) {
        if (quote) {
            if (this.quoteElement) this.quoteElement.innerHTML = quote.text;
            if (this.authorElement) this.authorElement.innerHTML = quote.author;
        }
    }
    #resetPositions() {
        const positions = [
            "_left",
            "_right",
            "_top",
            "_bottom"
        ];
        if (this.params.root?.classList) positions.forEach((p)=>this.params.root?.classList.remove(`${this.params.baseClassName}${p}`));
    }
    #fillQuotesPool() {
        for(let i = this.quotes.length; i < (0, $4ad1b6ff64944aee$export$274544c296ce8782); i++)this.#loadRandomQuote();
    }
    #loadRandomQuote() {
        this.loadingStatus = (0, $4ad1b6ff64944aee$export$ba4f16b6d93085b4).pending;
        fetch(this.params.serverApi).then((data)=>data.json()).then((message)=>{
            if (!message || message?.type === (0, $4ad1b6ff64944aee$export$e5fcfdba4a8ae715).error) {
                this.loadingStatus = (0, $4ad1b6ff64944aee$export$ba4f16b6d93085b4).error;
                return;
            }
            if (message && message?.type === (0, $4ad1b6ff64944aee$export$e5fcfdba4a8ae715).quote) {
                this.loadingStatus = (0, $4ad1b6ff64944aee$export$ba4f16b6d93085b4).loaded;
                this.quotes.push(message);
                return;
            }
        }).catch(()=>{
            this.loadingStatus = (0, $4ad1b6ff64944aee$export$ba4f16b6d93085b4).error;
        });
    }
}
var $f2f7246cd229a3b3$export$2e2bcd8739ae039 = $f2f7246cd229a3b3$var$Stoic;




export {$f2f7246cd229a3b3$export$2e2bcd8739ae039 as Stoic};
//# sourceMappingURL=stoic.js.map
