import { Texture } from "pixi.js"
import { logger, Level } from "../logger/logger";

let assetManager: AssetManager = undefined!;

export class AssetManager {
    private assets: Texture[];
    private assetIndex: Map<String, number>;

    constructor() {
        this.assets = [];
        this.assetIndex = new Map<String, number>;
    }

    /*
        Public function ran pre-game, once, to load all game assets.
    */
    async loadAllAssets(): Promise<void> {
        await this.loadAsset("assets/fallback/invalid_texture.png");

        await this.loadAsset("assets/golf/background_blue.png");
        await this.loadAsset("assets/golf/background_brown.png");
        await this.loadAsset("assets/golf/background_green.png");

        assetManager = this;
    }

    /*
        Private function used internally to abstract loading assets.
    */
    private async loadAsset(path: string): Promise<void> {
        let texture: Texture = await Texture.from(path);
        let namespace = (path.startsWith("assets/golf") ? "golf" : (path.startsWith("assets/icons") ? "icons" : "fallback"));
        let id = path.substring(path.lastIndexOf("/") + 1).split(".")[0];

        this.assetIndex.set(namespace + ":" + id, this.assets.length);
        this.assets[this.assets.length] = texture;
    }

    /*
        A safe function to get the index of an asset.
    */

    private getAssetIndex(query: string): number {
        if(this.assetIndex.has(query)) return this.assetIndex.get(query)!; // return the id if it exists
        logger(Level.WARN, "Could not find loaded asset by ID: " + query); // otherwise, log an error

        return this.assetIndex.get("fallback:invalid_texture")!;
    }

    /*
        Public function used by various classes to fetch loaded textures.
    */
    getAsset(namespace: string, id: string): Texture {
        let query: string = namespace + ":" + id; // generate the query key for the hashmap

        return this.assets[this.getAssetIndex(query)]; // return the texture through a safe function
    }

    getAssetQuery(query: string): Texture {
        return this.assets[this.getAssetIndex(query)]; // return the texture through a safe function
    }

    /*
     * Returns the instance of the asset manager.
     */
    public static i(): AssetManager {
        return assetManager;
    }

    public static getDefaultAssetWidth(): number {
        return 64;
    }
}