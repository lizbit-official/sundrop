# Sundrop

A weather app for those partial to the bleeding edge!

## Building

## Deploying

## Background
I've long appreciated NOAA for their weather reporting, especially
for their chart interface which no other website seems to provide.

I decided to use their API, but since it doesn't require authentication,
I implemented the address lookup using the Google Maps API behind the backend
which securely handles the keys.

### Frontend


I was considering using Redux (a la RTK), but it seemed overkill for this project.
I wanted to put together a solution that would be "production-ready", which means several things:
- fast to load
- indexable by search engines
- cacheable backend for repeat visitors

At first glance, it appeared that Next.js could handle a lot of the
security and speed concerns with its support for React's server components.
What wasn't immediately apparent was just how new and unsupported these new features really are.

I was able to hack together a solution I'm not entirely proud of, 
I think that with more time I could have put something together 
that would have delivered better in terms of UX.

