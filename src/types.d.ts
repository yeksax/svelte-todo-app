interface Todo {
	id: number;
	title: string;
	description: string;
	creationDate: Date;
	completed: boolean;
	priority: number;
	current: boolean;
}

type TimeFormat = "short" | "normal" | "full";
