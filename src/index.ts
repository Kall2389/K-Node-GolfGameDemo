import * as PIXI from 'pixi.js'
import { AssetManager } from './core/asset-manager.core';

const app = new PIXI.Application({
    width: 1000,
    height: 800,
    backgroundColor: 0x1099bb,
    view: document.getElementById('game-canvas') as HTMLCanvasElement,
});

let assetManager = new AssetManager();
assetManager.loadAllAssets().then(() => {
    const dude = new PIXI.Sprite(assetManager.getAsset("golf", "background_blue"));
    dude.anchor.set(0.5);

    // move the sprite to the center of the screen
    dude.x = app.screen.width / 2;
    dude.y = app.screen.height / 2;

    app.stage.addChild(dude);
});