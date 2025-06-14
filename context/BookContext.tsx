// context/BookContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../types/book';
import * as api from '../utils/api';

interface BookContextType {
    books: Book[];
    error: string | null;
    fetchBooks: () => Promise<void>;
    addBook: (book: Omit<Book, 'id'>) => Promise<void>;
    updateBook: (book: Book) => Promise<void>;
    deleteBook: (id: number) => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
        try {
            setError(null);
            const data = await api.getBooks();
            setBooks(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const addBook = async (book: Omit<Book, 'id'>) => {
        try {
            setError(null);
            const newBook = await api.addBook(book);
            setBooks((prev) => [...prev, newBook]);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const updateBook = async (book: Book) => {
        try {
            setError(null);
            const updated = await api.updateBook(book);
            setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const deleteBook = async (id: number) => {
        try {
            setError(null);
            await api.deleteBook(id);
            setBooks((prev) => prev.filter((b) => b.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <BookContext.Provider value={{ books, error, fetchBooks, addBook, updateBook, deleteBook }}>
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => {
    const context = useContext(BookContext);
    if (!context) throw new Error('useBookContext must be used within a BookProvider');
    return context;
};