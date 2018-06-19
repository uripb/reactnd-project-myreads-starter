import React from 'react';
import PropTypes from 'prop-types';
import BookShelfSelector from './book-shelf-selector';

const Book = (props) => {
    const { book, onChangeShelf } = props;
    const imgUrl = (book.imageLinks) ? `url(${book.imageLinks.thumbnail})` : 'none';

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: imgUrl
                        }}>
                    </div>
                    <BookShelfSelector
                        value={book.shelf}
                        onChange={(value) => onChangeShelf(book, value)}
                    />
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