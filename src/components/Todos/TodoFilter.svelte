<script lang="ts">
	import { filter } from "@/stores";
	import { SearchIcon } from "svelte-feather-icons";

	function updateFilter(e: Event) {
		filter.set((e.target as HTMLInputElement).value);
	}
</script>

<form class="relative flex items-center group">
	<input
		on:input={updateFilter}
		type="text"
		placeholder="What am I forgetting?"
		class="border-zinc-300 border px-3 py-2 rounded-md text-xs w-full outline-none group-focus-within:border-zinc-700 transition-all"
	/>

	<SearchIcon
		class="absolute right-2 text-zinc-400 group-focus-within:text-zinc-600 bg-white p-1 box-content transition-all"
		size="14"
	/>
</form>
