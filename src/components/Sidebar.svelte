<script lang="ts">
	import { todos } from "@/stores";
	import TodoElement from "./Todo/Todo.svelte";
	import TodoFilter from "./Todo/TodoFilter.svelte";
	import TodosManager from "./Todo/TodosManager.svelte";
	import { fly } from "svelte/transition";

	let currentTodo: number;
	$: currentTodo = $todos.findIndex((todo) => todo.current);
</script>

<div class="pb-12 w-4/12">
	<div
		class="h-full rounded-lg px-6 py-4 border border-zinc-200 bg-white flex flex-col gap-4"
	>
		<TodoFilter />

		<div
			class="transition-all h-full overflow-y-auto pr-1.5 {currentTodo !== -1
				? 'border-2 border-zinc-950'
				: ''} rounded-md"
		>
			{#if currentTodo !== -1}
				<div
					in:fly={{ y: -10, duration: 300, opacity: 0 }}
					out:fly={{ y: -10, duration: 300, opacity: 0 }}
				>
					<TodoElement
						className="border-none"
						todo={$todos[currentTodo]}
						editing
						noFooter
					/>
				</div>
			{/if}
		</div>

		<TodosManager />
	</div>
</div>
