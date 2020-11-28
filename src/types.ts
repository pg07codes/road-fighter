export type Dimensions = {
    posX?: number;
    posY?: number;
    height: number;
    width: number;
};

export enum VehicleType {
    car,
    truck,
    raceCar
}

export type Position = {
    up: number;
    down: number;
    left: number;
    right: number;
};
