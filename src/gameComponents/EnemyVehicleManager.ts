import Car from "./Car";
import { Dimensions, Position, VehicleType } from "../types";
import { ctx } from "../index";
import constants from "../constants";
import EnemyVehicleFactory from "./EnemyVehicleFactory";
import IEnemyVehicle from "./IEnemyVehicle";

export default class EnemyVehicleManager {
    private enemyVehicles: IEnemyVehicle[];
    private roadDimensions;
    private ctx;
    private latestEnemyVehicle: IEnemyVehicle;
    private car: Car;
    private enemyVehicleFactory: EnemyVehicleFactory;

    constructor(roadDimensions: Dimensions, car: Car) {
        this.roadDimensions = roadDimensions;
        this.car = car;
        this.ctx = ctx;
        this.enemyVehicleFactory = new EnemyVehicleFactory(roadDimensions,car);

        let enemyVehicle: IEnemyVehicle = this.enemyVehicleFactory.createVehicle(VehicleType.car, constants.ENEMY_CAR_SPEED);
        this.latestEnemyVehicle = enemyVehicle;
        this.enemyVehicles = [enemyVehicle];
    }

    private insertNewEnemyVehicle(): void {
        if (this.latestEnemyVehicle.dimensions.posY > 0.25 * this.roadDimensions.height) {
            if (Math.round(Math.random() * 100) <= 10) {
                if (Math.round(Math.random() * 1000) <= 200) {
                    let enemyTruck: IEnemyVehicle = this.enemyVehicleFactory.createVehicle(VehicleType.truck, constants.ENEMY_CAR_SPEED);
                    this.latestEnemyVehicle = enemyTruck;
                    this.enemyVehicles.push(enemyTruck);
                } else if(Math.round(Math.random() * 1000) >= 900){
                    let enemyRaceCar: IEnemyVehicle = this.enemyVehicleFactory.createVehicle(VehicleType.raceCar,constants.RACE_CAR_SPEED);
                    this.latestEnemyVehicle = enemyRaceCar;
                    this.enemyVehicles.push(enemyRaceCar);
                } else {
                    let enemyCar: IEnemyVehicle = this.enemyVehicleFactory.createVehicle(VehicleType.car, constants.ENEMY_CAR_SPEED);
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
            // this.ctx.fillRect(i.dimensions.posX, i.dimensions.posY, i.dimensions.width, i.dimensions.height);
            this.ctx.drawImage(i.img, i.dimensions.posX, i.dimensions.posY);
        });
    }

    public detectCollision(): boolean {

        let carDimensions = this.car.getDimensions();

        for (const i of this.enemyVehicles) {  // can check only for latestEnemyVehicle(but race car usecase wont cover)
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
