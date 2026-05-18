#!/usr/bin/env bash
set -e

# Load .env.local
export $(grep -v '^#' .env.local | xargs)

echo "Linking to Supabase project: $SUPABASE_PROJECT_REF"
npx supabase link --project-ref "$SUPABASE_PROJECT_REF" --password "$SUPABASE_DB_PASSWORD"

echo "Pushing migrations..."
npx supabase db push

echo "Running seed data..."
npx supabase db execute --file supabase/seed/seed.sql

echo "Done! Your database is ready."
