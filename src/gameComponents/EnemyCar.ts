import constants from "../constants";
import { Dimensions } from "../types";

export default class EnemyCar {
    private roadDimensions: Dimensions;
    // public fields to be used in EnemyCarManager
    public speed: number;
    public dimensions: Dimensions;

    constructor(roadDimensions: Dimensions, speed: number) {
        this.roadDimensions = roadDimensions;
        this.dimensions = {
            // 70 is subtracted to avoid car exactly near edge.
            posX: roadDimensions.posX + parseFloat(Math.random().toFixed(2))*(roadDimensions.width - constants.CAR_WIDTH - 70),
            posY: roadDimensions.posY - constants.CAR_HEIGHT,
            height: constants.CAR_HEIGHT,
            width: constants.CAR_WIDTH,
        };
        this.speed = speed;
    }
}
