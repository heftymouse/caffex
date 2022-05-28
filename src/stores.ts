import {writable, Writable} from "svelte/store";
import type {CaffeineStorage} from "./lib/types";
import { Db } from "./lib/db";

export const currentTab: Writable<string> = writable("");
export const pageName: Writable<string> = writable("Home");
export const caffeineData: Writable<CaffeineStorage[]> = writable([]);
// this has the caveat of making it so elements can only be appended
caffeineData.subscribe(async (value) => {
    let db = new Db();
    await db.init();
    const addedElement = value[value.length - 1];
    db.addHistory(addedElement);
})