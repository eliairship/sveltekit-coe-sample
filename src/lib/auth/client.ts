import { createClient } from "@openauthjs/openauth/client"

export const clientID = "my-svelte-client"

export const client = createClient({
  clientID,
  issuer: "http://localhost:3000", // this is the url for your auth server
})
