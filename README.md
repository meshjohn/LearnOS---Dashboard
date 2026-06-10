# LearnOS — Student Dashboard

A Next.js 14 student dashboard built for the Frontend Intern Challenge.

## Getting Started

```bash
npm install
cp .env.example .env.local
# fill in your supabase keys
npm run dev
```

## Supabase Setup

Create a `courses` table with the following schema:

```sql
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null default 0,
  icon_name text not null default 'BookOpen',
  created_at timestamptz default now()
);

-- seed data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('TypeScript Deep Dive', 42, 'FileCode'),
  ('System Design Fundamentals', 90, 'Network'),
  ('CSS Architecture', 28, 'Palette');
```

Enable Row Level Security and add a `select` policy for the anon role if you want it locked down.

## Architecture Notes

**Server vs Client split:** I kept data fetching in Server Components (`CourseGrid`, the root `DashboardPage`) so there's zero client-side waterfall for the initial data load. The `getCourses()` function runs on the server and passes data down as props. Only components that need interactivity or animations are marked `"use client"`.

**Framer Motion + Server Components:** Server Components can't use Framer Motion directly since it needs a client runtime. The fix is wrapping animated components in `"use client"` and passing the already-fetched server data to them as props — that's what `CourseCard` does.

**Suspense/loading:** The `CourseGrid` is wrapped in a `<Suspense>` boundary in `page.tsx` with a `CourseSkeleton` fallback. The skeleton uses a CSS shimmer animation (`skeleton` class in `globals.css`) to show something while Supabase responds.

**Animations without layout shifts:** All hover/entrance animations use `transform` (via `scale`, `y`, `opacity`) exclusively. No width/height or margin/padding changes during animation. Framer Motion's spring physics (`stiffness: 300, damping: 20`) are used for hover states.

**Dynamic icons:** Lucide icon names are stored as strings in the DB (`icon_name` column). `CourseCard` resolves them at runtime via `LucideIcons[iconName]` with a `BookOpen` fallback.

## Challenges

The main tricky part was the Server/Client boundary with Framer Motion — you can't put `motion.*` components in a Server Component because they rely on the browser. The solution is to make the animated shell a Client Component and keep the async data fetching in the server. The `CourseGrid` component fetches from Supabase server-side, then passes each course to `CourseCard` (which is a client component).

## Deploy

Push to GitHub, import to Vercel, add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables in the Vercel dashboard.
