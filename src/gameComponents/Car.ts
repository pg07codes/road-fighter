import { Dimensions } from "../types";
import { ctx } from "./../index";
import carOnEdgeMP3 from "./../sounds/carOnEdge.mp3";
import constants from "../constants";
import { onMobile , carImg } from "./../index";

export default class Car {
    private ctx;
    private dimensions: Dimensions;
    private roadDimensions: Dimensions;
    private steerSpeed: number;
    private maxSteerSpeed: number;
    private carImage;
    private carOnEdgeAudio;

    constructor(maxSteerSpeed: number, roadDimensions: Dimensions) {
        this.roadDimensions = roadDimensions;
        this.dimensions = {
            posX: roadDimensions.posX + roadDimensions.width / 2 - constants.CAR_WIDTH / 2,
            posY: roadDimensions.height - constants.CAR_HEIGHT - 50,
            height: constants.CAR_HEIGHT,
            width: constants.CAR_WIDTH,
        };
        this.ctx = ctx;
        this.maxSteerSpeed = maxSteerSpeed;
        this.steerSpeed = 0;

        this.carImage = carImg;
        this.carOnEdgeAudio = new Audio(carOnEdgeMP3);
        this.carOnEdgeAudio.volume=0.5;

        this.initialize();
    }

    private initialize(): void {
        this.initializeInputHandler();
    }

    public getDimensions() {
        return this.dimensions;
    }

    public draw(): void {
        this.ctx.fillStyle = "#0f0";
        // this.ctx.fillRect(this.dimensions.posX, this.dimensions.posY, this.dimensions.width, this.dimensions.height)
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
        if (Math.abs(a - b) < 10) {
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

        if (onMobile) {
            let $leftSteer = document.querySelector("#leftSteer");
            let $rightSteer = document.querySelector("#rightSteer");

            $leftSteer.addEventListener("touchstart", (_) => {
                this.steerSpeed = -this.maxSteerSpeed;
            });
            $leftSteer.addEventListener("touchend", (_) => {
                this.steerSpeed = 0;
            });
            $leftSteer.addEventListener("mousedown", (_) => {
                this.steerSpeed = -this.maxSteerSpeed;
            });
            $leftSteer.addEventListener("mouseup", (_) => {
                this.steerSpeed = 0;
            });

            $rightSteer.addEventListener("touchstart", (_) => {
                this.steerSpeed = this.maxSteerSpeed;
            });
            $rightSteer.addEventListener("touchend", (_) => {
                this.steerSpeed = 0;
            });
            $rightSteer.addEventListener("mousedown", (_) => {
                this.steerSpeed = this.maxSteerSpeed;
            });
            $rightSteer.addEventListener("mouseup", (_) => {
                this.steerSpeed = 0;
            });
        }
    }
}
