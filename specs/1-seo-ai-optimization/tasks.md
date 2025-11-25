# Tasks: SEO and AI Engine Optimization

**Input**: Design documents from `specs/1-seo-ai-optimization/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are included as per the research decision to set up a testing framework.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for testing.

- [ ] T001 Install Jest and React Testing Library dependencies
- [ ] T002 Configure Jest and Babel for Next.js in `jest.config.js` and `babel.config.js`
- [ ] T003 Create initial test setup file in `tests/setup.ts`
- [ ] T004 Add test script to `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data structures and utilities that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T005 [P] Create `Location` interface in `src/interfaces/location.ts`
- [ ] T006 Update `Post` interface to include optional `location` in `src/interfaces/post.ts`
- [ ] T007 Create a script to generate `sitemap.xml` at build time in `scripts/generate-sitemap.mjs`
- [ ] T008 Update the build command in `package.json` to run the sitemap generation script

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Content Geo-Targeting (Priority: P1) 🎯 MVP

**Goal**: Associate a specific geographic location with blog posts to improve local search ranking.

**Independent Test**: A new post with location metadata renders the correct structured data.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T009 [P] [US1] Unit test for location parsing logic in `tests/lib/api.test.ts`
- [ ] T010 [P] [US1] Integration test for structured data component in `tests/components/structured-data.test.tsx`

### Implementation for User Story 1

- [ ] T011 [US1] Update `getPostBySlug` and `getAllPosts` to parse location from frontmatter in `src/lib/api.ts`
- [ ] T012 [P] [US1] Create `StructuredData` component to generate and embed JSON-LD in `src/app/_components/structured-data.tsx`
- [ ] T013 [US1] Integrate `StructuredData` component into the post page in `src/app/posts/[slug]/page.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - AI Engine Readability (Priority: P2)

**Goal**: Ensure content is structured for modern, AI-driven information retrieval systems.

**Independent Test**: A blog post page contains valid `BlogPosting` schema and semantic HTML.

### Tests for User Story 2 ⚠️

- [ ] T014 [P] [US2] Unit test to verify `BlogPosting` schema is complete in `tests/components/structured-data.test.tsx`

### Implementation for User Story 2

- [ ] T015 [US2] Enhance `StructuredData` component to include all required `BlogPosting` fields (headline, author, datePublished, etc.) in `src/app/_components/structured-data.tsx`
- [ ] T016 [P] [US2] Review and update post body rendering to ensure usage of semantic HTML tags (`<article>`, `<section>`) in `src/app/_components/post-body.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Author-Friendly Location Input (Priority: P3)

**Goal**: Provide a simple and unambiguous way for authors to define the target location for a post.

**Independent Test**: A new component allows users to search for and select a location.

### Tests for User Story 3 ⚠️

- [ ] T017 [P] [US3] Unit test for the location input component in `tests/components/location-input.test.tsx`

### Implementation for User Story 3

- [ ] T018 [P] [US3] Create `LocationInput` component with lazy-loading for Google Maps script in `src/app/_components/location-input.tsx`
- [ ] T019 [P] [US3] Add environment variable for Google Maps API key in `.env.local.example` and update `next.config.js` if needed
- [ ] T020 [US3] (Placeholder) Integrate `LocationInput` component into a future admin/editor interface. (No-op for now as no editor exists).

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [ ] T021 [P] Update `README.md` with information about the new SEO features
- [ ] T022 [P] Update `quickstart.md` to reflect the final implementation
- [ ] T023 Run `npm run test` and ensure all tests pass
- [ ] T024 Manually validate the generated `sitemap.xml` file

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - User stories can then proceed sequentially in priority order (P1 → P2 → P3).
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2).
- **User Story 2 (P2)**: Depends on US1 (T015 enhances T012).
- **User Story 3 (P3)**: Can start after Foundational (Phase 2). It is largely independent but conceptually related to US1.

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Data models/interfaces before services/components.
- Core implementation before integration.

### Parallel Opportunities

- **Setup**: T001-T004 can be worked on, but have dependencies.
- **Foundational**: T005 and T006 can run in parallel. T007 and T008 can run after.
- **User Story 1**: T009 and T010 can run in parallel.
- **User Story 2 & 3**: Can be worked on in parallel with each other after US1 is complete.

---

## Parallel Example: Foundational Phase

```bash
# These two tasks can be started in parallel:
Task: "Create Location interface in src/interfaces/location.ts"
Task: "Update Post interface to include optional location in src/interfaces/post.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational
3.  Complete Phase 3: User Story 1
4.  **STOP and VALIDATE**: Test User Story 1 independently. The blog now supports basic geo-tagging.

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready.
2.  Add User Story 1 → Test independently → MVP is ready.
3.  Add User Story 2 → Test independently → AI readability is improved.
4.  Add User Story 3 → Test independently → Author experience is improved.
5.  Each story adds value without breaking previous stories.
