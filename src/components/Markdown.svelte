<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";

	export let content: string;
</script>

<div class="prose">
  <SvelteMarkdown source={content} />
</div>
