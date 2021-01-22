import React from "react"
import './Aliments.css'
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import Menu from "../menubar/Menu";
import { Toast } from 'primereact/toast';



class AlimentsContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            aliments: [],
            layout: 'grid',
            itemBackgroundColor: ''
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

        this.handleClick = async (data) => {
            const alimentId = data.id;
            const alimentUserId = data.userId;

            const currentUserId = JSON.parse(localStorage.getItem("user")).id;
            if (alimentUserId !== currentUserId) {
                const res = await fetch(`http://localhost:8080/api/users/${currentUserId}/reservations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        date: new Date().toISOString(),
                        alimentsIds: [alimentId]
                    })
                });

                if (res.ok) {
                    const newReservation = await res.json();
                    const response = await fetch(`http://localhost:8080/api/users/${alimentUserId}/aliments/${alimentId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ...data, status: 'RESERVED', reservationId: newReservation.id
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
                        }

                    } else {
                        alert(response.status);
                    }
                } else {
                    alert(res.status);
                }
            } else {
                this.showBottomRightError();
            }
        }

        this.daysUntil = (data) => {
            let yearNow = parseInt((new Date()).getFullYear());
            let monthNow = parseInt((new Date()).getMonth() + 1);
            let dayNow = parseInt((new Date()).getDate());

            if (yearNow === data.substring(0, 4)) {
                if (monthNow === data.substring(5, 7)) {
                    return data.substring(8, 10) - dayNow;
                }
            }
            return data.substring(8, 10) - dayNow;//return 5;
        }

    }

    showBottomRightSuccess() {
        this.toastBR.show({ severity: 'success', summary: 'Success', detail: 'Aliment was successfully reserved!', life: 3000 });
    }

    showBottomRightError() {
        this.toastBR.show({ severity: 'error', summary: 'Error', detail: "You can't reserve your own aliment!", life: 3000 });
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:8080/api/aliments`);

        const aliments = await response.json();
        let alim = this.setAlimentImage(aliments);
        this.setState({
            aliments: alim
        });
    }

    itemTemplate(aliment) {
        if (!aliment) {
            return;
        }
        return this.renderGridItem(aliment);
    }

    setItemBackgroundColor(data) {
        let background = "";

        if (this.daysUntil(data.expirationDate) > 3 && data.status === 'AVAILABLE') {
            background = '#bae3ba';
        } else {
            if (data.status === 'AVAILABLE') {
                console.log(this.daysUntil(data.expirationDate))
                if (this.daysUntil(data.expirationDate) <= 0) {
                    background = '#cf6b5f';
                } else if (this.daysUntil(data.expirationDate) <= 3) {
                    background = '#ebe4ab';
                }
            }
        }
        return background;
    }

    renderGridItem(data) {
        return (
            <>
                <div className="p-col-12 p-lg-3 p-sm-6">
                    <div className="product-grid-item card" style={{ backgroundColor: this.setItemBackgroundColor(data) }}>
                        <div className="product-grid-item-top">
                            <div>
                                <i className="pi pi-tag product-category-icon"></i>
                                <span className="product-category">{data.category ? data.category.toUpperCase() : "-"}</span>
                            </div>
                            <span className={`product-badge status-${data.status.toLowerCase()}`}>{data.status}</span>
                        </div>
                        <div className="product-grid-item-content">

                            <img src={`images/${data.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                            <div className="product-name">{data.name}</div>
                            <div className="product-ingredients">{data.ingredients}</div>
                            <div className="product-expirationDate">
                                <i className="pi pi-calendar product-category-icon"></i>{data.expirationDate.substring(0, 10) + "--->" + data.expirationDate.substring(11, 19)}
                            </div>

                        </div>
                        <div className="product-grid-item-bottom">
                            <div>
                                <i className="pi pi-th-large product-category-icon"></i>
                                <span className="product-weight">{data.weight} Kg</span>
                            </div>
                            <Button className="p-button-sm" icon="pi pi-shopping-cart" label="GET IT" disabled={data.status === 'RESERVED'}
                                onClick={() => this.handleClick(data)}></Button>
                        </div>
                    </div>
                </div>

            </>
        );
    }

    render() {
        return (
            <>
                <div id="background" style={{ backgroundImage: "url(/images/green-leaves.svg)" }}></div>
                <h1>Aliments</h1>
                <Menu />
                <div className="dataview-demo" >
                    <div className="card">
                        <DataView value={this.state.aliments} layout={this.state.layout}
                            itemTemplate={this.itemTemplate} paginator rows={8} />
                    </div>
                </div>
                <Toast ref={(el) => this.toastBR = el} position="bottom-right" />
            </>
        )
    }
}

export default AlimentsContainer;