import { CacheStore } from '../index';

describe('modules.cache-store.spec', () => {
    it('get.when_key_not_exists_returns_undefined', () => {
        const cache = new CacheStore();
        expect(cache.get<string>('key1')).toBe(undefined);
    });
    it('get.when_key_exists_returns_value', () => {
        const cache = new CacheStore();
        cache.put<string>('key1', 'value1');
        expect(cache.get<string>('key1')).toBe('value1');
    });
    it('put.when_key_not_exists_adds_and_returns_true', () => {
        const cache = new CacheStore();
        expect(cache.get<string>('key1')).toBe(undefined);
        expect(cache.put<string>('key1', 'value1')).toBe(true);
        expect(cache.get<string>('key1')).toBe('value1');
    });
    it('put.when_key_exists_returns_false', () => {
        const cache = new CacheStore();
        cache.put<string>('key1', 'value1');
        expect(cache.put<string>('key1', 'value2')).toBe(false);
        expect(cache.get<string>('key1')).toBe('value1');
    });
    it('delete.when_key_exists_deletes_it', () => {
        const cache = new CacheStore();
        cache.put<string>('key1', 'value1');
        expect(cache.get<string>('key1')).toBe('value1');
        cache.delete('key1');
        expect(cache.get<string>('key1')).toBe(undefined);
    });
    it('upsert.when_key_not_exists_adds_it', () => {
        const cache = new CacheStore();
        expect(cache.get<string>('key1')).toBe(undefined);
        cache.upsert<string>('key1', 'value1');
        expect(cache.get<string>('key1')).toBe('value1');
    });
    it('upsert.when_key_exists_updates_it', () => {
        const cache = new CacheStore();
        cache.put<string>('key1', 'value1');
        cache.upsert<string>('key1', 'value2');
        expect(cache.get<string>('key1')).toBe('value2');
    });
    it('update.when_key_not_exists_returns_false', () => {
        const cache = new CacheStore();
        expect(cache.get<string>('key1')).toBe(undefined);
        expect(cache.update<string>('key1', 'value1')).toBe(false);
    });
    it('update.when_key_exists_updates_it_returns_true', () => {
        const cache = new CacheStore();
        cache.put<string>('key1', 'value1');
        expect(cache.update<string>('key1', 'value2')).toBe(true);
    });
});
