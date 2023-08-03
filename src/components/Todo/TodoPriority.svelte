<script lang="ts">
	import { setProperty } from "@/utils/todos";

	const bgColors = [
		"bg-[#111827]",
		"bg-red-500",
		"bg-orange-500",
		"bg-yellow-500",
		"bg-green-600",
		"bg-blue-700",
	];

	const borderColors = [
		"border-[#111827]",
		"border-red-500",
		"border-orange-500",
		"border-yellow-500",
		"border-green-600",
		"border-blue-700",
	];

	export let todo: Todo;

	$: color = todo.completed
		? bgColors[todo.priority]
		: borderColors[todo.priority] + " border";

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<button
	class="w-2 aspect-square rounded-full relative {color}"
/>
