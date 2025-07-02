import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../features/books/bookApi";

const AddBookPage = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

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
      await createBook(formData).unwrap();
      alert("Book created successfully!");
      navigate("/books");
    } catch (err) {
      alert("❌ Something went wrong!");
      console.log(formData);
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Book</h2>
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
          <option value="FICTION">Fiction</option>
          <option value="NON-FICTION">Non-Fiction</option>
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
          min={1}
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
