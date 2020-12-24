import React from 'react'
import Menu from '../menubar/Menu'
import "./Profile.css"
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

class AddAliment extends React.Component {
    constructor(props) {
        super(props);

        const SERVER = 'http://localhost:8080/api/users';
        this.state = {
            name: '',
            weight: '',
            ingredients: '',
            category: '',
            date: null,
            message: '',
            statusOk: true,
            toastBR: ''
        }

        this.categories = ['Vegetables', 'Fruits', 'Dairy', 'Fish', 'Meat', 'Bakery', 'Cereals', 'Sweets', 'Drinks', 'Home made'];

        this.handleClick = async () => {
            if (this.isCorrectlyCompleted()) {
                const currentUserId = JSON.parse(localStorage.getItem("user")).id;
                const response = await fetch(`${SERVER}/${currentUserId}/aliments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        category: this.state.category,
                        expirationDate: this.state.date.toISOString(),
                        ingredients: this.state.ingredients,
                        weight: this.state.weight
                    })
                });
                if (response.ok) {
                    await response.json();
                    this.setState({
                        message: 'Aliment was successfully added to your aliments list!',
                        name: '',
                        weight: '',
                        ingredients: '',
                        category: '',
                        date: null,
                    });
                    this.showBottomRightSuccess();
                    setTimeout(() => this.setState({ message: '' }), 3000);
                } else {
                    if (response.status === 404) {
                        this.setState({
                            message: "Oops! It seems like the user doesn't exist."
                        });
                        this.showBottomRightError("Oops! It seems like the user doesn't exist.");
                    } else {
                        this.setState({
                            message: "Oops! A problem has occured. Try again later."
                        });
                        this.showBottomRightError('Oops! A problem has occured. Try again later.');
                    }
                }
            }
        }

        this.isCorrectlyCompleted = () => {
            const match = /^[0-9]+$/;
            if (this.state.name.length < 3 || !this.state.name || this.state.name.match(match)) {
                this.setState({
                    message: 'The aliment must have at least 3 letters!',
                    statusOk: false
                });
                return false;
            } else {
                if (!this.state.weight || this.state.weight < 0) {
                    this.setState({
                        message: 'The aliment weight must be properly completed!',
                        statusOk: false
                    });
                    return false;
                } else {
                    if (!this.state.date) {
                        this.setState({
                            message: 'Please select the aliment expiration date!',
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

    showBottomRightSuccess() {
        this.toastBR.show({ severity: 'success', summary: 'Success', detail: 'Aliment was successfully added to your aliments list!', life: 3000 });
    }

    showBottomRightError(detail) {
        this.toastBR.show({ severity: 'error', summary: 'Error', detail: `${detail}`, life: 3000 });
    }


    render() {
        return (
            <>
                <div id="background" style={{ backgroundImage: "url(/images/green-leaves.svg)" }}></div>
                <h1>Add new aliment</h1>
                <Menu />
                <div id="formContainer" className="p-shadow-24">
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="name">Aliment name</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-apple"></i>
                                </span>
                                <InputText placeholder="Aliment name" id="name" type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                            </div>
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="weight">Weight</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-th-large"></i>
                                </span>
                                <InputText placeholder="Weight" id="weight" type="text" value={this.state.weight} onChange={(e) => this.setState({ weight: e.target.value })} />
                                <span className="p-inputgroup-addon">Kg</span>
                            </div>
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="expirationDate">Category</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-tags"></i>
                                </span>
                                <Dropdown placeholder="Select a category" value={this.state.category} options={this.categories} onChange={(e) => { this.setState({ category: e.target.value }) }} />
                            </div>
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="expirationDate">Expiration date</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-calendar"></i>
                                </span>
                                <Calendar placeholder="Select expiration date" dateFormat="yy-mm-dd" value={this.state.date} onChange={(e) => this.setState({ date: e.target.value })} showTime showSeconds />
                            </div>
                        </div>

                        <div className="p-col-12 p-md-12">
                            <label htmlFor="ingredients">Ingredients</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-info-circle"></i>
                                </span>
                                <InputText placeholder="Ingredients" id="ingredients" type="text" value={this.state.ingredients} onChange={(e) => this.setState({ ingredients: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <p id={this.state.statusOk ? "message" : "errorMessage"}>{this.state.message}</p>
                    <div className="buttons">
                        <Button id="addButton" label="Add aliment" type="button"
                            icon="pi pi-plus-circle" iconPos="left" onClick={this.handleClick} />
                    </div>
                </div>
                <Toast ref={(el) => this.toastBR = el} position="bottom-right" />
            </>
        )
    }
}



export default AddAliment;