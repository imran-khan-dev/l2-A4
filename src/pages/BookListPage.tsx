import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../features/books/bookApi";
import { Link } from "react-router-dom";
import type { Book } from "../types";

const BookListPage = () => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const books = data?.data ?? [];

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirm) return;

    try {
      await deleteBook(id).unwrap();
      alert("Book deleted successfully.");
    } catch (err) {
      alert("Failed to delete book.");
      console.error(err);
    }
  };
  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Failed to load books.</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📚 Book List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Genre</th>
              <th className="px-4 py-2 border">ISBN</th>
              <th className="px-4 py-2 border">Copies</th>
              <th className="px-4 py-2 border">Available</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: Book) => (
              <tr key={book._id}>
                <td className="px-4 py-2 border">{book.title}</td>
                <td className="px-4 py-2 border">{book.author}</td>
                <td className="px-4 py-2 border">{book.genre}</td>
                <td className="px-4 py-2 border">{book.isbn}</td>
                <td className="px-4 py-2 border">{book.copies}</td>
                <td className="px-4 py-2 border">
                  {book.available ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2 border space-x-2 md:space-y-0">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 hover:bg-red-600 my-2 md:my-0 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/borrow/${book._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Borrow
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookListPage;
