export class CacheStore {
    private data: any = {};

    get<T>(key: string): T {
        return this.data[key];
    }

    put<T>(key: string, value: T): boolean {
        if (this.data[key] === undefined) {
            this.data[key] = value;
            return true;
        }
        return false;
    }

    delete(key: string): void {
        this.data[key] = undefined;
    }

    upsert<T>(key: string, value: T): void {
        if (this.data[key] === undefined) {
            this.data[key] = value;
        } else {
            this.data[key] = value;
        }
    }

    update<T>(key: string, value: T): boolean {
        if (this.data[key] === undefined) {
            return false;
        } else {
            this.data[key] = value;
            return true;
        }
    }
}

export const Cache = new CacheStore();
