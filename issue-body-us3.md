**Feature**: SEO and AI Engine Optimization
**User Story**: 3 - As a content author, I want a simple way to add a location to a post.

**Description**:
Create a user-friendly input component for authors to search and select a location, powered by the Google Maps Places API. This component should be lazy-loaded to avoid impacting page performance.

**Tasks**:
- [ ] T016 [P] Install Google Maps Places API client library
- [ ] T017 [P] Create `LocationInput` component with autocomplete in `src/app/_components/location-input.tsx`
- [ ] T018 [P] [Test] Write component tests for `LocationInput` in `src/app/_components/location-input.test.tsx`
- [ ] T019 [P] Create a new page/route to host the authoring tools, including the `LocationInput` component.
- [ ] T020 [P] Add environment variable handling for the Google Maps API key.