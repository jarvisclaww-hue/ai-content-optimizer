# PRIA Frontend Engineering Infrastructure

Professional frontend development infrastructure for AI development services and portfolio projects.

## Features

- **Next.js 14** with App Router and React Server Components
- **TypeScript** for type-safe development
- **Tailwind CSS v4** with modern styling utilities
- **shadcn/ui** component library for accessible, customizable UI components
- **ESLint** with TypeScript and React rules
- **Prettier** for consistent code formatting
- **Husky** Git hooks with lint-staged
- **Jest + Testing Library** for comprehensive testing
- **Dark mode** support out of the box
- **Performance optimized** with best practices

## Quick Start

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Testing
```bash
npm test
# Watch mode
npm run test:watch
```

### Linting & Formatting
```bash
# Check code quality
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── shared/           # Shared application components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
└── tests/                # Test files
```

## Available shadcn/ui Components

The following components are installed and ready to use:

- `Button` - Various button styles and sizes
- `Card` - Content containers
- `Input` - Form input fields
- `Label` - Form labels
- `Select` - Dropdown selection
- `DropdownMenu` - Context menus
- `Dialog` - Modal dialogs
- `Alert` - Notifications and alerts
- `Badge` - Status indicators

## Adding New Components

To add more shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

## Development Guidelines

### Code Quality
- All code must pass ESLint checks
- Prettier formatting is enforced via Git hooks
- Tests should be written for new functionality

### Git Workflow
- Pre-commit hooks automatically lint and format staged files
- Commit messages should follow conventional commits

### Testing
- Use Jest and React Testing Library
- Write unit tests for utility functions
- Write component tests for UI components
- Write integration tests for complex interactions

## Deployment

This project is configured for deployment on Vercel, but can be deployed to any platform supporting Next.js.

## Support

This infrastructure supports:
- PRIA-5: Client service presence (landing pages)
- PRIA-4: Portfolio demonstration projects
- General frontend development for AI services
