# Front-end Task

## Live Demo
[Posts](https://arweqah-frontend-task.vercel.app/)


## Project Setup

### Prerequisites

- Node.js (v22.11.0)
- npm (10.9.0)

Make sure to install dependencies:

```bash
# npm
npm install

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

## Project Structure

.
├── composables
│   └── baseUseFetch.ts        # Custom fetch data composable
├── components
│   └── PostCard.vue           # Post card component
├── pages
│   ├── index.vue              # Main posts page
│   └── posts
│       └── [id].vue           # Post detail page
├── types
│   ├── pagination.ts          # Type declaration for paginated response
│   └── posts.ts               # Type declaration for post item
└── utils
    └── dateFormatter.ts       # Date formatting utility

## Scroll Detection Mechanism

First before the user navigate away posts page we record and store the last scrolling position
then when the user get back to posts page we get the stored scroll point and make the page 
scroll to it

## Bonus Features

- TypeScript
- Vuetify Integration