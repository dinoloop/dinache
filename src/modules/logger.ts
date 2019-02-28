export class Logger {
    info(msg: string, data: any) {
        console.log(JSON.stringify({
            level: 'info',
            msg: msg,
            timestamp: Date.now(),
            ...data
        }));
    }
}

export const logger = new Logger();
