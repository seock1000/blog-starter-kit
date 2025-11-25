# Phase 0 Research: SEO and AI Engine Optimization

This document outlines the research tasks required to resolve the "NEEDS CLARIFICATION" items and make key technical decisions for the SEO and AI Engine Optimization feature.

## Research Decisions

### 1. Testing Framework for Next.js

-   **Decision**: **Jest** with **React Testing Library**.
-   **Rationale**: This is the most mature and widely-adopted testing stack for Next.js applications. It is officially documented by Next.js, has a large community, and provides a complete solution for unit and integration testing of React components. While Vitest is a strong modern alternative, Jest's stability and ecosystem make it a safer choice for this project.
-   **Action**: A setup task will be created to install and configure Jest, React Testing Library, and the necessary Jest/Babel configuration for a Next.js project.

### 2. Geocoding/Autocomplete Service

-   **Decision**: Use the **Google Maps Places API** wrapped in a custom, lazy-loaded React component.
-   **Rationale**: The Google Maps API provides the most accurate and comprehensive location data. To align with our **Performance-First** and **Static-First** principles, we will avoid third-party component libraries that could increase bundle size. Instead, we will create a lightweight, custom component that only loads the Google Maps script when the user interacts with the input field. This minimizes the performance impact.
-   **Action**: Tasks will be created to:
    1.  Create a new component (`LocationInput`).
    2.  Implement logic to lazy-load the Google Maps script.
    3.  Manage the API key using environment variables (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`).

### 3. Sitemap Generation with Location Data

-   **Decision**: **Do not** add location data to the sitemap. Rely on on-page structured data.
-   **Rationale**: The standard `sitemap.xml` protocol does not have a field for location data. While geo-sitemaps exist, they are a non-standard extension and add complexity for little-to-no proven SEO benefit. The modern, correct approach is to use `schema.org` structured data (JSON-LD) on the page itself, which is what search engines like Google prioritize.
-   **Action**: A task will be created to generate a standard `sitemap.xml` at build time. This task will not include location data.

### 4. `BlogPosting` Schema.org Implementation

-   **Decision**: Implement a component to dynamically generate `BlogPosting` JSON-LD.
-   **Rationale**: This is the most direct and effective way to communicate content structure to search engines and AI tools.
-   **Action**: A task will be created to implement a component that generates the following JSON-LD structure and embeds it in the `<head>` of the post page.
    -   **For a post with location**:
        ```json
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Post Title",
          "location": {
            "@type": "Place",
            "name": "Seoul, South Korea"
          }
        }
        ```
    -   **For a global post (no location)**:
        ```json
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Post Title",
          "location": {
            "@type": "Place",
            "name": "Global"
          }
        }
        ```
