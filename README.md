# Sumit Kumar Das - DevOps Engineer Portfolio

A modern, responsive, and production-ready personal portfolio website built with React 19, TypeScript, Vite, and Tailwind CSS. Features dual-theme support (dark/light mode), smooth GSAP scroll animations, Calendly integration, and Docker containerization.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui + Radix UI |
| Animations | GSAP + ScrollTrigger |
| Icons | Lucide React |
| Container | Docker + Nginx |

## Local Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-project-folder>

# Install dependencies
npm install

# Start development server
npm run dev
```

## Docker Deployment

```bash
# Build and run with Docker 
docker build -t portfolio .
docker run -p 8080:8080 portfolio
```

The site will be served on `http://localhost:8080`.
