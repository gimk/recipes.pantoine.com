import { z, defineCollection } from 'astro:content';

const recipesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    cover: image().optional(),
    tags: z.array(z.string()),
    baseServings: z.number(),
    kcal: z.number().optional(),
    difficulty: z.object({
      prep: z.number().min(1).max(10),
      technique: z.number().min(1).max(10),
      cleanup: z.number().min(1).max(10),
    }),
    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.number().optional(),
        unit: z.string(),
        category: z.string().optional(),
      })
    ),
  }),
});

export const collections = {
  'recipes': recipesCollection,
};
