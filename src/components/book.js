import React from 'react';
import PropTypes from 'prop-types';
import { BOOK_SHELF } from '../constants';

const activeShelfs = ['currentlyReading', 'wantToRead', 'read'];

const Book = (props) => {
    const { book, onChangeShelf } = props;
    const bookShelf = activeShelfs.includes(book.shelf) ? book.shelf : 'none';
    const imgUrl = (book.imageLinks) ? book.imageLinks.thumbnail : '';

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${imgUrl}`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select
                            value={bookShelf}
                            onChange={(event) => onChangeShelf(book, event.target.value)}
                        >
                            <option value="move" disabled>Move to...</option>
                            {BOOK_SHELF.map(shelf => (
                                <option
                                    key={shelf.key}
                                    value={shelf.key}>
                                    {shelf.name}
                                </option>
                            ))}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
        </li>
    );
}

Book.defaultProps = {
    book: {},
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
}

export default Book;