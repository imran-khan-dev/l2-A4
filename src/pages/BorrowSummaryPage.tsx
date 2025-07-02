import { useGetBorrowSummaryQuery } from "../features/borrow/borrowApi";

const BorrowSummaryPage: React.FC = () => {
  const { data, error, isLoading } = useGetBorrowSummaryQuery();

  if (isLoading) return <div>Loading borrow summary...</div>;
  if (error) return <div>Error loading borrow summary</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Borrow Summary</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Title
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">ISBN</th>
            <th className="border border-gray-300 px-4 py-2 text-right">
              Total Borrowed
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.book.isbn ?? index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {item.book.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.book.isbn}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {item.totalQuantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummaryPage;
