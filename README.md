# PR Organizer — Build Plan

A GitHub App and web dashboard for organizing crowded pull request queues. It groups PRs by filters (creator, date, base branch) and by automatically detected file overlap, flags stale PRs, lets contributors manually mark urgent PRs via a title convention, and provides a personal dashboard with deeper activity stats than GitHub's native contribution graph. Built with Next.js, TypeScript, Prisma, and deployed on Vercel.

## Phase 0 — Setup

- [ ] Register the GitHub App (Developer Settings → GitHub Apps): set name, homepage URL (`.vercel.app` URL for now), webhook URL, generate a private key.
- [ ] Request permissions: Pull requests (read), Contents (read — needed for file-overlap comparison later), Metadata (read).
- [ ] Subscribe to webhook events: `pull_request`, `pull_request_review`, `installation_repositories`.
- [ ] Install the app on one of your own repos to start testing against real data.
- [ ] Scaffold the Next.js app, add Prisma, connect a Postgres instance (Neon/Supabase/Vercel Postgres).
- [ ] Set up NextAuth.js with the GitHub provider for user sign-in.

## Phase 1 — Auth + raw PR list (no DB yet)

- [ ] Get sign-in working end-to-end.
- [ ] Use Octokit (JWT → installation token flow) to fetch open PRs for one test repo live via REST/GraphQL.
- [ ] Render them in a bare list. Goal: prove the full chain — auth, installation token, API call, render — works before adding any complexity.

## Phase 2 — Prisma schema + webhook ingestion

- [ ] Design core models: `User`, `Installation`, `Repo`, `PullRequest`, `Review`.
- [ ] Build the `/api/webhooks/github` endpoint: verify HMAC signature, parse event type, upsert into Prisma.
- [ ] Switch the PR list to read from the DB instead of live API calls.
- [ ] Handle `installation_repositories` events so repo access changes stay in sync.

## Phase 3 — Filters

- [ ] Creator, contributors, date range, base branch — all straightforward queries against data already stored.
- [ ] Validates the schema design before building anything more complex on top of it.

## Phase 4 — Stale detection

- [ ] Define staleness rules (no activity in N days, no reviews actioned, etc.), ideally as a configurable threshold.
- [ ] Compute as a derived flag, either on read or via a scheduled job.

## Phase 5 — Manual importance flagging

- [ ] Parse PR titles for a defined convention (e.g., `[P0]`, `[URGENT]`).
- [ ] Document the convention clearly in the app's UI so users know the syntax.

## Phase 6 — Personal dashboard

- [ ] Aggregate stats from stored PR/review history: merge time, review turnaround, current stale/blocked count, activity over time.
- [ ] The main differentiator vs. GitHub's native contribution graph — worth real design effort here.

## Phase 7 — Related PRs clustering

- [ ] Start with one heuristic: overlapping changed files (via the Contents/files-changed API).
- [ ] Ship last since it's the most likely to need iteration once real PR data is seen.

## Ongoing / cross-cutting

- [ ] Keep webhook auth and user auth as separate systems (no shared middleware).
- [ ] Batch GitHub API calls via GraphQL where possible; keep sync jobs chunked to avoid Vercel's function timeout.
- [ ] Revisit Vercel/DB plan tier once there are real outside users, and revisit domain/App URLs together when a custom domain is registered.
