import React, { useState } from 'react';
import { Book } from '../types/book';
import styles from './BookForm.module.css';

interface BookFormProps {
    initial?: Partial<Book>;
    onSubmit: (data: Omit<Book, 'id'>) => void;
    onCancel: () => void;
    readOnly?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ initial = {}, onSubmit, onCancel, readOnly = false }) => {
    const {
        title: initialTitle = '',
        author: initialAuthor = '',
        year: initialYear = '',
    } = initial || {};
    const [title, setTitle] = useState(initialTitle || '');
    const [author, setAuthor] = useState(initialAuthor || '');
    const [year, setYear] = useState(initialYear ? String(initialYear) : '');
    const [errors, setErrors] = useState<{ [k: string]: string }>({});

    const isAddMode = !readOnly && !initialTitle && !initialAuthor && !initialYear;

    const validate = () => {
        const errs: { [k: string]: string } = {};
        if (!title.trim()) errs.title = 'Title required';
        if (!author.trim()) errs.author = 'Author required';
        const yearNum = Number(year);
        if (!year.trim() || isNaN(yearNum)) {
            errs.year = 'Valid year required (e.g., 2024)';
        } else if (yearNum < 1500 || yearNum > 2024) {
            errs.year = 'Year must be between 1500 and 2024';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({ title, author, year: Number(year) });
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.field}>
                    <label className={styles.label}>
                        Title<span className={styles.required}>*</span>:
                    </label>
                    <input
                        className={`${styles.input} ${errors.title ? styles.invalid : ''}`}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        readOnly={readOnly}
                        placeholder={!readOnly ? 'e.g., The Great Gatsby' : undefined}
                    />
                    {isAddMode && <small className={styles.tip}>Enter the book title (string)</small>}
                    {!readOnly && errors.title && <span className={styles.error}>{errors.title}</span>}
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>
                        Author<span className={styles.required}>*</span>:
                    </label>
                    <input
                        className={`${styles.input} ${errors.author ? styles.invalid : ''}`}
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        readOnly={readOnly}
                        placeholder={!readOnly ? 'e.g., F. Scott Fitzgerald' : undefined}
                    />
                    {isAddMode && <small className={styles.tip}>Enter the author name (string)</small>}
                    {!readOnly && errors.author && <span className={styles.error}>{errors.author}</span>}
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>
                        Year<span className={styles.required}>*</span>:
                    </label>
                    <input
                        className={`${styles.input} ${errors.year ? styles.invalid : ''}`}
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        readOnly={readOnly}
                        placeholder={!readOnly ? 'e.g., 1925 (between 1500-2024)' : undefined}
                        type="number"
                        min={1500}
                        max={2024}
                    />
                    {isAddMode && <small className={styles.tip}>Enter the publication year (number between 1500-2024)</small>}
                    {!readOnly && errors.year && <span className={styles.error}>{errors.year}</span>}
                </div>
                {!readOnly && (
                    <div className={styles.requiredNote}>
                        <span className={styles.required}>*</span> Required fields
                    </div>
                )}
                <div className={styles.actions}>
                    {!readOnly ? (
                        <>
                            <button className={styles.button} type="submit">Save</button>
                            <button className={`${styles.button} ${styles.cancel}`} type="button" onClick={onCancel}>Cancel</button>
                        </>
                    ) : (
                        <button className={styles.button} type="button" onClick={onCancel}>Close</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BookForm;