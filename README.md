# Design System

A React-based design system with reusable components and design tokens.

## Installation

```bash
npm install @fanno/design-system
```

## Usage

### Components

#### Button

```jsx
import { Button } from '@fanno/design-system';

function App() {
  return (
    <div>
      {/* Basic button */}
      <Button onClick={() => console.log('clicked')}>
        Click me
      </Button>

      {/* Button variants */}
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>

      {/* Button sizes */}
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>

      {/* Disabled button */}
      <Button disabled>Disabled</Button>
    </div>
  );
}
```

### Design Tokens

#### Colors

```jsx
import { colors } from '@fanno/design-system';

// Access color tokens
const primaryColor = colors.primary[500]; // "#3b82f6"
const neutralColor = colors.neutral[100]; // "#f5f5f5"

// Use in custom styles
const customStyles = {
  backgroundColor: colors.primary[500],
  color: colors.neutral[50]
};
```

## API Reference

### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `children` | `React.ReactNode` | - | Button content |
| `onClick` | `() => void` | - | Click handler |
| `disabled` | `boolean` | `false` | Whether button is disabled |

### Colors

Available color scales:
- `colors.primary` - Primary brand colors (50-900)
- `colors.neutral` - Neutral/gray colors (50-900)

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd design-system

# Install dependencies
npm install

# Build the design system
npm run build

# Run tests
npm test

# Start Storybook for development
npm run storybook
```

## Docker & Kubernetes Deployment

This repository contains a design system with Storybook documentation that can be deployed using Docker and Kubernetes via Helm.

## Docker

### Building the Docker Image

```bash
docker build -t design-system .
```

### Running the Docker Container

```bash
docker run -d -p 6006:6006 design-system
```

The Storybook will be available at `http://localhost:6006`

### Multi-stage Build

The Dockerfile uses a multi-stage build approach:
1. **Build stage**: Uses Node 18 to install dependencies and build the Storybook static files
2. **Production stage**: Uses nginx:alpine to serve the built files on port 6006

## Kubernetes Deployment with Helm

### Prerequisites

- Kubernetes cluster
- Helm 3.x installed

### Installing the Chart

```bash
# Install with default values
helm install design-system ./helm-chart

# Install with custom values
helm install design-system ./helm-chart --set image.repository=your-registry/design-system --set image.tag=v1.0.0
```

### Configuration

The following table lists the configurable parameters of the design-system chart and their default values.

| Parameter | Description | Default |
|-----------|-------------|---------|
| `replicaCount` | Number of replicas | `1` |
| `image.repository` | Image repository | `design-system` |
| `image.tag` | Image tag | `""` (uses chart appVersion) |
| `image.pullPolicy` | Image pull policy | `IfNotPresent` |
| `service.type` | Kubernetes service type | `ClusterIP` |
| `service.port` | Service port | `6006` |
| `healthCheck.readinessProbe` | Readiness probe configuration | See values.yaml |
| `healthCheck.livenessProbe` | Liveness probe configuration | See values.yaml |

### Health Checks

The deployment includes both readiness and liveness probes:
- **Readiness probe**: HTTP GET to `/` on port 6006, checks every 10s after 30s initial delay
- **Liveness probe**: HTTP GET to `/` on port 6006, checks every 30s after 60s initial delay

### Accessing the Application

Once deployed, you can access the Storybook by port-forwarding:

```bash
kubectl port-forward svc/design-system 6006:6006
```

Then open `http://localhost:6006` in your browser.

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start Storybook in development mode
npm run storybook

# Build Storybook for production
npm run build-storybook
```

### Building the Design System

```bash
# Build the TypeScript components
npm run build

# Lint the code
npm run lint
```

## CI/CD & Publishing

### GitHub Actions Workflows

This repository uses GitHub Actions for continuous integration and publishing:

- **CI Workflow** (`.github/workflows/ci.yml`): Runs on every push and pull request to main branch
  - Lints code with zero warnings tolerance (`--max-warnings=0`)
  - Runs unit tests with coverage enforcement (minimum 80% coverage required)
  - Builds TypeScript components
  - Builds Storybook for smoke testing
  - Runs legacy tests

- **Publish Workflow** (`.github/workflows/publish.yml`): Triggers on semantic version tags (e.g., `v1.0.0`)
  - Validates package.json version matches git tag
  - Runs full test suite and build
  - Publishes to npm registry
  - Triggers downstream project updates

### Required Secrets

To enable automatic publishing and downstream project notifications, configure these GitHub repository secrets:

| Secret | Description | Required For |
|--------|-------------|--------------|
| `NPM_TOKEN` | npm registry authentication token with publish access to `@fanno/design-system` | Publishing to npm |
| `REPO_DISPATCH_TOKEN` | GitHub personal access token with `repo` scope for triggering repository dispatch events | Downstream project notifications |

#### Setting up NPM_TOKEN:
1. Log in to [npmjs.com](https://npmjs.com)
2. Go to Account Settings → Access Tokens
3. Generate a new token with "Automation" type
4. Add the token as `NPM_TOKEN` in GitHub repository secrets

#### Setting up REPO_DISPATCH_TOKEN:
1. Generate a GitHub Personal Access Token with `repo` scope
2. Add the token as `REPO_DISPATCH_TOKEN` in GitHub repository secrets

### Publishing Process

1. Update `package.json` version following semantic versioning
2. Commit and push changes
3. Create and push a git tag matching the package.json version:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. The publish workflow will automatically validate, build, test, and publish the package