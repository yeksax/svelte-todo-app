<script lang="ts">
	import Button from "../Button.svelte";

	import { todos } from "@/stores";

	function createTodo() {
		const newTodo: Todo = {
			id: new Date().getTime(),
			completed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			description: `# Todo ${$todos.length + 1}

### use markdown :)`,
			title: `Todo ${$todos.length + 1}`,
			priority: 4,
			current: true,
		};

		todos.update((todos) => [...todos, newTodo]);
	}

	function clearTodos() {
		todos.set([]);
	}
</script>

<div class=" w-full flex justify-between items-center font-medium text-xs">
	<span />
	<!-- <Button
		content="Delete all todos"
		action={clearTodos}
		className="text-red-600 border-red-600"
	/> -->
	<Button content="New todo" action={createTodo} />
</div>
