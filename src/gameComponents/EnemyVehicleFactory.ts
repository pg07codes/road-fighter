import constants from "../constants";
import { Dimensions, VehicleType } from "../types";
import Car from "./Car";
import EnemyCar from "./EnemyCar";
import EnemyRaceCar from "./EnemyRaceCar";
import EnemyTruck from "./EnemyTruck";
import IEnemyVehicle from "./IEnemyVehicle";

export default class EnemyVehicleFactory {
    private roadDimensions;
    private car;

    constructor(roadDimensions: Dimensions, car: Car) {
        this.roadDimensions = roadDimensions;
        this.car = car;
    }

    public createVehicle(type: VehicleType, speed: number): IEnemyVehicle {
        if (type == VehicleType.car) {
            return new EnemyCar(this.roadDimensions, speed, this.car.getDimensions());
        } else if (type == VehicleType.truck) {
            return new EnemyTruck(this.roadDimensions, speed, this.car.getDimensions());
        } else if (type == VehicleType.raceCar) {
            return new EnemyRaceCar(this.roadDimensions, speed, this.car.getDimensions());
        } 
        return null;
    }
}
