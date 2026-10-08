#!/usr/bin/env bash
# Builds public/docs/TeohJiaJing.pdf from public/docs/.TeohJiaJing.md.
# Needs: uv (for resume-markdown), Google Chrome, poppler (pdfinfo) for the page check.
set -euo pipefail

root="$(cd "$(dirname "$0")/../.." && pwd)"
here="$root/scripts/resume"
src="$root/public/docs/.TeohJiaJing.md"
out="$root/public/docs/TeohJiaJing.pdf"
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

# resume-markdown reads resume.md and resume.css from the working directory.
cp "$src" "$work/resume.md"
cp "$here/resume.css" "$work/resume.css"
(cd "$work" && uvx resume-markdown build --no-pdf >/dev/null)

# Separate profile so a running Chrome window doesn't swallow the headless print.
# Chrome can hang after printing, hence the timeout.
timeout 60 "$chrome" --headless --disable-gpu \
  --user-data-dir="$work/chrome-profile" --no-pdf-header-footer \
  --print-to-pdf="$work/resume.pdf" "file://$work/resume.html" 2>/dev/null || true

if [[ ! -s "$work/resume.pdf" ]]; then
  echo "error: Chrome did not produce a PDF" >&2
  exit 1
fi

pages="$(pdfinfo "$work/resume.pdf" | awk '/^Pages:/ {print $2}')"
if [[ "$pages" != "1" ]]; then
  echo "error: resume is $pages pages, expected 1" >&2
  exit 1
fi

cp "$work/resume.pdf" "$out"
echo "wrote $out"
