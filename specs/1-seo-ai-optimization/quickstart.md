# Quickstart: Geo-targeting and SEO

This guide explains how to use the new geo-targeting and SEO features.

## Adding Location to a Post

To associate a geographic location with a blog post, add a `location` field to the post's Markdown frontmatter.

**Format**: The location should be a string in the format `"City, Country"`.

### Example

1.  Open or create a Markdown file in the `/_posts` directory.
2.  Add the `location` key to the frontmatter:

    ```markdown
    ---
    title: 'A Visit to the Eiffel Tower'
    excerpt: 'An amazing experience in the heart of Paris.'
    date: '2025-12-01T10:00:00.000Z'
    author:
      name: 'Alex Doe'
    location: 'Paris, France'
    ---

    The content of your post goes here.
    ```

3.  Save the file.

When the site is rebuilt, the post will now include structured data identifying its location as Paris, France.

## Verifying the Changes

1.  Run the development server (`npm run dev`).
2.  Navigate to the page for the post you just edited.
3.  Open your browser's developer tools and inspect the page source (`View Page Source`).
4.  Search for `"@type":"BlogPosting"`. You should find a `<script type="application/ld+json">` block.
5.  Within that block, you will see the location information:

    ```json
    "location": {
      "@type": "Place",
      "name": "Paris, France"
    }
    ```

## Global Posts

If you do not add a `location` field to the frontmatter, the post will be marked as "global".

### Example

```json
"location": {
  "@type": "Place",
  "name": "Global"
}
```
