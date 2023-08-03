import { todos } from "@/stores";

export function setProperty(
	propertyName: keyof Todo,
	value: any,
	todo: Todo,
	isUpdate = true
) {
	// @ts-ignore
	todo[propertyName] = value;
	if (isUpdate) {
		todo.expanded = true;
		todo.updatedAt = new Date();
	}

	todos.update((todos) => {
		return todos.map((iTodo) => {
			if (iTodo.id === todo.id) return todo;
			return iTodo;
		});
	});
}
