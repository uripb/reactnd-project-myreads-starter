import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from '../components/book';
import InputSearch from '../components/input-search';
import * as BooksAPI from '../api/BooksAPI';

class SearchBookPage extends PureComponent {
    state = {
        booksFound: [],
    }

    onChange = (value) => {
        if (value.length > 0) {
            BooksAPI.search(value)
                .then((res) => {
                    const booksFound = (res.error) ? [] : res;
                    this.setState({
                        booksFound: this.setBookShelf(booksFound),
                    });
                });
        } else {
            this.setState({
                booksFound: [],
            });
        }
    }

    /* needs to set book shelf because result books don't have shelf value */
    setBookShelf = (booksFound) => {
        const { books } = this.props;
        return booksFound.map(item => {
            const book = books.find(b => b.id === item.id);
            if (book) {
                item.shelf = book.shelf;
            }
            return item;
        });
    }

    renderResults() {
        const { onChangeShelf } = this.props;
        const { booksFound } = this.state;
        return (
            <div className="search-books-results">
                <ol className="books-grid">
                    {booksFound.map(book => (
                        <Book
                            key={book.id}
                            book={book}
                            onChangeShelf={onChangeShelf}
                        />
                    ))}
                </ol>
            </div>
        );
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'
                    >
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <InputSearch
                            placeholder="Search by title or author"
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                {this.renderResults()}
            </div>
        );
    }

}

SearchBookPage.defaultProps = {
    books: [],
}

SearchBookPage.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
}

export default SearchBookPage;