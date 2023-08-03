<script lang="ts">
	import { fly } from "svelte/transition";
	// @ts-ignore
	import { twMerge } from "tailwind-merge";

	export let action: () => void;
	export let content: string = "";
	export let className: string = "";
</script>

<button
	on:click={action}
	in:fly={{ y: -4, opacity: 0, duration: 200 }}
	out:fly={{ y: -4, opacity: 0, duration: 200 }}
	class={twMerge(
		"flex items-center gap-2 px-2.5 py-0.5 font-semibold rounded-sm border opacity-70 hover:opacity-100 transition-all border-zinc-900 text-zinc-900",
		className
	)}
>
	{content}
	<slot />
</button>
