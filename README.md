# Admin Dashboard

A modern, responsive admin dashboard built with Next.js 15 and TypeScript, featuring authentication,
product management, and a clean UI.

## 🚀 Features

- **Authentication**

  - Login with demo credentials from JSONPlaceholder API
  - Protected routes and sessions
  - Form validation with React Hook Form

- **Product Management**

  - CRUD operations for products
  - Sort by name and price
  - Search functionality
  - Detailed product view
  - Dynamic data handling

- **Responsive Design**
  - Mobile-first approach
  - Sidebar navigation with mobile support
  - Smooth animations with Framer Motion
  - Clean and modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Toast Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## 📁 Project Structure

```
src/
├── app/                   # App router pages
├── components/
│   ├── auth/             # Authentication components
│   └── dashboard/        # Dashboard components
├── context/              # React Context providers
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🔐 Authentication

The app uses JSONPlaceholder API for demo authentication:

- Use the "Demo Credentials" button to auto-fill login form
- Any user email from JSONPlaceholder will work
- Password validation is mocked for demo purposes

## 💻 Usage

1. **Login**

   - Use demo credentials or any JSONPlaceholder user email
   - Navigate through protected dashboard routes

2. **Product Management**
   - View, add, edit, and delete products
   - Sort products by name or price
   - Search products by name
   - View detailed product information

## 🎨 UI Components

- Responsive sidebar navigation
- Modal dialogs for forms
- Toast notifications for feedback
- Loading states and animations
- Form validation feedback
