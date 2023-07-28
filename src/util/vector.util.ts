/*
 * A placeholder class for a set of two numbers. A position, a vector, whatever.
 */

export class Vec2 {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public set y(newY: number) {
        this._y = newY;
    }

    public set x(newX: number) {
        this._x = newX;
    }

    toString(): string {
        return "[Vec2 object] x:" + (this._x) + " y:" + (this._y);
    }

    toJson(): any {
        return {"x":this._x, "y":this._y};
    }
}