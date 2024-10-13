interface Params {
    root?: HTMLDivElement;
    width?: string;
    positionX?: "left" | "right" | "center";
    positionY?: "top" | "bottom" | "center";
}
declare class Stoic {
    #private;
    private params;
    private instance;
    constructor(params?: Params);
    nextQuote(): void;
}
//# sourceMappingURL=Stoic.class.d.ts.map