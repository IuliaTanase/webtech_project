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

        this.onHide = () => {
            this.setState({
                displayDialog: false
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
                        this.setState({ aliments: newAliments });
                        this.showBottomRightSuccess();
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

    showBottomRightSuccess() {
        this.toastBR.show({ severity: 'success', summary: 'Success', detail: 'Aliment was successfully modified!', life: 3000 });
    }

    showBottomRightError(detail) {
        this.toastBR.show({ severity: 'error', summary: 'Error', detail: `${detail}`, life: 3000 });
    }

    renderListItem(data) {
        return (
            <div className="p-col-12">
                {
                 data.expirationDate.substring(0,10) > (new Date()).getFullYear() + '-' + (new Date()).getMonth() + 1 + '-' + (new Date()).getDate() && data.status === 'AVAILABLE'?

                <div className="product-list-item" style={{backgroundColor:'#98FB98'}}>
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
                    </div>
                </div>
                :
                data.status==='AVAILABLE'?
                <div className="product-list-item" style={{backgroundColor:'#FA8072'}}>
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
                    </div>
                </div>
                :
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
                    </div>
                </div>

                }
                
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
                <Toast ref={(el) => this.toastBR = el} position="bottom-right" />
                
            </>
                
                )
                
    }
}

export default UserAlimentsContainer;