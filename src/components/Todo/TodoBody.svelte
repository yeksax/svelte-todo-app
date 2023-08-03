<script lang="ts">
	import { setProperty } from "@/utils/todos";
	import { onMount } from "svelte";
	import Markdown from "../Markdown/Markdown.svelte";
	export let todo: Todo;
	export let editing = false;

	function resize(target: HTMLElement) {
		// target.style.height = "0px";
		target.style.height = target.scrollHeight + "px";
	}

	function handleDescription(e: Event) {
		let target = e.target as HTMLTextAreaElement;
		resize(target);

		todo.description = target.value;
		setProperty("description", target.value, todo);
	}
</script>

{#if editing}
	<textarea
		class="text-sm box-border resize-none"
		style="line-height: 2;"
		id="todo-description"
		autofocus
		on:input={handleDescription}
		use:resize
		value={todo.description}
	/>
{:else}
	<Markdown {todo} />
{/if}
