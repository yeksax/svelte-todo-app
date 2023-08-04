<script lang="ts">
	import { readOnlyMode, todos } from "@/stores";
	import { blurAllTodos, setProperty } from "@/utils/todos";
	import {
		Edit3Icon,
		XIcon
	} from "svelte-feather-icons";
	import Button from "../Button.svelte";
	import Select from "../Select.svelte";

	export let todo: Todo;

	function deleteTodo() {
		todos.update((todos) => todos.filter((iTodo) => iTodo.id !== todo.id));
	}

	function setCurrent() {
		if (todo.current) {
			return blurAllTodos();
		}

		todos.update((todos) => {
			return todos.map((iTodo) => {
				if (iTodo.id === todo.id) return { ...iTodo, current: true };
				return { ...iTodo, current: false };
			});
		});
	}
</script>

<div class="flex justify-between items-center text-xs mt-6">
	{#if !$readOnlyMode}
		<div class="flex items-center gap-2">
			<Button
				content="Delete todo"
				action={deleteTodo}
				className="text-red-600 border-red-600"
			/>
		</div>
	{:else}
		<span />
	{/if}
	<div class="flex items-center gap-2">
		{#if !$readOnlyMode}
			<Button action={setCurrent}>
				{#if todo.current}
					Finish <XIcon size="12" />
				{:else}
					Edit <Edit3Icon size="12" />
				{/if}
			</Button>
		{/if}

		<div class="flex items-center gap-2">
			<Select
				title="Priority"
				value={String(todo.priority)}
				values={[
					{ label: "Ultra important", value: "0" },
					{ label: "Important", value: "1" },
					{ label: "High", value: "2" },
					{ label: "Medium", value: "3" },
					{ label: "Low", value: "4" },
					{ label: "Whatever", value: "5" },
				]}
				action={(value) => setProperty("priority", Number(value), todo)}
			/>
		</div>
	</div>
</div>
