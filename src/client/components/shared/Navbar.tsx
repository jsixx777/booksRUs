import React from "react";
import { Link } from "react-router-dom";
import { Form, FormControl, Button, Row, Col, NavDropdown} from "react-bootstrap";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { logout } from "../utils/api";
import { Login } from "../utils/api";
import { Register } from "../utils/api";

//import Login from '../admin/Login';
//import { logout } from '../../../server/routes/auth/login';
//import { logout } from '../../../server/routes/auth/login';

export default class Example extends React.Component<
  INavbarProps,
  INavbarState
  > {
  constructor(props: INavbarProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navLinkEnabled: true

    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,

    });
  }

  componentDidMount() {
    if (window.location.pathname === '/') {
      this.setState({ navLinkEnabled: true });
    } else {
      this.setState({ navLinkEnabled: false })
    }
  }

  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: "#000000" }} dark expand="md">




          <Link to={"/"} className="h4 mt-1" style={{ color: "#FFFAF0" }}>
            Book Store
          </Link>


         

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavDropdown title="Login" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => Login()}>Login</NavDropdown.Item>
        <NavDropdown.Item onClick={() => Register()}>Register (New User)</NavDropdown.Item>
      </NavDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Logout
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

interface INavbarProps { }
interface INavbarState {
  isOpen: boolean;
  navLinkEnabled: boolean;

}
