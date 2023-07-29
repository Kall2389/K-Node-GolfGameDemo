import { Vec2 } from "../../util/vector.util";
import { GameLevel } from "../level.map";
import { MapTile } from "./tile.map";

/*
 * A placeholder class holding fields for dynamic tiles on the map, such as collidable tiles.
 */

export abstract class DynamicTile extends MapTile {
    abstract update(level: GameLevel): void;

    abstract onCollide(level: GameLevel): void;
    abstract isColliding(ballPos: Vec2, level: GameLevel): boolean;

    public static create(id: string, pos: Vec2): DynamicTile {
        return undefined!;
    }
}