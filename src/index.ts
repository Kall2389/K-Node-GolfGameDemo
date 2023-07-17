import * as PIXI from 'pixi.js'
import { AssetManager } from './core/asset-manager.core';
import { GameMap } from './map/map.map';
import { StaticTile } from './map/tile/static-tile.map';
import { Pos2 } from './util/Pos2';

const app = new PIXI.Application({
    width: 1000,
    height: 800,
    backgroundColor: 0x1099bb,
    view: document.getElementById('game-canvas') as HTMLCanvasElement,
});


(async () => {
    let assetManager = new AssetManager();
    await assetManager.loadAllAssets();

    let tiles: StaticTile[] = [];

    tiles.push(new StaticTile(assetManager.getAsset("golf", "background_blue"), new Pos2(0, 0)).constructTile());
    tiles.push(new StaticTile(assetManager.getAsset("golf", "background_blue"), new Pos2(128, 0)).constructTile());
    tiles.push(new StaticTile(assetManager.getAsset("golf", "background_green"), new Pos2(64, 0)).constructTile());
    tiles.push(new StaticTile(assetManager.getAsset("golf", "background_green"), new Pos2(192, 0)).constructTile());

    tiles.push(new StaticTile(assetManager.getAsset("golf", "background_green"), new Pos2(0, 64)).constructTile());
    tiles.push(new StaticTile(assetManager.getAsset("golf", "background_green"), new Pos2(128, 64)).constructTile());
    tiles.push(new StaticTile(assetManager.getAsset("golf", "background_blue"), new Pos2(64, 64)).constructTile());
    tiles.push(new StaticTile(assetManager.getAsset("golf", "background_blue"), new Pos2(192, 64)).constructTile());

    new GameMap(tiles, []).constructScene(app.stage);
})();