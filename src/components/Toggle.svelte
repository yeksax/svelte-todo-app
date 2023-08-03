<script lang="ts">
	import type { Writable } from "svelte/store";
	import { fly } from "svelte/transition";

	export let store: Writable<boolean>;
	export let action: (value: boolean) => void;

	function toggle() {
		store.update((prev) => {
			action(!prev);
			return !prev;
		});
	}
</script>

<button
	in:fly={{ y: -4, opacity: 0, duration: 200 }}
	out:fly={{ y: -4, opacity: 0, duration: 200 }}
	on:click={toggle}
	data-active={$store}
	class="flex transition-all gap-2 items-center border-zinc-200 data-[active='true']:border-zinc-700 hover:border-zinc-500 border px-3 py-0.5 rounded-sm cursor-pointer text-zinc-500 data-[active='true']:text-zinc-900 hover:text-zinc-700"
>
	<slot />
</button>
