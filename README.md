# Stockly 📦

Stockly is a modern, full-stack inventory management web application built for seamless stock tracking, product management, and real-time alerts.

## 🚀 Tech Stack

### Frontend & Framework
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide Icons" />
</div>

### Backend, Database & Auth
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma ORM" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=black" alt="NeonDB" />
  <img src="https://img.shields.io/badge/Better_Auth-F15025?style=for-the-badge&logo=auth0&logoColor=white" alt="Better Auth" />
  <img src="https://img.shields.io/badge/React_Toastify-FF6F61?style=for-the-badge&logo=react&logoColor=white" alt="React Toastify" />
</div>

## ✨ Features

* Product Management: Add, update, and delete inventory items with pricing, quantity, SKU tracking, and low-stock thresholds.
* Server-Side Operations: Powered by Next.js Server Actions and Prisma ORM for high performance and data security.
* Smart Error Handling: Gracefully handles duplicate SKUs (Prisma P2002) and validation errors without losing form state or triggering page refreshes.
* Interactive UI & Notifications: Integrated with react-toastify using a reusable toast component for instant success and error feedback.
* Search & Pagination: Efficiently search products and navigate large inventories with built-in server-side pagination.
* Secure Authentication: User-specific data isolation and authentication flows using Better Auth.

## 🛠️ Prerequisites

* Node.js (LTS version recommended)
* PostgreSQL database instance (e.g., NeonDB)

## 📦 Installation & Setup

1. Clone the repository:
   git clone https://github.com/bayramovmurad/Stockly-inventoryApp.git
   cd Stockly-inventoryApp

2. Install dependencies:
   npm install

3. Configure Environment Variables:
   Create a .env file in the root directory and add your credentials:
   DATABASE_URL=your_postgresql_connection_string
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL="http://localhost:3000"

4. Run database migrations & start the app:
   npx prisma migrate dev
   npm run dev

## ☁️ Deployment

This project is configured for deployment on Vercel with optimized production builds and automated server actions.
