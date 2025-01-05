# Austrian Web Dev Companies

Looking for a job can be tiresome, this directory might help. Good luck!

Demo: https://austrian-web-dev-companies.pages.dev

Hobby project with Svelte v5. 🪄 Read my technical notes [here](https://dev.to/mandrasch/svelte-5-share-state-between-components-for-dummies-4gd2).

## Why?

I like sites such as https://devjobs.at/teams/search, but I think they could be improved with a more stack-focused user interface.

## Data sources

I'll add new data based on latest job offers or partner directories of CMSes / frameworks. Would be best to show companies with open job offers first, but portals like https://devjobs.at/ (with crawlers) do a better job here.

### Add (or remove) a company

Please just add the data to [`static/companies.json`](https://github.com/mandrasch/austrian-web-dev-companies/blob/main/static/companies.json) and open a PR. Or drop me a quick mail.

If you want to remove your company, please just send me a quick note: matthias-andrasch-kontakt@mailbox.org

## Thanks to ...

- https://simplecss.org/
- https://github.com/sphade/svelte5-productfilter
- the Svelte Community for answering questions

## TODOs

- [ ] pagination (https://www.youtube.com/watch?v=G-tafjJzfQo), but with v5
- [ ] store selected tags in URL (state)
- [ ] move filters into own component
- [ ] optimize mobile
- [ ] toggle filter view
- [ ] bonus: add statistics page with overview of used technology
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
