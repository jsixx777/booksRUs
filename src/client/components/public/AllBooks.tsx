import React from "react";
import { json, User } from "../utils/api";
import { Link } from "react-router-dom";



export interface AllBooksProps {}

export interface AllBooksState {
  books: any; //adjust later
}

class AllBooks extends React.Component<AllBooksProps, AllBooksState> {
  constructor(props: AllBooksProps) {
    super(props);
    this.state = {
      books: []
    };
  }

  async componentDidMount() {
    try {
      let books = await json('api/books');
      this.setState({ books });
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
                  <Link to={`/single/${book.id}`} className="btn btn-primary">
                    Book Info
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <Link to={"/"} className="btn btn-success">
          Back To Home
        </Link>
      </main>
    );
  }
}

interface IAllBooksProps {}
interface IAllBooksState {
  books: {
    id: number;
    title: string;
    books: any;
  };
}

export default AllBooks;
