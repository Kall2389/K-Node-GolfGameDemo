import * as PIXI from 'pixi.js'
import { AssetManager } from './core/asset-manager.core';
import { GameLevel } from './map/level.map';

const app = new PIXI.Application({
    width: 1000,
    height: 800,
    backgroundColor: 0x282828,
    view: document.getElementById('game-canvas') as HTMLCanvasElement,
});


(async () => {
    let assetManager: AssetManager = new AssetManager();
    await assetManager.loadAllAssets();

    let level: GameLevel = GameLevel.create(app.stage, JSON.parse(`{
        "spawnPos":{"x":0,"y":0},
        "levelIndex":0,
        "hasWalls":true,
        "staticTiles":[
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_green", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"],
            ["golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue", "golf:background_blue"]
        ],
        "dynamicTiles":[
            ["null"],
            ["null", "null", "null", "start_indicator"],
            ["null"],
            ["null"],
            ["null"],
            ["null"],
            ["null", "end_hole"]
        ]
    }`))!;

    app.stage.eventMode = "dynamic";
    
    level.constructScene();
    let ticker = PIXI.Ticker.shared;
    ticker.start();
    ticker.add(() => { level.updateAllSprites() });
})();