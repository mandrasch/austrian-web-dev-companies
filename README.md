# Austrian Web Dev Companies

Looking for a job can be tiresome, this directory might help. Good luck!

Demo: https://austrian-web-dev-companies.pages.dev

Hobby project with the new Svelte v5 & SvelteKit 🧙

Static site generation via [adapter-static](https://svelte.dev/docs/kit/adapter-static).

## Why?

I like sites such as https://devjobs.at/teams/search, but I think they can be improved with a more "stack-focused" user interface for web developers. Since I wanted to learn the new $state system of Svelte v5 anyway, I started by implementing this. One of the goals is to show how simple a reactive user interface can be implemented with Svelte.

## Data sources

I'll add new data based on latest job offers or partner directories of CMSes / frameworks. Would be best to show companies with open job offers first, but portals like https://devjobs.at/ (with crawlers) do a better job here.

### Add (or remove) a company

Please just add the data to [`static/companies.json`](https://github.com/mandrasch/austrian-web-dev-companies/blob/main/static/companies.json) and open a PR. Or drop me a quick mail.

If you want to remove your company, please just send me a quick note: matthias-andrasch-kontakt@mailbox.org

## Resources

Thanks very much to https://simplecss.org/ and the Svelte Community for answering questions!

### Notes and discussions

- [Svelte 5: Share state between components (for Dummies) (dev.to)](https://dev.to/mandrasch/svelte-5-share-state-between-components-for-dummies-4gd2)
- [Feedback regarding $effect and URL params (Bluesky)](https://bsky.app/profile/paolo.ricciuti.me/post/3lf4a7rwjrc2h)
- [Help with simple pagination and $state (Discord)](https://discord.com/channels/457912077277855764/1325805139126386699)
- [Import shared $state and use bind=group for checkboxes inside of components (v5)? (Discord)](https://discord.com/channels/457912077277855764/1325055109318709278)

### Further resources

- [Lets Build A Filtering System with Svelte 5 , Sveltekit 2, Tailwind, Upstash (2024) - Lawal Adebola](https://www.youtube.com/watch?v=5urk4ui_l5o)

## TODOs

- [ ] improve pagination (styling and page count)
- [ ] move filters into own component
- [ ] scroll to results after pagination click (where is the best place for this logic?)
- [x] derive state of query params from '$page/state' (https://bsky.app/profile/paolo.ricciuti.me/post/3lf4a7rwjrc2h)
- [x] fix: pagination and ?p reset when new filters are selected (WIP)
- [x] fix: reset search text input for "reset filters" button action
- [x] store selected tags in URL (WIP)
- [ ] rename to austrian web dev agencies, company scope is too big?
- [x] optimize mobile
- [ ] ui: option to toggle filter view
- [ ] bonus: add statistics page with overview of used technology
- [x] remove custom class, object is enough for simplicity - https://svelte.dev/playground/17af110213b9434d95dff6ae2e62c100?version=5.16.0
- [ ] Show technologies with logo
- [x] update checkboxes inside FilterCheckboxes.svelte when global State changes (!)
- [x] create <ResultList /> component, https://svelte.dev/playground/17af110213b9434d95dff6ae2e62c100?version=5.16.0
- [ ] robust data validation for JSON, throw build error for unexpected values (currently everything is casesensitive)
- [ ] add social share image
- [x] add seo title and description
- [x] add header
- [x] add footer, info about how to add a company (PR or email)
- [ ] add NodeJS CMS like strapi, directus (?)
- [ ] a11y check
- [x] GitHub corner
