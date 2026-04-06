# Incubyte Salary Management Kata

A production-ready REST API for employee salary management, built with Node.js, TypeScript, Express, and SQLite. Developed following strict Test-Driven Development (TDD) practices.

---

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** SQLite (better-sqlite3)
- **Testing:** Jest + Supertest

---

## Project Structure

---

## Setup & Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/incubyte-salary-kata
cd incubyte-salary-kata

# Install dependencies
npm install

# Run the server
npm start

# Run tests
npm test
```

---

## API Endpoints

### Employee CRUD

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| POST   | /employees     | Create an employee |
| GET    | /employees     | Get all employees  |
| GET    | /employees/:id | Get employee by ID |
| PUT    | /employees/:id | Update employee    |
| DELETE | /employees/:id | Delete employee    |

**Employee fields:**

```json
{
  "fullName": "John Doe",
  "jobTitle": "Engineer",
  "country": "India",
  "salary": 100000
}
```

---

### Salary Calculation

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | /employees/:id/salary | Calculate net salary |

**Response:**

```json
{
  "grossSalary": 100000,
  "deduction": 10000,
  "netSalary": 90000
}
```

**Deduction Rules:**
| Country | TDS Rate |
|---------|----------|
| India | 10% |
| United States | 12% |
| Others | 0% |

---

### Salary Metrics

| Method | Endpoint                          | Description                     |
| ------ | --------------------------------- | ------------------------------- |
| GET    | /salary/metrics?country=India     | Min, max, avg salary by country |
| GET    | /salary/metrics?jobTitle=Engineer | Average salary by job title     |

**Response (country):**

```json
{
  "country": "India",
  "min": 80000,
  "max": 150000,
  "average": 116666.67
}
```

**Response (jobTitle):**

```json
{
  "jobTitle": "Engineer",
  "average": 133333.33
}
```

---

## TDD Approach

This project was built following a strict Red → Green → Refactor cycle:

- **Red** — wrote a failing test first
- **Green** — wrote minimal code to make the test pass
- **Refactor** — cleaned up code without breaking tests

Each step is reflected in the commit history.

---

## Implementation Details

### AI Tools Used

| Tool               | Usage                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------- |
| Claude (Anthropic) | Scaffolded boilerplate, generated test cases, reviewed type safety, suggested refactors |

**How AI was used:**

- Generated initial project structure and config files (tsconfig, jest.config)
- Suggested test cases for edge cases (404s, missing fields, invalid queries)
- Flagged `as any` usage and recommended proper TypeScript interfaces
- Helped draft README structure and API documentation

**Where human judgment was applied:**

- TDD commit order and discipline — every commit was intentional
- Architecture decisions — repository pattern, merging duplicate routes
- Type definitions — Employee interface designed manually
- Deduction rules extracted into a separate utility for single responsibility

---

## Commit History Strategy

Commits follow this pattern:

- `chore:` — setup and config
- `test:` — failing test added (RED)
- `feat:` — implementation to pass test (GREEN)
- `refactor:` — cleanup without changing behaviour
- `docs:` — documentation
