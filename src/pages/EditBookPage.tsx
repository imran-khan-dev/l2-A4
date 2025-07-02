import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../features/books/bookApi";

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBookQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        title: data.data.title,
        author: data.data.author,
        genre: data.data.genre,
        isbn: data.data.isbn,
        description: data.data.description ?? "",
        copies: data.data.copies,
        available: data.data.available,
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      available: e.target.checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({ id: id!, body: formData }).unwrap();
      alert("Book updated successfully!");
      navigate("/books");
    } catch (err) {
      alert("❌ Failed to update book");
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading book...</p>;
  if (isError) return <p>Failed to load book data.</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select genre</option>
          <option value="HISTORY">History</option>
          <option value="BIOGRAPHY">Biography</option>
          <option value="FANTASY">Fantasy</option>
        </select>

        <input
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="copies"
          placeholder="Copies"
          value={formData.copies}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          min={0}
          required
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={formData.available}
            onChange={handleCheckbox}
          />
          <label htmlFor="available" className="text-sm">
            Available
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBookPage;
