<script lang="ts">
	import { todos, readOnlyMode } from "@/stores";
	import TodoBody from "./TodoBody.svelte";
	import TodoFooter from "./TodoFooter.svelte";
	import TodoHead from "./TodoHeader.svelte";

	export let todo: Todo;
	export let editing: boolean = false;

	function setCurrent(e: MouseEvent) {
		if ($readOnlyMode) return;
		let target = e.target as HTMLElement;
		const interactable = ["BUTTON", "SUMMARY", "DETAILS"].includes(
			target.tagName
		);

		if (interactable) return;

		todos.update((todos) => {
			return todos.map((iTodo) => {
				if (iTodo.id === todo.id) return { ...iTodo, current: true };
				return { ...iTodo, current: false };
			});
		});
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
	on:click={setCurrent}
	data-todo-id={todo.id}
	class="todo flex flex-col w-full gap-2 px-6 py-4 {editing
		? 'border-zinc-800 hover:border-zinc-950 border-2'
		: 'border-zinc-300 hover:border-zinc-600 border'} transition-all rounded-md group"
>
	<TodoHead {todo} {editing}/>
	<TodoBody {todo} {editing}/>
	<TodoFooter {todo} {editing}/>
</li>
