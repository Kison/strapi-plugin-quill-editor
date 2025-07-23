# Contributing to Strapi Plugin Quill Editor

Thank you for considering contributing to the Strapi Plugin Quill Editor! This document outlines the guidelines for contributing to this project.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct, which is to treat all contributors with respect and foster an inclusive environment.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include screenshots if possible
- Include details about your environment (OS, browser, Strapi version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When you are creating an enhancement suggestion, please include:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- An explanation of why this enhancement would be useful to most users
- Any relevant examples or mockups

### Pull Requests

- Fill in the required template
- Follow the coding style used throughout the project
- Include appropriate tests
- Update documentation as needed
- End all files with a newline

## Development Process

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Submit a pull request

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/strapi-plugin-quill-editor.git

# Install dependencies
cd strapi-plugin-quill-editor
npm install

# Build the plugin
npm run build

# Watch for changes during development
npm run watch
```

### Testing

Before submitting a pull request, make sure to run the tests:

```bash
npm run test:ts:front
npm run test:ts:back
```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript Styleguide

All JavaScript code is linted with Prettier and should follow the project's established style.

### Documentation Styleguide

- Use Markdown for documentation
- Reference code with backticks (`)

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that are bugs
* `documentation` - Issues or PRs related to documentation
* `enhancement` - Issues that are feature requests or PRs that implement new features
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed

## Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute.
