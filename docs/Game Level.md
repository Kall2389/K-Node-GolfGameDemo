### `spawnPos`
Serialized: `{"x":0,"y":0}`
Object: `Pos2`
Description: `A 2D position denoting the spawn position for the game level.`

### `levelIndex`
Serialized: `{"index":0}`
Object: `number` (primitive)
Description: `An integer denoting the index of the level in the map.`

### `hasWalls`
Serialized: `{"index":true}`
Object: `boolean` (primitive)
Description: `A boolean denoting whether the game level has walls.`

### `staticTiles`
Serialized: `["golf:backgound_blue"]["golf:backgound_green"]`
Object: `WorldTilemap<>`
Description: `A 2D array denoting the tilemap for the static tiles.`

### `dynamicTiles`
Serialized: `["..."]["..."]`
Object: `WorldTilemap<>`
Description: `A 2D array denoting the tilemap for the dynamic tiles.`






#### Note: Use \"null" as a non-existing tile.

```json
{
	"spawnPos":{"x":4,"y":4},
	"levelIndex":0,
	"hasWalls":true,
	"staticTiles":[
		["golf:background_blue", "golf:background_blue", "golf:background_blue"],
		["golf:background_blue", "null", "golf:background_blue"],
		["golf:background_blue", "golf:background_blue", "golf:background_blue"]
	],
	"dynamicTiles":[]
}
```