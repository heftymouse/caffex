import type { CaffeineStorage } from "./types";
import { openDB, IDBPDatabase } from 'idb';

class Db {
    private db: IDBPDatabase;

    async init() {
        const db = await openDB("caffex_db", 1, {
            upgrade(db, oldVersion, newVersion, transaction) {
                if(!db.objectStoreNames.contains("history")) {
                    console.log('aerawerw')
                    db.createObjectStore("history", {keyPath: "id", autoIncrement: true});
                }
            }
        });

        this.db = db;
    }

    async addHistory(data: CaffeineStorage) {
        const store = this.db.transaction("history", "readwrite").objectStore("history");
        await store.put(data);
    }

    // getHistory() {
    //     let store = this.db.transaction(["history"], "readwrite").objectStore('store');
    //     return store.getAll();
    // }

    async getHistory() {
        const data = await this.db.getAll("history");
        return data;
    }
}

export { Db };
