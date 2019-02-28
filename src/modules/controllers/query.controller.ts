import { ApiController, Controller, HttpPost } from 'dinoloop';
import { IBatchQuery, IBatchResult } from '../models/iquery';
import { Utility } from '../utility';
import { QueryExecute } from '../executors/query.execute';

@Controller('')
export class QueryController extends ApiController {

    @HttpPost('/query')
    run(batchQuery: IBatchQuery): IBatchResult {
        if (!Utility.isNullOrUndefined(batchQuery.query)) {
            return QueryExecute.run(batchQuery.query);
        } else if (!Utility.isNullOrUndefined(batchQuery.batch)) {
            return QueryExecute.runBatch(batchQuery.batch);
        }
        return {
            error: 'INVALID_QUERY'
        };
    }
}
