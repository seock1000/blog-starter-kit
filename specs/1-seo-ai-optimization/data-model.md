# Data Model: SEO and AI Engine Optimization

This document defines the data structures for the entities involved in this feature, based on the feature specification.

## Post Interface

The existing `Post` interface will be updated to include optional location information.

**File**: `src/interfaces/post.ts`

```typescript
import type Author from './author'
import type Location from './location' // New import

export type Post = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  location?: Location // New optional property
}
```

## Location Interface

A new interface will be created to represent a geographic location in a structured format.

**File**: `src/interfaces/location.ts`

```typescript
type Location = {
  city: string
  country: string
  latitude?: number
  longitude?: number
}

export default Location
```

## Frontmatter Parsing

The `gray-matter` library is used to parse the frontmatter from Markdown files. The logic in `src/lib/api.ts` will be updated to handle the new `location` field.

### Example Frontmatter

A post with location data:

```markdown
---
title: 'Exploring Seoul'
date: '2025-11-25'
location: 'Seoul, South Korea'
author:
  name: 'John Doe'
---
```

A post without location data (global):

```markdown
---
title: 'Global Tech Trends'
date: '2025-11-24'
author:
  name: 'Jane Smith'
---
```

The parsing logic will need to take the `location` string and transform it into the `Location` object. If the `location` field is absent, it will be treated as "global" as per the requirements.
