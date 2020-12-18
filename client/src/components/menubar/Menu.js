import React from 'react'
import { Menubar } from 'primereact/menubar';
import { withRouter } from "react-router-dom";

class Menu extends React.Component {
    constructor() {
        super();

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
                icon: 'pi pi-fw pi-bell'
            },
            {
                label: 'Log out',
                icon: 'pi pi-fw pi-sign-out',
                command: () => {
                    alert('Are you sure?');
                    this.props.history.push('/');
                },
            }
        ]

    }

    render() {
        return (
            <>
                <Menubar style={{ backgroundColor: "#ebebeb", marginBottom: "80px" }} model={this.items} />
            </>
        )
    }
}

export default withRouter(Menu)