import { useParams } from 'react-router-dom';

const BorrowBookPage = () => {
  const { bookId } = useParams();
  return <div>📥 Borrow Book Page for Book ID: {bookId}</div>;
};

export default BorrowBookPage;
