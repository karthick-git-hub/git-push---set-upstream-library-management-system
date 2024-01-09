import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookManager = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState({ title: '', author: '', isbn: '' });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedBook({ ...selectedBook, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedBook.id) {
            await axios.put(`http://localhost:8080/books/${selectedBook.id}`, selectedBook);
        } else {
            await axios.post('http://localhost:8080/books', selectedBook);
        }
        setSelectedBook({ title: '', author: '', isbn: '' });
        fetchBooks();
    };

    const handleEdit = (book) => {
        setSelectedBook(book);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/books/${id}`);
        fetchBooks();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={selectedBook.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={selectedBook.author}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    value={selectedBook.isbn}
                    onChange={handleInputChange}
                />
                <button type="submit">Save Book</button>
            </form>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} by {book.author} (ISBN: {book.isbn})
                        <button onClick={() => handleEdit(book)}>Edit</button>
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookManager;
