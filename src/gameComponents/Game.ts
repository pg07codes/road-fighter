import Road from "./Road";
import Car from "./Car";
import EnemyVehicleManager from "./EnemyVehicleManager"; // here was one difference
import carCrashMP3 from "./../sounds/carCrash.mp3";
import grassSpritePNG from "./../sprites/grass.png";
import constants from "../constants";

export default class Game {
    private gameArea;
    private ctx;
    private lastRenderTime: DOMHighResTimeStamp;
    private road: Road;
    private car: Car;
    private enemyVehicleManager: EnemyVehicleManager;
    private carCrashAudio;
    private grassSprite;

    public isGameInitialized: boolean;
    public isRunning: boolean;

    constructor(gameArea: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.gameArea = gameArea;
        this.ctx = ctx;
        this.lastRenderTime = 0;
        this.isGameInitialized = false;
        this.isRunning = false;
        this.carCrashAudio = new Audio(carCrashMP3);
        this.grassSprite = new Image();
        this.grassSprite.src = grassSpritePNG;
    }

    private initialize(): void {
        this.isGameInitialized = true;
        this.road = new Road();
        this.car = new Car(constants.MAX_STEER_SPEED, this.road.getDimensions());
        this.enemyVehicleManager = new EnemyVehicleManager(this.road.getDimensions(), this.car);

        // creating background from grass sprites
        let pattern = this.ctx.createPattern(this.grassSprite, "repeat");
        this.ctx.rect(0, 0, this.gameArea.width, this.gameArea.height);
        this.ctx.fillStyle = pattern;
        this.ctx.fill();
    }

    private gameLoop(currentTime: DOMHighResTimeStamp): void {
        let delta = currentTime - this.lastRenderTime;
        this.lastRenderTime = currentTime;

        // draw
        this.road.draw();

        this.car.draw();
        this.enemyVehicleManager.draw();

        //update
        this.road.update();
        this.enemyVehicleManager.updatePosition();
        this.car.updatePosition();

        if (this.enemyVehicleManager.detectCollision()) {
            this.carCrashAudio.play();
            this.isGameInitialized = false;
            this.isRunning = false;
        }

        if (this.isRunning) {
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    public run(): void {
        if (this.isRunning === true) return;
        this.initialize();
        this.isRunning = true;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public continue(): void {
        if (this.isRunning === true) return;
        this.isRunning = true;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public pause(): void {
        if (this.isRunning === false) return;
        this.isRunning = false;
    }
}
