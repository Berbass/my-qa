# my-qa

`my-qa` is a testing framework built with TypeScript, Cucumber, and the Screenplay Pattern. It is designed to facilitate end-to-end (E2E) and integration testing for web applications, providing a structured approach to writing and managing tests.

---

## Features

- **Cucumber Integration**: Write tests in Gherkin syntax for better readability and collaboration.
- **Screenplay Pattern**: Organize test actions and tasks for reusability and maintainability.
- **Playwright**: Utilizes Playwright for browser automation, supporting multiple browsers.

---

## Project Structure

The project is organized as follows:

```
my-qa/
├── features/
│   ├── steps_definitions/       # Step definitions for Cucumber scenarios
│   ├── support/
│   │   ├── tasks/               # Tasks for integration and E2E tests
│   │   ├── World.ts             # Custom world implementation
├── cucumber.json                # Cucumber configuration
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```
---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
---

## Usage

### Running Tests

To execute tests, use the following command:

For End to End (E2E) tests,

```bash
npm run test:e2e
```

Make sure to have the Playwright browsers installed. You can do that by running:

```bash
npx playwright install
```

For Integration tests,

```bash
npm run test:integration
```

This will run all Cucumber scenarios defined in the \`features\` directory.

### Writing Tests

1. Create Gherkin scenarios in \`.feature\` files under \`features/\`.
2. Write step definitions in \`features/steps_definitions/\`.
3. Define tasks in \`features/support/tasks/\`.

### Example Scenario

```gherkin
Feature: User Login

  Scenario: Successful login
    Given John has valid login credentials
    When John enters valid login credentials
    Then John should be logged in successfully
```

---

## Reporting

Tests results are reported in the console.
There are also generated HTML and JSON reports available in the \`reports/\` directory after running tests.
