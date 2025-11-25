import { Post } from "@/interfaces/post";
import type Location from "@/interfaces/location";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

/**
 * Parse location string from frontmatter into Location object
 * @param locationString - Format: "City, Country" or "City"
 * @returns Location object or undefined
 */
function parseLocation(locationString: string | undefined): Location | undefined {
  if (!locationString) {
    return undefined;
  }

  const parts = locationString.split(',').map(part => part.trim());
  
  if (parts.length === 2) {
    return {
      city: parts[0],
      country: parts[1],
    };
  } else if (parts.length === 1) {
    return {
      city: parts[0],
      country: 'Global',
    };
  }

  return undefined;
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const location = parseLocation(data.location as string | undefined);

  return { ...data, slug: realSlug, content, location } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
