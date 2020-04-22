import * as React from "react";
import { json, User, amLoggedIn } from "../utils/api";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

class SingleBook extends React.Component<ISingleBookProps, ISingleBookState> {
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
      //tags: []
    };
  }

private alert: JSX.Element=null;

  async componentWillMount() {
    let id = this.props.match.params.id;
    try {
      let [book]: any = await json(`/api/books/${id}`);
      

      this.setState({ book });
    } catch (e) {
      console.log(e);
    }
  }

  

  render() {
    return (
      <main className="container">
        <section className="row my-3">
          <div className="col md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{this.state.book.title}</h4>
                <h6 className="card-title">{this.state.book.firstname}</h6>
                <h6 className="card-title">{this.state.book.lastname}</h6>
                
              </div>
            </div>
          </div>
        </section>
        <Link to={"/books"} className="btn btn-success mr-4">
          Previous Screen
        </Link>

        <Button onClick={() => amLoggedIn()}>Buy Book></Button>
      </main>
    );
  }
}
interface ISingleBookProps extends RouteComponentProps<{ id: string }> {}
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
export default SingleBook;
