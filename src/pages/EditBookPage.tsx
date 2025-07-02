import { useParams } from 'react-router-dom';

const EditBookPage = () => {
  const { id } = useParams();
  return <div>✏️ Edit Book Page for ID: {id}</div>;
};

export default EditBookPage;
