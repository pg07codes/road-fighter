import { Dimensions } from "../types";

export default class EnemyCar{

    private roadDimensions:Dimensions;
    private ctx;
    // public fields to be used in Factory
    public speed:number;
    public dimensions:Dimensions;

    constructor(ctx:CanvasRenderingContext2D, roadDimensions: Dimensions) {
        this.roadDimensions = roadDimensions;
        this.dimensions = {                                         // 70 is subtracted to avoid car exactly near edge.
            posX: roadDimensions.posX + parseFloat(Math.random().toFixed(2))*(roadDimensions.width-45-70),
            posY: roadDimensions.posY - 100,
            height: 75,
            width: 45
        };
        this.ctx = ctx;
        this.speed=10;

    }

    
}
