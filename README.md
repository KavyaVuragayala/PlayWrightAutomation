# 🎭 Playwright Automation Framework

This repository contains a **Playwright-based UI automation framework** built using **JavaScript**. The project is designed to practice and demonstrate real-world automation testing concepts commonly used by **QA Engineers and SDETs**.

---

## 📌 Tech Stack

* Playwright
* JavaScript
* Node.js
* Git & GitHub
* GitHub Actions (CI)

---

## 📁 Project Structure

```
PlayWrightAutomation/
├── tests/
│   └── *.spec.js
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
├── .github/
│   └── workflows/
│       └── playwright.yml
└── README.md
```

---

## ✅ What This Project Covers

* UI automation using Playwright Test Runner
* Handling locators, forms, dropdowns, checkboxes, and radio buttons
* Window / tab handling
* Assertions and validations
* Headless execution for CI environments
* Debugging using Playwright Inspector

---

## ▶️ How to Run the Tests

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Install Playwright browsers

```bash
npx playwright install
```

### 3️⃣ Run all tests

```bash
npx playwright test
```

### 4️⃣ Run a single test file

```bash
npx playwright test tests/yourTestFile.spec.js
```

---

## 🐞 Debugging

```bash
npx playwright test --debug
```

or use inside test:

```js
await page.pause();
```

---

## 📊 Test Reports

After execution, an HTML report is generated.

```bash
npx playwright show-report
```

---

## ⚙️ CI/CD

This project is integrated with **GitHub Actions** to automatically run Playwright tests in **headless mode** on every push or pull request.

---

## 👩‍💻 Author

**Kavya Vuragayala**
QA / Automation Engineer

---


