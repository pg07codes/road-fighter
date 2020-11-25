import constants from "../constants";
import { Dimensions } from "../types";
import EnemyVehicle from "./EnemyVehicle";
import enemyCarPNG from "./../images/enemyCar.png";

export default class EnemyCar implements EnemyVehicle {
    // public fields to be used in EnemyVehicleManager
    public speed: number;
    public dimensions: Dimensions;
    public img:HTMLImageElement;

    constructor(roadDimensions: Dimensions, speed: number) {
        this.dimensions = {
            posX: roadDimensions.posX + parseFloat(Math.random().toFixed(2)) * (roadDimensions.width - constants.CAR_WIDTH ),
            posY: roadDimensions.posY - constants.CAR_HEIGHT,
            height: constants.CAR_HEIGHT,
            width: constants.CAR_WIDTH,
        };
        this.speed = speed;
        this.img = new Image();
        this.img.src = enemyCarPNG;
    }
}
