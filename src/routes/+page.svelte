<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

	import { onMount } from 'svelte';
	import { getCounterContext } from "./counterContext";

  let countState = $state(0);
  let value = getCounterContext()
  let derivedValue = $derived(countState * 2)

  let posts: any[] = $state([]);
  let endpoint = "https://jsonplaceholder.typicode.com/posts"
  onMount(async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    posts = data;
  })
</script>


<h1 class='text-2xl text-red-700'>Welcome to SvelteKittted</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p>Derived State: {derivedValue}</p>
<br />
<br />
<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
<br />
<button onclick={() => countState++}>increment CountState {countState}</button>
<br />
<button onclick={() => value.count++}>increment {value.count}</button>
{#each posts as post}
  <h2>{post.title}</h2>
  <p>{post.body}</p>
{/each}

