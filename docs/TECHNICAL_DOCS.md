# Technical Documentation: ISP Operations Hub

This document provides a deep dive into the technical architecture, implementation patterns, and domain logic of the ISP Operations Hub frontend.

## 1. Architectural Overview

### 1.1 Model-View-Service-Context (MVSC)
The application follows a strictly modular architecture to ensure separation of concerns:

- **Views (Pages)**: Located in `src/pages/`, these components represent the route level and manage layout assembly.
- **Components**: Reusable UI blocks in `src/components/`, built on top of [shadcn/ui](https://ui.shadcn.com/).
- **Services (API Layer)**: Located in `src/api/`, these modules handle all remote communication and I/O.
- **Contexts**: Global state (Authentication, Settings) managed in `src/contexts/`.
- **Hooks**: Data synchronization and caching logic utilizing [TanStack Query](https://tanstack.com/query).

---

## 2. API Layer (Modular)

The API layer has been refactored into domain-specific modules for better maintainability and type safety.

### 2.1 The Fetch Wrapper (`api/client.ts`)
The `apiFetch` function is a robust wrapper over the native `fetch` API:
- **Auto-Injection**: Injects `Authorization: Bearer <token>` if a session exists.
- **Content-Type Negotiation**: Automatically sets `application/json` unless `FormData` is passed (handling multipart uploads correctly).
- **Error Handling**: Standardizes backend error formats (`detail` field) into JavaScript `Error` objects.

- **Error Handling**: Standardizes backend error formats (`detail` field) into JavaScript `Error` objects.

### 2.2 Environment Configuration
The API base URL is managed via environment variables to allow for different backends in development and production.
- **Variable**: `VITE_API_BASE_URL`
- **File**: `.env` (not committed) and `.env.example` (template).
- **Usage**: `import.meta.env.VITE_API_BASE_URL`.

### 2.3 Domain Modules
- **`authApi`**: Implements three distinct login/register flows (Password, Magic Link, OTP).
- **`mpesaApi`**: A complete implementation of the M-Pesa Daraja 2.0 API including STK Push and B2C/B2B flows.
- **`financeApi`**: Handles complex budgeting logic, invoice generation, and bank integrations (NCBA).
- **`rbacApi`**: Manages granular permissions and role hierarchy analysis.

---

## 3. State Management

### 3.1 Server-Side State (TanStack Query)
We use React Query for almost all application data.
- **Caching**: Standard stale time is set to 30 seconds for real-time dashboards.
- **Invalidation**: Mutations (e.g., creating a task) trigger query invalidation to ensure UI consistency.

### 3.2 Client-Side State
- **Context API**: Used for authentication (`AuthContext`) to provide `user` and `permissions` globally.
- **Local State**: `useState` and `useReducer` are preferred for UI-specific states (form inputs, toggle states).

---

## 4. Authentication & Security

### 4.1 Permission Logic
Permissions are fetched during the initial auth boot and stored in the `AuthContext`.
- **RBAC**: Use the `hasPermission(perm)` hook to protect UI elements.
- **Wilcarding**: The system supports the `*` permission for superusers, granting access to every resource.

### 4.2 Token Persistence
Access tokens are stored in `localStorage`. 
- **Security Note**: Future iterations should move to HTTP-only cookies for enhanced XSS protection if the backend supports it.

---

## 5. Development Patterns

### 5.1 Creating a New Feature
1. **Define API**: Add necessary endpoints to a new or existing module in `src/api/`.
2. **Create Hook**: Implement a custom hook in `src/hooks/` using `useQuery` or `useMutation`.
3. **Build View**: Create the page in `src/pages/` and register the route in `App.tsx`.
4. **Guard Access**: Use `ProtectedRoute` or the `hasPermission` check to ensure security.

### 5.2 Form Handling
Use `react-hook-form` integrated with `zod` for validation.
- Schema definitions should reside at the top of the component or in a separate `types/` file for reuse.
---

## 6. Testing & Quality
- **Type Safety**: All API responses should ideally be cast to TypeScript interfaces (defined in `hooks/` or a central types file).
- **Linting**: Run `npm run lint` before committing to ensure adherence to ESLint rules.

---

## 7. Useful Commands
- `npm run dev`: Start development server.
- `npm run build`: Production build and optimization.
- `npx tsc --noEmit`: Full project type check.

---

## 8. Function Usage Examples

### 8.1 API Data Fetching (Queries)
Standard pattern for fetching data using custom hooks and the modular API layer.

```typescript
// src/hooks/use-projects.ts
export function useProjects(filters?: ProjectsFilters) {
  return useQuery<Project[]>({
    queryKey: ["projects", filters],
    queryFn: () => projectsApi.list(filters) as Promise<Project[]>,
    staleTime: 30000, // 30s cache
  });
}
```

### 8.2 Data Submission (Mutations)
Pattern for submitting data and invalidating caches to trigger UI updates.

```typescript
const mutation = useMutation({
  mutationFn: (newProject: any) => projectsApi.create(newProject),
  onSuccess: () => {
    // Invalidate and refetch projects list
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    toast.success("Project created successfully");
  },
});
```

### 8.3 File Uploads
Using `apiFetch` with `FormData`. The wrapper automatically handles the boundary and removes the default `application/json` header.

```typescript
const uploadBudget = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await financeApi.uploadBudget(formData);
};
```

---

## 9. Backend API Orchestration

The frontend frequently combines multiple specialized backend APIs to populate comprehensive views.

### 9.1 Dashboard Synchronization
The main dashboard orchestrates data from five distinct backend modules:
- **`dashboardApi`**: Core metrics (projects overview, task allocation).
- **`inventoryApi`**: Real-time stock alerts.
- **`techniciansApi`**: Performance leaderboard.
- **`financeApi`**: High-level financial snapshots.
- **`tasksApi`**: Personal user assignments.

### 9.2 Financial Reconciliation Workflow
This complex flow utilizes combinations of:
- **`mpesaApi.listTransactions`**: Fetching Daraja records.
- **`financeApi.getFinancialAccounts`**: Fetching internal ledger state.
- **`financeApi.reconcile`**: Synchronizing external and internal states via a POST request.

---

## 10. Advanced Techniques & Combinations

### 10.1 Token Refresh Strategy
To maintain session persistence without frequent logouts, the `AuthContext` implements a fallback cycle:
1. `apiFetch` detects a `401 Unauthorized`.
2. The context calls `authApi.refresh()`.
3. If successful, it updates the `accessToken` and retries the original request (planned improvement).

### 10.2 Combined RBAC & Feature Flags
Technique used to dynamically render the UI based on user capabilities:
```typescript
{hasPermission("finance:read") && (
  <FinanceDashboard summary={financeSnapshot.data} />
)}
```

### 10.3 Dynamic Scraper Integration
The `inventoryApi.searchProducts` combines local database results with real-time web scraping:
- **Technique**: Passes `use_scrapers=true` query param.
- **Backend Combination**: The backend triggers asynchronous scraper tasks while returning cached local results immediately.

---

## 11. Areas for Improvement (Roadmap)

### 11.1 Enhanced Type Safety
- **Issue**: Many API responses currently use `any` or require manual casting in hooks.
- **Goal**: Implement shared DTO (Data Transfer Object) interfaces across all API modules to ensure end-to-end type safety.

### 11.2 Robust Error Handling
- **Issue**: Errors are currently propagated as simple `Error` objects.
- **Goal**: Implement a custom `ApiError` class that captures status codes, validation errors, and request IDs for better debugging and user feedback.

### 11.3 Optimistic Updates
- **Issue**: UI reflects changes only after the server responds.
- **Goal**: Implement optimistic updates for lightweight actions (task status toggles, priority changes) to make the UI feel instantaneous.

### 11.4 Response Interceptors
- **Issue**: Token refresh and error logging are handled ad-hoc in some areas.
- **Goal**: Centralize response interceptors within `api/client.ts` to handle global events like `403 Forbidden` or `503 Service Unavailable` globally.
