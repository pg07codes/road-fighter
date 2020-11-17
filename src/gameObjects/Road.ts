import { Dimensions } from "../types";

export default class Road {

    private dimensions: Dimensions;
    private ctx: CanvasRenderingContext2D;
    private Strips: Dimensions[];

    constructor(ctx: CanvasRenderingContext2D, gameDimensions: Dimensions) {

        this.ctx = ctx;
        this.dimensions = {
            height: gameDimensions.height,
            width: gameDimensions.width / 2,
            posX: 0.25 * gameDimensions.width,
            posY: 0
        };
        this.Strips = [...Array(5)].map((_, idx): Dimensions => {
            return {
                height: gameDimensions.height/6,
                width: 10,
                posX:gameDimensions.width/2 - 5,
                posY: idx*(gameDimensions.height/5)
            };
        })
    }

    public draw() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(this.dimensions.posX, this.dimensions.posY, this.dimensions.width, this.dimensions.height);
    }

    public drawStrips() {

        this.ctx.fillStyle = "#fff";

        this.Strips.forEach((i) => {
            this.ctx.fillRect(
                i.posX,
                i.posY,
                i.width,
                i.height)
        });

    }

    public updateStrips() {
        this.Strips.forEach(i=>{
            if(i.posY>this.dimensions.height) 
                i.posY=0;
            else
                i.posY += 5;
        })
    }


}