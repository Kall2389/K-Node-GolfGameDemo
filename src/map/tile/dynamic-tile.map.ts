import { Pos2 } from "../../util/position.util";
import { GameLevel } from "../level.map";
import { MapTile } from "./tile.map";

/*
 * A placeholder class holding fields for dynamic tiles on the map, such as collidable tiles.
 */

export abstract class DynamicTile extends MapTile {
    abstract update(level: GameLevel): void;

    abstract onCollide(level: GameLevel): void;
    abstract isColliding(ballPos: Pos2, level: GameLevel): boolean;

    public static create(id: string, pos: Pos2): DynamicTile {
        return undefined!;
    }
}