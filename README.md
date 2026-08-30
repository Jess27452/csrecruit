# CSRecruit

[![Deploy to GitHub Pages](https://github.com/Jess27452/csrecruit/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Jess27452/csrecruit/actions/workflows/deploy-pages.yml)

Community-curated resources for Computer Science recruiting. CSRecruit helps students discover and share useful resources for coding interviews, online assessments, projects, resumes, internships, and new-grad recruiting.

**Live website:** [jess27452.github.io/csrecruit](https://jess27452.github.io/csrecruit/)

## What CSRecruit does

CSRecruit brings scattered recruiting resources into one simple, student-friendly directory. Visitors can switch the interface between English and Chinese, browse five focused categories, search and filter the collection, open recommended resources, and contribute useful links without being forced to create an account.

The five main categories are:

1. **Coding** — LeetCode practice, algorithm roadmaps, and system design
2. **Recruiting** — online assessments, technical and behavioral interviews, and company experiences
3. **Projects** — software engineering, machine learning, and product project resources
4. **Resume** — US and China templates, guides, and example resumes
5. **Opportunities** — internship lists, new-grad lists, job boards, and GitHub repositories

## 项目简介

CSRecruit 是一个面向计算机专业学生的社区求职资源网站。访问者可以在英文和中文界面之间切换，按五大分类浏览、搜索和筛选资源，也可以在无需注册账号的情况下提交资源和点赞。公开资源会先经过管理员审核，帮助社区保持内容实用、清晰并且安全。

## Features

- Browse approved resources without signing in
- Search by title, description, category, subcategory, and tags
- Filter across Coding, Recruiting, Projects, Resume, and Opportunities
- Switch the main interface between English and Chinese, with the preference saved on the visitor’s device
- Sort resources by upvotes, newest, or popularity
- Submit resources without creating an account
- Upvote each resource once per browser without creating an account
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

## Permission model

- Visitor: browse, search, filter, open, submit, and upvote resources without an account
- Administrator: review pending submissions and manage all resources

New submissions use `pending` status. Only approved resources appear publicly. Administrator authentication remains available for moderation but is not shown in the public interface.

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

Every push to `main` builds the static site and deploys it to GitHub Pages automatically.

## Security

- Resource URLs must use HTTP or HTTPS.
- A unique normalized-URL constraint blocks duplicate submissions.
- Row Level Security protects ownership and administrator-only actions.
- Each user/resource pair has a unique upvote constraint.
- Pending and rejected resources are hidden from public queries.

## License

MIT
