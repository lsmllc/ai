# AGENTS.md

## Project purpose

This app helps evaluate chalet listings in Charlevoix for purchase as a short-term rental and personal road biking property.

## Product priorities

1. Fast manual property intake
2. Clear scoring and ranking
3. Easy comparison between listings
4. Simple maintainable code
5. Easy future extension for email ingestion and maps

## Stack

* Next.js
* TypeScript
* Prisma
* PostgreSQL
* OpenAI API

## Coding rules

* Prefer simple server-side logic over unnecessary abstractions
* Keep components small and readable
* Use strict typing
* Validate inputs
* Avoid premature optimization
* Do not implement website scraping
* Use mock data when an integration is not ready
* Keep environment variables documented in README.example

## UX rules

* Dashboard must be immediately useful
* Scores must be visible and sortable
* Property detail page must explain why a property scored the way it did
* Forms should be simple and quick to use

## When unsure

Choose the smallest MVP path that preserves future extensibility
