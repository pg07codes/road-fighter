import { Dimensions, Direction } from "../types";
import { ctx } from "./../index";
import carPNG from "./../images/car.png";
import carOnEdgeMP3 from "./../sounds/carOnEdge.mp3";

export default class Car {
    private ctx;
    private dimensions: Dimensions;
    private roadDimensions: Dimensions;
    private speed: number;
    private steerSpeed: number;
    private maxSteerSpeed: number;
    private carImage;
    private carOnEdgeAudio;

    constructor(maxSpeed: number, roadDimensions: Dimensions) {
        let carWidth = 40;
        let carHeight = 70;

        this.roadDimensions = roadDimensions;
        this.dimensions = {
            posX: roadDimensions.posX + roadDimensions.width / 2 - carWidth / 2,
            posY: roadDimensions.height - carHeight - 50,
            height: carHeight,
            width: carWidth,
        };
        this.ctx = ctx;
        this.speed = 5;
        this.maxSteerSpeed = maxSpeed;
        this.steerSpeed = 0;

        this.carImage = new Image();
        this.carImage.src = carPNG;
        this.carOnEdgeAudio = new Audio(carOnEdgeMP3);

        this.initialize();
    }

    private initialize(): void {
        this.initializeInputHandler();
    }

    public getDimensions() {
        return this.dimensions;
    }

    public getSpeed() {
        return this.speed;
    }

    public draw(): void {
        this.ctx.fillStyle = "#0f0";
        this.ctx.drawImage(this.carImage, this.dimensions.posX, this.dimensions.posY);
    }

    public updatePosition() {
        if (this.steerSpeed < 0) {
            if (this.dimensions.posX > this.roadDimensions.posX) {
                this.dimensions.posX += this.steerSpeed;
            }
        }

        if (this.steerSpeed > 0) {
            if (this.dimensions.posX + this.dimensions.width + 3 * this.steerSpeed < this.roadDimensions.posX + this.roadDimensions.width) {
                this.dimensions.posX += this.steerSpeed;
            }
        }

        if (this.isCarOnEdge()) {
            this.carOnEdgeAudio.play();
        }
    }

    private isCarOnEdge(): boolean {
        if (
            this.areNumbersCloseEnough(this.dimensions.posX, this.roadDimensions.posX) ||
            this.areNumbersCloseEnough(this.dimensions.posX + this.dimensions.width, this.roadDimensions.posX + this.roadDimensions.width)
        ) {
            return true;
        }
        return false;
    }

    /**
     * used to approximately check if pixels are close enough as they are not accurate enough to be used with ==
     */
    private areNumbersCloseEnough(a: number, b: number): boolean {
        if (Math.abs(a - b) < 4) {
            return true;
        }
        return false;
    }

    private initializeInputHandler(): void {
        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowLeft":
                    this.steerSpeed = -this.maxSteerSpeed;
                    break;
                case "ArrowRight":
                    this.steerSpeed = this.maxSteerSpeed;
                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "ArrowLeft":
                    this.steerSpeed = 0;
                    break;
                case "ArrowRight":
                    this.steerSpeed = 0;
                    break;
            }
        });
    }
}
