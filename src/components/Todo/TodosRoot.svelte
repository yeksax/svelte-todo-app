<script lang="ts">
	import TodosManager from "./TodosManager.svelte";
	import TodoList from "./TodosList.svelte";
	import TodoFiltering from "./TodoFilter.svelte";

	import { todos } from "@/stores";
	import { onMount } from "svelte";
	import { blurAllTodos } from "@/utils/todos";

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
			blurAllTodos();
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
	class="overflow-y-auto rounded-lg w-[40rem] flex flex-col gap-1"
>
	<TodoFiltering />
	<TodosManager />

	<TodoList />
</div>
