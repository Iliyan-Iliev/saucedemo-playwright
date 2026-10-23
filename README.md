# saucedemo-playwright
An end-to-end (E2E) test automation suite built for [SauceDemo](https://www.saucedemo.com/) using **Playwright** and **JavaScript**, implementing the **Page Object Model (POM)** design pattern.

---

## Key Features & Scenarios Covered

* **Authentication:** Validates standard user login and secure logout via the side menu.
* **Product Sorting & Selection:** Sorts products by price (High/Low, Low/High) and alphabetically (A to Z) with robust validation checks.
* **Cart Management:** Adds and removes items dynamically (including identifying and removing the highest-priced item), verifies cart badges, and manages navigation states.
* **Complete Checkout Flow:** Automates the multi-step checkout process (Information, Overview, Confirmation, and post-purchase validation).
* **Configuration Best Practices:** Uses centralized `baseURL` routing and secure environment variables (`.env`) for test credentials.

---

## Project Structure

```text
saucedemo-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml       # GitHub Actions CI/CD pipeline
├── fixtures/
│   └── testData.json            # Static test data (customers, etc.)
├── pages/
│   ├── BasePage.js              # Base class with shared page utilities
│   ├── CartPage.js              # Shopping cart elements & removal methods
│   ├── CheckoutCompletePage.js  # Success message verification
│   ├── CheckoutInfoPage.js      # User shipping information form
│   ├── CheckoutOverviewPage.js  # Order summary & finalization
│   ├── LoginPage.js             # Login elements & actions
│   ├── NavigationMenuPage.js    # Hamburger side menu & logout actions
│   └── ProductsPage.js          # Inventory, sorting map, & product actions
├── tests/
│   └── e2e/
│       └── shop.spec.js         # End-to-end user journey test suite
├── .env                         # Environment variables template
├── .gitignore
├── package.json
└── playwright.config.js         # Playwright global configuration & baseURL
```
---

## Getting Started & Setup Guide

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v18 or higher recommended)

- Git

- dotenv
### Clone repository

git clone [https://github.com/Iliyan-Iliev/saucedemo-playwright](https://github.com/Iliyan-Iliev/saucedemo-playwright)
cd saucedemo-playwright

### Install Dependencies

npm ci

### Install Playwright Browsers

npx playwright install --with-deps

### Set Up Environment Variables

touch .env

Open the .env file and add your credentials:

SAUCE_USERNAME=standard_user

SAUCE_PASSWORD=secret_sauce


---

## Running Tests
- Run tests - headless mode

**npx playwright test**

- Run tests in Playwright UI mode

**npx playwright test --ui**

- Run tests in Headed mode

**npx playwright test --headed**

- Run a specific test file:

**npx playwright test tests/e2e/shop.spec.js**

- View the HTML Test Report

**npx playwright show-report**


---

## CI/CD Pipeline (GitHub Actions)

### Configuring GitHub Secrets

1. Navigate to your repository on GitHub.

2. Click Settings ➔ Secrets and variables ➔ Actions.

3. Click New repository secret and add the following two secrets:

Name: SAUCE_USERNAME | Value: standard_user

Name: SAUCE_PASSWORD | Value: secret_sauce