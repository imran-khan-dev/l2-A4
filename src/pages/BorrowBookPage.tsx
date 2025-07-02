import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetBookQuery } from "../features/books/bookApi";
import { useCreateBorrowMutation } from "../features/borrow/borrowApi";

const BorrowBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookQuery(bookId!);
  const [createBorrow, { isLoading: isSubmitting }] = useCreateBorrowMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const book = data?.data;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book || quantity > book.copies || quantity <= 0) {
      alert("Quantity must be between 1 and available copies.");
      return;
    }

    try {
      await createBorrow({
        book: book._id,
        quantity,
        dueDate,
      }).unwrap();
      alert("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err) {
      alert("❌ Failed to borrow book.");
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">📖 Borrow: {book.title}</h2>
      <p className="text-gray-600 mb-4">Available copies: {book.copies}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
          min={1}
          max={book.copies}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Borrowing..." : "Borrow Book"}
        </button>
      </form>
    </div>
  );
};

export default BorrowBookPage;
