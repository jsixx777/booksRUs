import React from "react";
import { json, User } from "../utils/api";
import { Link } from "react-router-dom";



export interface DeleteBooksProps { }

export interface DeleteBooksState {
  books: any; //adjust later
}

class DeleteBooks extends React.Component<DeleteBooksProps, DeleteBooksState> {
  constructor(props: DeleteBooksProps) {
    super(props);
    this.state = {
      books: []
    };
  }

  private alert: JSX.Element = null;
  

  async componentDidMount() {
    await this.refreshBooks();
  }

  private async refreshBooks() {
    try {
      let books = await json('api/books');
      this.setState({ books });
    }
    catch (e) {
      console.log(e);
    }
  }

  async handleBookDelete(bookId) {
    try {
      await json(`/api/books/${bookId}`, 'DELETE');
      await this.refreshBooks();
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <main className="container">
        <section className="row my-3">
          <ul className="list-group">
            {this.state.books.map((book: any) => {
              return (
                <li
                  key={book.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {book.title}{" "}
                 
                  <button
                    type="submit"
                    className="btn btn-warning d-block border border-primary mt-2 p-2 shadow"
                    onClick={() => this.handleBookDelete(book.id)}
                  >
                    Delete Book
              </button>
                </li>
              );
            })}
          </ul>
        </section>
        <Link to={"/admin"} className="btn btn-success">
          Back
        </Link>

      </main>
    );
  }
}

interface IDeleteBooksProps { }
interface IDeleteBooksState {
  books: {
    id: number;
    title: string;
    books: any;
  };
}

export default DeleteBooks;
