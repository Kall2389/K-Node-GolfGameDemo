import * as PIXI from 'pixi.js'
import { AssetManager } from './core/asset-manager.core';
import { GameLevel, loadGameLevel } from './map/level.map';
import { StaticTile } from './map/tile/static-tile.map';
import { Pos2 } from './util/position.util';

const app = new PIXI.Application({
    width: 1000,
    height: 800,
    backgroundColor: 0x1099bb,
    view: document.getElementById('game-canvas') as HTMLCanvasElement,
});


(async () => {
    let assetManager = new AssetManager();
    await assetManager.loadAllAssets();

    let level: GameLevel = loadGameLevel(JSON.parse(`{
        "spawnPos":{"x":4,"y":4},
        "levelIndex":0,
        "hasWalls":true,
        "staticTiles":[
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_green", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"]
        ],
        "dynamicTiles":[]
    }`))!;
    console.log(level)
    level.constructScene(app.stage);
})();