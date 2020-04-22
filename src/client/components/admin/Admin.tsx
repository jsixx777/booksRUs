import * as React from "react";
import { json, User } from "../utils/api";
import { RouteComponentProps, Link } from "react-router-dom";
import { Dropdown, InputGroup, DropdownButton, FormControl, FormGroup, Form, Col, Row } from 'react-bootstrap';

class Admin extends React.Component<IAdminProps, IAdminState> {
  constructor(props: IAdminProps) {
    super(props);
    this.state = {

      title: "",
      firstName: "",
      lastName: "",
      saveStatus: null,

    };
  }
  private alert: JSX.Element = null;
  private saving: boolean = false;


  async handleBookSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (this.saving) return;

    let book = {
      userid: User.userid,
      title: this.state.title,
      firstName: this.state.firstName,
      lastName: this.state.lastName
      
    };


    try {
      this.saving = true;
      let result = await json('/api/books', 'POST', book);
      if (result) {
        this.setState({
          
          title: "",
          saveStatus: 'successful',
          firstName: "",
          lastName: "",
          

        });


      } else {
        this.setState({ saveStatus: 'error' })
      }

    } catch (e) {
      this.setState({ saveStatus: "error" });
      throw e;
    } finally {
      this.saving = false;
    }
  }

  render() {
    if (this.state.saveStatus === "successful") {
      this.alert = (
        <div className="alert-success p-1 m-3" role="alert">
         Book Added
        </div>
      );
    } else if (this.state.saveStatus === "error") {
      this.alert = (
        <div className="alert-danger p-1 m-3" role="alert">
          Error
        </div>
      );
    }
    return (
      <main className="container">
        <section className="row-my-3">
          <div className="col-md-12">
            <form
              className="form-group border border-primary rouned shadow-lg p-3"
              onSubmit={e => this.handleBookSubmit(e)}
            >
              <label>Title</label>
              <input
                type="text"
                className="form-control p1 mb-1"
                placeholder="Enter Title"
                value={this.state.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ title: e.target.value })
                }
              ></input>

              <label>First Name</label>
              <input
                type="text"
                className="form-control p1 mb-1"
                placeholder="Enter First Name..."
                value={this.state.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ firstName: e.target.value })
                }
              ></input>
              <label>Last Name</label>
              <input
                type="text"
                className="form-control p1 mb-1"
                placeholder="Enter Last Name..."
                value={this.state.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ lastName: e.target.value })
                }
              ></input>
              
              
              <Row>
                <Col md="3">
                <button
                type="submit"
                className="btn btn-warning d-block border border-primary mt-2 p-2 shadow"
              >
                Submit
              </button>
                </Col>
                <Col md="3">
                <Link to={"/admin-delete"} className="btn btn-danger mt-4">
            Delete Books
          </Link>
          </Col>
                <Col md="3">
                <Link to={"/admin-edit"} className="btn btn-success mt-4">
            Edit Books
          </Link>
                </Col>
                <Col md="3"></Col>
              </Row>
              {this.alert}
            </form>
          </div>
        </section>
      </main>
    );
  }
}

interface IAdminProps extends RouteComponentProps { }
interface IAdminState {

  title: string;
  firstName: string;
  lastName: string;
  saveStatus: string;

}
export default Admin;
