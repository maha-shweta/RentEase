# RentEase Landlord Frontend

RentEase is a modern property management platform designed to streamline operations for landlords. This application provides a comprehensive interface for managing properties, tenants, leases, and financial records.

## Features

- **Property Management**: Track properties and individual units (apartments, houses).
- **Tenant Management**: Maintain tenant records and contact information.
- **Lease Tracking**: Create and manage rental agreements, linking tenants to specific units.
- **Financials**: Record rent payments, track statuses (Paid, Overdue), and manage utility bills.
- **Announcements**: Broadcast messages to tenants regarding maintenance or updates.
- **Analytics**: Visualize revenue trends and occupancy rates.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Routing**: TanStack Router
- **State/Data**: TanStack Query
- **Forms**: React Hook Form, Zod

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd RentEase-Landlord-Frontend-Samonwita
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

## Project Structure

- `src/components`: Reusable UI components and feature-specific components.
- `src/pages`: Application pages (Dashboard, Properties, Tenants, etc.).
- `src/schemas`: Zod schemas for form validation (aligned with backend SQL).
- `src/router.tsx`: Route definitions using TanStack Router.

## Workflow

For a detailed overview of the user journey and application workflow, please refer to [application_workflow.md](application_workflow.md).
