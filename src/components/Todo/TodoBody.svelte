<script lang="ts">
	import { setProperty } from "@/utils/todos";
	import { onMount } from "svelte";
	import Markdown from "../Markdown/Markdown.svelte";
	import MarkdownAlt from "../Markdown/MarkdownAlt.svelte";
	export let todo: Todo;

	function resize(target: HTMLElement) {
		// target.style.height = "0px";
		target.style.height = target.scrollHeight + "px";
	}

	function handleDescription(e: Event) {
		let target = e.target as HTMLTextAreaElement;
		resize(target);

		setProperty("description", target.value, todo);
	}

	onMount(() => {
		if (document.querySelector("#todo-description"))
			resize(document.querySelector("#todo-description") as HTMLElement);
	});
</script>

{#if todo.current}
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
	<!-- <Markdown {todo} /> -->
	<MarkdownAlt {todo} />
{/if}
