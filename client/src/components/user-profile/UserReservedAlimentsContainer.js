import React from 'react'
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import Menu from "../menubar/Menu";

class UserReservedAlimentsContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            reservations: [],
            aliments: [],
            layout: 'list'
        }

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
    }

    async componentDidMount() {
        const SERVER = 'http://localhost:8080/api/users';
        const currentUserId = JSON.parse(localStorage.getItem("user")).id;

        const response = await fetch(`${SERVER}/${currentUserId}/reservations`);
        if (response.ok) {
            const reservations = await response.json();
            let reservAlim = [];
            for (let reserv of reservations) {
                reservAlim.push(reserv.aliments[0]);
            }
            reservAlim = this.setAlimentImage(reservAlim);
            this.setState({
                reservations: reservations,
                aliments: reservAlim

            });
        } else {
            alert('Http error: ' + response.status);
        }
    }

    itemTemplate(reservation) {
        if (!reservation) {
            return;
        }

        return this.renderListItem(reservation);
    }

    renderListItem(data) {
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img src={`images/${data.aliments[0].image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.aliments[0].name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.aliments[0].name.toUpperCase()}</div>
                        <div className="prod-category">
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.aliments[0].category}</span>
                        </div>
                        <div className="prod-expDate">
                            <i className="pi pi-calendar"></i>
                            <span className="product-expirationDate">{`${data.aliments[0].expirationDate.substring(0, 10)} --> ${data.aliments[0].expirationDate.substring(11, 19)}`}</span>
                        </div>
                    </div>
                    <div className="product-list-action">
                        <i className="pi pi-clock product-category-icon"></i>
                        <div className="product-name">{`${data.date.substring(0, 10)} --> ${data.date.substring(11, 19)}`}</div>
                    </div>
                </div>
            </div>
        );
    }


    render() {
        return (
            <>
                <div id="background" style={{ backgroundImage: "url(/images/green-leaves.svg)" }}></div>
                <h1>My reservations</h1>
                <Menu />
                <div className="dataview-demo" >
                    <div className="card" >
                        <DataView value={this.state.reservations} layout={this.state.layout}
                            itemTemplate={this.itemTemplate} paginator rows={8} />
                    </div>
                </div>
            </>
        )
    }
}

export default UserReservedAlimentsContainer;