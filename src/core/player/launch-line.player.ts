import { AlphaFilter, Graphics, Matrix } from "pixi.js";
import { Vec2 } from "../../util/vector.util";
import { clampInt } from "../../util/math.util";

export class LaunchLine {
    private static MIN_DIST: number = 36;
    private static MAX_DIST : number = 192;

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

        // get the distance between mouse and ball
        let diffVec = mousePos.subVec(ballPos);

        // radian angle of the mouse relative to the ball
        let angleRad = Math.atan2(diffVec.x, diffVec.y);
        // absolute cosine / absolute sine values of that radian
        let angleCos = Math.abs(Math.cos(angleRad));
        let angleSin = Math.abs(Math.sin(angleRad));
        // the biggest of either values `angleCos` or `angleSin` (note: these are absolute)
        let trigonometricModifier = angleCos > angleSin ? angleCos : angleSin;
        // we use this value to contain the line within a circle, value will always be between 0-1.

        // get the biggest absolute number in the vector difference of the ball and mouse
        let biggestVecAxis = Math.abs(Math.abs(diffVec.x) > Math.abs(diffVec.y) ? diffVec.x : diffVec.y);

        // get the number the final vector will be *'ed by                                        * by length of line if inside a circle
        let distanceModifier = clampInt(biggestVecAxis, LaunchLine.MIN_DIST, LaunchLine.MAX_DIST) * trigonometricModifier;
    
        // divide them times - making sure to preserve the ratio of x to y
        diffVec = diffVec.div(biggestVecAxis, biggestVecAxis); // divide to get values between 0-1
        diffVec = diffVec.mult(distanceModifier, distanceModifier); // *'s back up to get clamped length of line

        // since we've only calculated the difference, we still need to add on the original ballPos vector we subtracted
        diffVec = diffVec.addVec(ballPos);


        this._line.lineStyle(2, "0xFFFFFF", this._alpha);
        this._line.moveTo(ballPos.x, ballPos.y);
        this._line.lineTo(diffVec.x, diffVec.y);
        this._line.endFill();
    }







    // used to add/remove it from the stage
    getGraphics(): Graphics {
        return this._line;
    }
}