<script lang="ts">
	import Fa from "svelte-fa";
	import {
		faSortAmountAsc,
		faSortAmountDesc,
		faSortAmountDown,
		faSortAmountUp,
	} from "@fortawesome/free-solid-svg-icons";
	import { filter, readOnlyMode, sortByStore } from "@/stores";
	import { BookIcon, SearchIcon } from "svelte-feather-icons";
	import Toggle from "../Toggle.svelte";
	import { blurAllTodos } from "@/utils/todos";
	import Select from "../Select.svelte";

	function updateFilter(e: Event) {
		filter.set((e.target as HTMLInputElement).value);
	}

	function checkIfShouldBlur(value: boolean) {
		if (value) {
			blurAllTodos();
		}
	}

	let filterableProperties: FilteringOption[] = [
		{
			parameter: "priority",
			display: "Priority",
			order: "asc",
		},
		{
			parameter: "completed",
			display: "Completed",
			order: "asc",
		},
		{
			parameter: "createdAt",
			display: "Creation date",
			order: "asc",
		},
		{
			parameter: "description",
			display: "Description",
			order: "asc",
		},
		{
			parameter: "title",
			display: "Title",
			order: "asc",
		},
		{
			parameter: "updatedAt",
			display: "Last modification",
			order: "asc",
		},
	];

	const selectableProperties: SelectOption[] = filterableProperties.map(
		(prop) => ({
			value: prop.parameter,
			label: prop.display,
		})
	);

	function sortByChangeHandler(data: string) {
		const isSameProperty = $sortByStore?.parameter === data;
		const isAscending = $sortByStore?.order === "asc";

		if (isSameProperty) {
			filterableProperties.map((i) => {
				if (i.parameter === data) {
					i.order = isAscending ? "desc" : "asc";
				}

				return i;
			});
		}

		sortByStore.set(
			filterableProperties.find((i) => i.parameter === data)!
		);
	}
</script>

<div class="flex flex-col gap-2">
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

	<div class="flex justify-between">
		<div class="flex items-center gap-2 justify-between text-xs">
			<Toggle store={readOnlyMode} action={checkIfShouldBlur}>
				{$readOnlyMode ? "Read-only" : "Read-write"}
				<BookIcon size="12" />
			</Toggle>
		</div>
		<div class="flex items-center gap-2 justify-between text-xs">
			<Select
				closeOnClick={false}
				title="Sort by"
				values={selectableProperties}
				value={$sortByStore?.parameter ?? "priority"}
				action={sortByChangeHandler}
			>
				{#if $sortByStore?.order === "asc"}
					<Fa icon={faSortAmountDesc} />
				{:else}
					<Fa icon={faSortAmountDown} />
				{/if}
			</Select>
		</div>
	</div>
</div>
