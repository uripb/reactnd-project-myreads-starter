import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from '../components/book-shelf';
import { BOOK_SHELF } from '../constants';

class ListBooksPage extends PureComponent {

    renderLoading() {
        return (
            <div className='loading-content'></div>
        );
    }

    renderListContent() {
        const { books, onChangeShelf } = this.props;

        return (
            <div className="list-books-content">
                <div>
                    {BOOK_SHELF.map(shelf => (
                        <BookShelf
                            key={shelf.key}
                            title={shelf.name}
                            books={books.filter(book => book.shelf === shelf.key)}
                            onChangeShelf={onChangeShelf}
                        />
                    ))}
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