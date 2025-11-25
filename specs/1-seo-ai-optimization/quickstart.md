# Quickstart: SEO and AI Engine Optimization

This document provides a quick reference for using the new SEO features in your blog.

## 🚀 Quick Start

### 1. Add Location to Your Posts

Add a `location` field to your post's frontmatter in `/_posts`:

```markdown
---
title: 'Exploring the Culture of Tokyo'
date: '2025-11-25'
location: 'Tokyo, Japan'
author:
  name: 'Jane Doe'
excerpt: 'Discover the rich cultural heritage...'
---

Your content here...
```

**Supported Formats:**
- `City, Country` → Full location (e.g., "Seoul, South Korea")
- `City` → City only (country defaults to "Global")
- No location field → Post is considered global content

### 2. Build and Verify

Build your site to generate the sitemap and structured data:

```bash
npm run build
npm start
```

The following are generated automatically:
- **Structured Data**: BlogPosting JSON-LD on every post page
- **Sitemap**: `public/sitemap.xml` with all posts

### 3. Validate SEO Implementation

**Validate Structured Data:**
1. Visit your post page (e.g., `http://localhost:3000/posts/your-post`)
2. View page source and look for `<script type="application/ld+json">`
3. Verify the structure includes BlogPosting with location (if specified)
4. Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

**Check Sitemap:**
- Visit `http://localhost:3000/sitemap.xml`
- Ensure all posts are listed with correct URLs and dates

## 📍 Advanced: Location Input Component

If you're building an admin or authoring interface, use the `LocationInput` component for easy location selection:

```tsx
import { LocationInput } from '@/app/_components/location-input'

function PostEditor() {
  return (
    <LocationInput 
      initialValue="Seoul, South Korea"
      onLocationSelect={(location) => {
        console.log('Selected:', location)
        // { city: 'Seoul', country: 'South Korea', latitude?: number, longitude?: number }
      }}
    />
  )
}
```

**Features:**
- Google Maps Places API autocomplete (requires API key)
- Falls back to manual entry if no API key
- Returns structured location object with optional coordinates

**Setup:**
```bash
# Copy the example file
cp .env.local.example .env.local

# Add your Google Maps API key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 🧪 Testing

Run the test suite to verify everything works:

```bash
# Run all tests
npm test

# Run specific test file
npm test -- location-input

# Watch mode for development
npm run test:watch
```

## 📈 SEO Best Practices

1. **Use Descriptive Titles**: Your post title becomes the `headline` in structured data
2. **Add Excerpts**: The excerpt becomes the `description` in structured data
3. **Use Quality Images**: Cover images are included in the structured data
4. **Be Specific with Locations**: Use recognizable city and country names
5. **Keep Content Fresh**: The `dateModified` field helps search engines understand content updates

## 🔍 Troubleshooting

**Issue**: Location not appearing in structured data
- **Solution**: Check frontmatter format (must be `location: 'City, Country'`)

**Issue**: Sitemap not generated
- **Solution**: Ensure `npm run build` completes successfully; check `public/sitemap.xml`

**Issue**: Google Maps autocomplete not working
- **Solution**: Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set and valid

For more details, see the full specification in `spec.md`.
