# Rule Engine

# Rule Engine with AST

This repository contains the implementation of a Rule Engine that determines user eligibility based on attributes such as age, department, income, and experience. The system utilizes an Abstract Syntax Tree (AST) to represent conditional rules, allowing for dynamic creation, combination, and modification of rules.

## Table of Contents

- [Objective](#objective)
- [Features](#features)
- [Data Structure](#data-structure)
- [Database Schema](#database-schema)
- [API Design](#api-design)
- [Frontend Usage](#frontend-usage)
- [Test Cases](#test-cases)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Objective

Develop a simple 3-tier rule engine application consisting of:

1. A user interface (UI) for rule management.
2. An API for interacting with the rules.
3. A backend for storing and processing the rules.

## Features

- Create rules with a specified tag.
- Retrieve rules by tag.
- Evaluate rules against sample data.
- Merge multiple rules into a single logical expression.
- Delete and update existing rules.
- User-friendly UI for managing rules.

## Data Structure

The following data structure is used to represent the AST:

```typescript
class Node {
  type: string; // "operator" or "operand"
  left: Node | null; // Reference to left child node
  right: Node | null; // Reference to right child node (for operators)
  value?: number | string; // Optional value for operand nodes
}
```

### Example of AST Representation

- For the rule:  
  `((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)`

  The AST will be structured accordingly with nodes representing each condition and operator.

## Database Schema

The application uses a relational database (e.g., MySQL) to store the rules and metadata. The following schema is defined:

### Rules Table

| Column Name | Data Type | Description                           |
| ----------- | --------- | ------------------------------------- |
| id          | INT       | Primary key                           |
| rule_string | TEXT      | The string representation of the rule |
| created_at  | TIMESTAMP | The time the rule was created         |
| updated_at  | TIMESTAMP | The time the rule was last updated    |

### Sample Data

```sql
INSERT INTO rules (rule_string, created_at, updated_at) VALUES
('((age > 30 AND department = ''Sales'') OR (age < 25 AND department = ''Marketing'')) AND (salary > 50000 OR experience > 5)', NOW(), NOW());
```

## API Design

### Endpoints

1. **POST /create_rule**

   - **Description**: Creates a new rule and returns its AST representation.
   - **Body**: `{ "rule_string": "your_rule" }`
   - **Response**: Returns the root node of the AST.

2. **POST /combine_rules**

   - **Description**: Combines multiple rules into a single AST.
   - **Body**: `{ "rules": ["rule1", "rule2"] }`
   - **Response**: Returns the root node of the combined AST.

3. **POST /evaluate_rule**
   - **Description**: Evaluates the combined rule's AST against provided user attributes.
   - **Body**: `{ "data": { "age": 35, "department": "Sales", "salary": 60000, "experience": 3 } }`
   - **Response**: Returns `true` or `false` based on eligibility.

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

## Test Cases

### Functionality Tests

1. **create_rule**: Create individual rules and verify their AST representation.
2. **combine_rules**: Combine example rules and verify the combined AST logic.
3. **evaluate_rule**: Test against various scenarios with sample JSON data.

### Error Handling

Implement error handling for:

- Invalid rule strings.
- Invalid data formats.

## Installation

### Prerequisites

- Node.js (version)
- npm (version)
- MySQL (or any chosen database)

### Steps to Set Up

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd rule-engine
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your database:

   - Set up a MySQL database.
   - Create a `.env` file and configure your database connection details:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=root
   DB_NAME=rule_engine
   DB_PORT=3306
   ```

4. Start the application:

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. **Creating a Rule**: Use the `/create_rule` endpoint to submit a rule string.
2. **Combining Rules**: Use the `/combine_rules` endpoint to merge multiple rules.
3. **Evaluating Rules**: Use the `/evaluate_rule` endpoint to check user eligibility.

## Contributing

Contributions are welcome! Please submit an issue or pull request for any suggestions or improvements.
