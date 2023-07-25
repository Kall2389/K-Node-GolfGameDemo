import { Texture } from "pixi.js";
import { DynamicTile } from "../dynamic-tile.map";
import { Pos2 } from "../../../util/position.util";
import { GameLevel } from "../../level.map";
import { AssetManager } from "../../../core/asset-manager.core";

export class DT_EndHole extends DynamicTile {
    static readonly assetQuery: string = "golf:hole_small_end_alt";

    constructor(startPos: Pos2) {
        let centeredPos = startPos;
        centeredPos.x += 8;
        centeredPos.y += 8;

        super(AssetManager.i().getAssetQuery(DT_EndHole.assetQuery), startPos);
    }

    update(level: GameLevel): void {

    }

    onCollide(level: GameLevel): void {
        
    }

    isColliding(ballPos: Pos2, level: GameLevel): boolean {
        return false;
    }
}