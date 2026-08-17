import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const DOMAIN_LABELS = {
  cs: "資訊工程",
  magic: "魔術與催眠",
  cubing: "魔術方塊",
  misc: "其他領域",
} as const;

export type DomainKey = keyof typeof DOMAIN_LABELS;

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    domain: z.enum(["cs", "magic", "cubing", "misc"]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
