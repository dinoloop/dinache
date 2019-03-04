export enum OPERATION {
    GET = 'GET',
    PUT = 'PUT',
    UPSERT = 'UPSERT',
    DELETE = 'DELETE',
    UPDATE = 'UPDATE'
}

export interface IQuery {
    op?: OPERATION;
    key?: string;
    value?: any;
}

export interface IBatchQuery {
    batch?: IQuery[];
    query?: IQuery;
}

export interface IQueryResult {
    error?: string;
    value?: string;
}

export interface IBatchResult {
    batch?: IQueryResult[];
    query?: IQueryResult;
    error?: string;
}
