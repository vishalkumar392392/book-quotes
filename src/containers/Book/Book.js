import React, { useEffect, useState } from 'react';
import './Book.css';
import BookCard from '../../components/BookCard/BookCard';
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions/bookAction";
function Book(props) {

  const [book, setBook] = useState(null);
  const { getAllBooks } = props;
  useEffect(() => {
    props.getAllBooks();
  }, [getAllBooks])
  const [quote, setQuotes] = useState("");
  const addAllBooks = () => {
    props.onAddBook(book);
    setBook(null);

  }

  const addQuotes = (event, id) => {
    event.preventDefault();
    if (quote.length === 0) {
      return;
    }
    props.onAddQuote(id, quote);
    props.getAllBooks();
    setQuotes("");
  }

  const setQuote = (event) => {

    setQuotes(event.target.value)
  }

  const setBookObject = (event) => {
    const obj = {
      id: new Date().valueOf(),
      bookName: event.target.value,
      quotes: []
    }
    setBook(obj);
  }

  const updateQuote = (event, quote, bookId, index) => {
    const bk = props.allBooks.filter(bk => bk.id === bookId);
    bk[0].quotes[index] = event.target.value;
  }
  const deleteQuote = (book, q) => {
    props.removeQuote(q);
  }
  return (
    <div>
      <div className="Book">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Add a book" aria-label="Add a book" aria-describedby="basic-addon2" onChange={(event) => setBookObject(event)} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={addAllBooks}>Button</button>
          </div>
        </div>
      </div>
      <BookCard books={props.allBooks} addQuotes={addQuotes} setQuote={setQuote}
        updateQuote={updateQuote} deleteQuote={deleteQuote} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    allBooks: state.quoteReducer.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBooks: () => dispatch(actionTypes.getAllBooks()),
    onAddBook: (book) => dispatch(actionTypes.addBook(book)),
    onAddQuote: (id, quote) => dispatch(actionTypes.onAddQuote(id, quote)),
    removeQuote: (quote) => dispatch(actionTypes.removeQuote(quote))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);