import { z, defineCollection } from 'astro:content';

const recipesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    baseServings: z.number(),
    difficulty: z.object({
      prep: z.number().min(1).max(10),
      technique: z.number().min(1).max(10),
      cleanup: z.number().min(1).max(10),
    }),
    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        unit: z.string(),
      })
    ),
  }),
});

export const collections = {
  'recipes': recipesCollection,
};
