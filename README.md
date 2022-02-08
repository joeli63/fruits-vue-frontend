# MVP Factory Frontend Test #3

Simple, opinionated, **fully typed**, and **production-ready** project template for Vite.

![Editor screenshot](src/assets/editor_screenshot.png)

Please [check out the Demo View](http://mvpf-frontend-test-3.surge.sh/) to see how it looks. A [detailed changelog](./CHANGES.md) is available. This repository is also [mirrored on GitLab](https://github.com/ironwebstar/MVP-Factory-Frontend-Test-3).

## Features

- Vue 3.2
- **Fully typed** [Vuex 4](https://next.vuex.vuejs.org/) store
- Routing using [vue-router 4](https://next.router.vuejs.org/)
- TypeScript 4.5
- Tailwind CSS 3.0 w/ following plugins preinstalled:
  - `@tailwindcss/aspect-ratio`
  - `@tailwindcss/line-clamp`
  - `@tailwindcss/typography`
  - `@tailwindcss/forms`
  - `firefox`-variant
- PostCSS 8 w/ `postcss-nesting` plugin
- Eslint
- Prettier
- Alias `@` to `<project_root>/src`
- Manually configured global components in `main.ts`
- Using `Composition API` syntax w/ Ref sugar (see the official [Script Setup documentation](https://v3.vuejs.org/api/composition-api.html).
- Cypress.io e2e tests (configured similarly to `vue-cli`)
- Cypress.io component tests
