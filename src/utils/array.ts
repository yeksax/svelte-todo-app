interface Todo {
	id: number;
	title: string;
	description: string;
	creationDate: Date;
	completed: boolean;
	priority: number;
	current: boolean;
}

export function groupBy<T>(arr: T[], prop: keyof T) {
	return arr.reduce((rv: any, x: any) => {
		(rv[x[prop]] = rv[x[prop]] || []).push(x);
		return rv;
	}, {});
}

export function sortBy<T>(arr: T[], prop: keyof T, order: "asc" | "desc") {
	return arr.sort((a, b) => {
		// @ts-ignore
		return order === "asc" ? a[prop] - b[prop] : b[prop] - a[prop];
	});
}

export function unique<T>(arr: T[]) {
	return [...new Set(arr)];
}

export function uniqueBy<T>(arr: T[], prop: keyof T) {
	return [...new Set(arr.map((x: any) => x[prop]))];
}

const testArray: Todo[] = [
	{
		id: 1,
		title: "1",
		description: "1",
		creationDate: new Date(),
		completed: false,
		priority: 4,
		current: false,
	},
	{
		id: 2,
		title: "2",
		description: "2",
		creationDate: new Date(),
		completed: true,
		priority: 4,
		current: true,
	},
	{
		id: 3,
		title: "3",
		description: "3",
		creationDate: new Date(),
		completed: false,
		priority: 0,
		current: false,
	},
	{
		id: 4,
		title: "4",
		description: "4",
		creationDate: new Date(),
		completed: false,
		priority: 2,
		current: false,
	},
	{
		id: 5,
		title: "5",
		description: "5",
		creationDate: new Date(),
		completed: false,
		priority: 3,
		current: false,
	},
];

// console.log(groupBy(testArray, "priority"));
