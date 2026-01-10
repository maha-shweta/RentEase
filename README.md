# 🏠 RentEase - Landlord Management Dashboard

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

RentEase is a sophisticated, full-featured property management platform designed for modern landlords. It streamlines every aspect of property management, from tracking units and tenants to managing complex lease agreements and financial performance.

## ✨ Key Features

- **📊 Comprehensive Dashboard**: Real-time insights into revenue, occupancy rates, and pending tasks.
- **🏗️ Property & Unit Management**: Organize your portfolio with detailed property profiles and individual unit tracking.
- **👥 Tenant CRM**: Maintain detailed tenant records, payment history, and contact information.
- **📜 Lease Engine**: Create and manage customizable rental agreements with automated due date tracking.
- **💰 Financial Suite**: Record rent payments, track overdue bills, and generate professional PDF receipts.
- **🛠️ Utility Management**: Individual tracking for electricity, water, and other utility expenses.
- **📢 Resident Announcements**: Integrated communication system for broadcasting updates to all residents.
- **📈 Advanced Analytics**: Visual revenue trends and occupancy analytics using interactive charts.

## 🚀 Technology Stack

- **Core**: React 18, TypeScript, Vite
- **UI Architecture**: Tailwind CSS, Shadcn/UI, Lucide Icons
- **Routing**: TanStack Router (Type-safe routing)
- **State Management**: TanStack Query (Server state), Zustand (Global UI state)
- **Form Handling**: React Hook Form, Zod validation
- **PDF Generation**: JSPDF, AutoTable

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/maha-shweta/Rent_Ease.git
   cd Rent_Ease
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory (refer to `.env.example` if available) and configure your API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

### Running Locally

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at [http://localhost:8080](http://localhost:8080).

## 📁 Project Architecture

```text
src/
├── components/     # Atomic UI components and feature-specific blocks
├── hooks/          # Custom React hooks for logic reuse
├── lib/            # Utility functions and API configurations
├── pages/          # Full-page compositions and route entry points
├── services/       # API service layers
├── styles/         # Global styles and Tailwind configurations
└── types/          # Shared TypeScript interfaces and types
```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

_Developed with ❤️ as part of the RentEase Suite._
