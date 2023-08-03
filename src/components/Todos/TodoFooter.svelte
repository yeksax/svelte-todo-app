<script lang="ts">
	import { readOnlyMode, todos } from "@/stores";
	import Button from "../Button.svelte";
	import { EyeOffIcon, Minimize2Icon } from "svelte-feather-icons";
	import { setProperty } from "@/utils/todos";

	export let todo: Todo;
	export let editing: boolean = false;

	function deleteTodo() {
		todos.update((todos) => todos.filter((iTodo) => iTodo.id !== todo.id));
	}

</script>

{#if !$readOnlyMode}
	<div class="flex justify-between items-center text-xs">
		<div class="flex items-center gap-2">
			<Button
				content="Delete todo"
				action={deleteTodo}
				className="text-red-600 border-red-600"
			/>
		</div>
		<div class="flex items-center gap-2">
			{#if todo.expanded}
				<Button
					action={() => setProperty("expanded", false, todo, false)}
					>Collapse <Minimize2Icon size="12" /></Button
				>
			{/if}
		</div>
	</div>
{/if}
