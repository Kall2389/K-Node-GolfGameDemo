import { Circle, Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { Vec2 } from "../../util/vector.util";
import { GameLevel } from "../../map/level.map";

export class GamePlayer {
    private _sprite: Sprite;
    private _texture: Texture;
    private _position: Vec2;
    private _velocity: Vec2;

    private _mouseIsDown: boolean = false;

    constructor(tex: Texture, spawnPos: Vec2, stage: Container<DisplayObject>) {
        this._texture = tex;
        this._sprite = new Sprite(tex);

        this._position = spawnPos;
        this.sprite.x = this._position.x;
        this.sprite.y = this._position.y;
 
        this._velocity = new Vec2(0, 0);
        



        
        this._sprite.eventMode = "dynamic";
        this._sprite.anchor.x = 0.5;
        this._sprite.anchor.y = 0.5;

        this._sprite.on("mousedown", (e) => {
            this._mouseIsDown = true;
        });

        stage.on("mouseup", (e) => {
            if(this._mouseIsDown) {
                console.log("Sprite pos: " + this._sprite.position.x + "  " +  + this._sprite.position.y);
                console.log("Cursor pos: " + e.x + "  " + e.y);

                // TODO: Test value please replace them URGENT
                // Bug - mouse position is based on cursor in DOM, not cursor in FRAME
                this.launch(new Vec2(e.x, e.y));
                this._mouseIsDown = false;
            }
        });
    }

    public get sprite(): Sprite {
        return this._sprite;
    }

    /*
     * This method requires the game level. This object can be accessed to see local dynamic tiles / the edge of the map, and
     * this data will be used to influence the movement of the player.
     */
    update(level: GameLevel): void {

        // adjust velocity here
        this._position.x += this._velocity.x;
        this._position.y += this._velocity.y;
        
        this.updateSpritePosition();

        this._velocity.x /= 1.1;
        this._velocity.y /= 1.1;

        if(Math.abs(this._velocity.x) < 0.5) this._velocity.x = 0;
        if(Math.abs(this._velocity.y) < 0.5) this._velocity.y = 0;
        
    }

    isMoving(): boolean {
        return !(this._velocity.x == 0 && this._velocity.y == 0);
    }

    /*
     * This method is called when the user releases the ball.
     * The method should set the velocity appropriately.
     * The method calculates the velocity based on it's position and the mouse position.
     */
    launch(mousePosition: Vec2): void {
        /*
        For testing

        console.log("-------------------------------")
        console.log("Position: " + this._position.toString())
        console.log("Sprite Position: " + this._sprite.position.x +"  "  + this._sprite.position.y)
        console.log("Velocity: " + this._velocity.toString())
        console.log("-------------------------------")
        */

        if(this.isMoving()) return; // Don't launch if already moving.

        // the difference between the player and the mouse
        let difference: Vec2 = mousePosition.subVec(this._position);
        console.log("diff" + difference.toString());    

        // TODO: do all modifications to difference now, e.g. clamping variables, divide to set sensitivity
        difference = difference.div(8, 8);

        // we invert the polarity of the vector (5.4 -> -5.4), as we want the ball to launch in the opposite direction to the mouse
        this._velocity = difference.mult(-1, -1);
    }


    /*
     * Sets `this._sprite` position to `this._position`.
     */
    private updateSpritePosition(): void {
        this._sprite.position.x = this._position.x;
        this._sprite.position.y = this._position.y;
    }
}