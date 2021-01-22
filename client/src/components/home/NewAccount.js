import React from 'react'
import './Home.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

class NewAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: '',
            message: '',
            statusOk: true,
            display: 'none'
        };

        const SERVER = 'http://localhost:8080';

        this.isCorrectlyCompleted = () => {
            let matches = /^[a-zA-Z]+$/
            if (this.state.firstName.length < 3 || this.state.firstName.length > 30 || !this.state.firstName.match(matches)) {
                this.setState({
                    message: 'Firstname must have between 3 and 30 characters!',
                    statusOk: false
                });
                return false;
            } else {
                if (this.state.lastName.length < 3 || this.state.lastName.length > 30 || !this.state.lastName.match(matches)) {
                    this.setState({
                        message: 'Lastname must have between 3 and 30 characters!',
                        statusOk: false
                    });
                    return false;
                } else {
                    let emailMatch = /^[a-zA-Z0-9.*-_]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    if (this.state.email.length < 10 || this.state.email.length > 50 || !this.state.email.match(emailMatch)) {
                        this.setState({
                            message: 'Email must have between 10 and 50 characters!',
                            statusOk: false
                        });
                        return false;
                    } else {
                        if (this.state.userName.length < 4 || this.state.userName.length > 20) {
                            this.setState({
                                message: 'Username must have between 4 and 20 characters!',
                                statusOk: false
                            });
                            return false;
                        } else {
                            let passwordMatch = /^[0-9a-zA-Z]+$/;
                            if (this.state.password.length < 4 || this.state.password.length > 20 || !this.state.password.match(passwordMatch)) {
                                this.setState({
                                    message: 'Password must have between 4 and 20 letters & numbers!',
                                    statusOk: false
                                });
                                return false;
                            } else {
                                this.setState({
                                    message: '',
                                    statusOk: true
                                });
                                return true;
                            }
                        }
                    }
                }
            }
        };


        this.handleSubmit = async () => {
            if (this.isCorrectlyCompleted()) {
                const response = await fetch(`${SERVER}/api/users/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userName: this.state.userName,
                        password: this.state.password,
                        name: `${this.state.firstName} ${this.state.lastName}`,
                        email: this.state.email
                    })
                });
                if (response.ok) {
                    await response.json();
                    this.setState({
                        message: 'Account successfully created! You will be redirected to sign in.',
                        statusOk: true,
                        display: 'block'
                    });
                    setTimeout(this.goToSignIn, 2000);
                } else {
                    if (response.status === 409) {
                        this.setState({
                            message: 'Oops, it seems like user already exists!',
                            statusOk: false
                        });
                    }
                }
            }
        }

        this.goToSignIn = () => {
            this.props.history.push({
                pathname: '/sign-in',
                state: {
                    userName: this.state.userName,
                    password: this.state.password
                }
            });
        }
    }

    render() {
        return (
            <>
                <div id="background" style={{ backgroundImage: "url(/images/background.svg)" }}></div>
                <div className="createAccountContainer">
                    <div className="form-wrapper">
                        <h2>Create account</h2>

                        <form onSubmit={this.handleSubmit}>
                            <div className="firstName">
                                <label htmlFor="firstName">First name</label>
                                <InputText id="firstname" placeholder="First name" value={this.state.firstName} required
                                    onChange={(e) => this.setState({ firstName: e.target.value })} />
                            </div>
                            <div className="lastName">
                                <label htmlFor="lastName">Last name</label>
                                <InputText id="lastname" placeholder="Last name" value={this.state.lastName} required
                                    onChange={(e) => this.setState({ lastName: e.target.value })} />
                            </div>
                            <div className="email">
                                <label htmlFor="email">Email address</label>
                                <InputText id="email" placeholder="Email" value={this.state.email} required
                                    onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div className="userName">
                                <label htmlFor="username">Username</label>
                                <InputText id="username" placeholder="Username" value={this.state.userName} required
                                    onChange={(e) => this.setState({ userName: e.target.value })} />
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <InputText id="password" placeholder="Password" type="password" value={this.state.password} required
                                    onChange={(e) => this.setState({ password: e.target.value })} />
                            </div>
                            <p id={this.state.statusOk ? "message" : "errorMessage"}>{this.state.message}</p>
                            <ProgressSpinner style={{ width: "50px", height: "50px", display: `${this.state.display}` }} />
                            <div className="createAccount">
                                <Button label="Create Account" type="button" onClick={this.handleSubmit} />
                                <small onClick={this.goToSignIn}>Already have an account? Sign in.</small>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default NewAccount;