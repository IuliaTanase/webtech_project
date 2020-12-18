import React from 'react'
import Menu from '../menubar/Menu'
import "./Profile.css"
import "./Profile.css"
import 'primeflex/primeflex.css';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

class AddAliment extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            weight: 0,
            ingredients: '',
            category: '',
            date: ''
        }

        this.categories = ['Vegetables', 'Fruits', 'Dairy', 'Fish', 'Meat', 'Bakery', 'Cereals', 'Sweets', 'Drinks', 'Home made'];
    }

    render() {
        return (
            <>
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
                                <InputText placeholder="Aliment name" id="name" type="text" />
                                {/* <InputText placeholder="Username" id="username" type="text" value={this.state.userName} readOnly={!this.state.editMode}
                                    onChange={(e) => { this.setState({ userName: e.target.value }) }} /> */}
                            </div>
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="weight">Weight</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-th-large"></i>
                                </span>
                                <InputText placeholder="Weight" id="weight" type="text" />
                                <span className="p-inputgroup-addon">Kg</span>
                                {/* <InputText placeholder="Email" id="email" type="email" value={this.state.email} readOnly={!this.state.editMode}
                                    onChange={(e) => { this.setState({ email: e.target.value }) }} /> */}
                            </div>
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="ingredients">Ingredients</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-info-circle"></i>
                                </span>
                                <InputText placeholder="Ingredients" id="ingredients" type="text" />
                                {/* <InputText placeholder="First Name" id="firstname" type="text" value={this.state.firstName} readOnly={!this.state.editMode}
                                    onChange={(e) => { this.setState({ firstName: e.target.value }) }} /> */}

                            </div>
                        </div>
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="expirationDate">Expiration date</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-calendar"></i>
                                </span>
                                <div className="p-field p-col-12 p-md-4">
                                    <label htmlFor="time24">Time / 24h</label>
                                    <Calendar id="time24" value={this.state.date} onChange={(e) => this.setState({ date: e.value })} showTime showSeconds />
                                </div>
                                {/* <InputText placeholder="First Name" id="firstname" type="text" value={this.state.firstName} readOnly={!this.state.editMode}
                                    onChange={(e) => { this.setState({ firstName: e.target.value }) }} /> */}

                            </div>
                        </div>
                        {/* <Dropdown value={this.state.category} options={this.categories} onChange={(e) => { this.setState({ category: e.value }) }} placeholder="Select a category" /> */}
                    </div>
                    {/* <p id={this.state.statusOk ? "message" : "errorMessage"}>{this.state.message}</p>
                    <div className="buttons">
                        <Button id="editButton" label={this.state.editMode ? "Save changes" : "Edit"} type="button"
                            icon="pi pi-user-edit" iconPos="left" onClick={this.handleClick} />
                    </div> */}
                </div>
            </>
        )
    }

}

export default AddAliment;