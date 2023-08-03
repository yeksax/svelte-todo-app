<script lang="ts">
	import { todos, filter, sortByStore } from "@/stores";
	import TodoElement from "./Todo.svelte";
	import { sortBy } from "@/utils/array";

	function filterTodos(todos: Todo[], filter: string) {
		return todos.filter((todo) => {
			if (todo.title.toLowerCase().includes(filter.toLowerCase()))
				return true;
			if (todo.description.toLowerCase().includes(filter.toLowerCase()))
				return true;

			return false;
		});
	}

	$: filteredTodos = sortBy(sortBy(
		filterTodos($todos, $filter),
		$sortByStore?.parameter ?? "priority",
		$sortByStore?.order ?? "asc"
	), "current", "desc");
</script>

<ul id="todos-list" class="flex flex-col overflow-y-auto gap-2 h-full flex-1 pb-12 pr-1.5">
	{#if filteredTodos.length === 0 && $todos.length > 0}
		<p class="pointer-events-none text-center text-zinc-400 text-sm pb-4">
			No todos match the current filter... 🤔
		</p>
	{:else if $todos.length > 0}
		{#each filteredTodos as todo}
			<TodoElement {todo} />
		{/each}
	{:else}
		<p class="text-center pointer-events-none text-zinc-400 text-sm pb-4">
			There are no todos yet 🤗
		</p>
	{/if}
</ul>
