import { AssetManager } from "../../core/asset-manager.core";
import { Pos2 } from "../../util/position.util";
import { DynamicTile } from "./dynamic-tile.map";
import { DT_EndHole } from "./impl/end-hole.map";
import { DT_StartIndicator } from "./impl/start-indicator.map";
import { StaticTile } from "./static-tile.map";

/*
    This class has to be in a whole new file because TypeScript doesn't like circular dependency (although it was a nice design pattern).
*/

export class MapTileInstantiator {
    public static static(texId: string, pos: Pos2): StaticTile {
        return new StaticTile(AssetManager.i().getAssetQuery(texId), pos);
    }

    public static dynamic(id: string, pos: Pos2): DynamicTile {
        switch(id.toLowerCase()) {
            case "start_indicator": { return new DT_StartIndicator(pos); break; }
            case "end_hole": { return new DT_EndHole(pos); break; } 
        }

        return undefined!;
    }
}