import { Sprite, Texture } from "pixi.js";
import { Pos2 } from "../../util/position.util";

export class MapTile {
    private _texture: Texture;
    private _position: Pos2;

    private _sprite: Sprite | undefined;

    constructor(texture: Texture, pos: Pos2) {
        this._texture = texture;
        this._position = pos;

        this._sprite = undefined;
    }

    /*
        Generates the sprite object. Must be called before rendering.
    */
    constructTile(): MapTile {
        this._sprite = new Sprite(this._texture);
        this._sprite.x = this._position.x;
        this._sprite.y = this._position.y;

        return this;
    }


    public get texture(): Texture {
        return this.texture;
    }

    public get position(): Pos2 {
        return this._position;
    }

    public get sprite(): Sprite {
        return this._sprite!;
    }
}