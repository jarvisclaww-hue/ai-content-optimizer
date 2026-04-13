import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, CheckCircle, Code, Layout, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">PRIA Frontend Engineering</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional frontend infrastructure for AI development services and portfolio projects
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <Badge variant="secondary" className="text-sm">
              Next.js 14
            </Badge>
            <Badge variant="secondary" className="text-sm">
              TypeScript
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Tailwind CSS v4
            </Badge>
            <Badge variant="secondary" className="text-sm">
              shadcn/ui
            </Badge>
            <Badge variant="secondary" className="text-sm">
              ESLint + Prettier
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Jest + Testing Library
            </Badge>
          </div>
        </header>

        <Alert className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Frontend Infrastructure Ready</AlertTitle>
          <AlertDescription>
            This project is configured with modern frontend tooling and best practices for rapid
            development.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <Layout className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Component Library</CardTitle>
              </div>
              <CardDescription>
                Built with shadcn/ui for accessible, customizable components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Button, Card, Input, Form components</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Dialog, Dropdown, Select, Alert</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Fully typed with TypeScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Dark mode support</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                  <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Development Tools</CardTitle>
              </div>
              <CardDescription>Optimized workflow with modern tooling</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ESLint with TypeScript & React rules</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Prettier for consistent formatting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Husky Git hooks with lint-staged</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Jest + Testing Library setup</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                  <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Production Ready</CardTitle>
              </div>
              <CardDescription>Built for scalability and maintainability</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>App Router with React Server Components</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Type-safe development</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Performance optimized</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>SEO friendly metadata</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Development</h3>
              <code className="block bg-muted px-4 py-2 rounded text-sm font-mono mb-2">
                npm run dev
              </code>
              <p className="text-sm text-muted-foreground">Start development server</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Testing</h3>
              <code className="block bg-muted px-4 py-2 rounded text-sm font-mono mb-2">
                npm test
              </code>
              <p className="text-sm text-muted-foreground">Run test suite</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Linting & Formatting</h3>
              <code className="block bg-muted px-4 py-2 rounded text-sm font-mono mb-2">
                npm run lint
              </code>
              <code className="block bg-muted px-4 py-2 rounded text-sm font-mono mb-2">
                npm run format
              </code>
              <p className="text-sm text-muted-foreground">Check and fix code quality</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2">
            <Code className="h-4 w-4" />
            View Components
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Layout className="h-4 w-4" />
            Documentation
          </Button>
          <Button size="lg" variant="secondary" className="gap-2">
            <Zap className="h-4 w-4" />
            Get Started
          </Button>
        </div>

        <footer className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Built for PRIA - Professional AI Development Services</p>
          <p className="mt-2">Supports portfolio projects and client service delivery</p>
        </footer>
      </div>
    </div>
  );
}
