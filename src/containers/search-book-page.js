import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from '../components/book';
import InputSearch from '../components/input-search';
import * as BooksAPI from '../api/BooksAPI';

class SearchBookPage extends Component {
    state = {
        booksFound: [],
    }

    onChange = (value) => {
        if (value.length > 0) {
            BooksAPI.search(value)
                .then((res) => {
                    const booksFound = (res.error) ? [] : res;
                    this.setState({
                        booksFound,
                    });
                });
        } else {
            this.setState({
                booksFound: [],
            });
        }
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