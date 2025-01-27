
// import { db } from "$lib/server/db"
// import { profile } from "$lib/server/db/schema"
import { authorizer, createSubjects } from "@openauthjs/openauth"
import { PasswordAdapter } from "@openauthjs/openauth/adapter/password"
import { MemoryStorage } from "@openauthjs/openauth/storage/memory"
import { PasswordUI } from "@openauthjs/openauth/ui/password"
// import { eq } from "drizzle-orm"
import { z } from "zod"


const subjects = createSubjects({
  user: z.object({
    id: z.number(),
    email: z.string(),
  })
})


export default authorizer({
  subjects,
  storage: MemoryStorage({
    persist: "./persist.json",
  }),
  providers: {
    password: PasswordAdapter(
      PasswordUI({
        sendCode: async (email, code) => {
          console.log(email, code)
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    console.log('🚀 ~ value:', value);
    console.log('🚀 ~ ctx:', ctx);

    if (value.provider === "password") {
      console.log('🚀 ~ value.provider:', value.provider);

      try {
        // 1. Get user from db with that email
        // const existingUser = await db.query.profile.findFirst({
        //   where: eq(profile.email, value.email)
        // })

        // if (existingUser) {
        //   console.log('🚀 ~ existingUser:', existingUser);
        //   return ctx.subject("user", {
        //     id: existingUser.id,
        //     email: value.email,
        //   })
        // }


        // const userResult = await db.insert(profile).values({
        //   email: value.email
        // }).returning()

        // console.log('🚀 ~ userResult:', userResult);

        // return ctx.subject("user", {
        //   id: userResult[0].id,
        //   email: value.email,
        // })

        return ctx.subject(
          "user", {
          id: 123,
          email: value.email
        })

      } catch (error) {
        console.log(error, '❌ - ERROR');

      }
    }

    throw new Error("Invalid provider")
  },
})

