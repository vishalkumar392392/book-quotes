import React from "react";
import "./BookCard.css";
const bookCrad = (props) => {
  const books = props.books.map((book, index) => {
    const modelId = book.bookName && book.bookName.replaceAll(" ", "_");
    return (
      <div key={index} className="bookCard">
        <div className=" card">
          <div className="card-body">
            <p className="card-text">{book.bookName}</p>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target={"#" + modelId}
            >
              Quotes
            </button>
            <div
              className="modal fade"
              id={modelId}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Your Quotes
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {book.quotes && book.quotes.map((q, index) => {
                      return (
                        <p key={index}>
                          <b>
                            <i>{q}</i>
                          </b>
                          <span
                            className="cross"
                            onClick={() => props.deleteQuote(book, index)}
                          >
                            {" "}
                            &times;
                          </span>
                        </p>
                      );
                    })}
                    <form onSubmit={(event) => props.addQuotes(event, book.id)}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a quote"
                        onChange={(event) => props.setQuote(event)}
                      />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(event) => props.addQuotes(event, book.id)}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div className="BookCard">{books}</div>;
};
export default bookCrad;
