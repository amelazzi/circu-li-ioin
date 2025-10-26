# 🍳 Circu Li-ion Assessment — Recipe Creation Application

## 📘 Overview

This project is part of the **Circu Li-ion Developer Assessment**.  
It implements a **Recipe Creation Application** that allows users to manage recipes and steps interactively.  
Each recipe can include multiple steps, images, and parameters, with support for **dark/light themes**, **localization**, and **persistent storage**.

---

## 🚀 Features

- 🧩 **Recipe Management** — Create, edit, export, and import recipes
- ⚙️ **Step Management** — Add, reorder, and delete steps
- 🌗 **Theming** — Supports light and dark mode, auto-detected from system preferences
- 🌍 **Localization** — i18n setup ready for multiple languages (currently English only)
- 💾 **Persistence** — Data stored in `localStorage`
- 🔔 **Alerts System** — Displays success/error messages for user feedback
- 🧱 **Modular Architecture** — Clean, scalable, and maintainable code structure

---

## 🏗️ Project Structure

```
├── public
│   └── vite.svg
├── src
│   ├── constants
│   │   └── enums.ts
│   ├── i18n
│   │   ├── en.json
│   │   └── i18n.ts
│   ├── interfaces
│   │   ├── alert.ts
│   │   ├── coordinates.ts
│   │   ├── index.ts
│   │   ├── recipe.ts
│   │   └── step.ts
│   ├── modules
│   │   ├── alert
│   │   │   ├── components
│   │   │   │   ├── AlertItem.tsx
│   │   │   │   └── AlertList.tsx
│   │   │   ├── AlertContext.tsx
│   │   │   ├── alertReducer.ts
│   │   │   └── useAlert.ts
│   │   ├── recipe
│   │   │   ├── components
│   │   │   │   ├── RecipeItem.css
│   │   │   │   ├── RecipeItem.tsx
│   │   │   │   ├── RecipeList.css
│   │   │   │   ├── RecipeList.tsx
│   │   │   │   ├── RecipeModal.tsx
│   │   │   │   ├── StepItem.css
│   │   │   │   ├── StepItem.tsx
│   │   │   │   ├── StepList.tsx
│   │   │   │   └── StepModal.tsx
│   │   │   ├── RecipesContext.tsx
│   │   │   ├── useRecipes.ts
│   │   │   └── validation.ts
│   │   └── step
│   │       ├── components
│   │       │   └── CoordsInput.tsx
│   │       └── validation.ts
│   ├── pages
│   │   ├── HomePage.css
│   │   └── HomePage.tsx
│   ├── shared
│   │   ├── components
│   │   │   ├── Header.css
│   │   │   ├── Header.tsx
│   │   │   ├── Modal.css
│   │   │   ├── Modal.tsx
│   │   │   ├── ToggleSwitch.css
│   │   │   └── ToggleSwitch.tsx
│   │   └── hooks
│   │       ├── useLocalStorage.ts
│   │       └── useTheme.ts
│   ├── styles
│   │   ├── colors.css
│   │   └── global.css
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## ⚙️ Setup & Installation

### 1️⃣ Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## 💡 Theme & Localization

### 🌓 Theming

- The theme automatically detects the **system preference** (light or dark) on the first visit.
- The user’s choice is stored in `localStorage`.
- The theme is applied globally using a `data-theme` attribute on the `<html>` element.

### 🌐 Localization

- Built with **i18next**.
- Default language: **English**.
- To add a new language, create a new JSON file under `src/i18n/` and update `i18n.ts`.

---

## 🧠 Architecture Notes

The project follows a **modular architecture** that separates concerns by domain.

Each module can contain:

- **Components** (UI logic)
- **Context** (state management)
- **Hooks** (shared logic)
- **Utils**

This approach ensures scalability, clarity, and maintainability.

---

## 🧩 Generic API Design (Assessment Question)

**Question:**  
The Recipe Creation Application is designed to work with two different robots, each exposing a different API.  
How would you design a generic code structure that allows communication with both using the same set of commands?

**Answer:**  
Use the **Adapter Pattern** to abstract the differences between APIs.  
Define a shared interface that represents the generic robot operations, and then implement specific adapters for each API.

```ts
interface IRobotAPI {
  createStep(step: Step): Promise<void>;
  runRecipe(recipe: Recipe): Promise<void>;
}

class CompanyARobotAdapter implements IRobotAPI {
  async createStep(step: Step) {
    /* call Company A API */
  }
  async runRecipe(recipe: Recipe) {
    /* call Company A API */
  }
}

class CompanyBRobotAdapter implements IRobotAPI {
  async createStep(step: Step) {
    /* call Company B API */
  }
  async runRecipe(recipe: Recipe) {
    /* call Company B API */
  }
}
```
