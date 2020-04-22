import * as React from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import Login from "./components/admin/Login";
import Admin from "./components/admin/Admin";
import Register from "./components/admin/Register"
import { StripeProvider, Elements } from "react-stripe-elements";
import Form from "./components/public/Form";

import "./scss/app";
//import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/shared/Navbar";
import AllBooks from "./components/public/AllBooks";
import SingleBook from "./components/public/SingleBook";
import Home from "./components/public/Home";
import DeleteBooks from "./components/public/DeleteBooks";
import EditBooks from "./components/public/EditBooks";
import EditForm from "./components/public/EditForm";

export default class App extends React.Component<IAppProps, IAppState> {
    render() {
        return (
            <BrowserRouter>
                <>
                    <Navbar />
                </>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/books" component={AllBooks} />
                    <Route exact path="/single/:id" component={SingleBook} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/admin-delete" component={DeleteBooks} />
                    <Route exact path="/admin-edit" component={EditBooks} />
                    <Route exact path="/admin-edit-form/:id" component={EditForm} />

                    <StripeProvider apiKey='pk_test_sZJArQKC6BzrWbs8aS0DJ2bM001L4wO9nG'>
                        <Elements>
                            <Form />
                        </Elements>
                    </StripeProvider>
                </Switch>
            </BrowserRouter>
        );
    }
}

interface IAppProps {
}

interface IAppState {
}
