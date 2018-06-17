import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ListBooksPage from './containers/list-books-page';
import SearchBookPage from './containers/search-book-page'; 


class BooksApp extends React.Component {

	render() {
		return (
			<div className="app">
				<Route exact path='/' component={ListBooksPage} />
				<Route path='/search' component={SearchBookPage} />
			</div>
		)
	}
}

export default BooksApp;
