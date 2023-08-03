<script lang="ts">
	import { filter } from "@/stores";
	import { highlightMatch } from "@/utils/highlight";
	import { setProperty } from "@/utils/todos";
	import Time from "../Time.svelte";
	import TodoPriority from "./TodoPriority.svelte";

	let title = "";

	$: {
		let regex = /^# [A-Za-z0-9].*/gm;
		let match = todo.description.match(regex)?.at(0);

		if (match) todo.title = match.replace("# ", "");

		title = highlightMatch(
			todo.manualTitle && todo.manualTitle.length > 0
				? todo.manualTitle
				: todo.title,
			$filter
		);
	}

	function handleTitle(e: Event) {
		setProperty("manualTitle", (e.target as HTMLInputElement).value, todo);
	}

	export let todo: Todo;

	function toggle(e: MouseEvent) {
		e.stopImmediatePropagation()
		setProperty("completed", !todo.completed, todo);
	}
</script>

<div class="text-sm flex justify-between items-center gap-2">
	{#if todo.current}
		<button on:click={toggle} class="h-fit w-fit">
			<TodoPriority {todo} />
		</button>
		<input
			class="font-semibold box-border flex-1"
			on:input={handleTitle}
			type="text"
			value={todo.manualTitle || todo.title}
		/>
	{:else}
		<button class="flex items-center gap-2" on:click={toggle}>
			<TodoPriority {todo} />
			<h3
				class="font-medium flex-1 {todo.completed
					? 'line-through opacity-80'
					: ''}"
			>
				{@html title}
			</h3>
		</button>
	{/if}
	<span class="text-xs w-max truncate">
		<Time timeFormat="short" date={new Date(todo.createdAt)} />
	</span>
</div>
