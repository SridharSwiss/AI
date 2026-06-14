#!/bin/bash
# SessionStart hook for Claude Code on the web.
# Installs ai-hub dependencies and provides placeholder Supabase env vars so
# `next build` can run unattended (the analytics client is constructed at import
# time; real analytics never runs during a build). Real secrets, if configured
# in the environment, take precedence — placeholders are only set when missing.
set -euo pipefail

# Only run in the remote (web) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR/ai-hub"
npm install --no-audit --no-fund

if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  if [ -z "${SUPABASE_URL:-}" ]; then
    echo 'export SUPABASE_URL="https://placeholder.supabase.co"' >> "$CLAUDE_ENV_FILE"
  fi
  if [ -z "${SUPABASE_ANON_KEY:-}" ]; then
    echo 'export SUPABASE_ANON_KEY="placeholder-anon-key"' >> "$CLAUDE_ENV_FILE"
  fi
fi
