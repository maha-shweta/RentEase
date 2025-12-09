# RentEase Application Workflow

This document outlines the detailed workflow and user journey within the RentEase Landlord application. It describes how different features interact and the logical flow of operations.

## 1. Onboarding & Access
### Landing Page
- **Entry Point**: Users arrive at the main landing page showcasing features and value propositions.
- **Action**: Users click "Get Started" to proceed.

### Role Selection
- **Context**: The application supports multiple personas (Landlord, Tenant).
- **Action**: User selects **"I'm a Landlord"** to enter the landlord portal.

### Authentication
- **Login**: Existing users sign in with email and password.
- **Signup**: New users create an account with Name, Email, Phone, and Password.
- **Post-Auth**: Upon successful authentication, the user is redirected to the **Dashboard**.

## 2. Core Management Workflow
The core workflow follows a hierarchical structure: **Property -> Unit -> Tenant -> Lease**.

### Step 1: Property Management
- **Navigate**: Go to the **Properties** page.
- **View**: See a list of all rental properties (houses, apartment complexes).
- **Create**: Click "Add Property" to define a new building/location.
    - *Fields*: Name, Address, Type (House/Apartment).

### Step 2: Unit Management
- **Context**: A Property consists of one or more Units (rentable spaces).
- **Action**: On a Property card, click **"Manage Units"**.
- **View**: See all units belonging to that specific property.
- **Create**: Click "Add Unit" to define a rentable space.
    - *Fields*: Unit Number (e.g., "101", "Suite B"), Rent Amount, Size (sq ft).
    - *Status*: Units track their own status (Available/Occupied).

### Step 3: Tenant Management
- **Navigate**: Go to the **Tenants** page.
- **Action**: Click "Add Tenant" to register a person.
- **Data**: Records personal information only (Name, Email, Phone).
- *Note*: Tenants are initially created as individuals, not yet linked to a property.

### Step 4: Lease Creation (The Link)
- **Navigate**: Go to the **Leases** page.
- **Context**: This is where a **Tenant** is legally bound to a **Unit**.
- **Action**: Click "Add Lease".
- **Workflow**:
    1.  Select a **Tenant**.
    2.  Select a **Unit** (which auto-selects the parent Property).
    3.  Define Terms: Start Date, End Date, Rent Amount, Deposit.
    4.  Status: The lease becomes "Active".

## 3. Financial Operations
Financials are tracked against the Lease/Unit connection.

### Payments
- **Navigate**: Go to the **Payments** page.
- **Action**: Click "Record Payment".
- **Workflow**:
    - Select the **Rental Agreement** (Lease).
    - Enter Amount, Date, and Status (Paid/Pending).
    - *Purpose*: Tracks rent collection and late fees.

### Utilities
- **Navigate**: Go to the **Utilities** page.
- **Action**: Click "Add Utility".
- **Workflow**:
    - Select the **Unit**.
    - Enter Utility Type (Water, Electric), Amount, and Bill Month.
    - Track if the bill is Paid or Unpaid by the tenant.

## 4. Communication
### Announcements
- **Navigate**: Go to the **Announcements** page.
- **Action**: Click "New Announcement".
- **Workflow**:
    - Create a broadcast message (e.g., "Water shutoff on Tuesday").
    - Can be targeted to a specific Property or sent to all tenants.
