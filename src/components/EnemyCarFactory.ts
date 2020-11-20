import Car from "../gameObjects/Car";
import EnemyCar from "../gameObjects/EnemyCar";
import { Dimensions, Position } from "../types";
import enemyCarPNG from './../images/enemyCar.png'

export default class EnemyCarFactory {

    private carCount: number;
    private enemyCars: EnemyCar[];
    private roadDimensions;
    private ctx;
    private latestEnemyCar: EnemyCar;
    private car: Car;
    private enemyCarImage;
    
    constructor(ctx: CanvasRenderingContext2D, roadDimensions: Dimensions, car: Car) {
        this.carCount = 0;
        this.roadDimensions = roadDimensions;
        this.ctx = ctx;
        this.car = car;

        let enemyCar = new EnemyCar(this.ctx, this.roadDimensions);
        this.latestEnemyCar = enemyCar;
        this.enemyCars = [enemyCar];

        this.enemyCarImage = new Image();
        this.enemyCarImage.src  = enemyCarPNG;

    }

    private insertNewEnemyCar(): void {

        if (this.latestEnemyCar.dimensions.posY > 0.25 * (this.roadDimensions.height)) {

            if (Math.round(Math.random() * 100) <= 10) {  // 10% chance of new enemy car after last has gone.
                let enemyCar: EnemyCar = new EnemyCar(this.ctx, this.roadDimensions);
                this.latestEnemyCar = enemyCar;
                this.enemyCars.push(enemyCar);
                this.carCount++;
            }

        }
    }

    private deleteEnemyCar(): void {

        this.enemyCars = this.enemyCars.filter((i) => {
            return !(i.dimensions.posY > this.roadDimensions.posY + this.roadDimensions.height);
        });
        this.carCount = this.enemyCars.length;
    }

    public updatePosition() {

        this.insertNewEnemyCar();

        this.enemyCars.forEach((i) => {
            i.dimensions.posY += i.speed;
        });

        this.deleteEnemyCar();
    }

    public draw() {
        this.ctx.fillStyle = "#f00";
        this.enemyCars.forEach((i) => {
            this.ctx.drawImage(this.enemyCarImage,i.dimensions.posX, i.dimensions.posY);
            // this.ctx.fillRect(i.dimensions.posX, i.dimensions.posY, i.dimensions.width, i.dimensions.height);
        });

    }

    public detectCollision(): boolean {

        let carPos: Position;
        let dimensions: Dimensions = this.car.getDimensions();

        carPos = {
            up: dimensions.posY,
            down: dimensions.posY + dimensions.height,
            left: dimensions.posX,
            right: dimensions.posX + dimensions.width
        }

        for (const i of this.enemyCars) {

            let enemyCarPos: Position = {
                up: i.dimensions.posY,
                down: i.dimensions.posY + i.dimensions.height,
                left: i.dimensions.posX,
                right: i.dimensions.posX + i.dimensions.width
            };

            if (this.isColliding(enemyCarPos, carPos)) {
                return true;
            }

        }

        return false;

    }

    private isColliding(enemyCarPos: Position, carPos: Position): boolean {

        if (enemyCarPos.left >= carPos.left && enemyCarPos.left <= carPos.right &&
            enemyCarPos.up >= carPos.up && enemyCarPos.up <= carPos.down) {
            return true;
        }
        else if (enemyCarPos.right >= carPos.left && enemyCarPos.right <= carPos.right &&
            enemyCarPos.up >= carPos.up && enemyCarPos.up <= carPos.down) {
            return true;
        }
        else if (enemyCarPos.left >= carPos.left && enemyCarPos.left <= carPos.right &&
            enemyCarPos.down >= carPos.up && enemyCarPos.down <= carPos.down) {
            return true;
        }
        else if (enemyCarPos.right >= carPos.left && enemyCarPos.right <= carPos.right &&
            enemyCarPos.down >= carPos.up && enemyCarPos.down <= carPos.down) {
            return true;
        }

        return false;
    }

}