<script lang="ts">
	let { isDashboard = false } = $props();
</script>

<nav class="p-4 border">
  <form method="POST" action="/auth/logout"><button class="p-2 border rounded">Logout {isDashboard}</button></form>
</nav>
