<script lang="ts">
	import { todos } from "@/stores";
	import TodoBody from "./TodoBody.svelte";
	import TodoFooter from "./TodoFooter.svelte";
	import TodoHead from "./TodoHeader.svelte";
	import { twMerge } from "tailwind-merge";

	export let todo: Todo;
	export let editing = false;
	export let noFooter = false;
	export let className: string = "";

	function setCurrent() {
		todos.update((prev) =>
			prev.map((iTodo) => {
				if (iTodo.id === todo.id) {
					iTodo.current = true;
				}

				return iTodo;
			})
		);
	}
</script>

<li
	on:dblclick={setCurrent}
	data-todo-id={todo.id}
	class={twMerge(
		`todo flex flex-col w-full gap-2 px-6 py-4 ${
			todo.current
				? "border-zinc-800 hover:border-zinc-950 border-2"
				: "border-zinc-300 hover:border-zinc-600 border"
		} bg-white transition-all rounded-md group`,
		className
	)}
>
	<TodoHead {todo} {editing} />
	<TodoBody {todo} {editing} />
	{#if !noFooter}
		<TodoFooter {todo} {editing} />
	{/if}
</li>
