<script lang="ts">
	import { todos, filter, sortByStore } from "@/stores";
	import TodoElement from "./Todo.svelte";
	import { sortBy } from "@/utils/array";

	function filterTodos(todos: Todo[], filter: string) {
		return todos.filter((todo) => {
			if (todo.current) return false;
			if (todo.title.toLowerCase().includes(filter.toLowerCase()))
				return true;
			if (todo.description.toLowerCase().includes(filter.toLowerCase()))
				return true;

			return false;
		});
	}

	let currentTodo: number;

	$: filteredTodos = sortBy(
		filterTodos($todos, $filter),
		$sortByStore?.parameter ?? "priority",
		$sortByStore?.order ?? "asc"
	);
	$: currentTodo = $todos.findIndex((todo) => todo.current);
</script>

<ul id="todos-list" class="flex flex-col gap-2 overflow-y-auto pr-1.5">
	{#if currentTodo !== -1}
		<div class="pb-4">
			<TodoElement todo={$todos[currentTodo]} />
		</div>
	{/if}

	{#if filteredTodos.length === 0 && $todos.length > 0}
		<p class="pointer-events-none text-center text-zinc-400 text-sm pb-4">
			No todos match the current filter... 🤔
		</p>
	{:else if $todos.length > 0}
		{#each filteredTodos as todo (todo.id)}
			<TodoElement {todo} />
		{/each}
	{:else}
		<p class="text-center pointer-events-none text-zinc-400 text-sm pb-4">
			There are no todos yet 🤗
		</p>
	{/if}
</ul>
