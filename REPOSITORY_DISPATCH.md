# Repository Dispatch Integration

This design system automatically triggers downstream projects when new versions are published using GitHub's repository dispatch events.

## How It Works

When a new version tag (e.g., `v1.2.3`) is pushed to the repository:

1. **Publish Workflow Triggers**: The `.github/workflows/publish.yml` workflow runs
2. **Package Published**: Design system is published to npm
3. **Repository Dispatch Sent**: Downstream projects are automatically notified

## Payload Structure

The repository dispatch event includes comprehensive information:

```json
{
  "version": "1.2.3",
  "package": "@fanno/design-system", 
  "tag": "refs/tags/v1.2.3",
  "sha": "abc123...",
  "repository": "fanoo2/design-system"
}
```

## Setting Up Downstream Projects

### 1. Create Repository Dispatch Workflow

In your downstream project, create `.github/workflows/design-system-update.yml`:

```yaml
name: Update Design System

on:
  repository_dispatch:
    types: [design-system-updated]

jobs:
  update-design-system:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Update design system
        run: |
          npm install @fanno/design-system@${{ github.event.client_payload.version }}
          npm test
          
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: "Update design system to v${{ github.event.client_payload.version }}"
          title: "🎨 Update design system to v${{ github.event.client_payload.version }}"
          body: |
            Automated update of design system to version ${{ github.event.client_payload.version }}
            
            **Changes:**
            - Updated @fanno/design-system to v${{ github.event.client_payload.version }}
            - Repository: ${{ github.event.client_payload.repository }}
            - Commit: ${{ github.event.client_payload.sha }}
```

### 2. Configure Repository Access

The design system repository needs a `REPO_DISPATCH_TOKEN` secret with permissions to dispatch events to downstream repositories.

#### Creating the Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Create a token with `repo` scope (or `public_repo` for public repositories)
3. Add the token as `REPO_DISPATCH_TOKEN` secret in the design system repository

### 3. Update Downstream Repository Reference

In the publish workflow, update the `repository` field to point to your actual downstream project:

```yaml
- name: Trigger downstream projects
  uses: peter-evans/repository-dispatch@v2
  with:
    token: ${{ secrets.REPO_DISPATCH_TOKEN }}
    repository: your-org/your-downstream-project  # Update this
    event-type: design-system-updated
```

## Multiple Downstream Projects

To trigger multiple projects, duplicate the repository dispatch step:

```yaml
- name: Trigger Project A
  uses: peter-evans/repository-dispatch@v2
  with:
    token: ${{ secrets.REPO_DISPATCH_TOKEN }}
    repository: your-org/project-a
    event-type: design-system-updated
    client-payload: |
      {
        "version": "${{ steps.get_version.outputs.VERSION }}",
        "package": "@fanno/design-system",
        "tag": "${{ github.ref }}",
        "sha": "${{ github.sha }}",
        "repository": "${{ github.repository }}"
      }

- name: Trigger Project B  
  uses: peter-evans/repository-dispatch@v2
  with:
    token: ${{ secrets.REPO_DISPATCH_TOKEN }}
    repository: your-org/project-b
    event-type: design-system-updated
    client-payload: |
      {
        "version": "${{ steps.get_version.outputs.VERSION }}",
        "package": "@fanno/design-system",
        "tag": "${{ github.ref }}",
        "sha": "${{ github.sha }}",
        "repository": "${{ github.repository }}"
      }
```

## Event Types

The current setup uses `design-system-updated` as the event type. You can customize this or use different event types for different purposes:

- `design-system-updated`: General updates
- `design-system-major-update`: Breaking changes requiring manual review
- `design-system-hotfix`: Critical fixes that should be applied immediately

## Testing Repository Dispatch

To test the repository dispatch without publishing:

1. Create a test workflow that triggers on workflow_dispatch
2. Add the repository dispatch step to test the integration
3. Verify downstream projects receive and handle the event correctly

## Security Considerations

- Repository dispatch tokens should have minimal required permissions
- Consider using separate tokens for different downstream projects
- Regularly rotate access tokens
- Monitor dispatch events for unexpected activity