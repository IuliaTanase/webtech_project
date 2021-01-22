import React from 'react'
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import Menu from "../menubar/Menu";
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown'
import '../aliments/Aliments.css';


class AddFriend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            friends: [],
            layout: 'list',
            toastBR: '',
            tags: {}
        }

        this.itemTemplate = this.itemTemplate.bind(this);

        this.tags = [
            { label: 'No tag', value: 'No tag' },
            { label: 'Vegan', value: 'Vegan' },
            { label: 'Carnivorous', value: 'Carnivorous' },
            { label: 'Allergic to diary', value: 'Allergic to diary' },
            { label: 'Fast food lover', value: 'Fast food lover' }
        ];

        this.handleAddClick = async (user) => {

            const SERVER = `http://localhost:8080/api/users`;
            const currentUserId = JSON.parse(localStorage.getItem("user")).id;

            const foundIndex = this.state.friends.findIndex(u => user.userName === u.userName);
            if (foundIndex !== -1) {
                this.showBottomRightError("This user is already your friend!");
            } else {
                const postResponse = await fetch(`${SERVER}/${currentUserId}/friends`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userName: user.userName,
                        name: user.name,
                        email: user.email,
                        tag: this.state.tags[user.id]
                    })
                });
                if (postResponse.ok) {
                    await postResponse.json();
                    let newFriends = this.state.friends;
                    newFriends.push(user);
                    this.showBottomRightSuccess();
                    this.setState({
                        friends: newFriends
                    });
                } else {
                    this.showBottomRightError("Oops! A problem has occured. Try again later.");
                }
            }
        }
    }


    async componentDidMount() {
        const SERVER = `http://localhost:8080/api/users`;
        const currentUserId = JSON.parse(localStorage.getItem("user")).id;

        const getResponse = await fetch(`${SERVER}/${currentUserId}/friends`);
        if (getResponse.ok) {
            const friends = await getResponse.json();
            this.setState({
                friends: friends
            });
        }

        const response = await fetch("http://localhost:8080/api/users");
        if (response.ok) {
            const allUsers = await response.json();
            let localTags = {};
            for (let i = 0; i < allUsers.length; i++) {
                localTags[allUsers[i].id] = '';
            }
            const foundCurrentUserIndex = allUsers.findIndex(user => user.id === currentUserId);
            if (foundCurrentUserIndex !== -1) {
                allUsers.splice(foundCurrentUserIndex, 1);
                this.setState({
                    users: allUsers,
                    tags: localTags
                });
            }
        } else {
            alert('HTTP-error: ' + response.status);
        }
    }

    itemTemplate(user) {
        if (!user) {
            return;
        }

        return this.renderListItem(user);
    }

    showBottomRightSuccess() {
        this.toastBR.show({ severity: 'success', summary: 'Success', detail: "The user has been successfully added to your friends list!", life: 3000 });
    }

    showBottomRightError(detail) {
        this.toastBR.show({ severity: 'error', summary: 'Error', detail: `${detail}`, life: 3000 });
    }

    setNewTags(id, newValue) {
        let local = this.state.tags;
        local[id] = newValue;

        this.setState({
            tags: local
        })
    }

    checkFriend(user) {
        const foundIndex = this.state.friends.findIndex(u => user.userName === u.userName);
        if (foundIndex !== -1) {
            return true;
        }

        return false;
    }

    renderListItem(data) {
        return (
            <div style={{ backgroundColor: "#ebebeb", width: "100%", borderTop: "1px solid lightgray" }}>
                <div className="p-col-12" >
                    <div className="product-list-item">
                        <img src={`images/unknown-user.png`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        <div className="product-list-detail" style={{ width: "70vw" }}>
                            <div className="product-name">{data.name}</div>
                            <div style={{ marginTop: "15px" }}>
                                <i className="pi pi-envelope product-category-icon"></i><span className="product-category">{data.email}</span>
                            </div>
                            <div className="product-weight"> <i className="pi pi-user product-category-icon"></i> {data.userName}</div>
                        </div>

                        {!this.checkFriend(data) ?
                            <>
                                <Dropdown id="dropdown" style={{ marginTop: "15px" }} placeholder="Select a tag" value={this.state.tags[data.id]}
                                    optionLabel="label" optionValue="value" options={this.tags} onChange={(e) => this.setNewTags(data.id, e.target.value)} />

                                <Button icon="pi pi-plus" label="Add friend" style={{ marginTop: "20px", marginLeft: "30px" }} onClick={() => this.handleAddClick(data)} />
                            </>
                            :
                            <p id="alreadyYourFriend">Already your friend</p>
                        }
                    </div>
                </div>
            </div>
        );
    }


    render() {
        return (
            <>
                <div id="background" style={{ backgroundImage: "url(/images/green-leaves.svg)" }}></div>
                <h1>Users</h1>
                <Menu />
                <div className="dataview-demo" >
                    <div className="card" >
                        <DataView value={this.state.users} layout={this.state.layout}
                            itemTemplate={this.itemTemplate} paginator rows={8} />

                    </div>
                </div>
                <Toast ref={(el) => this.toastBR = el} position="bottom-right" />

            </>
        )
    }
}

export default AddFriend;