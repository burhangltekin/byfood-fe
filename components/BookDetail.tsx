import React from 'react';
import { Book } from '../types/book';
import styles from './BookDetail.module.css';

interface BookDetailProps {
    book: Book;
    onClose: () => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onClose }) => (
    <div className={styles.container}>
        <h2 className={styles.title}><strong>Title:</strong> {book.title}</h2>
        <p className={styles.detail}><strong>Author:</strong> {book.author}</p>
        <p className={styles.detail}><strong>Year:</strong> {book.year}</p>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
    </div>
);

export default BookDetail;