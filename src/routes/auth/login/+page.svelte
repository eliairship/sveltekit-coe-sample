<script lang="ts">
  	import type { PageData, ActionData } from './$types';


	let { data, form }: { data: PageData, form: ActionData } = $props();
</script>


<div>
  <h1>Sign in Page</h1>
  <form method="POST" action="?/login">
    {#if form?.incorrect}<p class="error">The email or password is incorrect</p>{/if}
    {#if form?.missingEmail}<p class="error">The email field is required</p>{/if}
    <label>
      Email
      <input name="email" type="email" value={form?.email ?? ''}>
    </label>
    {#if form?.missingPassword}<p class="error">The password field is required</p>{/if}
    <label>
      Password
      <input name="password" type="password">
    </label>
    <button>Log in</button>
    <button formaction="?/register">Register</button>
  </form>

</div>
