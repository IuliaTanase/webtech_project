import { Button } from 'primereact/button';
import React from 'react'
import './Home.css'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickCreateAccount = () => {
            this.props.history.push('/create-account');
        }

        this.handleClickSignIn = () => {
            this.props.history.push('/sign-in');
        }
    }

    render() {
        return (
            <>
                <div id="background" style={{ backgroundImage: "url(/images/background.svg)" }}></div>
                <div id="homeContainer">
                    <h1>FoodWaste App</h1>
                    <div className="buttons">
                        <Button id="btnCreateAccount" label="Create account" className="p-button-lg" icon="pi pi-user-plus" iconPos="left" onClick={this.handleClickCreateAccount} />
                        <Button id="btnSignIn" label="Sign in" className="p-button-lg" icon="pi pi-sign-in" iconPos="left" onClick={this.handleClickSignIn} />
                    </div>
                </div>
            </>
        )
    }
}

export default Home;