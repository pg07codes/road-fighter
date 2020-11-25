import Car from "./Car";
import { Dimensions, Position, VehicleType } from "../types";
import { ctx } from "../index";
import constants from "../constants";
import EnemyVehicleFactory from "./EnemyVehicleFactory";
import EnemyVehicle from "./EnemyVehicle";

export default class EnemyVehicleManager {
    private enemyVehicles: EnemyVehicle[];
    private roadDimensions;
    private ctx;
    private latestEnemyVehicle: EnemyVehicle;
    private car: Car;
    private enemyVehicleFactory: EnemyVehicleFactory;

    constructor(roadDimensions: Dimensions, car: Car) {
        this.roadDimensions = roadDimensions;
        this.car = car;
        this.ctx = ctx;
        this.enemyVehicleFactory = new EnemyVehicleFactory(roadDimensions);

        let enemyVehicle: EnemyVehicle = this.enemyVehicleFactory.createVehicle(VehicleType.car, constants.ENEMY_CAR_SPEED);
        this.latestEnemyVehicle = enemyVehicle;
        this.enemyVehicles = [enemyVehicle];
    }

    private insertNewEnemyVehicle(): void {
        if (this.latestEnemyVehicle.dimensions.posY > 0.25 * this.roadDimensions.height) {
            if (Math.round(Math.random() * 100) <= 10) {
                if (true || Math.round(Math.random() * 1000) <= 50) {
                    let enemyTruck: EnemyVehicle = this.enemyVehicleFactory.createVehicle(VehicleType.truck, constants.ENEMY_CAR_SPEED);
                    this.latestEnemyVehicle = enemyTruck;
                    this.enemyVehicles.push(enemyTruck);
                } else {
                    let enemyCar: EnemyVehicle = this.enemyVehicleFactory.createVehicle(VehicleType.car, constants.ENEMY_CAR_SPEED);
                    this.latestEnemyVehicle = enemyCar;
                    this.enemyVehicles.push(enemyCar);
                }
            }
        }
    }

    private deleteEnemyVehicle(): void {
        this.enemyVehicles = this.enemyVehicles.filter((i) => {
            return !(i.dimensions.posY > this.roadDimensions.posY + this.roadDimensions.height);
        });
    }

    public updatePosition() {
        this.insertNewEnemyVehicle();

        this.enemyVehicles.forEach((i) => {
            i.dimensions.posY += i.speed;
        });

        this.deleteEnemyVehicle();
    }

    public draw() {
        this.ctx.fillStyle = "#f00";
        this.enemyVehicles.forEach((i) => {
            this.ctx.fillRect(i.dimensions.posX, i.dimensions.posY, i.dimensions.width, i.dimensions.height);
            this.ctx.drawImage(i.img, i.dimensions.posX, i.dimensions.posY);
        });
    }

    public detectCollision(): boolean {

        let carDimensions = this.car.getDimensions();

        for (const i of this.enemyVehicles) {
            let enemyVehicleDimensions = i.dimensions;
            
            if (
                enemyVehicleDimensions.posX < carDimensions.posX + carDimensions.width &&
                enemyVehicleDimensions.posX + enemyVehicleDimensions.width > carDimensions.posX &&
                enemyVehicleDimensions.posY < carDimensions.posY + carDimensions.height &&
                enemyVehicleDimensions.posY + enemyVehicleDimensions.height > carDimensions.posY
            ) {
                return true;
            }

        }

        return false;
    }
    
}
