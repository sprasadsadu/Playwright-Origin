# originTest
Origin Screening Test
# Origin Energy Plan Flow - Playwright Automation

This repository contains Playwright end-to-end tests for verifying Origin Energy gas plan pricing details. The tests automate address selection, plan verification, and PDF download & validation.

## Features

- Navigate to Origin Energy pricing page.
- Search and select addresses from test data.
- Verify visibility of energy plans.
- Uncheck electricity plans to filter gas-only plans.
- Open plan details in a new tab.
- Download and parse plan PDF to assert it contains the word **"Gas"**.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Docker](https://www.docker.com/) (optional, for running tests inside container)
- [Playwright](https://playwright.dev/) (installed via npm)

---

## Setup

1. Clone the repo:
   git clone https://github.com/sprasadsadu/originTest

2. Install dependencies
   npm install

3. Install Playwright browsers
    npx playwright install

4. Running Tests Locally
   npx playwright test

| Step               | Command                                                             |
| ------------------ | ------------------------------------------------------------------- |
| Install plugin     | `npm i -D allure-playwright`                                        |
| Update reporter    | add `['allure-playwright']` to `reporter` in `playwright.config.ts` |
| Run tests          | `npx playwright test`                                               |
| Install Allure CLI | `npm i -g allure-commandline`                                       |
| Generate report    | `allure generate allure-results --clean -o allure-report`           |
| View report        | `allure open allure-report`                                         |


##Running Tests Inside Docker

The project includes a Dockerfile and docker-compose.yml for containerized execution.

Build and run container:
docker-compose up --build

Or run directly:
docker build -t origin-playwright .
docker run --rm -v "C:\Users\Sadhu\playwright-Origin:/app" playwright-origin /*headless mode*/
docker run --rm -v "${PWD}:/app" playwright-origin npx playwright test tests/originWebFlow.spec.ts --headed

