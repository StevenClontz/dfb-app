# Menu Review App 🍽️

A modern, responsive SvelteKit application for discovering and reviewing menu items. Built with SvelteKit 5, TypeScript, and Vite.

## Features

- **Browse Menu Items**: View a collection of delicious menu items with detailed descriptions and pricing
- **Category Filtering**: Filter menu items by category (Main Course, Salads, Desserts, etc.)
- **Star Rating System**: Rate menu items from 1 to 5 stars
- **Write Reviews**: Share your dining experiences with detailed reviews
- **Real-time Rating Updates**: See average ratings update automatically as new reviews are added
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices
- **Accessible**: Built with accessibility in mind, including ARIA labels and keyboard navigation

## Screenshots

### Main View
![Menu Review App Main View](https://github.com/user-attachments/assets/92c786ee-78f5-4656-aaec-2b39e9f9f63f)

### Review Modal
![Review Modal](https://github.com/user-attachments/assets/879f19b2-fa47-4924-90ac-470911716611)

### Filtering by Category
![Filtered View](https://github.com/user-attachments/assets/84f2e0da-dfbb-46de-a1b8-aa0e4664d3d3)

### After Submitting a Review
![After Review Submission](https://github.com/user-attachments/assets/5705f9a8-f920-49f2-862e-ec9ed0436b27)

## Tech Stack

- **Framework**: [SvelteKit 5](https://svelte.dev) with TypeScript
- **Build Tool**: [Vite](https://vitejs.dev)
- **Language**: TypeScript
- **Styling**: Scoped CSS in Svelte components
- **State Management**: Svelte stores

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/StevenClontz/dfb-app.git
cd dfb-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run check` - Run TypeScript and Svelte checks
- `npm run check:watch` - Run checks in watch mode

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── MenuItemCard.svelte    # Menu item display component
│   │   ├── ReviewCard.svelte      # Individual review display
│   │   └── ReviewForm.svelte      # Review submission form
│   ├── stores.ts                   # Svelte stores for state management
│   └── types.ts                    # TypeScript type definitions
├── routes/
│   ├── +layout.svelte             # Root layout
│   └── +page.svelte               # Main page
└── app.html                        # HTML template
```

## Key Components

### MenuItemCard
Displays a menu item with its details, rating, and review count. Includes a button to open the review form.

### ReviewForm
A modal dialog for submitting reviews with:
- Name input
- 5-star rating selector
- Comment textarea
- Form validation

### Data Model

**MenuItem**: Represents a menu item
- `id`: Unique identifier
- `name`: Item name
- `description`: Item description
- `price`: Item price
- `category`: Category (Main Course, Salads, Desserts)

**Review**: Represents a user review
- `id`: Unique identifier
- `menuItemId`: Associated menu item
- `rating`: 1-5 star rating
- `comment`: Review text
- `author`: Reviewer name
- `date`: Review date

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Deployment

This app uses `@sveltejs/adapter-auto`, which automatically detects your deployment environment. It works with:

- Vercel
- Netlify
- Cloudflare Pages
- And many other platforms

For specific deployment instructions, see the [SvelteKit deployment documentation](https://svelte.dev/docs/kit/adapters).

## Future Enhancements

Potential features for future development:
- User authentication and profiles
- Image upload for menu items
- Search functionality
- Sort reviews by date or rating
- Reply to reviews
- Backend integration with a database
- Admin panel for managing menu items

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
