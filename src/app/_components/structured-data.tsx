import { Post } from '@/interfaces/post'

type Props = {
  post: Post
}

export function StructuredData({ post }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.picture && { image: post.author.picture }),
    },
    image: post.coverImage ? `${baseUrl}${post.coverImage}` : undefined,
    description: post.excerpt,
    ...(post.location && {
      contentLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: post.location.city,
          addressCountry: post.location.country,
        },
        ...(post.location.latitude && post.location.longitude && {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: post.location.latitude,
            longitude: post.location.longitude,
          },
        }),
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
