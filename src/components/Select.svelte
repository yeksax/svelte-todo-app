<script lang="ts">
	import { clickOutside } from "@/utils/clickOutside";
	import { ChevronDownIcon } from "svelte-feather-icons";
	import { fly } from "svelte/transition";

	export let action: (value: string) => void;
	export let title: string = "";
	export let value: string;
	export let values: SelectOption[];
	export let closeOnClick: boolean = true;
	let expanded = false;
	let currentValue: string;
	let yTranslate = 0;
	let xTranslate = 0;
	let setectRef: HTMLElement;

	function repositionIfDontFit(node: HTMLElement) {
		yTranslate = 0;
		xTranslate = 0;

		let rect = node.getBoundingClientRect();
		let selectRect = setectRef.getBoundingClientRect();

		if (selectRect.x + rect.width > window.innerWidth) {
			xTranslate += rect.width;
		}

		if (selectRect.top + rect.height > window.innerHeight) {
			yTranslate = rect.height + selectRect.height + 8;
		}
	}

	function handleSelection(newValue: SelectOption) {
		console.log(newValue, value);
		action(String(newValue.value));
		if (closeOnClick) expanded = false;

		currentValue = String(newValue.label);
	}

	function toggle() {
		expanded = !expanded;
	}
</script>

<div
	use:clickOutside
	on:outclick={() => {
		expanded = false;
	}}
	class="relative font-medium text-xs"
	in:fly={{ y: -4, opacity: 0, duration: 200 }}
	out:fly={{ y: -4, opacity: 0, duration: 200 }}
>
	<button
		bind:this={setectRef}
		on:click={toggle}
		class="flex px-2.5 py-0.5 items-center gap-2 relative {expanded
			? 'opacity-100'
			: 'opacity-80'} hover:opacity-100 transition-all border-zinc-700 text-zinc-950 border rounded-sm"
	>
		<slot />
		{#if currentValue}
			{currentValue}
		{:else}
			{title}
		{/if}

		<ChevronDownIcon
			size="12"
			class="transition-all pointer-events-none {expanded
				? 'rotate-180'
				: ''}"
		/>
	</button>
	{#if expanded}
		<div
			use:repositionIfDontFit
			in:fly={{
				y: values.length * (yTranslate > 0 ? 2 : -2) + "px",
				opacity: 0,
				duration: 200,
			}}
			out:fly={{
				y: values.length * (yTranslate > 0 ? 2 : -2) + "px",
				opacity: 0,
				duration: 200,
			}}
			style="transform: translateY(-{yTranslate}px)"
			class="absolute top-full mt-1 right-0 z-10 border-zinc-200 w-max font-medium bg-white border flex flex-col rounded-sm"
		>
			{#each values as thisValue (thisValue.value)}
				<button
					class="py-1.5 w-full text-left px-4 hover:bg-zinc-200 {thisValue.value ==
					value
						? 'bg-zinc-200'
						: ''}"
					on:click={() => handleSelection(thisValue)}
				>
					{thisValue.label}</button
				>
			{/each}
		</div>
	{/if}
</div>
