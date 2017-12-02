import React from 'react'
import Navbar from './Navbar'

const Dashboard = () => {
    return(
        <div className='landing uk-height-1-1'>
            <Navbar />
            <div className="uk-grid uk-padding">
                <div className="uk-width-3-3">
                    <h1 className="uk-heading-divider">
                        Dashboard
                        <button className="uk-button uk-button-primary uk-align-right">New</button>
                    </h1>

                    <div className="uk-card uk-card-default uk-card-body">
                        <table className="uk-table uk-table-divider uk-table-middle">
                            <thead>
                                <tr>
                                    <th>Table Heading</th>
                                    <th>Table Heading</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Table Data</td>
                                    <td>Table Data</td>
                                    <td><button className="uk-button uk-button-default uk-align-right">Edit</button></td>
                                </tr>
                                <tr>
                                    <td>Table Data</td>
                                    <td>Table Data</td>
                                    <td><button className="uk-button uk-button-default uk-align-right">Edit</button></td>
                                </tr>
                                <tr>
                                    <td>Table Data</td>
                                    <td>Table Data</td>
                                    <td><button className="uk-button uk-button-default uk-align-right">Edit</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
