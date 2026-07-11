---
name: cover-letter
description: Use when asked to write, draft, or generate a cover letter for JJ (Teoh Jia Jing) for a specific job. Gathers the job description, company profile, role, and motivation, drafts a tailored letter grounded in the resume/portfolio, and produces a styled PDF in the gitignored cover-letters/ folder.
---

# Cover Letter

## Overview

Draft a tailored, evidence-backed cover letter for JJ (Teoh Jia Jing) for a
specific role, then render it to a PDF. The letter is grounded in the same
sources of truth as `job-fit-check` — the resume and portfolio — so every claim
maps to real experience. **Never fabricate experience.**

The generated files go in a **gitignored** `cover-letters/` folder — cover
letters are private and must never be committed or made public.

## Sources of Truth (read these before drafting)

| Source             | Path                          | What it gives you                                                       |
| ------------------ | ----------------------------- | ----------------------------------------------------------------------- |
| Resume (markdown)  | `public/docs/.TeohJiaJing.md` | Experience, skills, education, projects, awards — the canonical resume  |
| Resume (root copy) | `resume.md`                   | Same content; fallback if the `public/docs` one is missing              |
| Portfolio projects | `app/lib/data/projects.ts`    | Richer per-project detail: problem, approach, stack, impact, highlights |

Use the markdown resume + `projects.ts` together — they are the most complete
picture. Pull the contact line (name, email, phone, site, LinkedIn, location)
from the top of the resume for the letterhead.

## Workflow

### 1. Gather inputs (prompt, then draft)

Ask the user for the following. Accept pasted text or a link for the first two;
if a link is given, fetch it with WebFetch (and WebSearch for company research).

- **Job description** — required. If a link can't be accessed (paywall, login,
  JS-only, fetch error, empty/garbage content): STOP and ask the user to paste
  the job description. Do not invent requirements.
- **Company profile** — paste, or a link to research (WebFetch/WebSearch). Used
  to show genuine interest in _this_ company. If unavailable, ask or proceed
  with what the JD reveals about the company.
- **Role / title** — the exact role being applied for.
- **Motivation / reason to join** — required. Why JJ wants this role/company.
  This is the human core of the letter; if the user hasn't given it, ask before
  drafting. Do not invent a motivation.
- **Optional:** hiring manager / recipient name, specific points to emphasize,
  desired tone (default: warm but professional).

### 2. Read the sources of truth

Read the resume and `projects.ts`. Select the **2-3 most relevant** experiences
or projects for THIS job — don't dump the whole resume into the letter.

### 3. Draft the letter

Write ~250-400 words, warm-but-professional, structured as:

- Opening: the role applied for + a genuine, specific hook (motivation + why
  this company).
- Body (1-2 paragraphs): the 2-3 most relevant proof points, each tied to a
  concrete achievement from the resume/portfolio. Connect them to the JD's
  requirements. Cite real work — no invented metrics or technologies.
- Close: reiterate fit and interest, thank the reader, signal next step.

**Show the markdown draft to the user for approval/edits before generating the
PDF.** Iterate on the text until they're happy.

### 4. Generate the PDF

Once the text is approved:

1. Make sure `cover-letters/` is gitignored (see step 5) and exists.
2. Choose a slug: `<Role>_<Location>_<Source>` — hyphenate spaces **within** each
   segment, join the three segments with underscores, no other special chars
   (e.g. `Backend-Software-Engineer_Reykjavik_LinkedIn`). Source = where the job
   was found (e.g. `LinkedIn`); if unknown, use `Direct`.
3. Create a per-application working folder: `cover-letters/<slug>/`.
4. Write the approved letter to `cover-letters/<slug>/<slug>.md`. The file
   **must** start with a single `# Teoh Jia Jing` H1 (resume-markdown uses the
   first H1 as the document title and it becomes the letterhead name), followed
   by the contact list, then the letter body. See **Markdown structure** below.
5. Copy the skill's stylesheet to a sibling with the **same stem** so
   resume-markdown picks it up:
   `cp .claude/skills/cover-letter/cover-letter.css cover-letters/<slug>/<slug>.css`
   (resume-markdown looks for `<stem>.css` next to the input; without it the PDF
   is unstyled.)
6. Build:
   `uvx resume-markdown build cover-letters/<slug>/<slug>.md`
   This writes `cover-letters/<slug>/<slug>.html` and `.pdf`.
7. **Clean up** — we only keep the PDF. Delete the intermediate files so only
   `cover-letters/<slug>/<slug>.pdf` remains:
   `rm -f cover-letters/<slug>/<slug>.md cover-letters/<slug>/<slug>.css cover-letters/<slug>/<slug>.html`
8. Report the final PDF path to the user.

### 5. Keep it private

Before (or right after) writing files, ensure `.gitignore` contains a
`cover-letters/` entry. If it's missing, add it. Never `git add` or commit the
generated letters.

## Markdown structure

The input markdown must follow this shape so the CSS renders it as a letter:

```markdown
# Teoh Jia Jing

- <contact@jjteoh.com>
- +60 17-214-7026
- [jjteoh.com](https://jjteoh.com)
- [linkedin.com/in/jjteoh](https://www.linkedin.com/in/jjteoh/)
- Kuala Lumpur, Malaysia

11 July 2026

Hiring Team, <Company>

Dear <name or "Hiring Team">,

<opening paragraph>

<body paragraph(s)>

<closing paragraph>

Sincerely,
Teoh Jia Jing
```

- The **first H1** is the name and becomes the letterhead + doc title — keep it
  as `# Teoh Jia Jing`. Do not add other `#` H1 lines.
- The list directly after the H1 is styled as the inline contact row. Use the
  contact details from the resume.
- Everything after is normal paragraphs. Separate paragraphs with a blank line.

## Tooling notes (resume-markdown)

- Invoked via `uvx resume-markdown build <file.md>` (no install needed; `uvx`
  is available). It renders the markdown to HTML and prints to PDF via a
  headless Chrome/Chromium.
- **CSS resolution:** it reads `<stem>.css` next to the input file. That's why
  step 4.5 copies `cover-letter.css` alongside the markdown in the slug folder.
- **Chrome required:** on macOS it auto-finds Google Chrome / Chromium /
  Chrome Canary. If it errors with "Could not find Chrome", pass
  `--chrome-path <path-to-chrome>`.
- Chrome may exit with `SIGABRT` yet still produce a valid PDF — if you see that
  warning, check whether `cover-letters/<slug>.pdf` was written before retrying.
- Markdown extensions enabled: `smarty` (smart quotes) and `abbr`.

## Rules

- **Never fabricate.** Every proof point maps to the resume/portfolio. No
  invented metrics, employers, or technologies.
- **Tailor to the job.** A generic letter is a failure. Reference the specific
  role, company, and the JD's actual priorities.
- **Get text approval before generating the PDF.** Don't build a PDF from an
  unreviewed draft.
- **Keep letters private.** `cover-letters/` stays gitignored; never commit.
- **Don't invent the job or company.** If a link fails, ask the user to paste
  the content.

## Common Mistakes

| Mistake                                          | Fix                                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| Skipping the `<slug>.css` copy                   | The PDF renders unstyled. Always copy `cover-letter.css` to the same stem.   |
| Missing / wrong `# H1`                           | resume-markdown errors without a single `#` H1; keep it as `# Teoh Jia Jing` |
| Drafting from the resume alone                   | Also read `app/lib/data/projects.ts` for problem/approach/impact detail      |
| Generating the PDF before the user approves text | Show the markdown draft first; iterate; then build                           |
| Leaving `.md`/`.css`/`.html` behind after build  | Clean up (step 4.7) — keep only `<slug>/<slug>.pdf`                          |
| Committing the generated files                   | Ensure `cover-letters/` is gitignored; never `git add` it                    |
| Inventing a motivation to fill the opening       | Ask the user for their real reason to join                                   |
