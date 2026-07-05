# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Snapshot

- App: `meager-income`, a lightweight real-time salary/income visualizer.
- Stack: React 18, TypeScript, Vite 6, CSS Modules.
- Runtime target: browser-only SPA. There is no backend in this repo.
- Main route behavior: the onboarding screen is the default route, and `/app` opens the main calculator UI.
- Dev and preview port: `1213`, configured with `strictPort: true` in `vite.config.ts`.

## Important Commands

Run commands from the repository root.

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

- `npm run build` already runs `npm run typecheck` before `vite build`.
- There is no dedicated test suite at the moment. For changes, at minimum run `npm run typecheck`; run `npm run build` before delivery when behavior or bundling may be affected.
- If port `1213` is occupied, do not silently change the app port. Report the conflict or intentionally update the config if the task asks for it.

## Repository Layout

- `src/main.tsx`: React entrypoint.
- `src/App.tsx`: top-level route switch between onboarding and the main app.
- `src/Onboarding.tsx`: onboarding experience.
- `src/components/`: UI components, usually paired with `*.module.css`.
- `src/hooks/useWorkTimer.ts`: timer state machine and salary input lifecycle.
- `src/utils/calculations.ts`: income math, achievement thresholds, formatting, and localStorage helpers.
- `src/types/index.ts`: shared TypeScript types.
- `src/styles/global.css`: global tokens, base styles, background, motion defaults.
- `documents/`: product/design notes and static design explorations. Check these before broad UX changes.
- `dist/`, `node_modules/`, `.npm-cache/`, preview logs, and screenshots are generated or local artifacts; avoid editing them directly.

## Coding Guidelines

- Keep components as typed React function components.
- Prefer existing local patterns over new abstractions. Most UI pieces use a component file plus a matching CSS Module.
- Keep business logic in hooks or `src/utils/` instead of embedding calculations in JSX.
- Preserve the current `SalaryInput`, `IncomeStats`, `Achievement`, and `WorkStatus` contracts unless a requested feature requires a type change.
- Be careful with timer behavior: `useWorkTimer` uses refs for start time, paused elapsed time, and unlocked achievements to avoid interval/state race issues.
- Avoid adding runtime dependencies unless they clearly reduce complexity or match an explicit request.
- Use existing icon components in `src/components/Icons.tsx` before introducing another icon library.
- Keep comments sparse and useful. Existing comments and copy include Chinese text; do not mass-rewrite them as cleanup.

## UI And Styling Guidelines

- Follow the current glass/aurora visual language: soft surfaces, restrained shadows, teal primary accents, warm secondary accents.
- Use CSS Modules for component-specific styling. Keep global CSS limited to tokens, resets, base element styles, and cross-app background/motion.
- Maintain responsive layouts for both desktop and mobile. Watch for text overflow inside buttons, cards, and compact panels.
- Respect reduced-motion behavior already defined in `src/styles/global.css`.
- Avoid redesigning the whole page when the task is a focused fix.

## Data And Behavior Notes

- Salary input is persisted under the localStorage key `meager_income_salary_input`.
- Income calculations use the number of days in the current month.
- `dailyWorkHours` must remain positive and should not exceed 24 in UI validation.
- Achievement thresholds are either fixed currency amounts or ratios of daily income.
- Completion of a workday unlocks all achievements and marks the timer as `finished`.

## Text And Encoding Notes

- Some Chinese text may display incorrectly in certain terminals or tooling if the encoding is misread. Verify the actual file contents before editing copy.
- Do not normalize, transliterate, or "fix" large text blocks unless the task is specifically about copy or encoding.
- Preserve user-facing product tone where possible: playful, salary/work themed, and concise.

## Agent Workflow

- Start by checking `git status --short` and relevant files before editing.
- Do not revert unrelated user changes.
- Keep changes scoped to the request.
- Update docs only when they help future maintainers or reflect a real behavior change.
- Before final response, summarize changed files and validation performed.
