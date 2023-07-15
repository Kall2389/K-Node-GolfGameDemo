export enum Level {
    ERROR,
    WARN,
    DEBUG
}

export function logger(level: Level, message: string): void {
    if(level == Level.DEBUG) {
        console.log("%c[DEBUG]\n%c" + message, "color: #b5d9e6; font-size: 15px; font-weight: 400;", "color: #b5d9e6; font-size: 13px; font-weight: 400;");
    } else 

    if(level == Level.WARN) {
        console.log("%c[WARN]\n%c" + message, "color: #f5c77d; font-size: 17px; font-weight: 600;", "color: #f5c77d; font-size: 15px; font-weight: 400;");
    } else

    if(level == Level.ERROR) {
        console.log("%c[ERROR]\n%c" + message, "color: #eb5757; font-size: 17px; font-weight: 600;", "color: #eb5757; font-size: 15px; font-weight: 400;");
    }
}
