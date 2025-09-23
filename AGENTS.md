# AGENTS.md - Pivotr Technologies Landing Page

## Project Overview

This is a modern, responsive landing page for Pivotr Technologies built with Next.js 15.5.3 and React 19. The project showcases a technology company specializing in integrated business solutions with a focus on software-first approach.

### Key Features
- **Modern Stack**: Next.js 15 with App Router, React 19, TypeScript 5
- **Styling**: Tailwind CSS v4 with custom design system and animations
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Theme Support**: Dark/light mode toggle with next-themes
- **Performance**: Turbopack for fast development and builds
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Interactive Elements**: Typewriter animations, live metrics ticker, progress indicators

### Architecture
- **Framework**: Next.js with App Router (src/app directory structure)
- **Components**: Modular component architecture in src/components
- **Styling**: Utility-first CSS with Tailwind CSS and custom CSS variables
- **Fonts**: Custom font loading with Inter and Source Code Pro
- **State Management**: React hooks for client-side state
- **Build System**: Turbopack for enhanced performance

## Build and Test Commands

### Development
```bash
# Start development server with Turbopack
pnpm dev

# Alternative package managers
npm run dev
yarn dev
bun dev
```

### Production Build
```bash
# Build for production with Turbopack
pnpm build

# Start production server
pnpm start
```

### Code Quality
```bash
# Run ESLint for code linting
pnpm lint

# Format code with Prettier
pnpm format

# Check formatting without making changes
pnpm format:check
```

### Package Management
```bash
# Install dependencies
pnpm install

# Add new dependency
pnpm add <package-name>

# Add development dependency
pnpm add -D <package-name>
```

## Code Style Guidelines

### TypeScript Standards
- **Strict Mode**: TypeScript strict mode is enabled for type safety
- **Path Mapping**: Use `@/*` aliases for imports from src directory
- **Type Definitions**: Prefer interfaces over types for object shapes
- **Component Props**: Define interfaces for all component props

### React Patterns
- **Functional Components**: Use function declarations with proper TypeScript typing
- **Client Components**: Mark client-side components with `"use client"` directive
- **Hooks**: Utilize custom hooks for reusable logic (see `src/hooks/`)
- **Props Interface**: Always define props interfaces for components

### File Organization
```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── hero/           # Hero section components
│   ├── navbar/         # Navigation components
│   └── about/          # About section components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

### Naming Conventions
- **Components**: PascalCase (e.g., `HeroCards.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Classes**: Use Tailwind utility classes with semantic naming
- **Client Components**: Suffix with `.client.tsx` when necessary

### ESLint Configuration
- Extends Next.js core web vitals and TypeScript rules
- Prettier integration for consistent formatting
- Ignores build artifacts and generated files

### Styling Guidelines
- **Tailwind CSS**: Utility-first approach with custom design tokens
- **Dark Mode**: Support both light and dark themes
- **Responsive**: Mobile-first responsive design
- **CSS Variables**: Use CSS custom properties for theme values
- **Animation**: Prefer CSS animations and Tailwind animation utilities

### Color Palette

The project uses a Claude.ai-inspired color palette with semantic color tokens for consistent theming across light and dark modes.

#### Brand Colors
- **Primary**: Book Cloth (`#C6785C` - HSL 16 48% 57%) - Main brand color for CTAs and highlights
- **Accent**: Manilla/Kraft tones - Used for subtle highlights and secondary elements
  - Light mode: Manilla (`#E8D8BC` - HSL 38 19% 91%)
  - Dark mode: Kraft (`#D4A27F` - HSL 25 40% 83%)

#### Neutral Palette
- **Slate Family**: Primary text and backgrounds
  - Slate Dark: `#191919` (HSL 0 0% 10%) - Dark mode background, light mode text
  - Slate Medium: `#262625` (HSL 60 3% 15%) - Dark mode cards
  - Slate Light: `#40403E` (HSL 60 2% 25%) - Dark mode borders

- **Cloud Family**: Secondary text and muted elements
  - Cloud Dark: `#666663` (HSL 60 3% 40%) - Dark mode secondary
  - Cloud Medium: `#91918D` (HSL 60 3% 40%) - Muted text
  - Cloud Light: `#BFBFBA` (HSL 60 3% 75%) - Light mode secondary

- **Ivory Family**: Light backgrounds and surfaces
  - Ivory Light: `#FAFAF7` (HSL 60 1% 98%) - Light mode background
  - Ivory Dark: `#E5E4DF` (HSL 60 10% 89%) - Light mode borders

#### Semantic Colors
- **Focus**: Blue (`#4A6AF2` - HSL 229 87% 62%) - Interactive elements and focus states
- **Destructive**: Red (`#BF4543` - HSL 1 49% 51%) - Error states and destructive actions

#### Usage Guidelines
- Use `hsl(var(--primary))` for brand elements and call-to-action buttons
- Use `hsl(var(--muted-foreground))` for secondary text content
- Use `hsl(var(--border))` for subtle dividers and component borders
- Use `hsl(var(--accent))` for subtle highlights and hover states
- Always reference colors through CSS custom properties for automatic theme switching

## Testing Instructions

Currently, this project does not have a formal testing framework configured. For future testing implementation, consider:

### Recommended Testing Setup
```bash
# Install testing dependencies (when implementing)
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
pnpm add -D @vitejs/plugin-react jsdom
```

### Manual Testing Checklist
- **Responsive Design**: Test on different screen sizes (mobile, tablet, desktop)
- **Theme Toggle**: Verify dark/light mode switching works correctly
- **Navigation**: Test all navigation links and mobile menu functionality
- **Animations**: Ensure typewriter effects and live metrics work properly
- **Performance**: Check Core Web Vitals and loading times
- **Accessibility**: Verify keyboard navigation and screen reader compatibility

### Pre-commit Validation
Before committing changes, always run:
```bash
# Lint the codebase
pnpm lint

# Format code
pnpm format

# Build the project to check for errors
pnpm build
```

## Security Considerations

### Development Security
- **Dependencies**: Keep all dependencies updated using `pnpm update`
- **Type Safety**: TypeScript strict mode helps prevent runtime errors
- **Environment Variables**: Use Next.js environment variable conventions
- **Build Security**: Turbopack provides secure build optimizations

### Runtime Security
- **CSP Headers**: Consider implementing Content Security Policy headers
- **Image Optimization**: Next.js Image component provides secure image handling
- **XSS Prevention**: React's built-in XSS protection through JSX
- **Input Sanitization**: Validate and sanitize any user inputs

### Best Practices
- **Regular Updates**: Keep Next.js, React, and dependencies updated
- **Security Audits**: Run `pnpm audit` regularly to check for vulnerabilities
- **Secure Headers**: Implement security headers in production deployment
- **HTTPS**: Always use HTTPS in production environments

### Deployment Security
- **Environment Variables**: Never commit sensitive data to version control
- **Build Validation**: Ensure builds pass without warnings before deployment
- **Static Analysis**: ESLint helps catch potential security issues
- **Bundle Analysis**: Monitor bundle size and analyze for unused code

## Development Environment Tips

### VS Code Setup
- Install recommended extensions for Next.js, TypeScript, and Tailwind CSS
- Use Prettier and ESLint extensions for automatic formatting
- Configure auto-save and format on save for consistent code style

### Performance Optimization
- **Turbopack**: Development and build performance optimized
- **Image Optimization**: Use Next.js Image component for optimized images
- **Font Loading**: Custom font optimization with `next/font`
- **Bundle Analysis**: Use `next bundle-analyzer` to analyze bundle size

### Component Development
- **Storybook**: Consider adding Storybook for component development
- **Type Checking**: Run TypeScript compiler in watch mode during development
- **Hot Reload**: Turbopack provides fast hot module replacement