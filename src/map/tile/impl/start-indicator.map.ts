import { BlurFilter, Texture } from "pixi.js";
import { DynamicTile } from "../dynamic-tile.map";
import { Vec2 } from "../../../util/vector.util";
import { GameLevel } from "../../level.map";
import { AssetManager } from "../../../core/asset-manager.core";

export class DT_StartIndicator extends DynamicTile {
    static readonly assetQuery: string = "golf:hole_start";

    private life: number = 1.3;
    private blurFilter: BlurFilter = new BlurFilter();

    constructor(startPos: Vec2) {
        super(AssetManager.i().getAssetQuery(DT_StartIndicator.assetQuery), startPos);

        this.blurFilter.blur = 0;
        this.sprite.filters = [this.blurFilter];

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.x += 32;
        this.sprite.y += 32;
    }

    update(level: GameLevel): void {
        this.life -= 0.03;
        this.sprite.alpha = this.life;

        this.blurFilter.blur = (1 - (Math.min(1, this.life))) * 3;

        this.sprite.height = 32 * (1.3-this.life) + 16;
        this.sprite.width = 32 * (1.3-this.life) + 16;
    }

    onCollide(level: GameLevel): void {
        
    }

    isColliding(ballPos: Vec2, level: GameLevel): boolean {
        return false;
    }
}