<script lang="ts">
	import '../app.css';
	import { setCounterContext } from './counterContext';
	import Nav from '../components/Navbar/navbar.svelte'

	let value = $state({ count: 0 });
	setCounterContext(value);
	let { children } = $props();


</script>


<Nav />
{@render children()}
