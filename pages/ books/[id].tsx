import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BookProvider, useBookContext } from '../../context/BookContext';
import BookDetail from '../../components/BookDetail';
import { Book } from '../../types/book';

const BookDetailContent: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { books } = useBookContext();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (id && books.length) {
            const found = books.find(b => b.id === Number(id));
            setBook(found || null);
        }
    }, [id, books]);

    if (!book) return <div>Book not found.</div>;

    return <BookDetail book={book} onClose={() => router.push('/')} />;
};

const BookDetailPage: React.FC = () => (
    <BookProvider>
        <BookDetailContent />
    </BookProvider>
);

export default BookDetailPage;