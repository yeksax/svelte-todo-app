<script lang="ts">
	import TodosManager from "./TodosManager.svelte";
	import TodoList from "./TodosList.svelte";
	import TodoSearch from "./TodoFilter.svelte";

	import { todos } from "@/stores";
	import { onMount } from "svelte";

	$: {
		let currentTodo = $todos.findLastIndex((todo) => todo.current);

		if (currentTodo !== -1) {
			todos.update((todos) =>
				todos.map((todo, i) =>
					i === currentTodo
						? { ...todo, current: true }
						: { ...todo, current: false }
				)
			);
		}

		localStorage.setItem("todos", JSON.stringify($todos));
	}

	function blurAll(e: Event) {
		let target = e.target as HTMLElement;

		if (["DIV", "HTML", "UL"].includes(target.tagName)) {
			todos.update((todos) =>
				todos.map((todo) => {
					return { ...todo, current: false };
				})
			);
		}
	}

	function shortcutHandler(e: KeyboardEvent) {
		let { key, target, ctrlKey, altKey, shiftKey } = e;
		key = key.toLowerCase();

		if (key === "escape") {
			(document.activeElement as HTMLElement).blur();
			todos.update((todos) =>
				todos.map((todo) => {
					return { ...todo, current: false };
				})
			);
		}
	}

	onMount(() => {
		document.addEventListener("click", blurAll);
		document.addEventListener("keydown", shortcutHandler);
	});
</script>

<div
	id="todos-root"
	class="border-zinc-300 border max-h-[calc(100vh_-_4rem)] overflow-hidden rounded-lg px-6 py-5 bg-white w-[40vw] flex flex-col gap-8"
>
	<TodoSearch />
	<TodoList />
	<TodosManager />
</div>
