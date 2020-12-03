import constants from "../constants";
import { Dimensions } from "../types";
import { ctx, gameAreaDimensions, onMobile } from "../index";

export default class Road {
    private dimensions: Dimensions;
    private ctx;
    private stripeCount = 5;
    private stripes: Dimensions[];

    constructor() {
        this.ctx = ctx;

        let roadWidth = onMobile ? gameAreaDimensions.width / 1.2 : gameAreaDimensions.width / 2;
        let roadPosX = (gameAreaDimensions.width - roadWidth) / 2;

        this.dimensions = {
            height: gameAreaDimensions.height,
            width: roadWidth,
            posX: roadPosX,
            posY: 0,
        };

        this.stripes = [...Array(this.stripeCount)].map(
            (_, idx): Dimensions => {
                return {
                    height: gameAreaDimensions.height / (this.stripeCount + 1),
                    width: 10,
                    posX: roadPosX + roadWidth / 2 - 10 / 2,
                    posY: idx * (gameAreaDimensions.height / this.stripeCount),
                };
            }
        );

        this.stripes.unshift({
            // one stripe is added off the screen so that it looks continuos when comes in view
            height: gameAreaDimensions.height / (this.stripeCount + 1),
            width: 10,
            posX: roadPosX + roadWidth / 2 - 10 / 2,
            posY: -1 * (gameAreaDimensions.height / this.stripeCount),
        });
    }

    public getDimensions(): Dimensions {
        return this.dimensions;
    }

    public draw(): void {
        this.drawRoad();
        this.drawStripes();
    }

    private drawRoad() {
        this.ctx.fillStyle = "#464647";
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
                i.posY = -1 * (gameAreaDimensions.height / this.stripeCount) - (rh - i.posY);
            } else {
                i.posY += constants.CAR_SPEED;
            }
        });
    }
}
