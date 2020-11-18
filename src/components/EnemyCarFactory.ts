import EnemyCar from "../gameObjects/EnemyCar";
import { Dimensions } from "../types";

export default class EnemyCarFactory{

    private carCount:number;
    private enemyCars:EnemyCar[];
    private roadDimensions;
    private ctx;
    private latestEnemyCar:EnemyCar;

    constructor(ctx:CanvasRenderingContext2D, roadDimensions: Dimensions) {
        this.carCount = 0;
        this.roadDimensions = roadDimensions;
        this.ctx = ctx;

        let enemyCar = new EnemyCar(this.ctx,this.roadDimensions);
        this.latestEnemyCar = enemyCar;
        this.enemyCars = [enemyCar];

    }

    private insertNewEnemyCar():void {

        if(this.latestEnemyCar.dimensions.posY > 0.25*(this.roadDimensions.height)){
           
            if(Math.round(Math.random()*100) <= 10){  // 10% chance of new enemy car after last has gone.
                let enemyCar:EnemyCar = new EnemyCar(this.ctx,this.roadDimensions);
                this.latestEnemyCar = enemyCar;
                this.enemyCars.push(enemyCar);
                this.carCount++;
            }
            
        }
    }

    private deleteEnemyCar():void {

        this.enemyCars = this.enemyCars.filter((i)=>{
            return !(i.dimensions.posY > this.roadDimensions.posY+this.roadDimensions.height);
        });
        this.carCount = this.enemyCars.length;
    }

    public updatePosition(){

        this.insertNewEnemyCar();

        this.enemyCars.forEach((i)=>{
            i.dimensions.posY+=i.speed;
        });

        this.deleteEnemyCar();
    }

    public draw(){
        this.ctx.fillStyle = "#f00";
        this.enemyCars.forEach((i)=>{
            this.ctx.fillRect(i.dimensions.posX, i.dimensions.posY, i.dimensions.width, i.dimensions.height);
        });
        
    }

    public detectCollision(){

    }

}