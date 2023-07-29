import { Texture } from "pixi.js";
import { DynamicTile } from "../dynamic-tile.map";
import { Vec2 } from "../../../util/vector.util";
import { GameLevel } from "../../level.map";
import { AssetManager } from "../../../core/asset-manager.core";

export class DT_EndHole extends DynamicTile {
    static readonly assetQuery: string = "golf:hole_small_end_alt";

    constructor(startPos: Vec2) {
        let centeredPos = startPos;
        centeredPos.x += 8;
        centeredPos.y += 8;

        super(AssetManager.i().getAssetQuery(DT_EndHole.assetQuery), startPos);
    }

    update(level: GameLevel): void {

    }

    onCollide(level: GameLevel): void {
        
    }

    isColliding(ballPos: Vec2, level: GameLevel): boolean {
        return false;
    }
}