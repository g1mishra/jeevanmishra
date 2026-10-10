#!/usr/bin/env bash
# Compile the LaTeX (.tex) resumes in this folder to PDF, the way Overleaf does.
#
# Tries engines in order (Unicode-native first, because the headers contain a
# "â€¢" that plain pdflatex cannot typeset):
#     tectonic -> latexmk(-xelatex) -> xelatex -> lualatex -> pdflatex
#
# Usage:
#   ./build.sh                 # build every source/*.tex into output/
#   ./build.sh file.tex ...    # build specific files
set -u

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE="$DIR/source"
OUT="$DIR/output"
mkdir -p "$OUT"

have() { command -v "$1" >/dev/null 2>&1; }

# Pick an engine.
ENGINE=""
for e in tectonic xelatex lualatex latexmk pdflatex; do
    if have "$e"; then ENGINE="$e"; break; fi
done

if [ -z "$ENGINE" ]; then
    cat <<'EOF'

No LaTeX engine found on PATH. Install one, then re-run ./build.sh

  Tectonic (closest to Overleaf):
      macOS:  brew install tectonic
      Linux:  see https://tectonic-typesetting.github.io/en-US/install.html

  Or a full TeX distribution (TeX Live / MiKTeX) for xelatex/pdflatex/latexmk.

EOF
    exit 1
fi

echo "Engine: $ENGINE"
[ "$ENGINE" = "pdflatex" ] && echo "WARNING: pdflatex is not Unicode-native; the 'â€¢' in the header may fail. Prefer tectonic/xelatex."

# Collect files.
if [ "$#" -gt 0 ]; then
    FILES=()
    for file in "$@"; do
        if [ -f "$file" ]; then FILES+=("$file"); else FILES+=("$SOURCE/$file"); fi
    done
else
    FILES=("$SOURCE"/*.tex)
fi

build_one() {
    local tex="$1"
    case "$ENGINE" in
        tectonic) tectonic --outdir "$OUT" --keep-logs "$tex" ;;
        latexmk)  latexmk -xelatex -interaction=nonstopmode -halt-on-error -outdir="$OUT" "$tex" ;;
        *)        "$ENGINE" -interaction=nonstopmode -halt-on-error -output-directory="$OUT" "$tex" >/dev/null \
                  && "$ENGINE" -interaction=nonstopmode -halt-on-error -output-directory="$OUT" "$tex" >/dev/null ;;
    esac
}

fail=0
for tex in "${FILES[@]}"; do
    [ -f "$tex" ] || { echo "skip (not found): $tex"; continue; }
    name="$(basename "${tex%.tex}")"
    echo ""
    echo "Building $(basename "$tex") ..."
    if build_one "$tex" && [ -f "$OUT/$name.pdf" ]; then
        echo "  OK  -> $OUT/$name.pdf"
    else
        echo "  FAILED. See $OUT/$name.log"
        fail=1
    fi
done

# Clean artifacts on full success.
if [ "$fail" -eq 0 ]; then
    rm -f "$OUT"/*.aux "$OUT"/*.log "$OUT"/*.out "$OUT"/*.fls "$OUT"/*.fdb_latexmk "$OUT"/*.synctex.gz "$OUT"/*.toc 2>/dev/null || true
fi

exit "$fail"
