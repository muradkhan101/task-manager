export class StorageHelper {
    static base = 'helper|';
    static set(key: string, item: any) {
        let toSave = typeof item === 'string'
            ? item
            : JSON.stringify(item);
        localStorage.setItem(StorageHelper.base + key, toSave);
        return true;
    }

    static get(key: string): any {
        let item = localStorage.getItem(StorageHelper.base + key);
        try {
            return JSON.parse(item);
        } catch (e) {
            if (e instanceof SyntaxError) {
                return item;
            } else {
                console.log(e);
            }
        }
    }

    static remove(key: string) {
        localStorage.removeItem(StorageHelper.base + key);
    }
}