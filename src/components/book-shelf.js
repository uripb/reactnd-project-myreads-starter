import React from 'react';
import PropTypes from 'prop-types';
import Book from './book';

const BookShelf = (props) => {
    const { title, books, onChangeShelf } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <Book
                            key={book.id}
                            book={book}
                            onChangeShelf={onChangeShelf}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
}

BookShelf.defaultProps = {
    title: '',
    books: [],
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
}

export default BookShelf;