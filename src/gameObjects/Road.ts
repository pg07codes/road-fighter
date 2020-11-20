import { Dimensions } from "../types";

export default class Road {

    private dimensions: Dimensions;
    private ctx: CanvasRenderingContext2D;
    private Stripes: Dimensions[];
    private stripeCount =6;

    constructor(ctx: CanvasRenderingContext2D, gameDimensions: Dimensions) {

        this.ctx = ctx;
        this.dimensions = {
            height: gameDimensions.height,
            width: gameDimensions.width / 2,
            posX: 0.25 * gameDimensions.width,
            posY: 0
        };
        this.Stripes = [...Array(this.stripeCount)].map((_, idx): Dimensions => {
            return {
                height: gameDimensions.height/(this.stripeCount+1),
                width: 10,
                posX:gameDimensions.width/2 - this.stripeCount,
                posY: idx*(gameDimensions.height/this.stripeCount)
            };
        })
    }

    public getDimensions():Dimensions{
        return this.dimensions;
    }
    
    public draw() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(this.dimensions.posX, this.dimensions.posY, this.dimensions.width, this.dimensions.height);
    }

    public drawStripes() {

        this.ctx.fillStyle = "#fff";

        this.Stripes.forEach((i) => {
            this.ctx.fillRect(
                i.posX,
                i.posY,
                i.width,
                i.height)
        });

    }

    public updateStripes() {
        this.Stripes.forEach(i=>{
            if(i.posY>this.dimensions.height) 
                i.posY=0;
            else
                i.posY += 5;
        })
    }


}