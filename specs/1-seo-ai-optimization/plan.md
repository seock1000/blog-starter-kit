# Implementation Plan: SEO and AI Engine Optimization

**Branch**: `1-seo-ai-optimization` | **Date**: 2025-11-25 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/1-seo-ai-optimization/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command.

## Summary

This feature will enhance the blog starter kit with Search Engine Optimization (GEO) and AI Engine Optimization (AIEO) capabilities. It involves adding location metadata to blog posts to improve local search ranking and structuring content with semantic HTML and schema.org markup to make it more parsable for AI-powered tools. The implementation will prioritize performance and static generation, introducing an auto-complete feature for location input that needs careful selection to align with core principles.

## Technical Context

**Language/Version**: TypeScript 5.5+
**Primary Dependencies**: Next.js 15+, React 19, Tailwind CSS 3.4, `gray-matter` for frontmatter parsing.
**Storage**: Markdown files in the `/_posts` directory.
**Testing**: NEEDS CLARIFICATION (No testing framework is currently configured in the project).
**Target Platform**: Web (Statically Generated Site).
**Project Type**: Web Application.
**Performance Goals**: Maintain Lighthouse Performance score >90; build time <60s for <100 posts.
**Constraints**: Must adhere to static-first principles. The new dependency for location auto-complete must be lightweight and have minimal impact on client-side performance.
**Scale/Scope**: The solution should scale to thousands of posts without significant build time degradation.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] **Component-First**: Feature designed as reusable components with explicit boundaries. (The location input will be a new component).
- [x] **Type Safety**: All new code will use TypeScript with NO `any` types.
- [ ] **Performance-First**: Static generation will be preferred. The location auto-complete feature introduces a potential performance consideration that must be addressed.
- [x] **Content-Driven**: The changes are backward compatible with the existing Markdown frontmatter schema.
- [ ] **Static-First**: SSG is the default. The location auto-complete feature will likely involve client-side data fetching, which must be justified and implemented without compromising the static nature of the site.

**Violations Requiring Justification**: None at this stage, but the implementation of the location auto-complete feature (FR-005) could potentially violate **Performance-First** and **Static-First** principles if not implemented carefully. This will be a key focus of the research phase.

## Project Structure

### Documentation (this feature)

```text
specs/1-seo-ai-optimization/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (likely empty for this feature)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

This project follows a single-project structure. New components will be added to `src/app/_components`, and library functions for data handling will be modified or added in `src/lib`.

```text
src/
├── app/
│   ├── _components/
│   │   └── location-input.tsx   # New component for location autocomplete
│   └── posts/
│       └── [slug]/
│           └── page.tsx         # Modify to include structured data
├── interfaces/
│   ├── post.ts                # Modify to include location data
│   └── location.ts            # New interface for location
└── lib/
    ├── api.ts                 # Modify to parse location from frontmatter
    └── sitemap.ts             # New or modified library for sitemap generation
```

**Structure Decision**: The existing "single project" structure is appropriate. New logic will be integrated into the existing `src/lib` and `src/app` directories, following the established patterns of the starter kit.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [Potentially] Client-side fetching for location autocomplete | The user explicitly requested an auto-completing input field for ease of use (FR-005), which typically requires a client-side API call to a geocoding service. | A simple text input was rejected by the user in favor of a more user-friendly, accurate, and structured approach. The risk will be mitigated by choosing a lightweight library and lazy-loading the component. |
