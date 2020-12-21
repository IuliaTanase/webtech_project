import React from 'react'
import Menu from '../menubar/Menu';
import "./Profile.css"
import 'primeflex/primeflex.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        const SERVER = 'http://localhost:8080';
        const user = JSON.parse(localStorage.getItem("user"));

        this.state = {
            userId: user.id,
            userName: user.userName,
            email: user.email,
            firstName: user.name.split(" ")[0],
            lastName: user.name.split(" ")[1],
            editMode: false,
            message: '',
            statusOk: true
        }

        this.handleClick = async () => {
            if (!this.state.editMode) {
                this.setState({
                    editMode: true
                });
            } else {
                if (this.isCorrectlyCompleted()) {
                    const response = await fetch(`${SERVER}/api/users/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userName: this.state.userName,
                            email: this.state.email,
                            name: `${this.state.firstName} ${this.state.lastName}`
                        })
                    });
                    if (response.ok) {
                        let updatedUser = await response.json();
                        this.setState({
                            message: 'Changes were successfully applied!',
                            statusOk: true,
                            editMode: false
                        });
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                        setTimeout(() => { this.setState({ message: '' }) }, 2500);
                    } else {
                        if (response.status === 409) {
                            this.setState({
                                message: 'Oops, this user already exists!',
                                statusOk: false
                            });
                        }
                    }
                }
            }
        }

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
                    if (this.state.email.length < 8 || this.state.email.length > 30 || !this.state.email.match(emailMatch)) {
                        this.setState({
                            message: 'Email must have between 8 and 30 characters!',
                            statusOk: false
                        });
                        return false;
                    } else {
                        if (this.state.userName.length < 3 || this.state.userName.length > 20) {
                            this.setState({
                                message: 'Username must have between 3 and 20 characters!',
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


    render() {
        return (
            <>
                <div id="background" style={{ backgroundImage: "url(/images/green-leaves.svg)" }}></div>
                <h1>My profile</h1>
                <Menu />
                <div id="formContainer" className="p-shadow-24">
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="username">Username</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText placeholder="Username" id="username" type="text" value={this.state.userName} readOnly={!this.state.editMode}
                                    onChange={(e) => { this.setState({ userName: e.target.value }) }} />
                            </div>
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="email">Email</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <InputText placeholder="Email" id="email" type="email" value={this.state.email} readOnly={!this.state.editMode}
                                    onChange={(e) => { this.setState({ email: e.target.value }) }} />
                            </div>
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="firstname6">Firstname</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-id-card"></i>
                                </span>
                                <InputText placeholder="First Name" id="firstname" type="text" value={this.state.firstName} readOnly={!this.state.editMode}
                                    onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                            </div>
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="firstname6">Lastname</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-id-card"></i>
                                </span>
                                <InputText placeholder="Last Name" id="lastname" type="text" value={this.state.lastName} readOnly={!this.state.editMode}
                                    onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                            </div>
                        </div>
                    </div>
                    <p id={this.state.statusOk ? "message" : "errorMessage"}>{this.state.message}</p>
                    <div className="buttons">
                        <Button id="editButton" label={this.state.editMode ? "Save changes" : "Edit"} type="button"
                            icon={this.state.editMode ? "pi pi-check-square" : "pi pi-user-edit"} iconPos="left" onClick={this.handleClick} />
                    </div>
                </div>

            </>
        )
    }
}

export default Profile;