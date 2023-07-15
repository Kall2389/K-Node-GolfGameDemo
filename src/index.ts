import * as PIXI from 'pixi.js'
import { AssetManager } from './core/asset-manager.core';

const app = new PIXI.Application({
    width: 1000,
    height: 800,
    backgroundColor: 0x1099bb,
    view: document.getElementById('game-canvas') as HTMLCanvasElement,
});

