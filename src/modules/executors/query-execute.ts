import { IQuery, OPERATION, IQueryResult, IBatchResult } from '../models/iquery';
import { Cache } from '../cache-store';

export class QueryExecute {

    private static exec(q: IQuery): IQueryResult {
        const result: IQueryResult = {};
        if (q.op === OPERATION.GET) {
            result.value = Cache.get(q.key);
        } else if (q.op === OPERATION.PUT) {
            if (Cache.put(q.key, q.value) === false) {
                result.error = 'KEY_EXISTS';
            }
        } else if (q.op === OPERATION.UPSERT) {
            Cache.upsert(q.key, q.value);
        } else if (q.op === OPERATION.DELETE) {
            Cache.delete(q.key);
        } else {
            result.error = 'INVALID_OP - POSSIBLE VALUES [GET | PUT | UPSERT | DELETE]';
        }
        return result;
    }

    static run(q: IQuery): IBatchResult {
        return {
            query: QueryExecute.exec(q)
        };
    }

    static runBatch(q: IQuery[]): IBatchResult {
        const result: IQueryResult[] = [];
        for (const query of q) {
            result.push(QueryExecute.exec(query));
        }
        return {
            batch: result
        };
    }
}
