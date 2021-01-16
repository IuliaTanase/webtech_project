import React from 'react'
import '../aliments/Aliments.css'
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import Menu from "../menubar/Menu";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

class UserAlimentsContainer extends React.Component {
    constructor() {
        super();

        const SERVER = 'http://localhost:8080/api/users';

        this.state = {
            aliments: [],
            layout: 'list',
            displayConfirmation: false,
            message: '',
            statusOk: true,
            displayDialog: false,
            selectedItem: null,
            toastBR: '',
            id: '',
            name: '',
            ingredients: '',
            weight: ''
        };

        this.itemTemplate = this.itemTemplate.bind(this);

        this.setAlimentImage = (aliments) => {
            let alim = aliments;

            for (let aliment of alim) {
                switch (aliment.category) {
                    case 'Vegetables':
                        aliment.image = 'vegetables.jpg';
                        break;
                    case 'Fruits':
                        aliment.image = 'fruits.jpg';
                        break;
                    case 'Bakery':
                        aliment.image = 'bakery.jpg';
                        break;
                    case 'Meat':
                        aliment.image = 'meat.jpg';
                        break;
                    case 'Fish':
                        aliment.image = 'fish.jpg';
                        break;
                    case 'Dairy':
                        aliment.image = 'dairy.png';
                        break;
                    case 'Cereals':
                        aliment.image = 'cereals.jpg';
                        break;
                    case 'Sweets':
                        aliment.image = 'sweets.jpg';
                        break;
                    case 'Home made':
                        aliment.image = 'homemade.png';
                        break;
                    case 'Drinks':
                        aliment.image = 'drinks.png';
                        break;
                    default: break;
                }
            }
            return alim;
        }

        this.handleEditClick = (data) => {
            this.setState({
                selectedItem: data,
                displayDialog: true,
                id: data.id,
                name: data.name,
                ingredients: data.ingredients,
                weight: data.weight
            });
        }

        this.showDeleteDialog = (data) => {
            this.setState({
                displayConfirmation: true,
                selectedItem: data
            })
        }

        this.handleDeleteAliment = async (selectedAliment) => {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const alimentId = this.state.selectedItem.id;

            const response = await fetch(`${SERVER}/${userId}/aliments/${alimentId}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                const alimentsAfterDelete = this.state.aliments;
                const foundIndex = alimentsAfterDelete.findIndex(aliment => aliment.id === alimentId);
                if (foundIndex !== -1) {
                    alimentsAfterDelete.splice(foundIndex, 1);
                    this.setState({
                        aliments: alimentsAfterDelete
                    });
                    this.onHide();
                    this.showBottomRightSuccess("Aliment was successfully deleted!");
                }
            }
        }

        this.onHide = () => {
            this.setState({
                displayDialog: false,
                displayConfirmation: false
            });
        }

        this.saveChanges = async () => {
            if (this.isCorrectlyCompleted()) {
                const userId = JSON.parse(localStorage.getItem("user")).id;
                const response = await fetch(`${SERVER}/${userId}/aliments/${this.state.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...this.state.selectedItem,
                        name: this.state.name,
                        ingredients: this.state.ingredients,
                        weight: this.state.weight
                    })
                });
                if (response.ok) {
                    const updatedAliment = await response.json();
                    let newAliments = this.state.aliments;
                    const foundIndex = newAliments.findIndex(aliment => aliment.id === updatedAliment.id);
                    if (foundIndex !== -1) {
                        newAliments[foundIndex] = updatedAliment;
                        newAliments = this.setAlimentImage(newAliments);
                        this.setState({ aliments: newAliments, selectedItem: null });
                        this.showBottomRightSuccess("Aliment was successfully modified!");
                        this.onHide();
                    }
                } else {
                    this.showBottomRightError("An error has occured");
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
                    if (!this.state.ingredients || this.state.ingredients.length < 2) {
                        this.setState({
                            message: 'Ingredients must have at least 2 letters!',
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
        this.daysUntil = (data) => {

            console.log(data)
            let yearNow = parseInt((new Date()).getFullYear());
            let monthNow = parseInt((new Date()).getMonth() + 1);
            let dayNow = parseInt((new Date()).getDate());

            
            if (yearNow == data.substring(0, 4)) {
                if (monthNow == data.substring(5, 7)) {
                    
                    return data.substring(8, 10) - dayNow;
                }
            }
            return 5;
        }

    }

    async componentDidMount() {
        const SERVER = "http://localhost:8080/api/users";
        const userId = JSON.parse(localStorage.getItem("user")).id;

        const response = await fetch(`${SERVER}/${userId}/aliments`);
        if (response.ok) {
            const aliments = await response.json();
            let alim = this.setAlimentImage(aliments);
            this.setState({
                aliments: alim
            });
        } else {
            alert('HTTP-error: ' + response.status);
        }

    }

    itemTemplate(aliment) {
        if (!aliment) {
            return;
        }

        return this.renderListItem(aliment);
    }

    showBottomRightSuccess(detail) {
        this.toastBR.show({ severity: 'success', summary: 'Success', detail: `${detail}`, life: 3000 });
    }

    showBottomRightError(detail) {
        this.toastBR.show({ severity: 'error', summary: 'Error', detail: `${detail}`, life: 3000 });
    }

    setItemBackgroundColor(data) {
        let background = "";

        if (this.daysUntil(data.expirationDate) > 3 && data.status === 'AVAILABLE') {
            background = '#98FB98';

        } else {
            if (data.status == 'AVAILABLE') {
                if(this.daysUntil(data.expirationDate) <= 0){

                    background = '#FA8072';
                }else if (this.daysUntil(data.expirationDate) <=3){
                    background = '#F0E68C';
                }
                
            } else {
                background = 'ebebeb';
            }
        }
        return background;
    }

    renderListItem(data) {
        return (
            <div className="p-col-12" style={{ backgroundColor: this.setItemBackgroundColor(data) }}>
                <div className="product-list-item">
                    <img src={`images/${data.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-ingredients">{data.ingredients}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                        <div className="product-price">{data.weight}Kg</div>
                    </div>
                    <div className="product-list-action">
                        <span className={`product-badge status-${data.status.toLowerCase()}`}>{data.status}</span>
                        <Button icon="pi pi-pencil" label="Edit" style={{ marginTop: "30px" }} onClick={() => this.handleEditClick(data)} />
                        <Button icon="pi pi-trash" label="Delete" style={{ marginTop: "10px", backgroundColor: "#9c0e02" }} onClick={() => this.showDeleteDialog(data)} />
                    </div>
                </div>
            </div>
        );
    }

    renderFooter() {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => this.onHide()} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => this.handleDeleteAliment(this.state.selectedItem)} autoFocus />
            </div>
        );
    }

    render() {
        return (
            <>
                <div id="background" style={{ backgroundImage: "url(/images/green-leaves.svg)" }}></div>
                <h1>My aliments</h1>
                <Menu />
                <div className="dataview-demo" >
                    <div className="card" >
                        <DataView value={this.state.aliments} layout={this.state.layout}
                            itemTemplate={this.itemTemplate} paginator rows={8} />

                    </div>
                </div>
                <Dialog header="Edit aliment" visible={this.state.displayDialog} style={{ width: '50vw' }} onHide={this.onHide}>
                    {
                        this.state.selectedItem &&
                        <>
                            <div id="editContainer">
                                <div className="attributeContainer">
                                    <label className="labels">Name:</label>
                                    <InputText placeholder={this.state.name} value={this.state.name}
                                        className="inputs" onChange={(e) => this.setState({ name: e.target.value })} />
                                </div>
                                <div className="attributeContainer">
                                    <label className="labels">Ingredients:</label>
                                    <InputText required placeholder={this.state.ingredients} value={this.state.ingredients}
                                        className="inputs" onChange={(e) => this.setState({ ingredients: e.target.value })} />
                                </div>
                                <div className="attributeContainer">
                                    <label className="labels">Weight:</label>
                                    <InputText required placeholder={this.state.weight} value={this.state.weight}
                                        className="inputs" onChange={(e) => this.setState({ weight: e.target.value })} />
                                </div>
                            </div>
                            <p id="errorMessage">{this.state.message}</p>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                                <Button label="Apply" onClick={this.saveChanges} />
                            </div>

                        </>
                    }
                </Dialog>
                <Dialog header="Delete aliment" visible={this.state.displayConfirmation} modal style={{ width: '350px' }}
                    footer={this.renderFooter()} onHide={() => this.onHide()}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        <span>Are you sure you want to delete this aliment?</span>
                    </div>
                </Dialog>
                <Toast ref={(el) => this.toastBR = el} position="bottom-right" />

            </>
        )

    }
}

export default UserAlimentsContainer;