# CLAUDE.md

# Portfolio Project - Claude Code Instructions

## 1. Purpose

This repository contains my personal software-engineering portfolio.

The portfolio is a production application consisting of:

- React + Vite frontend
- Django + Django REST Framework backend
- SQLite for local/development data where applicable
- Production backend currently deployed on PythonAnywhere
- Frontend currently deployed on Vercel
- GitHub repository owned by `PoojaThacker2`

This is a professional portfolio intended to represent my actual engineering experience.

Treat the project as production-quality software, not as a disposable demo.

---

# 2. MOST IMPORTANT RULE: HUMAN OWNERSHIP

I am the owner and maintainer of this project.

I want to understand what is being built, changed, removed, configured, and deployed.

Do NOT operate as an opaque autonomous agent that makes many changes and only reports the final result.

For every meaningful change:

1. Explain what you found.
2. Explain why it needs to change.
3. Explain the proposed solution.
4. Make the smallest appropriate change.
5. Show me the exact diff.
6. Verify the change.
7. Explain the verification result.
8. STOP and wait for my approval before committing or pushing.

I should be able to explain the implementation in an interview.

Do not hide architectural decisions behind "I fixed it."

---

# 3. GIT COMMIT AND PUSH POLICY

## NEVER automatically commit or push

Before any commit:

1. Show `git status`.
2. Show the complete relevant diff.
3. Summarize every changed file.
4. Explain why each file changed.
5. State what was NOT changed.
6. Run the appropriate verification.
7. Report verification results.
8. Ask explicitly for permission to commit.

Example:

> Changes are ready for review.
>
> Files changed:
> - `Experience.jsx` - added explicit left alignment to achievement lists.
>
> Verification:
> - `npm run build` - passed.
>
> No other files changed.
>
> I have NOT committed or pushed anything.
>
> Approve commit and push?

Do not commit or push until I explicitly approve.

A response such as "looks good" or "continue" is sufficient only if it clearly constitutes approval to commit/push.

If I have not approved, stop.

## Commit separately when appropriate

Do not combine unrelated changes into one commit.

Prefer focused commits such as:

- `Fix experience achievement alignment`
- `Correct GitHub profile fallback`
- `Harden repository ignore rules`
- `Add case study presentation`
- `Improve project filtering`

---

# 4. TOKEN AND TOOL USAGE

Optimize token usage wherever you can, but not at the cost of correctness or important reasoning.

Use efficient investigation rather than repeatedly reading the same files.

Prefer:

- targeted searches
- targeted file reads
- focused diffs
- concise verification commands
- combining closely related read-only checks when useful

Avoid:

- repeatedly dumping entire files when only a few lines matter
- repeating the same command
- unnecessary broad repository scans
- explaining obvious implementation details multiple times
- performing speculative changes before establishing the cause

However:

DO NOT skip important investigation merely to save tokens.

Correctness and understanding take priority over token minimization.

## Token reporting

For every meaningful task phase, report approximate Claude token/tool usage when available.

Use a compact format such as:

```text
Token/tool usage:
- Investigation: ~X tokens
- Implementation: ~X tokens
- Verification: ~X tokens
- Total so far: ~X tokens

If exact token counts are not available, explicitly say:

Exact token count unavailable. Approximate usage only.

Do not waste substantial tokens calculating token usage manually when the environment does not expose it.

The purpose of reporting is to help me understand how efficiently the session is being used, not to create unnecessary overhead.

5. BEFORE MODIFYING ANYTHING

Before changing code:

Inspect the relevant existing implementation.
Identify the actual root cause.
Check whether the issue is frontend, backend, data, configuration, deployment, or an interaction between them.
Search for related implementations only when necessary.
Explain the diagnosis briefly.
Propose the smallest safe fix.

Do not modify files simply because they "look better."

Do not refactor unrelated code while fixing a specific issue.

Avoid unnecessary architectural changes.

6. MINIMAL-CHANGE PRINCIPLE

Prefer the smallest change that correctly solves the problem.

For example, if the issue can be fixed with:

<ul className="space-y-2 mt-4 text-left">

do not restructure the component, introduce new wrappers, create new CSS files, or rewrite unrelated code.

Do not over-engineer.

However, if a larger change is genuinely required for correctness, explain why before proceeding.

7. VERIFICATION REQUIREMENTS

After making changes, verify them appropriately.

Frontend changes should normally include:

npm run build

Backend changes should normally include:

python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py test

Use additional tests when the change warrants them.

For data changes:

verify record counts where appropriate
verify important fields
verify API responses
ensure existing production data is not unintentionally destroyed

For deployment/configuration changes:

verify the relevant configuration
explain what must be done manually on Vercel/PythonAnywhere
do not claim something is deployed unless it has actually been verified
8. DATABASE SAFETY

The production database contains portfolio information that must not be casually overwritten.

Never run destructive commands against production without explicit approval.

Examples requiring explicit approval:

deleting production data
resetting the database
recreating tables
flush
dropping tables
replacing production data with local seed data
changing production records in bulk

Before any potentially destructive database operation:

Explain exactly what will happen.
Identify what data may be affected.
Explain whether a backup exists.
Ask for explicit approval.
9. FIXTURES AND SEED DATA

Do not commit production database dumps or generated fixture exports unless there is a deliberate reason to do so.

The repository should use the appropriate seed mechanism for reproducible public portfolio data.

Current preferred mechanism:

portfolio/backend/portfolio/management/commands/seed_data.py

Generated database dumps such as:

portfolio_data.json

should remain ignored unless explicitly required.

Never put:

passwords
API keys
access tokens
private credentials
private visitor contact submissions
secrets

into seed data or Git.

Public portfolio content is acceptable.

10. ENVIRONMENT VARIABLES AND SECRETS

Never commit secrets.

The following should normally be ignored:

.env
.env.*
*.env

Do not expose secrets through:

React source code
VITE_* variables unless the value is intentionally public
committed JSON
Git history
screenshots
README files
API responses

If a secret is accidentally discovered in Git history, STOP before attempting cleanup.

Explain the exposure and proposed remediation first.

11. CLAUDE.MD ITSELF

CLAUDE.md is intentional project documentation.

DO NOT add CLAUDE.md to .gitignore.

It should be committed to the repository.

It contains project instructions, engineering conventions, and workflow expectations.

12. GITHUB

The correct GitHub account for this portfolio is:

PoojaThacker2

The portfolio repository is:

PoojaThacker2/Portfolio

The GitHub profile URL is:

https://github.com/PoojaThacker2

Do not replace this with another GitHub account.

The GitHub Activity section should use the correct username from the portfolio profile data.

Do not fabricate GitHub activity.

If GitHub activity is sparse, display the real activity rather than artificially filling it.

13. PORTFOLIO CONTENT ACCURACY

This is a professional portfolio.

Do not invent:

employment history
technologies used
project ownership
metrics
user counts
architecture claims
performance improvements
responsibilities
client relationships
achievements

If information is missing, ask me.

When improving wording, preserve the factual meaning.

Do not turn "worked on" into "architected" or "led" unless the evidence supports it.

14. CLIENT PROJECT CONFIDENTIALITY

Some projects represented in the portfolio are based on work performed for real companies/clients.

Never copy proprietary source code, client data, credentials, private APIs, internal documentation, architecture secrets, or confidential business information into this repository.

The goal is to create independent portfolio reconstructions where appropriate.

A reconstruction may demonstrate:

similar engineering problems
similar architecture patterns
similar workflows
representative UI
representative APIs
representative data models
representative technical decisions

But it must be independently implemented using fictional/synthetic data and must not reproduce confidential implementation details.

When reconstructing a project, clearly distinguish:

Original professional experience

from

Independent portfolio reconstruction

Never imply that an independent reconstruction is the original client application.

15. PORTFOLIO RECONSTRUCTIONS

When we eventually create independent reconstructions of professional projects:

First understand the actual engineering problem.
Identify what I personally worked on.
Separate public information from confidential information.
Define what can safely be demonstrated.
Design an independent implementation.
Use synthetic data.
Use different naming where appropriate.
Document the architectural decisions.
Make the repository understandable to another engineer.
Make it interview-demonstrable.

The reconstruction should demonstrate engineering ability, not claim ownership of the client's proprietary product.

16. COMPONENT AND UI CHANGES

When changing the UI:

preserve the existing design language unless the task explicitly requests redesign
preserve responsive behavior
avoid unnecessary component rewrites
check desktop and mobile implications
do not break intentional layout patterns

When a CSS issue is identified, explain:

inheritance
specificity
layout behavior
responsive behavior

when those concepts are relevant to understanding the fix.

17. ACCESSIBILITY AND UX

When making UI changes, consider:

semantic HTML
keyboard accessibility
readable contrast
responsive layouts
meaningful button/link labels
proper focus behavior
appropriate alt text
mobile usability

Do not sacrifice accessibility merely for visual appearance.

18. API AND BACKEND ARCHITECTURE

The Django backend should remain clean and maintainable.

Prefer:

serializers for API representation
ViewSets for CRUD resources
explicit function-based/API views where appropriate
URL routing through Django/DRF
model-level data integrity
validation at the appropriate layer
predictable REST endpoints

Existing API routes include patterns such as:

/api/profile/
/api/skills/
/api/experiences/
/api/projects/
/api/case-studies/
/api/testimonials/
/api/social-links/
/api/contact/
/api/schema/
/api/docs/
/api/redoc/

Do not change public API contracts unnecessarily.

If an API contract must change, explain the frontend/backend impact before making the change.

19. DEPLOYMENT

Current deployment architecture:

Frontend
React/Vite
        ↓
Vercel

Backend
Django/DRF
        ↓
PythonAnywhere

Do not assume Vercel and PythonAnywhere deployment behavior are identical.

When a backend change is made:

identify whether migration is required
identify whether PythonAnywhere must pull the latest Git commit
identify whether manage.py migrate must be run
identify whether the web app needs reloading/restarting

When a frontend change is made:

verify the build
explain that Vercel deployment depends on the Git push/deployment configuration
do not claim production is updated until verified
20. PRODUCTION VERIFICATION

When a production issue is being investigated, prefer verifying the actual production endpoint where safe.

For example:

https://poojachande.pythonanywhere.com/api/profile/

Use production verification to distinguish:

source-code problems
database problems
deployment problems
cached/stale frontend problems
configuration problems

Never modify production merely to test a hypothesis when a read-only verification is possible.

21. DOCUMENTATION

For meaningful architectural changes, update documentation when appropriate.

Documentation should help me answer interview questions such as:

Why did I choose this architecture?
Why Django REST Framework?
Why React/Vite?
How does the frontend communicate with the backend?
How is data structured?
How is deployment handled?
How are secrets handled?
How would this scale?
What would I improve in production?
What trade-offs did I make?

Do not generate excessive documentation for trivial changes.

22. EXPLANATION STYLE

When reporting work, use this structure where appropriate:

What I found
Why it happened
What I changed
Why this solution
Files changed
Verification
Potential impact
Git status
Next step

Keep explanations concise but sufficiently detailed for me to understand the engineering decision.

Do not produce huge explanations for trivial one-line changes.

23. DO NOT HIDE WORK

Never say:

"Everything is fixed."

without explaining what changed.

Never say:

"I cleaned up the repository."

without listing what was removed/changed.

Never say:

"Deployment is done."

without stating what was actually deployed and how it was verified.

Never silently:

commit
push
force push
rewrite history
modify production
install dependencies
change environment variables
alter deployment settings

without telling me.

24. FORCE PUSH AND HISTORY REWRITES

Never run:

git push --force

or rewrite Git history unless I explicitly approve it after understanding the consequences.

If a history rewrite appears necessary:

Stop.
Explain why.
Explain alternatives.
Explain the consequences.
Ask for explicit approval.
25. DEPENDENCIES

Do not add a dependency merely because it makes a small task easier.

Before adding a dependency, consider:

whether existing dependencies already solve the problem
bundle size
maintenance burden
security implications
whether the functionality can reasonably be implemented without it

If adding one is appropriate, explain why.

26. NO UNRELATED REFACTORING

If I ask:

Fix alignment of experience bullets.

Do not also:

redesign the experience section
rewrite API code
change colors
refactor unrelated components
upgrade dependencies
change deployment configuration

unless the investigation proves those changes are required.

Keep the diff focused.

27. BEFORE ASKING FOR COMMIT APPROVAL

Always run:

git status
git diff

and, when appropriate:

git diff --stat

Then provide:

READY FOR REVIEW

Files changed:
...

Why:
...

Verification:
...

Nothing else changed:
...

I have NOT committed or pushed.

Approve commit and push?

STOP there.

Do not automatically execute the commit after presenting this message.

28. AFTER COMMIT APPROVAL

Once I explicitly approve:

Commit the reviewed changes.
Show the commit hash.
Push normally.
Verify the push succeeded.
Show final git status.
Report exactly what was committed and pushed.

Do not make additional unapproved changes between approval and commit.

If additional changes become necessary, STOP and request another review.

29. SESSION EFFICIENCY

At the beginning of a new task:

Inspect the repository state.
Read only the relevant files.
Check whether previous uncommitted work exists.
Avoid repeating investigations already completed in the current session.

If previous work is already documented in the repository or Git history, use that information rather than rediscovering it unnecessarily.

Before starting a large task, estimate the work in phases.

Example:

Plan
1. Audit current implementation
2. Identify root cause
3. Implement minimal fix
4. Verify
5. Review diff
6. Wait for approval
7. Commit/push only after approval
30. FINAL PRINCIPLE

The final portfolio should not be an opaque "AI-built" project.

I should be able to understand and explain the implementation myself.

Optimize for:

correctness
security
maintainability
clarity
user ownership
efficient token/tool usage

Optimize token usage wherever you can, but not at the cost of correctness or important reasoning.

The goal is not simply to make the portfolio work.

The goal is for me to genuinely own the code, understand the architecture, explain the engineering decisions, demonstrate the work confidently in interviews, and maintain the project independently.