import {writable, Writable} from "svelte/store";
import type {CaffeineStorage} from "./lib/types";
import { Db } from "./lib/db";

export const caffeineData: Writable<CaffeineStorage[]> = writable([]);
// this has the caveat of making it so elements can only be appended
caffeineData.subscribe(async (value) => {
    let db = new Db();
    await db.init();
    const addedElement = value[value.length - 1];
    db.addHistory(addedElement);
})

export type SessionData = {
    preferredDrink: string;
    time: Date;
}

export type DoseType = "invalid" | "sleep" | "dose"

export type CaffeineDose = {
    doseType: DoseType,
    amount: number,
    time: string,
    type: string
}
