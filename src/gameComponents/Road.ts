import constants from "../constants";
import { Dimensions } from "../types";
import { ctx, gameAreaDimensions } from "../index";
import Car from "./Car";

export default class Road {
    private dimensions: Dimensions;
    private ctx;
    private stripeCount = 5;
    private stripes: Dimensions[];

    constructor() {
        this.ctx = ctx;
        this.dimensions = {
            height: gameAreaDimensions.height,
            width: gameAreaDimensions.width / 2,
            posX: 0.25 * gameAreaDimensions.width,
            posY: 0,
        };
        this.stripes = [...Array(this.stripeCount)].map(
            (_, idx): Dimensions => {
                return {
                    height: gameAreaDimensions.height / (this.stripeCount + 1),
                    width: 10,
                    posX: gameAreaDimensions.width / 2 - this.stripeCount,
                    posY: idx * (gameAreaDimensions.height / this.stripeCount),
                };
            }
        );
    }

    public getDimensions(): Dimensions {
        return this.dimensions;
    }

    public draw(): void {
        this.drawRoad();
        this.drawStripes();
    }

    private drawRoad() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(this.dimensions.posX, this.dimensions.posY, this.dimensions.width, this.dimensions.height);
    }

    private drawStripes() {
        this.ctx.fillStyle = "#fff";

        this.stripes.forEach((i) => {
            this.ctx.fillRect(i.posX, i.posY, i.width, i.height);
        });
    }

    public update() {
        
        let rh = this.dimensions.height; // roadHeight
        this.stripes.forEach((i) => {
            if (i.posY > rh - rh / Math.pow(this.stripeCount, 2)) {
                i.posY = -(rh - i.posY);
            } else {
                i.posY += constants.CAR_SPEED;
            }
        });
    }
}
