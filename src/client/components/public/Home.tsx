import * as React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

export interface HomeProps {}

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    //this.state = { :  };
  }
  render() {
    return (
      <main>
        <h1 className="text-center">Welcome!</h1>
        <section>
          <Row>
            <Col md="12"></Col>
          </Row>
          <Row>
            <Col md="12"></Col>
          </Row>
          <Row>
            <Col md="12"></Col>
          </Row>
          <Row>
            <Col md="12"></Col>
          </Row>
          <Row>
            <Col md="12"></Col>
          </Row>
          <Row>
          <Col md="4"></Col>
          <Col md="4">
          <Link to={"/books"} className="btn btn-primary mt-4">
            See List of Books
          </Link>
          </Col>
          <Col md="4"></Col>
          </Row>
        </section>
      </main>
    );
  }
}

export default Home;
