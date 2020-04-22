import * as React from 'react';
import { json, SetAccessToken } from '../utils/api';
import { RouteComponentProps } from 'react-router-dom';


class Register extends React.Component<IRegisterProps, IRegisterState> {
	constructor(props: IRegisterProps) {
		super(props);
		this.state = {
			email: '',
			first_name: '',
			last_name: '',
			password: '',
			accountStatus: false
		};
	}

	private alert: JSX.Element = null;
	private registeringIn: boolean = false;

	async handleRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (this.registeringIn) return;
		try {
			this.registeringIn = true;

			let result = await json('/auth/register', 'POST', {
				email: this.state.email,
				firstName: this.state.first_name,
				lastName: this.state.last_name,
				password: this.state.password
			});

			if (result === 'Email already exists!') {
        this.setState({accountStatus:true});
        
			} else {
        SetAccessToken(result.token, { userid: result.userid, role: result.role });
				if (result.role === 'admin') {
					this.props.history.push('/admin');
				} else {
					this.props.history.push('/');
				}
      }
		} catch (e) {
			console.log(e);
		} finally {
			this.registeringIn = false;
		}
	}

	render() {
		if (this.state.accountStatus) {
			this.alert = (
				<div className="alert-alert danger p-1 m-3" role="alert">
					User Account Already Exists
				</div>
			);
		}
		return (
			<main className="container">
				
				<section className="row-my-3">
					<div className="col-md-12">
						<form className="form-group border border-primary rouned shadow-lg p-3" onSubmit={e => this.handleRegisterSubmit(e)}>
							<label>Email</label>
							<input
								type="text"
								className="form-control p1 mb-1"
								placeholder="Email"
								value={this.state.email}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}></input>
							<label>First Name</label>
							<input
								type="text"
								className="form-control p1 mb-1"
								placeholder="First Name"
								value={this.state.first_name}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ first_name: e.target.value })}></input>
                             <label>Last Name</label>
							<input
								type="text"
								className="form-control p1 mb-1"
								placeholder="Last Name"
								value={this.state.last_name}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ last_name: e.target.value })}></input>
							<label>Password</label>
							<input
								type="password"
								className="form-control p1 mb-1"
								placeholder="Enter your password..."
								value={this.state.password}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}></input>
							<button type="submit" className="btn btn-warning d-block border border-primary mt-2 p-2 shadow">
								Sign Up
							</button>
							{this.alert}
						</form>
					</div>
				</section>
			</main>
		);
	}
}

interface IRegisterProps extends RouteComponentProps {}
interface IRegisterState {
    email: string;
    first_name: string;
    last_name: string;
	password: string;
	accountStatus: boolean;
}

export default Register;