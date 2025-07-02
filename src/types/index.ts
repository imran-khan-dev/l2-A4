export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface Borrow {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}