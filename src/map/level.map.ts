import { Container, DisplayObject } from "pixi.js";
import { DynamicTile } from "./tile/dynamic-tile.map";
import { StaticTile } from "./tile/static-tile.map";
import { Pos2 } from "../util/position.util";
import { AssetManager } from "../core/asset-manager.core";
import { Level, logger } from "../logger/logger";
import { DT_EndHole } from "./tile/impl/end-hole.map";
import { MapTile } from "./tile/tile.map";
import { container } from "webpack";
import { DT_StartIndicator } from "./tile/impl/start-indicator.map";

const DYN_TILE_TO_CLASS = 
    {"start_indicator":""}
;

export class GameLevel {
    private _staticTiles: StaticTile[];
    private _dynamicTiles: DynamicTile[];

    private _hasWalls: boolean;
    private _ballSpawn: Pos2;

    private _staticTileContainer: Container;
    private _dynamicTileContainer: Container;
    private _wallContainer: Container;

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
        this.generateDynamicTileContainer();

        stage.addChild(this._staticTileContainer);
        stage.addChild(this._dynamicTileContainer);
    }

    private generateStaticTileContainer(): void {
        let container: Container = new Container();

        this._staticTiles.forEach((tile: StaticTile) => {
            container.addChild(tile.sprite);
        });

        this._staticTileContainer = container;
    }

    private generateDynamicTileContainer(): void {
        let container: Container = new Container();

        this._dynamicTiles.forEach((tile: DynamicTile) => {
            container.addChild(tile.sprite);
        });

        this._dynamicTileContainer = container;
    }

    public get hasWalls(): boolean {
        return this._hasWalls;
    }

    public get spawnPoint(): Pos2 {
        return this._ballSpawn;
    }

    updateAllSprites(): void {
        this._dynamicTiles.forEach((tile: DynamicTile) => tile.update(this));
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
 * Code in this function can be unsafe as it's all caught by a try/catch on method call (this is bad practice).
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
                    new StaticTile(
                        AssetManager.i().getAssetQuery(assetId),
                        new Pos2(j * AssetManager.getDefaultAssetWidth(), i * AssetManager.getDefaultAssetWidth())
                    )
                );
            }
            j++;
        });
    }
    // the `staticSprites` variable is now populated

    // TODO: Load dynamic sprites
    let levelDynSprites: [] = gameLevelJson["dynamicTiles"];
    let dynamicSprites: DynamicTile[] = [];

    console.log(levelDynSprites)
    for(let i: number = 0; i < levelDynSprites.length; i++) {
        let row: string[] = levelDynSprites[i];
        let j = 0;
        // for every `assetId`, check if null, if so just increment `j` (x value), otherwise construct sprite based off `assetId`
        
        row.forEach((assetId: string) => {
            if(assetId != "null") {
                let newTile: DynamicTile | undefined = undefined;
                switch(assetId.toLowerCase()) {
                    case "start_indicator": newTile = new DT_StartIndicator(new Pos2(j * AssetManager.getDefaultAssetWidth(), i * AssetManager.getDefaultAssetWidth())); break;
                    case "end_hole": newTile = new DT_EndHole(new Pos2(j * AssetManager.getDefaultAssetWidth(), i * AssetManager.getDefaultAssetWidth())); break;
                }



                if(newTile != undefined) dynamicSprites.push(newTile);
                else throw new Error(); // stop loading level - load file is incorrect
            }
            j++;
        });
    }

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