import { Dimensions, Direction } from './../types';
import carPNG from './../images/car.png';
import carOnEdgeMP3 from './../sounds/carOnEdge.mp3'

export default class Car {

    private roadDimensions: Dimensions;
    private dimensions: Dimensions;
    private ctx;
    private velocity:number;
    private maxSpeed:number;
    private carImage;
    private carOnEdge;

    constructor(ctx:CanvasRenderingContext2D, roadDimensions: Dimensions) {
        this.roadDimensions = roadDimensions;
        this.dimensions = {
            posX: roadDimensions.posX + roadDimensions.width/2 - 45/2,
            posY: roadDimensions.height - 75 - 50,
            height: 75,
            width: 45
        };
        this.ctx = ctx;
        this.maxSpeed = 3;
        this.velocity = 0;

        this.carImage = new Image();
        this.carImage.src=carPNG;

        this.carOnEdge = new Audio(carOnEdgeMP3);
        
    }

    public getDimensions(){
        return this.dimensions;
    }

    public draw(): void {
        this.ctx.fillStyle = "#0f0";
        this.ctx.drawImage(this.carImage,this.dimensions.posX, this.dimensions.posY);
        // this.ctx.fillRect(this.dimensions.posX, this.dimensions.posY, this.dimensions.width, this.dimensions.height);
    }

    public updatePosition(){
        
        if(this.velocity<0){
            if(this.dimensions.posX > this.roadDimensions.posX){
                this.dimensions.posX +=this.velocity;
            }
        }

        if(this.velocity>0){  // added 3 as it was overlapping on grass edge on right side which did not seem clean
            if(this.dimensions.posX + this.dimensions.width+3 < this.roadDimensions.posX + this.roadDimensions.width ){
                this.dimensions.posX +=this.velocity;
            }
        }

        if(this.isCarOnEdge()){
            this.carOnEdge.play();
        }else{
            console.log('na')
        }
            
    }

    private isCarOnEdge():boolean{

        if(this.numberCloseEnough(this.dimensions.posX,this.roadDimensions.posX) || 
        this.numberCloseEnough(this.dimensions.posX+this.dimensions.width,this.roadDimensions.posX+this.roadDimensions.width)){
                return true;
        }
        return false;
    }

    /**
     * used to approximately check if pixels are close enough as they are not accurate enough to be used with ==
     */
    private numberCloseEnough(a:number,b:number):boolean{
        if(Math.abs(a-b)<4){
            return true;
        }
        return false;
    }

    public initialiseInputHandler():void{
        
        document.addEventListener('keydown',(e)=>{
            switch(e.code){
                case 'ArrowLeft':
                    this.velocity = -this.maxSpeed;
                    break;
                case 'ArrowRight':
                    this.velocity = this.maxSpeed;
                    break;
            }
            
        })

        document.addEventListener('keyup',(e)=>{
            switch(e.code){
                case 'ArrowLeft':
                    this.velocity = 0;
                    break;
                case 'ArrowRight':
                    this.velocity = 0;
                    break;
            }
            
        })

    }


}