import React from 'react';
import { useBookContext } from '../context/BookContext';
import { Book } from '../types/book';
import styles from './BookList.module.css';

interface BookListProps {
    onEdit: (book: Book) => void;
    onView: (book: Book) => void;
    onDelete: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ onEdit, onView, onDelete }) => {
    const { books, error } = useBookContext();

    if (error) return <div className={styles.container}>Error: {error}</div>;
    if (!books.length) return <div className={styles.container}>No books found.</div>;

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.year}</td>
                        <td className={styles.actions}>
                            <button onClick={() => onView(book)}>View</button>
                            <button onClick={() => onEdit(book)}>Edit</button>
                            <button onClick={() => onDelete(book)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;