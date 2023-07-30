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




    // Subtract a vector from this vector object.
    subVec(vec: Vec2): Vec2 {
        return new Vec2(this._x - vec.x, this._y - vec.y);
    }

    // Add a vector to this vector object.
    addVec(vec: Vec2): Vec2 {
        return new Vec2(this._x + vec.x, this._y + vec.y);
    }

    // Multiply this object by a vector.
    multVec(vec: Vec2): Vec2 {
        return new Vec2(this._x * vec.x, this._y * vec.y);
    }

    // Divide this object by a vector.
    divVec(vec: Vec2): Vec2 {
        return new Vec2(this._x / vec.x, this._y / vec.y);
    }

    // Next 3 methods are just an "overload" (not really) allowing you to use numbers
    sub(x: number, y: number): Vec2 {
        return new Vec2(this._x - x, this._y - y);
    }

    add(x: number, y: number): Vec2 {
        return new Vec2(this._x + x, this._y + y);
    }

    mult(x: number, y: number): Vec2 {
        return new Vec2(this._x * x, this._y * y);
    }

    div(x: number, y: number): Vec2 {
        return new Vec2(this._x / x, this._y / y);
    }






    // Serialize the object to a printable string.
    toString(): string {
        return "[Vec2 object] x:" + (this._x) + " y:" + (this._y);
    }

    // Serialize the object into JSON.
    toJson(): any {
        return {"x":this._x, "y":this._y};
    }
}