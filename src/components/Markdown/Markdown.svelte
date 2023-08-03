<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import LinkRenderer from "./LinkRenderer.svelte";
	import CodeRenderer from "./CodeRenderer.svelte";
	import { setProperty } from "@/utils/todos";
	import { EyeIcon, Maximize2Icon, MaximizeIcon } from "svelte-feather-icons";
	import { readOnlyMode } from "@/stores";

	export let todo: Todo;
</script>

<span class="prose" data-target="todo-description">
	<div
		class="{readOnlyMode
			? ''
			: 'pointer-events-none'} transition-all overflow-hidden relative {todo.expanded ||
		$readOnlyMode
			? ''
			: 'hidden-block'}"
	>
		{#if !todo.expanded && !$readOnlyMode}
			<div
				class="absolute group grid transition-all place-items-center w-full h-full"
			>
				<button
					on:click={(e) => {
						e.preventDefault();
						e.stopImmediatePropagation();
						e.stopPropagation();

						setProperty("expanded", true, todo, false);
					}}
					class="text-zinc flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all blur-xl group-hover:blur-0 duration-300 border-zinc-200 border px-3 py-0.5 rounded-sm bg-white pointer-events-auto text-sm z-20"
				>
					Expand <Maximize2Icon size="12" />
				</button>
			</div>
		{/if}
		<span
			class="{todo.expanded || $readOnlyMode
				? ''
				: 'opacity-60'} transition-all"
		>
			<SvelteMarkdown
				options={{}}
				source={todo.description}
				renderers={{
					link: LinkRenderer,
					code: CodeRenderer,
				}}
			/>
		</span>
	</div>
</span>

<style>
	.hidden-block {
		max-height: 4lh;
		pointer-events: none;
	}
</style>
