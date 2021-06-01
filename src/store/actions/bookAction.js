import axios from "../../axios"

export const getAllBooks = () =>{
  return function (dispatch){
    axios.get("/book")
         .then(res=>{
           dispatch({type:"ALL_BOOKS",books:res.data})
         }).catch(error=>{
           console.log(error);
         })
  }
}

export const onAddQuote = (id,quote) =>{
  return function (dispatch){
    axios.get("/addQuote",{
      params:{
        id:id,
        quote:quote
      }
    }).then(res=>{
      console.log(res);
      // dispatch({type:"ALL_BOOKS",books:res.data})
    }).catch(error=>{
      console.log(error);
    })
  }
}

export const addBook = (book) => {
  const bookName = {
    bookName:book.bookName
  }
  return function (dispatch) {
    axios.post("/book",bookName).then(res => {
      axios.get("/book")
         .then(res=>{
           console.log(res.data)
           dispatch({type:"ALL_BOOKS",books:res.data})
         }).catch(error=>{
          console.log(error);
        })
    }).catch(error=>{
      console.log(error);
    })
  }
}