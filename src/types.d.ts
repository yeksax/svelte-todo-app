interface Todo {
	id: number;
	title: string;
	manualTitle?: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	completed: boolean;
	priority: number;
	current: boolean;
}

type TimeFormat = "short" | "normal" | "full";

interface FilteringOption {
	parameter: keyof Todo;
	display: string;
	order: "asc" | "desc";
}

interface SelectOption {
	label: string;
	value: string;
}

interface Vector2d {
	x: number;
	y: number;
}

// interface Rect {
// 	width: number;
// 	height: number;
// 	x: number;
// 	y: number;
// }
