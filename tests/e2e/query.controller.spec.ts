// tslint:disable: no-implicit-dependencies no-require-imports
import request = require('supertest');
import { Dinache } from '../index';

describe('query.controller.e2e.spec', () => {
    const port = 8082;

    it('when_query_or_batch_is_not_given_returns_200_INVALID_QUERY', done => {
        request(new Dinache(port).getAppInstance())
            .post('/query')
            .send({
                op: 'GET',
                key: 'key1'
            })
            .expect('Content-Type', /json/)
            .expect(200, { error: 'INVALID_QUERY' }, done);
    });
    it('when_GET_query_and_key_not_exists_returns_200', done => {
        request(new Dinache(port).getAppInstance())
            .post('/query')
            .send({
                query: {
                    op: 'GET',
                    key: 'key1'
                }
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                query: {}
            }, done);
    });
    it('when_PUT_query_and_key_not_exists_returns_200', done => {
        request(new Dinache(port).getAppInstance())
            .post('/query')
            .send({
                query: {
                    op: 'PUT',
                    key: 'key1'
                }
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                query: {}
            }, done);
    });
    it('when_UPSERT_query_and_key_not_exists_returns_200', done => {
        request(new Dinache(port).getAppInstance())
            .post('/query')
            .send({
                query: {
                    op: 'UPSERT',
                    key: 'key1'
                }
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                query: {}
            }, done);
    });
    it('when_DELETE_query_and_key_not_exists_returns_200', done => {
        request(new Dinache(port).getAppInstance())
            .post('/query')
            .send({
                query: {
                    op: 'DELETE',
                    key: 'key1'
                }
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                query: {}
            }, done);
    });
    it('when_UPDATE_query_and_key_not_exists_returns_200', done => {
        request(new Dinache(port).getAppInstance())
            .post('/query')
            .send({
                query: {
                    op: 'UPDATE',
                    key: 'key1'
                }
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                query: {
                    error: 'KEY_NOT_EXISTS'
                }
            }, done);
    });
    it('when_BATCH_query_returns_200', done => {
        request(new Dinache(port).getAppInstance())
            .post('/query')
            .send({
                batch: [{
                    op: 'PUT',
                    key: 'key1',
                    value: 'put1'
                }, {
                    op: 'PUT',
                    key: 'key2',
                    value: { data: 'john' }
                }, {
                    op: 'PUT',
                    key: 'key1',
                    value: 'put2'
                }, {
                    op: 'GET',
                    key: 'key1'
                }, {
                    op: 'DELETE',
                    key: 'key1'
                }, {
                    op: 'GET',
                    key: 'key1'
                }, {
                    op: 'UPSERT',
                    key: 'key1',
                    value: 'upsert1'
                }, {
                    op: 'UPDATE',
                    key: 'key1',
                    value: 'update1'
                }, {
                    op: 'UPSERT',
                    key: 'key1',
                    value: 'upsert2'
                }, {
                    op: 'GET',
                    key: 'key1'
                }, {
                    op: 'GET',
                    key: 'key2'
                }]
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                batch: [
                    {},
                    {}, {
                        error: 'KEY_EXISTS'
                    }, {
                        value: 'put1'
                    },
                    {},
                    {},
                    {},
                    {},
                    {}, {
                        value: 'upsert2'
                    }, {
                        value: { data: 'john' }
                    }
                ]
            }, done);
    });
});
