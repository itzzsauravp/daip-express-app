This `README.md` is crafted to be a comprehensive guide for anyone (including your future self) looking to understand the "Why" and "How" of modern software architecture.

---

# ️ Modular Architecture: A Learning Project

Welcome! This repository is a pedagogical playground designed to explore and implement **Clean Architecture**, **Domain-Driven Design (DDD)**, and the **DAIP** (Domain, Application, Infrastructure, Presentation) structural pattern.

The goal of this project isn't just to "make it work," but to build a system that is **testable**, **maintainable**, and **independent** of external frameworks or databases.

---

## The Philosophy: Domain-Driven Design (DDD)

At its core, DDD is about **focusing on the business problem** before the technology.

- **Bounded Contexts:** Instead of one giant app, we split logic into modules (like `Identity` and `Wallet-Management`). Each "box" has its own language and rules.
- **Separation of Concerns:** We draw hard lines between our business logic and our tools (like Express or Prisma). This ensures that if we change our database, our business rules don't break.

---

## The Architecture: DAIP & Clean Patterns

This project synthesizes **Clean Architecture**, **Hexagonal**, and **Onion Architecture**. While they have different names, they all follow the **Dependency Rule**: _Dependencies only point inwards._

### What is DAIP?

DAIP is our naming convention for the layers within each module:

1. **Domain (D):** The "Heart." Contains Entities and Value Objects. No dependencies.
2. **Application (A):** The "Brain." Contains Use Cases (Services) and Ports (Interfaces).
3. **Infrastructure (I):** The "Tools." Contains Repositories, Mappers, and external adapters (Prisma).
4. **Presentation (P):** The "Face." Contains API Routes and Controllers.

---

## Folder Structure Breakdown

### 1. `src/modules` (Feature Modules)

Let's look at the `wallet-management` module as our example:

- **`domain/entities/`**: Contains the `Wallet.ts`. This is where "Money Rules" live (e.g., _A wallet cannot have a negative balance_).
- **`domain/value-objects/`**: Contains objects like `Balance.ts`. We use these to handle `Decimal` math safely, keeping Prisma's logic out of our Entity.
- **`app/services/`**: The `WalletService.ts`. It orchestrates the flow: _Get Wallet from Repo -> Perform Business Logic -> Save back to Repo._
- **`infra/repos/`**: The `WalletRepo.ts`. It speaks to Prisma.
- **`infra/repos/wallet.mapper.ts`**: **The Bridge.** This file is crucial. It converts Prisma's raw data into our `Wallet` entity and vice-versa.
- **`api/`**: Express controllers and routes. This is the only place that knows we are using an HTTP server.

### 2. `src/shared` (Cross-Cutting Concerns)

This is where global "helpers" live that aren't specific to one module:

- **`api/middlewares/`**: Global auth or error handlers.
- **`infra/lib/`**: The Prisma client instance.
- **`domain/errors/`**: Custom error classes that our services throw.

---

## ️ Smart Implementation Tweaks

While following DAIP, I’ve added a few "Pro" patterns to keep the project clean:

- **The Barrel Pattern (`index.ts`):** Every module has an `index.ts` at its root. This acts as a **Facade**. The rest of the app only imports from this index, keeping the module's internal folders private and "black-boxed."
- **The Mapper Logic:** By using a `toDomain` and `toPersistence` mapper, we ensure that if we change a column name in Postgres, we only change it in **one** file (the mapper), and the rest of the app continues to work perfectly.
- **Dependency Inversion:** Our services don't depend on the `WalletRepo` class; they depend on an **Interface**. This makes testing a breeze.

---

## Getting Started

### 1. Prerequisites

- **Node.js** (v18+)
- **PostgreSQL** (running locally or via Docker)

### 2. Installation

```bash
# Clone the repo
git clone https://github.com/itzzsauravp/daip-express-app.git && cd daip-express-app

# Install dependencies
npm install

# Setup environment variables
cp .env.dev.example .env.dev
```

### 3. Database Setup

```bash
# Run migrations to create tables
npx prisma migrate dev

# (Optional) Open Prisma Studio to see your data
npx prisma studio

# Generate types for Prisma
npx prisma generate

```

### 4. Running the App

```bash
# Development mode
npm run dev

# The API will be available at http://localhost:3000/api/v1

```

---

## How to Learn from this Repo

1. **Start at `src/api/v1/routes.ts**`: See how the modules are plugged in.
2. **Follow a Route**: Pick a route (like `/auth/login`) and follow it into the `Controller` -> `Service` -> `Entity`.
3. **Check the Mapper**: Look at how `infra/repos/wallet.mapper.ts` transforms data. It’s the "Secret Ingredient" that keeps the architecture clean.
4. **Try to Break it**: Try changing a database field name and see how few files you actually need to touch to fix it!

---

> **Note:** This project is still a work in progress. While it demonstrates the DAIP and clean architecture patterns, it requires further refinement and improvements to reach a more robust and production-ready structure.

---
