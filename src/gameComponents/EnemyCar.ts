import constants from "../constants";
import { Dimensions } from "../types";
import IEnemyVehicle from "./IEnemyVehicle";
import { enemyCarImg } from "./../index";

export default class EnemyCar implements IEnemyVehicle {
    // public fields to be used in EnemyVehicleManager
    public speed: number;
    public dimensions: Dimensions;
    public img: HTMLImageElement;

    constructor(roadDimensions: Dimensions, speed: number, carDimensions: Dimensions) {
        this.dimensions = {
            posX: EnemyCar.getCarLocationBasedEnemyCarPosition(roadDimensions, carDimensions),
            posY: roadDimensions.posY - constants.CAR_HEIGHT,
            height: constants.CAR_HEIGHT,
            width: constants.CAR_WIDTH,
        };

        this.speed = speed;
        this.img = enemyCarImg;
    }

    private static getCarLocationBasedEnemyCarPosition(rd: Dimensions, cd: Dimensions): number {
        let sign: number = Math.random() * 100 < 50 ? 1 : -1;
        let displacement = parseFloat(Math.random().toFixed(2)) * 0.25 * rd.width;
        let centerOfCar = cd.posX + 0.5 * cd.width;

        let posX: number = centerOfCar + sign * displacement;
        posX = posX > rd.posX + rd.width - 1.5 * cd.width ? rd.posX + rd.width - 1.5 * cd.width : posX;
        posX = posX < rd.posX ? rd.posX : posX;

        return posX;
    }
}
