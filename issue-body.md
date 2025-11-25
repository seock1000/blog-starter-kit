**Feature**: SEO and AI Engine Optimization
**User Story**: 2 - As an AI engine, I want to easily parse and understand the key information of a blog post.

**Description**:
Ensure all posts, regardless of geo-tagging, have robust `BlogPosting` structured data.

**Tasks**:
- [ ] T014 [P] Update `StructuredData` component to handle posts without a location in `src/app/_components/structured-data.tsx`
- [ ] T015 [P] [Test] Add test cases for non-geo posts to `src/app/_components/structured-data.test.tsx`