<script lang="ts">
	import '../app.css';
	import { setCounterContext } from './counterContext';

	let value = $state({ count: 0 });
	setCounterContext(value);
	let { children } = $props();


</script>

{@render children()}
