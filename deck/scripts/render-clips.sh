#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# render-clips.sh — Export every Alma presentation clip for the Reveal.js deck
#
# Usage (from project root):
#   bash deck/scripts/render-clips.sh          # render all clips
#   bash deck/scripts/render-clips.sh problem  # render only the matching clip
#
# Requirements:
#   • Node + @remotion/cli installed  (npm install)
#   • FFmpeg on PATH
#
# Output: deck/videos/<name>.mp4
# ─────────────────────────────────────────────────────────────────────────────

set -e  # exit on first error

ENTRY="src/index.ts"
COMP="LedgerlingPresentation"
OUT_DIR="deck/videos"
CODEC="h264"
FILTER="${1:-}"  # optional name filter passed as first argument

mkdir -p "$OUT_DIR"

# ── Clip definitions  (name  start-frame  end-frame-inclusive) ───────────────
# Frame ranges derived from Composition.tsx timing constants.
# Format:  "name:start:end"
CLIPS=(
  "00-intro:0:143"
  "01-logo-open:144:281"
  "02-problem:282:569"
  "03-transition:570:707"
  "04-meet-alma:708:995"
  "05-ecosystem:996:1283"
  "06-how-it-works:1284:1571"
  "07-live-demo:1572:1859"
  "08-value-capture:1860:2147"
  "09-roadmap:2148:2435"
  "10-logo-close:2436:2585"
)

RENDERED=0
SKIPPED=0

for clip in "${CLIPS[@]}"; do
  IFS=':' read -r name start end <<< "$clip"

  # Apply name filter if provided
  if [[ -n "$FILTER" && "$name" != *"$FILTER"* ]]; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  OUTPUT="$OUT_DIR/${name}.mp4"

  echo ""
  echo "▶  $name  (frames $start–$end)"

  npx remotion render "$ENTRY" "$COMP" "$OUTPUT" \
    --codec "$CODEC" \
    --frames="${start}-${end}" \
    --log=error

  echo "   ✓  saved → $OUTPUT"
  RENDERED=$((RENDERED + 1))
done

echo ""
echo "────────────────────────────────────"
echo "Done. Rendered: $RENDERED  Skipped: $SKIPPED"
echo "────────────────────────────────────"
