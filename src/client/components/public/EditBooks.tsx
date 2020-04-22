import React from "react";
import { json, User } from "../utils/api";
import { Link } from "react-router-dom";



export interface EditBooksProps { }

export interface EditBooksState {
    books: any; //adjust later
}

class EditBooks extends React.Component<EditBooksProps, EditBooksState> {
    constructor(props: EditBooksProps) {
        super(props);
        this.state = {
            books: []
        };
    }

    private alert: JSX.Element = null;
    private deleting: boolean = false;

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
                                    
                                    <Link to={`/admin-edit-form/${book.id}`} className="btn btn-success ml-4">
                                        Edit Book
        </Link>
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

interface IEditBooksProps { }
interface IEditBooksState {
    books: {
        id: number;
        title: string;
        books: any;
    };
}

export default EditBooks;
