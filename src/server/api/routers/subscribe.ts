import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const subscribeRouter = createTRPCRouter({
  sub: publicProcedure
    .input(z.object({ text: z
        .string()
        .min(5, { message: "Must be at least 5 characters"}),
     }))
    .query(({ input }) => { 
        return{
            pleaseSub:  `Please do subscribe to: ${input?.text}`
        };
    }),
});

  