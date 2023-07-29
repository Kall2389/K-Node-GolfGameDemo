import { AlphaFilter, Graphics } from "pixi.js";
import { Vec2 } from "../../util/vector.util";

export class LaunchLine {
    private _line: Graphics;
    private _alpha: number;

    constructor() {
        this._line = new Graphics();
        this._alpha = 0;
    }



    hide(): void {
        this._alpha = 0;
        this._line.clear();
    }

    show(): void {
        this._alpha = 1;
    }


    /*
        Used to draw the line between the ball and the mouse.
        This can also be used as an `update` function, as it gets called every tick.
    */
    draw(ballPos: Vec2, mousePos: Vec2): void {
        this._line.clear();

        this._line.lineStyle(2, "0xFFFFFF", this._alpha);
        this._line.moveTo(ballPos.x, ballPos.y);
        this._line.lineTo(mousePos.x, mousePos.y);
        this._line.endFill();

        console.log("drawing " + this._line.alpha)
    }







    // used to add/remove it from the stage
    getGraphics(): Graphics {
        return this._line;
    }
}