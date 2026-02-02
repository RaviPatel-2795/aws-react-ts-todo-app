# AWS React TS ToDo App

## Project Summary

This repository is a simple full-stack CRUD “ToDo” playground built to learn how a React + TypeScript frontend can call an AWS-backed API.

- The **frontend** is a **Vite + React + TypeScript** app (with Tailwind UI components) that lists tasks, creates new tasks, and deletes existing tasks.
- The **backend** is an **AWS Lambda** function (`backend/lambda_function_ravi.py`) that implements a small HTTP API (GET/PUT/DELETE) backed by **Amazon DynamoDB**.
- The frontend calls an **AWS API Gateway** endpoint (using axios) which routes requests to the Lambda function.

At a high level:

- **GET `/items`**: Fetch all tasks from DynamoDB.
- **PUT `/items`**: Create/overwrite a task (expects JSON with `id` and `task`).
- **DELETE `/items/{id}`**: Delete a task by id.

## Architecture Diagram (ASCII)

```text
+---------------------------+        HTTPS         +------------------------------+
|  Browser (User)           |  ----------------->  |  API Gateway (HTTP API)      |
|  React + TS (Vite)        |                      |  Routes:                     |
|                           |                      |   - GET  /items              |
|  - List tasks             |                      |   - PUT  /items              |
|  - Add task               |                      |   - DELETE /items/{id}       |
|  - Delete task            |                      +---------------+--------------+
+-------------+-------------+                                      |
              |                                                    | Lambda invoke
              |                                                    v
              |                                     +--------------+--------------+
              |                                     | AWS Lambda (Python)         |
              |                                     | backend/lambda_function_... |
              |                                     |  - routeKey switch          |
              |                                     |  - uses boto3 DynamoDB      |
              |                                     +--------------+--------------+
              |                                                    |
              |                                                    | Read/Write
              v                                                    v
      (UI updates state)                              +-------------+-------------+
                                                      | Amazon DynamoDB           |
                                                      | Table: crud-tutorial-items|
                                                      | Items: { id, task }       |
                                                      +---------------------------+
```