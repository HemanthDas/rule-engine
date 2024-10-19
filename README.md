# Rule Engine

A rule engine that allows users to create, evaluate, merge, and manage business rules through a RESTful API and a user-friendly React front-end interface.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Frontend Usage](#frontend-usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create rules with a specified tag.
- Retrieve rules by tag.
- Evaluate rules against sample data.
- Merge multiple rules into a single logical expression.
- Delete and update existing rules.
- User-friendly UI for managing rules.

## Getting Started

### Prerequisites

- Node.js (version)
- npm (version)
- A MySQL database

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd rule-engine
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your database:
    - Create a MySQL database.
    - Run the database migration scripts if available.

4. Configure the environment variables:
    - Create a `.env` file in the root directory and add the following content:
      ```env
      DB_HOST=localhost
      DB_USER=root
      DB_PASS=root
      DB_NAME=rule_engine
      DB_PORT=3306
      ```

5. Start the server:
    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## API Endpoints

### Rules

- **POST /rules**
  - Create a new rule.
  - Body: `{ "ruleString": "your_rule", "tag": "your_tag" }`

- **GET /rules/:tag**
  - Retrieve a rule by its tag.

- **POST /rules/evaluate**
  - Evaluate a rule against sample data.
  - Body: `{ "tag": "your_tag", "data": { "key": "value" } }`

- **POST /rules/merge**
  - Merge multiple rules.
  - Body: `{ "rules": ["tag1", "tag2"], "operator": "AND" }`

- **DELETE /rules/:tag**
  - Delete a rule by its tag.

### Error Handling

The API returns meaningful error messages in case of failures, such as:

- Rule validation errors.
- Database errors.
- Not found errors for rules.

## Frontend Usage

### Rules Component

The main component for interacting with the rule engine. It allows users to:

- Search for rules by tag.
- View rule details.
- Edit existing rules.
- Delete rules.

### CreateRule Component

A dedicated component for creating new rules, providing an input field for the rule string and tag.

## Testing

To run unit tests:

```bash
npm test

