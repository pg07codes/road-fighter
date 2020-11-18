import { Dimensions, Direction } from './../types';

export default class Car {

    private roadDimensions: Dimensions;
    private dimensions: Dimensions;
    private ctx;

    constructor(ctx:CanvasRenderingContext2D, roadDimensions: Dimensions) {
        this.roadDimensions = roadDimensions;
        this.dimensions = {
            posX: roadDimensions.posX + roadDimensions.width/2 - 50/2,
            posY: roadDimensions.height - 90 - 20,
            height: 90,
            width: 50
        };
        this.ctx = ctx;
    }

    public draw(): void {
        this.ctx.fillStyle = "#0f0";
        this.ctx.fillRect(this.dimensions.posX, this.dimensions.posY, this.dimensions.width, this.dimensions.height);
    }

    public move(direction:Direction): void{
        if(direction === Direction.left && this.dimensions.posX > this.roadDimensions.posX){
            this.dimensions.posX -=5;
        }else if(direction === Direction.right  && 
            this.dimensions.posX + this.dimensions.width < this.roadDimensions.posX + this.roadDimensions.width ){
            
            this.dimensions.posX +=5;
        }
    }

    public initialiseInputHandler():void{
        
        document.addEventListener('keydown',(e)=>{
            switch(e.code){
                case 'ArrowLeft':
                    this.move(Direction.left);
                    break;
                case 'ArrowRight':
                    this.move(Direction.right);
                    break;
            }
            
        })

    }


}