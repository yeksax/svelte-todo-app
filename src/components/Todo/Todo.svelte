<script lang="ts">
	import { todos, readOnlyMode } from "@/stores";
	import TodoBody from "./TodoBody.svelte";
	import TodoFooter from "./TodoFooter.svelte";
	import TodoHead from "./TodoHeader.svelte";

	export let todo: Todo;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
	data-todo-id={todo.id}
	class="todo flex flex-col w-full gap-2 px-6 py-4 {todo.current
		? 'border-zinc-800 hover:border-zinc-950 border-2'
		: 'border-zinc-300 hover:border-zinc-600 border'} transition-all rounded-md group"
>
	<TodoHead {todo} />
	<TodoBody {todo} />
	<TodoFooter {todo} />
</li>
