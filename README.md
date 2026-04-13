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
│   ├── api/               # API routes
│   │   ├── analyze/       # Content analysis API
│   │   ├── optimize/      # Content optimization API
│   │   └── export/        # Content export API
│   ├── optimizer/         # AI Content Optimizer demo
│   │   └── page.tsx       # Optimizer interface
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── shared/           # Shared application components
├── lib/                   # Utility functions and configurations
│   └── ai-service.ts     # AI content service layer
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

## AI Content Optimizer Demo

This project includes a fully functional AI Content Optimizer demo showcasing:

### Features
- **Content Analysis**: AI-powered analysis of readability, SEO, tone, and grammar
- **Content Optimization**: Apply improvements based on customizable goals
- **Real-time Metrics**: Visual feedback on content quality and improvement
- **Export Functionality**: Export optimized content in multiple formats

### Access the Demo
1. Run the development server: `npm run dev`
2. Navigate to `http://localhost:3000/optimizer`
3. Or click the "AI Content Optimizer Demo" button on the homepage

### API Endpoints
- `POST /api/analyze` - Analyze content and provide metrics
- `POST /api/optimize` - Optimize content based on goals
- `POST /api/export` - Export content in various formats

## Deployment

This project is configured for deployment on Vercel, but can be deployed to any platform supporting Next.js.

### Vercel Deployment
1. Push code to GitHub/GitLab/Bitbucket
2. Import project in Vercel dashboard
3. Configure environment variables (if needed)
4. Deploy automatically on push

### Environment Variables
No environment variables required for the demo. In production, you would add:
- `OPENAI_API_KEY` for real AI content analysis
- Database connection strings
- Authentication secrets

### Build Command
```bash
npm run build
```

### Output Directory
`.next` (Next.js default)

## Support

This infrastructure supports:
- PRIA-5: Client service presence (landing pages)
- PRIA-4: Portfolio demonstration projects
- General frontend development for AI services
