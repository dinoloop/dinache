export class Logger {
    info(msg: string, data: any): void {
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify({
            level: 'info',
            msg: msg,
            timestamp: Date.now(),
            ...data
        }));
    }
}

export const logger = new Logger();
