import React, { useState } from 'react';
import { BookProvider, useBookContext } from '../context/BookContext';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import BookDetail from '../components/BookDetail';
import Modal from '../components/Modal';
import { Book } from '../types/book';

const Dashboard: React.FC = () => {
    const { addBook, updateBook, deleteBook } = useBookContext();
    const [modal, setModal] = useState<'add' | 'edit' | 'view' | null>(null);
    const [selected, setSelected] = useState<Book | null>(null);

    const handleAdd = () => { setSelected(null); setModal('add'); };
    const handleEdit = (book: Book) => { setSelected(book); setModal('edit'); };
    const handleView = (book: Book) => { setSelected(book); setModal('view'); };
    const handleDelete = async (book: Book) => {
        if (window.confirm(`Are you sure you want to delete the book with title "${book.title}" ?`)) {
            await deleteBook(book.id);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Library Dashboard</h1>
            <button
                onClick={handleAdd}
                style={{
                    display: 'block',
                    margin: '20px auto',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 24px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                Add Book
            </button>
            <BookList onEdit={handleEdit} onView={handleView} onDelete={handleDelete} />
            <Modal
                open={modal === 'add'}
                onClose={() => setModal(null)}
                className={modal === 'add' ? 'modal-add' : ''}
            >
                <h2>Add Book</h2>
                <BookForm onSubmit={async data => { await addBook(data); setModal(null); }} onCancel={() => setModal(null)} />
            </Modal>
            <Modal open={modal === 'edit'} onClose={() => setModal(null)}>
                <h2>Edit Book</h2>
                {selected && (
                    <BookForm
                        initial={selected}
                        onSubmit={async data => { await updateBook({ ...selected, ...data }); setModal(null); }}
                        onCancel={() => setModal(null)}
                    />
                )}
            </Modal>
            <Modal open={modal === 'view'} onClose={() => setModal(null)}>
                {selected && <BookDetail book={selected} onClose={() => setModal(null)} />}
            </Modal>
        </div>
    );
};

const IndexPage: React.FC = () => (
    <BookProvider>
        <Dashboard />
    </BookProvider>
);

export default IndexPage;