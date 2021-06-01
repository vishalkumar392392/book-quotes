const initialState = {
  books: []
}

const quoteReducer = (state=initialState,action)=>{
  switch(action.type){
    case "ADD_BOOK":
      state.books.push(action.book);
       return{
        books: [...state.books]
       }
    case "ALL_BOOKS":
      return{
        books:action.books
      }
    default:
      return state;
  }
}

export default quoteReducer;