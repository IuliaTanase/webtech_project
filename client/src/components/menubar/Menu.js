import React from 'react'
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { withRouter } from "react-router-dom";

class Menu extends React.Component {
    constructor() {
        super();

        this.state = {
            displayConfirmation: false
        }

        this.items = [
            {
                label: 'My profile',
                icon: 'pi pi-fw pi-id-card',
                items: [
                    {
                        label: 'Profile settings',
                        icon: 'pi pi-fw pi-cog',
                        url: 'http://localhost:3000/profile'
                    },
                    {
                        label: 'My aliments',
                        icon: 'pi pi-fw pi-apple',
                        items: [
                            {
                                label: 'Add new aliment',
                                icon: 'pi pi-fw pi-plus',
                                url: 'http://localhost:3000/add-new-aliment'
                            },
                            {
                                label: 'See all aliments',
                                icon: 'pi pi-fw pi-chevron-circle-right',
                                url: 'http://localhost:3000/my-aliments'
                            },

                        ]
                    },
                    {
                        label: 'Reserved aliments',
                        icon: 'pi pi-fw pi-key',
                        url: 'http://localhost:3000/reserved-aliments'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export aliments',
                        icon: 'pi pi-fw pi-external-link',
                        items: [
                            {
                                label: 'via Facebook',
                                icon: 'pi pi-fw pi-facebook'
                            },
                            {
                                label: 'via Instagram',
                                icon: 'pi pi-fw pi-camera'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Available aliments',
                icon: 'pi pi-fw pi-apple',
                url: 'http://localhost:3000/aliments'
            },
            {
                label: 'Friends',
                icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Add a new friend',
                        icon: 'pi pi-fw pi-plus',
                    },
                    {
                        label: 'See all friends',
                        icon: 'pi pi-fw pi-chevron-circle-right',
                    }
                ]
            },
            {
                label: 'Notifications',
                icon: 'pi pi-fw pi-bell',
                url:'http://localhost:3000/notifications'
            },
            {
                label: 'Log out',
                icon: 'pi pi-fw pi-sign-out',
                command: () => {
                    this.setState({
                        displayConfirmation: true
                    })

                },
            }
        ]

        this.acceptedLogOut = () => {
            localStorage.removeItem("user");
            this.props.history.push('/');
        }

        this.onHide = () => {
            this.setState({
                displayConfirmation: false
            })
        }

    }

    renderFooter() {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => this.onHide()} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => this.acceptedLogOut()} autoFocus />
            </div>
        );
    }

    render() {
        return (
            <>
                <Menubar style={{ backgroundColor: "#ebebeb", marginBottom: "80px", position: "relative", zIndex: "2" }} model={this.items} />
                <Dialog header="Log out" visible={this.state.displayConfirmation} modal style={{ width: '350px' }}
                    footer={this.renderFooter()} onHide={() => this.onHide()}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        <span>Are you sure you want to log out?</span>
                    </div>
                </Dialog>
            </>
        )
    }
}

export default withRouter(Menu)