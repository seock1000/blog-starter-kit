# A statically generated blog example using Next.js, Markdown, and TypeScript

This is the existing [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) plus TypeScript, enhanced with SEO and AI Engine Optimization features.

This example showcases Next.js's [Static Generation](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates) feature using Markdown files as the data source.

The blog posts are stored in `/_posts` as Markdown files with front matter support. Adding a new Markdown file in there will create a new blog post.

To create the blog posts we use [`remark`](https://github.com/remarkjs/remark) and [`remark-html`](https://github.com/remarkjs/remark-html) to convert the Markdown files into an HTML string, and then send it down as a prop to the page. The metadata of every post is handled by [`gray-matter`](https://github.com/jonschlinkert/gray-matter) and also sent in props to the page.

## ✨ SEO Features

This starter now includes comprehensive SEO and AI Engine Optimization features:

### 🌍 Geo-Targeting
- Add location metadata to blog posts to improve local search ranking
- Posts are automatically enriched with structured data (schema.org BlogPosting)
- Supports city and country information with optional GPS coordinates

### 🤖 AI Engine Optimization
- All posts include complete BlogPosting structured data for AI engines
- Automatic sitemap.xml generation during build
- Optimized for modern AI-powered search and information retrieval

### 📍 Author-Friendly Location Input
- Easy-to-use location input component (optional)
- Google Maps Places API integration for autocomplete
- Falls back to manual entry if API key is not configured

## Demo

[https://next-blog-starter.vercel.app/](https://next-blog-starter.vercel.app/)

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/blog-starter&project-name=blog-starter&repository-name=blog-starter)

### Related examples

- [AgilityCMS](/examples/cms-agilitycms)
- [Builder.io](/examples/cms-builder-io)
- [ButterCMS](/examples/cms-buttercms)
- [Contentful](/examples/cms-contentful)
- [Cosmic](/examples/cms-cosmic)
- [DatoCMS](/examples/cms-datocms)
- [DotCMS](/examples/cms-dotcms)
- [Drupal](/examples/cms-drupal)
- [Enterspeed](/examples/cms-enterspeed)
- [Ghost](/examples/cms-ghost)
- [GraphCMS](/examples/cms-graphcms)
- [Kontent.ai](/examples/cms-kontent-ai)
- [MakeSwift](/examples/cms-makeswift)
- [Payload](/examples/cms-payload)
- [Plasmic](/examples/cms-plasmic)
- [Prepr](/examples/cms-prepr)
- [Prismic](/examples/cms-prismic)
- [Sanity](/examples/cms-sanity)
- [Sitecore XM Cloud](/examples/cms-sitecore-xmcloud)
- [Sitefinity](/examples/cms-sitefinity)
- [Storyblok](/examples/cms-storyblok)
- [TakeShape](/examples/cms-takeshape)
- [Tina](/examples/cms-tina)
- [Umbraco](/examples/cms-umbraco)
- [Umbraco heartcore](/examples/cms-umbraco-heartcore)
- [Webiny](/examples/cms-webiny)
- [WordPress](/examples/cms-wordpress)
- [Blog Starter](/examples/blog-starter)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example blog-starter blog-starter-app
```

```bash
yarn create next-app --example blog-starter blog-starter-app
```

```bash
pnpm create next-app --example blog-starter blog-starter-app
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## 📝 Adding Location to Blog Posts

To add location information to your blog posts, simply add a `location` field to the frontmatter:

```markdown
---
title: 'Exploring Seoul'
date: '2025-11-25'
location: 'Seoul, South Korea'
author:
  name: 'John Doe'
  picture: '/assets/blog/authors/joe.jpeg'
coverImage: '/assets/blog/hello-world/cover.jpg'
excerpt: 'A journey through the vibrant streets of Seoul...'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

Your blog post content here...
```

The location field supports two formats:
- **"City, Country"**: Full location with city and country
- **"City"**: City only (country will default to "Global")

Posts without a location field are considered global content.

## 🔧 Configuration

### Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```bash
# Optional: Google Maps API key for location autocomplete
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here

# Required: Your site URL for SEO and sitemap
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

## 📊 SEO Validation

After building your site, you can validate the structured data using:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

The automatically generated `sitemap.xml` will be available at `/sitemap.xml` after build.

# Notes

`blog-starter` uses [Tailwind CSS](https://tailwindcss.com) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3).

This starter includes comprehensive testing with Jest and React Testing Library.
