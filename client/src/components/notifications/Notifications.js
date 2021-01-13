import React from 'react'
import Menu from '../menubar/Menu';
import './Notifications.css'
import { Message } from 'primereact/message';
import { DataView } from 'primereact/dataview';


class Notifications extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            aliments: [],
            layout: 'list',
        }

        this.itemTemplate = this.itemTemplate.bind(this);

        this.daysUntil = (data) => {

            let yearNow = parseInt((new Date()).getFullYear());
            let monthNow = parseInt((new Date()).getMonth() + 1);
            let dayNow = parseInt((new Date()).getDate());

            if (yearNow === data.substring(0, 4)) {
                if (monthNow === data.substring(5, 7)) {
                    return data.substring(8, 10) - dayNow;
                }
            }
            return 5;
        }

        this.existingExpired = () => {
            let numberOfExpiredAliments = 0;
            for (let aliment of this.state.aliments) {
                if (aliment.expirationDate.substring(0, 10) < (new Date()).getFullYear() + '-' + (new Date()).getMonth() + 1 + '-' + (new Date()).getDate() && aliment.status == 'AVAILABLE') {
                    numberOfExpiredAliments += 1;
                }

            }
            console.log(numberOfExpiredAliments);
            return numberOfExpiredAliments;
        }

    }

    async componentDidMount() {
        const SERVER = "http://localhost:8080/api/users";
        const userId = JSON.parse(localStorage.getItem("user")).id;

        const response = await fetch(`${SERVER}/${userId}/aliments`);
        if (response.ok) {
            const alim = await response.json();
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
            <>
                {
                    data.status === 'AVAILABLE' ?

                        <div className="p-col-12">
                            {
                                data.expirationDate.substring(0, 10) < (new Date()).getFullYear() + '-' + (new Date()).getMonth() + 1 + '-' + (new Date()).getDate() ?
                                    <div className='notification'>
                                        <Message className='msg' severity='error' text={'Aliment ' + data.name + ' expired on ' + data.expirationDate.substring(0, 10)} />
                                    </div>
                                    :
                                    <> {
                                        this.daysUntil(data.expirationDate) < 5 ?
                                            <div className='notification'>
                                                <Message severity='warn' text={'Aliment ' + data.name + ' is going to expire in ' + this.daysUntil(data.expirationDate) + 'days'} />
                                            </div>
                                            :
                                            <>
                                            </>
                                    }
                                    </>
                            }
                        </div>
                        :
                        <>
                        </>
                }
            </>
        )
    }

    render() {
        return (
            <div>
                <div id="background" style={{ backgroundImage: "url(/images/green-leaves.svg)" }}></div>
                <h1>Notifications</h1>
                <Menu />
                <div className="dataview-demo">
                    <div className="card" >
                        {
                            this.existingExpired() !== 0 ?
                                <DataView value={this.state.aliments} layout={this.state.layout}
                                    itemTemplate={this.itemTemplate} paginator rows={8} />
                                :
                                <div>
                                    <svg>
                                        <text id='lucky' x='500' y='100'>You are lucky!</text>
                                        <text id='nothing' x='600' y='140'>There's no notification here.</text>
                                        <text id='good' x='500' y='180'>All aliments are good to eat.</text>
                                    </svg>
                                </div>
                        }

                    </div>
                </div>

            </div>

        )
    }
}

export default Notifications