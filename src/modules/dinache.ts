import { Dino } from 'dinoloop';
import express = require('express');
import bodyParser = require('body-parser');
import { QueryController } from './controllers/query.controller';
import { logger } from './logger';

export class Dinache {
    constructor(private port?: number) { }

    start(): void {
        const app = express();
        const port = process.env.PORT || this.port || 8080;

        app.use(bodyParser.json());

        const dino = new Dino(app, '');
        dino.useRouter(() => express.Router());
        dino.registerController(QueryController);
        dino.bind();

        app.listen(port, () => logger.info('Server started on port', { port: port }));
    }
}
