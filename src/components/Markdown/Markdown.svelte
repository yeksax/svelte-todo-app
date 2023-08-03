<script lang="ts">
	import "highlight.js/styles/github-dark.css";
	import rehypeHighlight from "rehype-highlight";
	import rehypeStringify from "rehype-stringify";
	import remarkGfm from "remark-gfm";
	import remarkParse from "remark-parse";
	import remarkRehype from "remark-rehype";
	import remarkToc from "remark-toc";
	import SvelteMarkdown from "svelte-markdown";
	import { unified } from "unified";
	import LinkRenderer from "./LinkRenderer.svelte";

	export let todo: Todo;
	let markdown: string = "";

	async function read(content: string) {
		const res = await unified()
			.use(remarkParse)
			.use(remarkToc, {
				ordered: true,
			})
			.use(remarkGfm)
			.use(remarkRehype)
			.use(rehypeHighlight, {
				ignoreMissing: true,
			})
			.use(rehypeStringify)
			.process(content);

		markdown = res.toString();
	}

	$: read(todo.description);

	read(todo.description);
</script>

<div class="prose">
	<SvelteMarkdown
		source={markdown}
		renderers={{
			link: LinkRenderer,
		}}
	/>
</div>
