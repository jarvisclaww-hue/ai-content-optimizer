# AI Content Optimizer - PRIA Portfolio Demo Project

AI-powered content optimization tool showcasing professional frontend engineering capabilities. This demo project demonstrates a full-stack Next.js application with AI content analysis and optimization features.

## Features

### AI Content Optimization
- **Real-time Content Analysis**: Analyze readability, SEO, tone, and grammar
- **Multi-tone Support**: Optimize for professional, casual, persuasive, or friendly tones
- **SEO Optimization**: Improve content for search engines
- **Readability Scoring**: Get instant feedback on content quality
- **Grammar & Style Suggestions**: AI-powered writing improvements

### Technical Stack
- **Next.js 14** with App Router and React Server Components
- **TypeScript** for type-safe development
- **Tailwind CSS v4** with modern styling utilities
- **shadcn/ui** component library for accessible, customizable UI components
- **Mock AI API**: Simulated AI processing with realistic responses
- **Real-time UI Updates**: Interactive optimization controls

### Development Features
- **ESLint** with TypeScript & React rules
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
│   ├── page.tsx           # Landing page
│   ├── optimizer/         # AI Content Optimizer demo
│   │   └── page.tsx      # Main optimizer interface
│   └── api/              # API routes
│       ├── analyze/      # Content analysis API
│       ├── optimize/     # Content optimization API
│       └── export/       # Export functionality
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── shared/           # Shared application components
├── lib/                   # Utility functions and configurations
│   └── ai-service.ts     # AI service layer
├── public/               # Static assets
└── tests/                # Test files
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

This project is configured for deployment on multiple platforms:

### Render Deployment
- Configuration: `render.yaml` included
- Docker support: `Dockerfile` for containerized deployment
- Build command: `npm ci && npm run build`
- Start command: `npm start`

### Vercel Deployment
- Compatible with Vercel's Next.js support
- No additional configuration needed

### General Deployment
- Can be deployed to any platform supporting Next.js 14
- Standalone output enabled in `next.config.ts`

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

This AI Content Optimizer demo project showcases:
- **PRIA Portfolio Project**: Full-stack demo application
- **AI Capabilities**: Content analysis and optimization features
- **Professional Frontend**: Modern tooling with best practices
- **Deployment Ready**: Configured for Vercel deployment

### Live Demo
Visit the deployed version at: [Coming soon - Vercel deployment pending]
