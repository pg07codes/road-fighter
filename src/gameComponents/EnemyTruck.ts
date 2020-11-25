import constants from "../constants";
import { Dimensions } from "../types";
import EnemyVehicle from "./EnemyVehicle";
import enemyTruckPNG from "./../images/enemyTruck.png";

export default class EnemyTruck implements EnemyVehicle {
    // public fields to be used in EnemyVehicleManager
    public speed: number;
    public dimensions: Dimensions;
    public img: HTMLImageElement;

    constructor(roadDimensions: Dimensions, speed: number) {
        this.dimensions = {
            posX: roadDimensions.posX + parseFloat(Math.random().toFixed(2)) * (roadDimensions.width - constants.TRUCK_WIDTH),
            posY: roadDimensions.posY - constants.TRUCK_HEIGHT,
            height: constants.TRUCK_HEIGHT,
            width: constants.TRUCK_WIDTH,
        };
        this.speed = speed;
        this.img = new Image();
        this.img.src = enemyTruckPNG;
    }
}
