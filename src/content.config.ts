import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    heroImageAlt: z.string(),
    ratingPure: z.number().min(0).max(5).optional(),
    ratingMixed: z.number().min(0).max(5).optional(),
  }),
});

export const collections = { posts };
