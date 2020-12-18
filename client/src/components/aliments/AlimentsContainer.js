import React from "react"
import './Aliments.css'
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import Menu from "../menubar/Menu";

class AlimentsContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            aliments: [],
            layout: 'grid',
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
        const response = await fetch("http://localhost:8080/api/aliments");

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

    renderGridItem(data) {
        return (
            <div className="p-col-12 p-lg-3 p-sm-6">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.category.toUpperCase()}</span>
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
                        <Button className="p-button-sm" icon="pi pi-shopping-cart" label="GET IT" disabled={data.status === 'RESERVED'}></Button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                <h1>Aliments</h1>
                <Menu />
                <div className="dataview-demo">
                    <div className="card">
                        <DataView value={this.state.aliments} layout={this.state.layout}
                            itemTemplate={this.itemTemplate} paginator rows={8} />
                    </div>
                </div>
            </>
        )
    }
}

export default AlimentsContainer;