import * as React from "react";
import { json, User, amLoggedIn } from "../utils/api";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

class EditForm extends React.Component<ISingleBookProps, ISingleBookState> {
    constructor(props: ISingleBookProps) {
        super(props);
        this.state = {
            book: {
                id: null,
                title: null,
                userid: null,
                _created: null,
                firstname: null,
                lastname: null
            }
        };
    }

    private alert: JSX.Element = null;

    async componentWillMount() {
        await this.getBook();
    }
    
    private async getBook() {
        let id = this.props.match.params.id;
        try {
            let [book]: any = await json(`/api/books/${id}`);
            this.setState({ book });
        }
        catch (e) {
            console.log(e);
        }
    }

    async saveBook() {
        const book = await json(`/api/books/${this.state.book.id}`, 'PATCH', this.state.book);
        await this.getBook();
        alert('Edit Successful');
    }

    async handleChange(event, fieldName) {
        const book = {
            ...this.state.book,
            [fieldName]: event.target.value
        };
        this.setState({
            book
        });
        
    }

    render() {
        return (
            <main className="container">
                <section className="row my-3">
                    <div className="col md-12">
                        <div className="card">
                            <div className="card-body">
                                <input className="card-title" value={this.state.book.title} 
                                onChange={() => this.handleChange(event, 'title')}/>
                                <input className="card-title" value={this.state.book.firstname} 
                                onChange={() => this.handleChange(event, 'firstname')}/>
                                <input className="card-title" value={this.state.book.lastname} 
                                onChange={() => this.handleChange(event, 'lastname')}/>
                            </div>
                        </div>
                    </div>
                </section>
                <Button onClick={() => this.saveBook()}>Save</Button>
                <Link to={"/admin-edit"} className="btn btn-success ml-4">
          Back
        </Link>
            </main>
        );
    }
}
interface ISingleBookProps extends RouteComponentProps<{ id: string }> { }
interface ISingleBookState {
    book: {
        id: number;
        title: string;
        userid: number;
        _created: Date;
        firstname: string;
        lastname: string;
    };
}
export default EditForm;
