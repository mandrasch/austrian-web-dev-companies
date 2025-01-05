# Austrian Web Dev Map

Searching for a job can be tiresome, this map might help a bit. Good luck!

Demo: https://austrian-web-dev-companies.pages.dev/

Hobby project with Svelte v5. 🪄

## Why?

I like searches like https://devjobs.at/teams/search, but I think they could be improved with a more stack-focused UI.

## Data sources

I'll add new data based on latest active job offers or partner directories of CMSes / frameworks. Would be best to show companies with open job offers first, but portals like https://devjobs.at/ do a better job here (with crawlers).

### Add a company

Please just open a PR and add the data to `static/companies.json`.

## TODOs

- [ ] pagination
- [ ] store selected tags in URL (state)
- [ ] optimize mobile
- [x] remove custom class, object is enough for simplicity - https://svelte.dev/playground/17af110213b9434d95dff6ae2e62c100?version=5.16.0
- [ ] Show technologies with logo
- [ ] update checkboxes inside FilterCheckboxes.svelte when global State changes (!)
- [x] create <ResultList /> component, https://svelte.dev/playground/17af110213b9434d95dff6ae2e62c100?version=5.16.0
- [ ] bonus: if a filter is set, we should check what else is there in dataset? e.g. which cities? gray out other stuff?
- [ ] robust data validation for JSON, throw build error for unexpected values (currently everything is casesensitive)
- [ ] mobile optimization
- [ ] add social share image
- [x] add seo title and description
- [x] add header
- [ ] add footer, info about how to add a company (PR or email)
- [ ] add imprint & privacy
- [ ] isolate functions in components
- [ ] add NodeJS CMS like strapi, directus (?)
- [ ] a11y check
- [x] GitHub corner

## Thanks to ...

- https://github.com/sphade/svelte5-productfilter
- https://simplecss.org/
