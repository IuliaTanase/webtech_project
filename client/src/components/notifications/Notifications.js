import React from 'react'
import Menu from '../menubar/Menu';
import './Notifications.css'
import { Message } from 'primereact/message';
import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';



class Notifications extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            aliments: [],
            layout: 'list',
            title: ''
        }

        this.itemTemplate = this.itemTemplate.bind(this);


        this.daysUntil = (data) => {
            let today = new Date();

            let yearNow = String(today.getFullYear());
            let monthNow = String(today.getMonth() + 1).padStart(2, '0');
            let dayNow = String(today.getDate()).padStart(2, '0');

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
                if (aliment.expirationDate.substring(0, 10) < (new Date()).getFullYear() + '-' + (new Date()).getMonth() + 1 + '-' + (new Date()).getDate() && aliment.status === 'AVAILABLE') {
                    numberOfExpiredAliments += 1;
                }
            }

            return numberOfExpiredAliments;
        }

        this.gonnaExpire = () => {
            let nrAlimentsGonnaExpire = 0;

            for (let aliment of this.state.aliments) {
                let daysUntilExpire = this.daysUntil(aliment.expirationDate);

                if (daysUntilExpire <= 3) {
                    nrAlimentsGonnaExpire += 1;
                }
            }

            return nrAlimentsGonnaExpire;
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

            this.notificationsNumber();
        } else {
            alert('HTTP-error: ' + response.status);
        }
    }

    notificationsNumber = () => {
        let alimentsGonnaExpire = [];
        for (let aliment of this.state.aliments) {
            let daysUntilExpire = this.daysUntil(aliment.expirationDate);
            if (daysUntilExpire <= 3) {
                alimentsGonnaExpire.push(aliment);
            }
        }
        this.setState({
            title: `You have ${alimentsGonnaExpire.length} notifications.`
        });
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
                                        this.daysUntil(data.expirationDate) <= 3 ?
                                            <div className='notification'>
                                                <Message className='msg' severity='warn' text={'Aliment ' + data.name + ' is going to expire in ' + this.daysUntil(data.expirationDate) + ' days'} />
                                            </div>
                                            :
                                            <> </>
                                    }
                                    </>
                            }
                        </div>
                        :
                        <div className='notification'> <Message className='msg' severity='info' text={'Aliment ' + data.name + ' is reserved.'} /> </div>
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
                            this.existingExpired() > 0 || this.gonnaExpire() > 0 ?
                                <Card title={this.state.title} >
                                    <DataView value={this.state.aliments} layout={this.state.layout}
                                        itemTemplate={this.itemTemplate} paginator rows={8} />
                                </Card>
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