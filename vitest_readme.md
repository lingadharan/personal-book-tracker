# Vitest unit testing guide

This project uses **Vitest** to run fast unit tests and **React Testing Library** to test React components the way a user experiences them. It runs separately from the Next.js development server and does not contact the real book-tracker backend.

## 1. Installed packages

The required development packages are already installed:

- `vitest`: test runner, assertions, mocks, and watch mode.
- `@vitejs/plugin-react`: lets Vitest transform React/TSX files.
- `jsdom`: provides browser APIs such as `window`, `document`, and `alert` in Node.js.
- `@testing-library/react` and `@testing-library/dom`: render components and query their visible UI.
- Vite's built-in TypeScript-path support makes the `@/` import alias work in tests, just as it does in the application.

If you need to add them again in a fresh clone, run:

```powershell
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom
```

## 2. Configuration

`vitest.config.ts` is the central test configuration.

- `react()` transforms React and TSX.
- `resolve.tsconfigPaths` reads the `@/*` path mapping from `tsconfig.json`.
- `environment: 'jsdom'` supplies a simulated browser for component tests.
- `include` finds files named `*.test.ts` or `*.test.tsx` inside `src`.

## 3. Commands

Run these commands from the project folder (`personal-book-tracker`):

```powershell
# Run tests once. Use this in CI or before committing.
npm run test:run

# Run in watch mode; Vitest reruns relevant tests after each save.
npm test

```

Press `q` to exit watch mode.

## 4. Test structure in this project

Tests are placed next to the code they verify:

- `src/components/tags.test.tsx`: checks tag rendering and click behavior.
- `src/components/contents/dashboardContent.test.tsx`: checks category grouping and the missing-context state.
- `src/utiles/deleteBookDetails.test.ts`: checks the delete request, success notification, and failure logging.

Keeping a test close to its source file makes both files easier to find and maintain.

## 5. Anatomy of a component test

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

it('selects reading when it is clicked', () => {
  const setSelectedTag = vi.fn(); // A mock function: records calls without changing app state.

  render(<Tags selectedTag="dashboard" setSelectedTag={setSelectedTag} />);
  fireEvent.click(screen.getByText('reading'));

  expect(setSelectedTag).toHaveBeenCalledWith('reading');
});
```

The flow is **arrange, act, assert**:

1. Arrange the component, props, context, or mock data.
2. Act as a user would, for example with `fireEvent.click`.
3. Assert the visible result or a function call with `expect`.

`screen` queries visible content. Prefer accessible queries such as `getByRole` and `getByLabelText`; use `getByText` when there is no suitable semantic element yet. The starter setup deliberately uses Vitest's built-in matchers, so it does not require an extra DOM matcher package.

## 6. Testing a component that uses context

`DashBoardContent` reads `GlobalBookContext`, so its test wraps it in `GlobalBookContext.Provider` and supplies a small, predictable list of books. This isolates the component: the real backend and page-level effects are not needed.

The test also renders the component without a provider to verify the error message that the component intentionally displays in that case.

## 7. Testing browser APIs and network code

`deleteBookDetails.test.ts` replaces `fetch` and `alert` with Vitest mocks using `vi.stubGlobal`. This prevents a real DELETE request while allowing the test to inspect the URL, HTTP method, and success message. `vi.restoreAllMocks()` cleans up between tests so one test cannot affect another.

## 8. Adding a new test

1. Create a file beside the source file, for example `src/components/header.test.tsx`.
2. Import `describe`, `it`, `expect`, and `vi` from `vitest`.
3. Render the component with the minimum props, provider, and mocked dependencies it needs.
4. Simulate user behavior and assert the outcome.
5. Run `npm run test:run`.

For components that use Next.js modules such as `next/navigation` or `next/image`, mock those modules with `vi.mock(...)` so the test stays a unit test. For flows that require the real Next.js server, database, authentication, and browser navigation together, use an end-to-end test instead.

## 9. Current scope and next steps

These tests cover the initial UI interactions, context-driven rendering, and an API helper. A useful next set would test the table rows (including Update/Delete actions) and authentication redirects on the home page. Unit tests should focus on one component or function at a time; do not depend on a running backend unless you are intentionally writing an integration test.
