<script lang="ts">
	import TodoList from "./TodosList.svelte";

	import { todos } from "@/stores";
	import { blurAllTodos } from "@/utils/todos";
	import { onMount } from "svelte";
	import Sidebar from "../Sidebar.svelte";

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

<div id="todos-root" class="w-full h-[100vh] px-20 pt-12 flex gap-12">
	<TodoList />
	<Sidebar />
</div>
