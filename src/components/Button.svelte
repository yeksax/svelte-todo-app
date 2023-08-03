<script lang="ts">
	// @ts-ignore
	import { twMerge } from "tailwind-merge";

	export let action: () => void;
	export let content: string = "";
	export let className: string = "";
</script>

<button
	on:click={action}
	class={twMerge(
		"flex items-center gap-2 px-2.5 py-0.5 font-semibold rounded-sm border opacity-70 hover:opacity-100 transition-all border-zinc-900 text-zinc-900",
		className
	)}
>
	{content}
	<slot />
</button>
