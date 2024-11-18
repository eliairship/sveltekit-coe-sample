<script lang="ts">
	import { getCounterContext } from "./counterContext";
  import { writable, derived } from 'svelte/store';
  import {onMount} from 'svelte'

  let countStore = writable(0);
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
<p>Count Store: {$countStore}</p>
<p>Derived State: {derivedValue}</p>
<button onclick={() => countStore.update((n) => n + 1)}>increment countStore {$countStore}</button>
<br />
<button onclick={() => countState++}>increment CountState {countState}</button>
<br />
<button onclick={() => value.count++}>increment {value.count}</button>
{#each posts as post}
  <h2>{post.title}</h2>
  <p>{post.body}</p>

{/each}

