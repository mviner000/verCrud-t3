import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const notesRouter = createTRPCRouter({
  newnote: publicProcedure
  .input(
    z.object({
      title: z
        .string()
        .min(5, { message: "Must be 5 or more characters of length!" })
        .max(200, {
          message: "Must not be more than 200 characters of length!",
        })
        .trim(),
      description: z.string(),
    })
  )    
  .mutation(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.notes.create({
        data: {
          title: input.title,
          description: input.description,
        },
      });
    } catch (error) {
      console.log(`Note cannot be created ${error}`);
    }
  }),
  
  //fetch all notes
  allNotes: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma?.notes?.findMany({
        select: {
          title: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(`Cannot fetch your notes ${error}`);
    }
  }),

    //fetch a single note
    detailNote: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.notes.findUnique({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log(`Note detail not found ${error}`);
      }
    }),



});

