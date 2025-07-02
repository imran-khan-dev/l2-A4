import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold">📚 Library System</h1>
      <div className="flex gap-4 ml-3">
        <Link
          to="/books"
          className="text-white hover:text-yellow-200 transition-colors duration-200"
        >
          All Books
        </Link>
        <Link
          to="/create-book"
          className="text-white hover:text-yellow-200 transition-colors duration-200"
        >
          Add Book
        </Link>
        <Link
          to="/borrow-summary"
          className="text-white hover:text-yellow-200 transition-colors duration-200"
        >
          Borrow Summary
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
