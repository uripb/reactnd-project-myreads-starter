import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from '../components/book-shelf';

class ListBooksPage extends Component {

    renderLoading() {
        return (
            <div className='loading-content'></div>
        );
    }

    renderListContent() {
        const { books, onChangeShelf } = this.props;
        const currentlyBooks = books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = books.filter(book => book.shelf === 'wantToRead');
        const readBooks = books.filter(book => book.shelf === 'read');
        return (
            <div className="list-books-content">
                <div>
                    <BookShelf
                        title='Currently Reading'
                        books={currentlyBooks}
                        onChangeShelf={onChangeShelf}
                    />
                    <BookShelf
                        title='Want to Read'
                        books={wantToRead}
                        onChangeShelf={onChangeShelf}
                    />
                    <BookShelf
                        title='Read'
                        books={readBooks}
                        onChangeShelf={onChangeShelf}
                    />
                </div>
            </div>
        );
    }

    render() {
        const { loading } = this.props;

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

ListBooksPage.defaultProps = {
    books: [],
    loading: false,
}

ListBooksPage.propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    onChangeShelf: PropTypes.func.isRequired,
}

export default ListBooksPage;