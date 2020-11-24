export type Dimensions = {
    posX?: number;
    posY?: number;
    height: number;
    width: number;
};

export enum Direction {
    left,
    right,
}

export type Position = {
    up: number;
    down: number;
    left: number;
    right: number;
};
