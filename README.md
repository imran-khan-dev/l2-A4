# 📚 Minimal Library Management System – Frontend

A minimalist, fully functional Library Management System frontend built using **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**. This application enables users to view books, perform full CRUD operations, borrow books, and see a borrow summary—all without authentication.

---

## Live Site

🔗 [Live Frontend App](https://your-frontend-deployment-link.com)

🌐 [Live Backend API](https://your-backend-api-link.com)

---

## 🧩 Features

### Book Management

- List all books in a responsive table
- Add a new book
- Edit existing book details
- Delete a book with confirmation
- Borrow a book with quantity and due date

### Borrowing Functionality

- Prevents borrowing more copies than available
- Automatically marks book as unavailable when out of stock

### Borrow Summary

- Aggregated summary of borrowed books
- Displays book title, ISBN, and total borrowed quantity

### Navigation

- Navbar with links to: All Books, Add Book, Borrow Summary

---

## Technologies Used

| Layer            | Technology                                |
| ---------------- | ----------------------------------------- |
| Frontend         | React, TypeScript                         |
| State Management | Redux Toolkit + RTK Query                 |
| Styling          | Tailwind CSS                              |
| Backend API      | Node.js, Express.js, MongoDB (via Render) |

---

## 📁 Folder Structure

src/
├── app/ # Redux store setup
├── components/ # Reusable UI components
├── pages/ # Page components (Books, Add, Edit, Borrow)
├── services/ # RTK Query API slices
├── types/ # TypeScript interfaces and types
├── main.tsx # App entry point
└── App.tsx # Main route configuration

---

## Getting Started

### 1. Clone the repository

git clone https://github.com/imran-khan-dev/l2-A4
cd library-client

### 2. Install dependencies

npm install

### 3. Configure environment variables (optional)

// src/features/bookApi.ts
baseUrl: 'https://your-backend-url.com/api',

### 4. Start the development server

npm run dev

## Available Routes

| Path              | Description                       |
| ----------------- | --------------------------------- |
| `/books`          | Book list with edit/delete/borrow |
| `/create-book`    | Add a new book                    |
| `/edit-book/:id`  | Update an existing book           |
| `/borrow/:bookId` | Borrow form for a book            |
| `/borrow-summary` | View borrowed books summary       |

## License

This project is licensed under the MIT License.
