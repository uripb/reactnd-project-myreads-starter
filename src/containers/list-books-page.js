import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import BookShelf from '../components/book-shelf';

class ListBooksPage extends Component {
    state = {
        books: [],
        loading: false,
    }

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks = () => {
        this.setState({
            loading: true,
        })
        BooksAPI.getAll()
            .then((books) => {
                this.setState({
                    books,
                    loading: false,
                });
            });
    }

    onChangeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then(() => {
                this.getAllBooks();
            });
    }

    renderLoading() {
        return (
            <div className='loading-content'></div>
        );
    }

    renderListContent() {
        const { books } = this.state;
        const currentlyBooks = books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = books.filter(book => book.shelf === 'wantToRead');
        const readBooks = books.filter(book => book.shelf === 'read');
        return (
            <div className="list-books-content">
                <div>
                    <BookShelf
                        title='Currently Reading'
                        books={currentlyBooks}
                        onChangeShelf={this.onChangeShelf}
                    />
                    <BookShelf
                        title='Want to Read'
                        books={wantToRead}
                        onChangeShelf={this.onChangeShelf}
                    />
                    <BookShelf
                        title='Read'
                        books={readBooks}
                        onChangeShelf={this.onChangeShelf}
                    />
                </div>
            </div>
        );
    }

    render() {
        const { loading } = this.state;

        return (
            <Fragment>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    {
                        loading ?
                            this.renderLoading()
                            : this.renderListContent()
                    }
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </Fragment>
        );
    }

}

export default ListBooksPage;