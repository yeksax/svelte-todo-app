<script lang="ts">
	import { filter, todos } from "@/stores";
	import Time from "../Time.svelte";
	import { highlightMatch } from "@/utils/highlight";
	import Markdown from "../Markdown.svelte";
	import { onMount } from "svelte";

	export let todo: Todo;

	let title = "";

	$: {
		title = highlightMatch(todo.title, $filter);
	}

	function setProperty(propertyName: keyof Todo, value: any) {
		// @ts-ignore
		todo[propertyName] = value;

		todos.update((todos) => {
			return todos.map((iTodo) => {
				if (iTodo.id === todo.id) return todo;
				return iTodo;
			});
		});
	}

	function setCurrent() {
		todos.update((todos) => {
			return todos.map((iTodo) => {
				if (iTodo.id === todo.id) return { ...iTodo, current: true };
				return { ...iTodo, current: false };
			});
		});
	}

	function handleTitle(e: Event) {
		setProperty("title", (e.target as HTMLInputElement).value);
	}

	function resize(target: HTMLElement) {
		target.style.height = "0px";
		target.style.height = target.scrollHeight + "px";
	}

	function handleDescription(e: Event) {
		let target = e.target as HTMLTextAreaElement;
		resize(target);

		setProperty("description", target.value);
	}

	onMount(() => {
		if (document.querySelector("#todo-description"))
			resize(document.querySelector("#todo-description") as HTMLElement);
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
	on:click={setCurrent}
	class="todo flex flex-col w-full gap-2 px-6 py-4 {todo.current
		? 'border-zinc-800 hover:border-zinc-950 border-2'
		: 'border-zinc-300 hover:border-zinc-600 border'} transition-all rounded-md group"
>
	<div class="text-sm flex justify-between items-center gap-4">
		{#if todo.current}
			<!-- svelte-ignore a11y-autofocus -->
			<input
				class="font-semibold px-2 box-border flex-1"
				autofocus
				on:input={handleTitle}
				type="text"
				value={todo.title}
			/>
		{:else}
			<h3 class="font-medium flex-1">{@html title}</h3>
		{/if}
		<span class="text-xs w-max truncate">
			<Time timeFormat="short" date={new Date(todo.creationDate)} />
		</span>
	</div>

	{#if todo.current}
		<!-- svelte-ignore a11y-autofocus -->
		<textarea
			class="text-sm px-2 box-border resize-none"
			style="line-height: 2;"
			id="todo-description"
			on:input={handleDescription}
			value={todo.description}
		/>
	{:else}
		<Markdown content={todo.description} />
	{/if}
</li>
