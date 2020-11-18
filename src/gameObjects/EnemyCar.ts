import { Dimensions } from "../types";

export default class EnemyCar{

    private roadDimensions:Dimensions;
    private ctx;
    // public fields to be used in Factory
    public speed:number;
    public dimensions:Dimensions;

    constructor(ctx:CanvasRenderingContext2D, roadDimensions: Dimensions) {
        this.roadDimensions = roadDimensions;
        this.dimensions = {
            posX: roadDimensions.posX + parseFloat(Math.random().toFixed(2))*(roadDimensions.width-50),
            posY: roadDimensions.posY - 100,
            height: 90,
            width: 50
        };
        this.ctx = ctx;
        this.speed=2;
    }
    
}
