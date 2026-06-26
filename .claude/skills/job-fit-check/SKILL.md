---
name: job-fit-check
description: Use when given a job posting, job description, or job link and asked whether JJ (Teoh Jia Jing) is a match, fits, qualifies, or should apply. Compares the job profile against this portfolio repo and the resume in public/docs/, then produces a structured match assessment with gaps and tailoring advice.
---

# Job Fit Check

## Overview

Assess how well JJ (Teoh Jia Jing) matches a given job profile by comparing the
job's requirements against two sources of truth: the **resume** and the
**portfolio repo**. Produce an honest, evidence-backed verdict — what matches,
what's missing, and how to position the application.

**Core principle:** Every claim of "match" must cite a concrete line from the
resume or portfolio. No vague "looks like a good fit" without evidence.

**Always be concise.** No preamble, no narrating your process. Lead with the
verdict and a short summary of good matches vs gaps, then supporting detail. Use
tight bullets and tables, not paragraphs. The reader wants the answer fast.

## Sources of Truth (read these first)

Read all of these before assessing. They live in this repo (`jjteoh` portfolio):

| Source             | Path                          | What it gives you                                                       |
| ------------------ | ----------------------------- | ----------------------------------------------------------------------- |
| Resume (markdown)  | `public/docs/.TeohJiaJing.md` | Experience, skills, education, projects, awards — the canonical resume  |
| Resume (root copy) | `resume.md`                   | Same content; use if the `public/docs` one is missing                   |
| Portfolio projects | `app/lib/data/projects.ts`    | Richer per-project detail: problem, approach, stack, impact, highlights |
| PDF resume         | `public/docs/TeohJiaJing.pdf` | Only if markdown versions are unavailable                               |

The markdown resume + `projects.ts` together are the most complete picture.
Prefer them over the PDF.

## Workflow

1. **Get the job profile.**
   - If the user pasted the job text, use it.
   - If the user gave a link, fetch it with WebFetch.
   - **If the link can't be accessed** (paywall, login required, JS-only page,
     fetch error, or empty/garbage content): STOP and ask the user to copy-paste
     the job description. Do not guess or invent the requirements. Say something
     like: _"I couldn't access that link (reason). Please paste the job
     description text and I'll assess the fit."_

2. **Extract the job's requirements** into a checklist:
   - Required skills / technologies
   - Years / seniority level
   - Responsibilities (e.g. team lead, architecture, hands-on delivery)
   - Domain (e.g. fintech, IoT, AI)
   - Nice-to-haves vs hard requirements (keep them separate)

3. **Read the sources of truth** (table above).

4. **Match each requirement** against the evidence. For every requirement, mark:
   - ✅ **Strong** — direct evidence (cite the resume/project line)
   - 🟡 **Partial / adjacent** — related but not exact (explain the gap)
   - ❌ **Missing** — no evidence found

5. **Produce the assessment** (format below).

## Output Format

```
## Job Fit: <role @ company>

**Verdict:** <Strong fit / Good fit with gaps / Stretch / Not a match> — one-line why.

### Summary
- ✅ **Good matches:** <comma-separated list of the key requirements JJ clearly meets>
- ❌ **Gaps:** <comma-separated list of the requirements that are missing or weak>

### Requirement Match
| Requirement | Status | Evidence |
|-------------|--------|----------|
| TypeScript backend | ✅ | "Designed and shipped backend services with NestJS, ElysiaJS…" |
| 5+ yrs experience  | 🟡 | ~2 yrs professional + part-time since Jan 2024 |
| Kubernetes         | ❌ | No K8s evidence; has Docker + Terraform |

### Strengths to lead with
- <the 3-4 strongest, most relevant points for THIS job>

### Gaps & how to address them
- <missing requirement> → <honest framing: adjacent experience, or acknowledge gap>

### Tailoring advice
- Which projects/bullets to surface for this application, and what to de-emphasize.
```

## Rules

- **Be honest, not a cheerleader.** Flag real gaps. A "stretch" verdict is useful;
  an inflated "strong fit" that ignores missing requirements is not.
- **Cite evidence.** Every ✅ links to a concrete resume line or project.
- **Don't fabricate experience.** If it's not in the sources, it's a gap — never
  assume JJ knows a tech because it's "similar" to something listed.
- **Separate hard requirements from nice-to-haves** in the verdict.
- **Never invent the job requirements.** If the link fails, ask for the pasted text.

## Common Mistakes

| Mistake                                               | Fix                                                                                                |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Assessing from the resume alone                       | Also read `app/lib/data/projects.ts` — it has problem/approach/impact detail the resume compresses |
| Guessing requirements from a job title                | Read the actual posting; if unreachable, ask the user to paste it                                  |
| Rating "strong fit" while a hard requirement is unmet | Downgrade the verdict; list the unmet requirement explicitly                                       |
| Counting a tech as a match because it's adjacent      | Mark 🟡 and name the actual gap                                                                    |
