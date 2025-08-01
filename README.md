# Design System - Docker & Kubernetes Deployment

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