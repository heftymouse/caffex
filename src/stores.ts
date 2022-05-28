import { writable, Writable } from "svelte/store";

export const currentTab: Writable<string> = writable("");