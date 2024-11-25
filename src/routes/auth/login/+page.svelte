<script lang="ts">
  	import type { PageData, ActionData } from './$types';


	let { data, form }: { data: PageData, form: ActionData } = $props();

</script>


<div>
  <h1>Sign in Page</h1>
  <form method="POST" action="?/login">
    <label>
      Email
      <input name="email" type="email">
    </label>
    <label>
      Password
      <input name="password" type="password">
    </label>
    <button>Log in</button>
    <button formaction="?/register">Register</button>
  </form>

</div>
