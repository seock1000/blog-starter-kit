import { getPostBySlug } from '@/lib/api'
import fs from 'fs'
import path from 'path'

// Mock file system
jest.mock('fs')
jest.mock('path')

const mockedFs = fs as jest.Mocked<typeof fs>
const mockedPath = path as jest.Mocked<typeof path>

describe('Location Parsing in API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedPath.join.mockImplementation((...args) => args.join('/'))
  })

  it('should parse location from frontmatter when present', () => {
    const mockMarkdown = `---
title: 'Test Post'
date: '2025-11-25'
location: 'Seoul, South Korea'
author:
  name: 'Test Author'
excerpt: 'Test excerpt'
coverImage: '/test.jpg'
ogImage:
  url: '/test.jpg'
---

Test content`

    mockedFs.readdirSync.mockReturnValue(['test-post.md'] as any)
    mockedFs.readFileSync.mockReturnValue(mockMarkdown)

    const post = getPostBySlug('test-post')

    expect(post.location).toBeDefined()
    expect(post.location?.city).toBe('Seoul')
    expect(post.location?.country).toBe('South Korea')
  })

  it('should handle posts without location field', () => {
    const mockMarkdown = `---
title: 'Test Post'
date: '2025-11-25'
author:
  name: 'Test Author'
excerpt: 'Test excerpt'
coverImage: '/test.jpg'
ogImage:
  url: '/test.jpg'
---

Test content`

    mockedFs.readdirSync.mockReturnValue(['test-post.md'] as any)
    mockedFs.readFileSync.mockReturnValue(mockMarkdown)

    const post = getPostBySlug('test-post')

    expect(post.location).toBeUndefined()
  })

  it('should parse location with only city', () => {
    const mockMarkdown = `---
title: 'Test Post'
date: '2025-11-25'
location: 'Tokyo'
author:
  name: 'Test Author'
excerpt: 'Test excerpt'
coverImage: '/test.jpg'
ogImage:
  url: '/test.jpg'
---

Test content`

    mockedFs.readdirSync.mockReturnValue(['test-post.md'] as any)
    mockedFs.readFileSync.mockReturnValue(mockMarkdown)

    const post = getPostBySlug('test-post')

    expect(post.location).toBeDefined()
    expect(post.location?.city).toBe('Tokyo')
    expect(post.location?.country).toBe('Global')
  })
})
