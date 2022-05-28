import { writable, Writable } from "svelte/store";

export type CaffeineStorage = {
    drink: string;
    caffeine: string;
    timestamp: Date;
}

export const currentTab: Writable<string> = writable("");
export const pageName: Writable<string> = writable("Home");
export const caffeineData: Writable<CaffeineStorage[]> = writable([]);
