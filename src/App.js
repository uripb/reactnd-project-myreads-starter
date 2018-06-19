import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import ListBooksPage from './containers/list-books-page';
import SearchBookPage from './containers/search-book-page';
import * as BooksAPI from './api/BooksAPI';


class BooksApp extends React.Component {
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
				book.shelf = shelf;
				this.setState((prevState) => ({
					books: [
						...prevState.books.filter(item => item.id !== book.id),
						book,
					]
				}));
			});
	}

	render() {
		const { books, loading } = this.state;
		return (
			<div className="app">
				<Switch>
					<Route exact path='/' render={() => (
						<ListBooksPage
							books={books}
							onChangeShelf={this.onChangeShelf}
							loading={loading}
						/>
					)} />
					<Route exact path='/search' render={() => (
						<SearchBookPage
							books={books}
							onChangeShelf={this.onChangeShelf}
						/>
					)} />
					<Redirect to="/" />
				</Switch>
			</div>
		)
	}
}

export default BooksApp;
