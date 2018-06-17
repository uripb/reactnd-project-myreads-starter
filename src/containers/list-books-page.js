import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import BookShelf from '../components/book-shelf';

class ListBooksPage extends Component {
    state = {
        books: [],
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({
                    books,
                });
            });
    }

    render() {
        const { books } = this.state;
        const currentlyBooks = books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = books.filter(book => book.shelf === 'wantToRead');
        const readBooks = books.filter(book => book.shelf === 'read');

        return (
            <Fragment>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <BookShelf
                                title='Currently Reading'
                                books={currentlyBooks}
                            />
                            <BookShelf
                                title='Want to Read'
                                books={wantToRead}
                            />
                            <BookShelf
                                title='Read'
                                books={readBooks}
                            />
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </Fragment>
        );
    }

}

export default ListBooksPage;