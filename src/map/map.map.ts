import { clampInt } from "../util/math.util";
import { GameLevel } from "./level.map";

export class GameMap {
    private levels: GameLevel[];
    private activeLevelIndex: number;

    constructor(levels: GameLevel[], startingLevelIndex?: 0) { // optional parameter
        this.levels = levels;
        this.activeLevelIndex = (startingLevelIndex == undefined ? 0 : startingLevelIndex); // if param passed, make it param
    }

    /*
     * Public method for incrementing level.
     */
    incrementLevel() {
        this.activeLevelIndex++;
    }

    /*
     * Public method for decrementing level.
     */
    decrementLevel(clamp?: boolean) {
        this.activeLevelIndex--;

        // if should clamp index
        if(!clamp) this.activeLevelIndex = clampInt(this.activeLevelIndex, 0, this.getLevelCount() - 1);
    }

    /*
     * Public method for adjusting level. Remove if unused.
     */
    setLevel(index: number) {

    }










    getLevelCount(): number {
        return this.levels.length;
    }   




    private updateIntervalLevel() {

    }

    private checkWin(): boolean {
        //     if activeLevelIndex outside positive index range of levels
        return this.activeLevelIndex >= this.getLevelCount();
    }
}