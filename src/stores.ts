import { writable } from "svelte/store";

export const theme = writable("light");
export const todos = writable<Todo[]>(
	JSON.parse(localStorage.getItem("todos") ?? "[]")
);
export const filter = writable("");
