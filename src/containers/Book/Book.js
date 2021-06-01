import React, { useEffect, useState } from 'react';
import './Book.css';
import BookCard from '../../components/BookCard/BookCard';
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions/bookAction";
function Book(props) {

  const [book, setBook] = useState(null);
  const [allBooks, addBooks] = useState([{id:100, bookName: 'Alchemist', quotes: ['When you want something, all the universe conspires in helping you to achieve it.'] },
  {id:101, bookName: 'Attitude is Everything', quotes: ['You become what you think'] }]);

  useEffect(()=>{
    props.getAllBooks();
  },[])
  const [quote,setQuotes] = useState("");
  const addAllBooks = () => {
    props.onAddBook(book);
    setBook(null);

  }

  const addQuotes = (event,id) =>{
    event.preventDefault();
    props.onAddQuote(id,quote);
    if(quote.length===0){
      return;
    }
    const bk = props.allBooks.filter(bk=>bk.id===id);
    bk[0].quotes.push(quote);
    const index = props.allBooks.findIndex(x=>x.id===id);
    const books = [...props.allBooks]
    books[index] = bk[0];
    
    addBooks(books);
    setQuotes("");
  }

  const setQuote= (event) =>{
   
    setQuotes(event.target.value)
  }

  const setBookObject = (event) => {
    const obj = {
      id:new Date().valueOf(),
      bookName: event.target.value,
      quotes: []
    }
    setBook(obj);
  }

  const updateQuote =(event,quote,bookId,index)=>{
    const bk = props.allBooks.filter(bk=>bk.id===bookId);
    bk[0].quotes[index] = event.target.value;
  }
  const deleteQuote = (book,index)=>{
    let booksCopy = [...props.allBooks];
    booksCopy = booksCopy.map(b=>{
      if(b.id===book.id){
        b.quotes.splice(index,1);
      }
      return b;
    })
    addBooks(booksCopy);
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
      <BookCard books={props.allBooks} addQuotes={addQuotes} setQuote = {setQuote}
       updateQuote={updateQuote} deleteQuote={deleteQuote}/>
    </div>
  )
}

const mapStateToProps = (state)=>{
  return{
   allBooks:state.quoteReducer.books
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    getAllBooks:()=>dispatch(actionTypes.getAllBooks()),
    onAddBook:(book)=>dispatch(actionTypes.addBook(book)),
    onAddQuote:(id,quote)=>dispatch(actionTypes.onAddQuote(id,quote))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Book);