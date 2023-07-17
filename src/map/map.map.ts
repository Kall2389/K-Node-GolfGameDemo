import { Container, DisplayObject } from "pixi.js";
import { DynamicTile } from "./tile/dynamic-tile.map";
import { StaticTile } from "./tile/static-tile.map";

export class GameMap {
    private _staticTiles: StaticTile[];
    private _dynamicTiles: DynamicTile[];

    constructor(_staticTiles: StaticTile[], _dynamicTiles: DynamicTile[]) {
        this._staticTiles = _staticTiles;
        this._dynamicTiles = _dynamicTiles;
    }

    constructScene(stage: Container<DisplayObject>): void {
        this._staticTiles.forEach((tile: StaticTile) => {
            console.log("adding tile: " + tile)
            stage.addChild(tile.sprite);
        });
    }   
}