import React from 'react'
import '../aliments/Aliments.css'
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import Menu from "../menubar/Menu";

class UserAlimentsContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            aliments: [],
            layout: 'list',
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

    renderListItem(data) {
        return (
            <div className="p-col-12">
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
                        <Button icon="pi pi-pencil" label="Edit" style={{ marginTop: "30px" }} />
                    </div>
                </div>
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
            </>
        )
    }
}

export default UserAlimentsContainer;