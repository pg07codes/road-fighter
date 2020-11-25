import { Dimensions, VehicleType } from "../types";
import EnemyCar from "./EnemyCar";
import EnemyTruck from "./EnemyTruck";
import EnemyVehicle from "./EnemyVehicle";

export default class EnemyVehicleFactory{
    
    private roadDimensions;

    constructor(roadDimensions:Dimensions){
        this.roadDimensions = roadDimensions;
    }

    public createVehicle(type:VehicleType,speed:number):EnemyVehicle{
        if(type == VehicleType.car){
            return new EnemyCar(this.roadDimensions,speed);
        }
        else if (type == VehicleType.truck)
        {
            return new EnemyTruck(this.roadDimensions,speed);
        }
        return null;
    }

}