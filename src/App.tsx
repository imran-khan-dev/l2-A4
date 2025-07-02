import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import BookListPage from "./pages/BookListPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import BorrowBookPage from "./pages/BorrowBookPage";
import BorrowSummaryPage from "./pages/BorrowSummaryPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/create-book" element={<AddBookPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
            <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
            <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
