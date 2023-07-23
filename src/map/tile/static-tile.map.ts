import { Texture } from "pixi.js";
import { MapTile } from "./tile.map";
import { Pos2 } from "../../util/position.util";

/*
 * A placeholder class holding fields for static tiles on the map, such as background tiles.
 */

export class StaticTile extends MapTile {
    public static create(tex: Texture, pos: Pos2): StaticTile {
        return new StaticTile(tex, pos);
    }
}