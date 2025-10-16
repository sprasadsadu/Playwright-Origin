This repository contains Playwright end-to-end tests for verifying gas plan pricing details on the Origin Energy website.

Features

Navigate to the Origin Energy pricing page.

Select addresses and verify gas-only plans.

Download and validate PDFs to ensure they contain the word "Gas".

Prerequisites

Node.js
 (v16+ recommended)

Docker
 (optional)

Playwright
 (install via npm)

 Setup

Clone the repo:

git clone https://github.com/sprasadsadu/originTest


Install dependencies:

npm install


Install Playwright browsers:

npx playwright install


Run tests locally:

npx playwright test

Reporting (Optional)

Install Allure Playwright plugin:

npm install --save-dev allure-playwright


Update the reporter in playwright.config.ts:

Add ['allure-playwright'] to reporter.

Install Allure CLI:

npm install -g allure-commandline


Generate and view the report:

allure generate allure-results --clean -o allure-report
allure open allure-report

Running Tests with Docker

To run the tests in a Docker container:

Build and run the container:

docker-compose up --build


Or run directly:

docker build -t origin-playwright .
docker run --rm -v "${PWD}:/app" origin-playwright npx playwright test


For headless mode:

docker run --rm -v "${PWD}:/app" origin-playwright npx playwright test --headless