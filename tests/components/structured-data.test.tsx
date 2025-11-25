import { render } from '@testing-library/react'
import { StructuredData } from '@/app/_components/structured-data'
import { Post } from '@/interfaces/post'

describe('StructuredData Component', () => {
  const basePost: Post = {
    slug: 'test-post',
    title: 'Test Post',
    date: '2025-11-25',
    excerpt: 'Test excerpt',
    coverImage: '/test.jpg',
    author: {
      name: 'Test Author',
      picture: '/author.jpg',
    },
    ogImage: {
      url: '/test.jpg',
    },
    content: 'Test content',
  }

  it('should render BlogPosting structured data with location', () => {
    const postWithLocation: Post = {
      ...basePost,
      location: {
        city: 'Seoul',
        country: 'South Korea',
        latitude: 37.5665,
        longitude: 126.9780,
      },
    }

    const { container } = render(<StructuredData post={postWithLocation} />)
    const script = container.querySelector('script[type="application/ld+json"]')

    expect(script).toBeInTheDocument()
    
    const data = JSON.parse(script?.textContent || '{}')
    
    expect(data['@type']).toBe('BlogPosting')
    expect(data.headline).toBe('Test Post')
    expect(data.contentLocation).toBeDefined()
    expect(data.contentLocation.address.addressLocality).toBe('Seoul')
    expect(data.contentLocation.address.addressCountry).toBe('South Korea')
    expect(data.contentLocation.geo.latitude).toBe(37.5665)
    expect(data.contentLocation.geo.longitude).toBe(126.9780)
  })

  it('should render BlogPosting structured data without location', () => {
    const { container } = render(<StructuredData post={basePost} />)
    const script = container.querySelector('script[type="application/ld+json"]')

    expect(script).toBeInTheDocument()
    
    const data = JSON.parse(script?.textContent || '{}')
    
    expect(data['@type']).toBe('BlogPosting')
    expect(data.headline).toBe('Test Post')
    expect(data.contentLocation).toBeUndefined()
  })

  it('should include author information', () => {
    const { container } = render(<StructuredData post={basePost} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent || '{}')
    
    expect(data.author).toBeDefined()
    expect(data.author['@type']).toBe('Person')
    expect(data.author.name).toBe('Test Author')
    expect(data.author.image).toBe('/author.jpg')
  })

  it('should render location without coordinates', () => {
    const postWithLocationNoCoords: Post = {
      ...basePost,
      location: {
        city: 'Tokyo',
        country: 'Japan',
      },
    }

    const { container } = render(<StructuredData post={postWithLocationNoCoords} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent || '{}')
    
    expect(data.contentLocation).toBeDefined()
    expect(data.contentLocation.address.addressLocality).toBe('Tokyo')
    expect(data.contentLocation.geo).toBeUndefined()
  })
})
