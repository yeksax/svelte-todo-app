import { writable } from "svelte/store";

export const theme = writable("light");
export const todos = writable<Todo[]>(
	JSON.parse(localStorage.getItem("todos") ?? "[]")
);
export const filter = writable("");
export const current = writable<null | Todo["id"]>(null);

export const readOnlyMode = writable(false);
export const sortByStore = writable<FilteringOption | null>(null);
export const groupByStore = writable<FilteringOption | null>(null);
