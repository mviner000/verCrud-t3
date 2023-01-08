import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const email = input.email;

      // do something with email

      // check if email already exists
      let user = await ctx.prisma.user.findUnique({
        where:{
          email,
        }
      })

      if (!user) {
        user = await ctx.prisma.user.create({
          data: {
            email,
          }
        })
      }

      // create session token
      // const token = await ctx.prisma.loginToken.create({
      //   data: {
      //     user: {
      //       connect: {
      //         id: user.id,
      //       }
      //     }
      //   }
      // })

      // Send email with token

      const creation = await ctx.prisma.user.create({
        data: {
          email,
        }
      })

      console.log({creation})

      return null
    }),

  


});
