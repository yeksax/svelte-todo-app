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
	expanded: boolean;
}

type TimeFormat = "short" | "normal" | "full";
