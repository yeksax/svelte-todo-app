<script lang="ts">
	import Popover from "../Popover.svelte";

	const colors = [
		"bg-black",
		"bg-red-500",
		"bg-orange-500",
		"bg-yellow-500",
		"bg-green-500",
		"bg-emerald-500",
	];

	const texts = [
		"Ultra importante!",
		"Importante!",
		"Necessário </3",
		"Obrigatório!",
		"Opcional :)",
		"Tanto faz...",
	];

	export let priority = 4;

	let hovering = false;

	$: color = colors[priority];
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
	class="w-2 aspect-square rounded-full relative {color}"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
>
	{#if hovering}
		<Popover title={texts[priority]} />
	{/if}
</span>
