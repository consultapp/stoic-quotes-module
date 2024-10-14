interface Params {
    root?: HTMLDivElement;
    width?: string;
    positionX?: "left" | "right" | "center";
    positionY?: "top" | "bottom" | "center";
    margin?: string;
}
declare const initialParams: Params;
declare class Stoic {
    #private;
    private params;
    static instance: Stoic;
    constructor(params?: Params);
    nextQuote(): void;
    hide(): void;
    show(): void;
}
//# sourceMappingURL=Stoic.class.d.ts.map