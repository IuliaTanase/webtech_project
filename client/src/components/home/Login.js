import React from "react"
import "./Home.css"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            errorMessage: '',
            display: 'none'
        };

        const SERVER = 'http://localhost:8080';

        this.isCorrectlyCompleted = () => {
            if (this.state.userName.length < 3 || this.state.userName.length > 20) {
                this.setState({
                    errorMessage: 'Username must have between 3 and 20 characters!'
                });
                return false;
            } else {
                let letters = /^[0-9a-zA-Z]+$/;
                if (this.state.password.length < 4 || !this.state.password.match(letters)) {
                    this.setState({
                        errorMessage: 'Password must have at least 4 letters & numbers!'
                    });
                    return false;
                } else {
                    this.setState({
                        errorMessage: ''
                    });
                    return true;
                }
            }
        };

        this.handleSubmit = async () => {

            if (this.isCorrectlyCompleted()) {
                const response = await fetch(`${SERVER}/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userName: this.state.userName,
                        password: this.state.password
                    })

                });
                if (response.ok) {
                    const user = await response.json();
                    this.setState({
                        display: 'block'
                    });
                    localStorage.setItem('user', JSON.stringify(user));
                    setTimeout(this.goToAliments, 1500);
                } else {
                    this.setState({
                        errorMessage: 'Wrong username or password!'
                    })
                }
            }
        }


        this.goToAliments = () => {
            this.props.history.push('/aliments');

        }

    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                userName: this.props.location.state.userName,
                password: this.props.location.state.password
            });
        }
    }


    render() {
        return (
            <>
                <div id="background" style={{ backgroundImage: "url(/images/background.svg)" }}></div>
                <div className="loginFormContainer">
                    <div className="form-wrapper">
                        <h2>Sign in account</h2>

                        <form>
                            <div className="userName">
                                <label htmlFor="username">Username</label>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-user"></i>
                                    <InputText id="username" className="inputLogin"
                                        placeholder="Username" value={this.state.userName} required
                                        onChange={(e) => this.setState({ userName: e.target.value })} />
                                </span>
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-lock"></i>
                                    <InputText id="password" className="inputLogin" type="password"
                                        placeholder="Password" value={this.state.password} required
                                        onChange={(e) => this.setState({ password: e.target.value })} />
                                </span>
                            </div>
                            <p id="errorMessage">{this.state.errorMessage}</p>
                            <ProgressSpinner style={{ width: "50px", height: "50px", display: `${this.state.display}` }} />
                            <div className="signIn">
                                <Button label="Sign in" type="button" onClick={this.handleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>

            </>


        )
    }
}

export default Login;