import type { CaffeineStorage } from "./types";

class Db {
    private db: IDBDatabase;

    constructor() {
        let openRequest = indexedDB.open("caffex_db", 1);

        openRequest.onupgradeneeded = (e) => {
            let db = (e.target as IDBOpenDBRequest).result;
            if(!db.objectStoreNames.contains("history")) {
                let historyStore = db.createObjectStore('history', 
                {keyPath: 'id', autoIncrement: true});
            }
        };

        openRequest.onsuccess = (e) => {
            this.db = (e.target as IDBOpenDBRequest).result;
        }

        openRequest.onerror = (e) => {
            console.dir(e);
        }
    }

    addHistory(data: CaffeineStorage) {
        let store = this.db.transaction(["history"], "readwrite").objectStore('store');
        let request = store.add(data);
        request.onerror = (e) => {
            console.log(e);
        }
    }

    getHistory() {
        let store = this.db.transaction(["history"], "readwrite").objectStore('store');
        return store.getAll();
    }
}




export { Db };
