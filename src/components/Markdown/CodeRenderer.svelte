<script lang="ts">
	import hljs from "highlight.js";
	import { CodeBlock } from "@skeletonlabs/skeleton";
	import "highlight.js/styles/github-dark.css";
	import { storeHighlightJs } from "@skeletonlabs/skeleton";

	storeHighlightJs.set(hljs);

	export let text: string;
	export let lang: string;

	let languageExists = hljs.getLanguage(lang) !== undefined;

	function handleClick(e: MouseEvent) {
		let target = e.target as HTMLElement;
		if (target.tagName !== "BUTTON") return;

		e.stopPropagation();
		e.stopImmediatePropagation();
		e.preventDefault();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="pointer-events-auto" on:click={handleClick}>
	{#if languageExists}
		<CodeBlock
			code={text}
			language={lang}
			buttonCopied="Copied!"
			button="border text-xs border-zinc-300 px-3 rounded-sm py-0.5"
		/>
	{:else}
		<CodeBlock
			code={text}
			language="plaintext"
			buttonCopied="Copied!"
			button="border text-xs border-zinc-300 px-3 rounded-sm py-0.5"
		/>
		<div class="text-xs mt-1.5">
			.{lang} is not supported, currently displaying as plaintext
		</div>
	{/if}
</span>
