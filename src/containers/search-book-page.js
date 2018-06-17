import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/book';
import InputSearch from '../components/input-search';
import * as BooksAPI from '../api/BooksAPI';

class SearchBookPage extends Component {
    state = {
        books: [],
        loading: false,
    }

    onChange = (value) => {
        if (value.length > 0) {
            this.setState({
                loading: true,
            })
            BooksAPI.search(value)
                .then((res) => {
                    const books = (res.error) ? [] : res;
                    this.setState({
                        books,
                        loading: false,
                    });
                });
        } else {
            this.setState({
                books: [],
                loading: false,
            });
        }
    }

    onChangeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf);
    }

    renderLoading() {
        return (
            <div className='loading-content'></div>
        );
    }

    renderResults() {
        const { books } = this.state;
        return (
            <div className="search-books-results">
                <ol className="books-grid">
                    {books.map(book => (
                        <Book
                            key={book.id}
                            book={book}
                            onChangeShelf={this.onChangeShelf}
                        />
                    ))}
                </ol>
            </div>
        );
    }

    render() {
        const { loading } = this.state;
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
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <InputSearch
                            placeholder="Search by title or author"
                            onChange={this.onChange}
                        />

                    </div>
                </div>
                {
                    loading ?
                        this.renderLoading()
                        : this.renderResults()
                }
            </div>
        );
    }

}

export default SearchBookPage;