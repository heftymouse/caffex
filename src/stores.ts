import {writable, Writable} from "svelte/store";
import type {CaffeineStorage} from "./lib/types";

export const currentTab: Writable<string> = writable("");
export const pageName: Writable<string> = writable("Home");
export const caffeineData: Writable<CaffeineStorage[]> = writable([]);
