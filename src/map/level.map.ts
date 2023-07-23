import { Container, DisplayObject } from "pixi.js";
import { DynamicTile } from "./tile/dynamic-tile.map";
import { StaticTile } from "./tile/static-tile.map";
import { Pos2 } from "../util/position.util";
import { AssetManager } from "../core/asset-manager.core";
import { Level, logger } from "../logger/logger";

export class GameLevel {
    private _staticTiles: StaticTile[];
    private _dynamicTiles: DynamicTile[];

    private _hasWalls: boolean;

    private _staticTileContainer: Container;
    private _dynamicTileContainer: Container;
    private _wallContainer: Container;

    private _ballSpawn: Pos2;

    constructor(_staticTiles: StaticTile[], _dynamicTiles: DynamicTile[], _hasWalls: boolean, _ballSpawn: Pos2) {
        this._staticTiles = _staticTiles;
        this._dynamicTiles = _dynamicTiles;
        this._hasWalls = _hasWalls;
        this._ballSpawn = _ballSpawn;

        this._staticTileContainer = undefined!;
        this._dynamicTileContainer = undefined!;
        this._wallContainer = undefined!;
    }

    constructScene(stage: Container<DisplayObject>): void {
        this.generateStaticTileContainer();
        
        this._staticTileContainer.x = 64;
        this._staticTileContainer.y = 64;

        stage.addChild(this._staticTileContainer);
    }

    private generateStaticTileContainer(): void {
        let container: Container = new Container();

        this._staticTiles.forEach((tile: StaticTile) => {
            container.addChild(tile.sprite);
        });

        this._staticTileContainer = container;
    }
}



/*
 * Constructs a game level object. Only returns a `GameLevel` object if level loaded successfully.
 */
export function loadGameLevel(gameLevelJson: any): GameLevel | undefined {
    if(!hasGoodLevelIntegrity(gameLevelJson)) {
        logger(Level.ERROR, "Unable to load game level: Bad level integrity.");
        return undefined;
    }

    try {
        let level: GameLevel = createGameLevelObject(gameLevelJson);
        logger(Level.DEBUG, "Successfully loaded game level object.");
        return level;
    } catch(ex) {
        logger(Level.ERROR, "Unable to load game level: Could not construct `GameLevel` object.");
        return undefined;
    }
}



// TODO: Improve this method maybe, add some more sophisticated checking e.g. types on certain values, are there any levels?
/*
 * Roughly verifies the integrity of the JSON object of a level. Returns false if the JSON is bad.
 */
function hasGoodLevelIntegrity(gameLevelJson: any): boolean {
    let keys: String[] = Object.keys(gameLevelJson);
    
    if(!keys.includes("spawnPos")) return false;
    if(!keys.includes("levelIndex")) return false;
    if(!keys.includes("hasWalls")) return false;
    if(!keys.includes("staticTiles")) return false;
    if(!keys.includes("dynamicTiles")) return false;

    return true;
}



/*
 * Private function for the actual method parsing a level JSON, and constructing that into an object.
 */
function createGameLevelObject(gameLevelJson: any): GameLevel {
    // loop through 2d array, generate all sprites in rows and set appropriate pos
    let levelBoard: [] = gameLevelJson["staticTiles"];
    let staticSprites: StaticTile[] = [];

    for(let i: number = 0; i < levelBoard.length; i++) {
        let row: string[] = levelBoard[i];
        let j = 0;
        // for every `assetId`, check if null, if so just increment `j` (x value), otherwise construct sprite based off `assetId`
        row.forEach((assetId: string) => {
            if(assetId != "null") {
                staticSprites.push(
                    StaticTile.create(
                        AssetManager.i().getAssetQuery(assetId),
                        new Pos2(j * AssetManager.getDefaultAssetWidth(), i * AssetManager.getDefaultAssetWidth())
                    ).constructTile()
                );
            }
            j++;
        });
    }
    // the `staticSprites` variable is now populated

    // TODO: Load dynamic sprites
    let dynamicSprites: DynamicTile[] = [];
    // the `dynamicSprites` variable is now populated

    // load other two fields
    let spawnPos: Pos2 = new Pos2(parseInt(gameLevelJson["spawnPos"]["x"]), parseInt(gameLevelJson["spawnPos"]["y"]));
    let hasWalls: boolean = gameLevelJson["hasWalls"] === "true" ? true : false;

    

    let level: GameLevel = new GameLevel(
        staticSprites,
        dynamicSprites,
        hasWalls,
        spawnPos
    );

    return level;
}