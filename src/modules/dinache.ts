// tslint:disable-next-line:no-implicit-dependencies no-require-imports no-var-requires
require('source-map-support').install();
// tslint:disable-next-line:no-require-imports
import express = require('express');
// tslint:disable-next-line:no-require-imports
import bodyParser = require('body-parser');
import { Dino } from 'dinoloop';
import { QueryController } from './controllers/query.controller';
import { logger } from './logger';

export class Dinache {
    private app;
    private port;

    constructor(port?: number) {
        this.app = express();
        this.port = process.env.PORT || this.port || 8080;

        this.app.use(bodyParser.json());

        const dino = new Dino(this.app, '');
        dino.useRouter(() => express.Router());
        dino.registerController(QueryController);
        dino.bind();
    }

    start(): void {
        this.app.listen(this.port, () =>
            logger.info('Server started on port', { port: this.port }));
    }

    getAppInstance(): any {
        return this.app;
    }
}
