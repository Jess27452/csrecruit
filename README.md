# CSRecruit

[![Deploy to GitHub Pages](https://github.com/Jess27452/csrecruit/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Jess27452/csrecruit/actions/workflows/deploy-pages.yml)

Community-curated resources for Computer Science recruiting. CSRecruit helps students discover and share useful resources for coding interviews, online assessments, projects, resumes, internships, and new-grad recruiting.

## Features

- Browse approved resources without signing in
- Search by title, description, category, subcategory, and tags
- Filter across Coding, Recruiting, Projects, Resume, and Opportunities
- Sort resources by upvotes, newest, or popularity
- Sign in with Google, GitHub, or email through Supabase Auth
- Submit resources to a pending moderation queue
- Edit or delete your own submissions
- Upvote each resource once
- Review approval status and received upvotes from your profile
- Approve, reject, edit, or delete submissions from the protected admin dashboard
- Prevent duplicate URLs and reject unsafe non-HTTP(S) links

## Stack

- Next.js 16, React 19, and TypeScript
- Tailwind CSS 4 and reusable CSS-based components
- Supabase Auth and PostgreSQL
- PostgreSQL Row Level Security for ownership and administrator permissions
- Zod and React Hook Form for validation
- Vinext for the Cloudflare-compatible build

## Local setup

Prerequisites: Node.js 22+, pnpm, and a Supabase project.

```bash
git clone https://github.com/Jess27452/csrecruit.git
cd csrecruit
pnpm install
cp .env.example .env.local
pnpm dev
```

Add the following values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Apply the SQL migrations in `supabase/migrations`, then load `supabase/seed_csrecruit.sql` if you want the starter resources.

For Google and GitHub login, enable each provider in Supabase Authentication and add the local and production callback URLs.

## Permission model

- Visitor: browse, search, filter, and open approved resources
- Signed-in user: visitor permissions plus submitting, upvoting, and managing their own resources
- Administrator: review pending submissions and manage all resources

New submissions use `pending` status. Only approved resources appear publicly. Database policies prevent normal users from changing resource status, ownership, or account roles.

## Commands

```bash
pnpm dev
pnpm build
pnpm build:vercel
pnpm build:pages
pnpm test
pnpm lint
```

## Deployment

The application is ready for Vercel or another server-capable Next.js host. Configure the Supabase environment variables in the hosting platform and add its authentication callback URL in Supabase.

The repository also contains a GitHub Pages workflow for the static public experience. Supabase-backed server features require a server-capable host for the complete application.

## Security

- Resource URLs must use HTTP or HTTPS.
- A unique normalized-URL constraint blocks duplicate submissions.
- Row Level Security protects ownership and administrator-only actions.
- Each user/resource pair has a unique upvote constraint.
- Pending and rejected resources are hidden from public queries.

## License

MIT
