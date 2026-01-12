# ISP Operations Hub ERP

A modern, high-performance Enterprise Resource Planning (ERP) system designed for ISP operations, featuring real-time infrastructure management, financial tracking, and automated workflows.

## 🚀 Getting Started

### Prerequisites
- Node.js & npm (Latest LTS recommended)
- Access to the ERP Backend API (Default: `https://erp.gygaview.co.ke`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd remix-of-remix-of-isp-operations-hub-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Architecture

### Tech Stack
- **Framework**: [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [React Query](https://tanstack.com/query) (TanStack Query)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Project Structure
```text
src/
├── api/             # Domain-driven modular API client
│   ├── client.ts    # Base fetch wrapper & token management
│   ├── auth.ts      # Authentication & OTP flows
│   ├── projects.ts  # Project lifecycle management
│   ├── tasks.ts     # Task & assignment logic
│   ├── finance.ts   # General finance & budgeting
│   ├── mpesa.ts     # M-Pesa integration (STK Push, B2C, etc.)
│   └── ...          # Domain specific services
├── components/      # UI components & shared layouts
├── contexts/        # React Contexts (Auth, etc.)
├── hooks/           # Custom React Query hooks
├── lib/             # Utility functions & API entry points
└── pages/           # Application views (Dashboard, Finance, etc.)
```

## 🔌 API Documentation

The frontend uses a modular API layer located in `src/api/`. For backward compatibility, `src/lib/api.ts` provides a centralized entry point.

### Key Modules:
- **`authApi`**: Handles login, registration, OTP verification, and passwordless authentication.
- **`mpesaApi`**: Full integration for STK Push, C2B simulation, B2B/B2C payments, and transaction reconciliation.
- **`financeApi`**: Manages budgets, invoices, NCBA bank payments, and infrastructure analytics.
- **`rbacApi`**: Permission checking and role-based access control.
- **`workflowApi`**: Manages automated business processes and approval chains.

## 🔐 Authentication Flow

The application supports three login flows:
1. **Password-based**: Standard email and password login.
2. **Passwordless**: Login via email-based magic links.
3. **OTP Registration**: 2-step registration with email/phone OTP verification.

Tokens are persisted in `localStorage` and automatically included in all `apiFetch` calls via the `Authorization: Bearer <token>` header.

## 🛠️ Development

### Custom Hooks
Use the hooks in `src/hooks/` for data fetching to benefit from caching and synchronization provided by TanStack Query.
- `useProjects()`: Fetch and filter infrastructure projects.
- `useDashboard()`: Retrieve real-time performance metrics and workloads.

### Deployment
The project is configured for easy deployment via Vite. Ensure `API_BASE_URL` in `src/api/client.ts` is correctly pointed to your production backend.

## 📄 License
TBA
