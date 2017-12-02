import React, {Component} from 'react'
import Navbar from './Navbar'
import {connect} from 'react-redux'
import { fb } from './services/fb'
import {connectFbPage} from './actionCreators'

class Pages extends Component {

    componentWillMount(){
        if (!this.props.pages.length) this.props.getFbPages()
    }

    onConnectFbPage = (payload) => {
        this.props.connectFbPage(payload)
        this.props.history.push('/automations')
    }

    render(){
        return(
            <div className='landing uk-height-1-1'>
                <Navbar />
                <div className="uk-grid uk-padding">
                    <div className="uk-width-3-3">
                        <h1 className="uk-heading-divider">
                            Pages
                        </h1>

                        <div className="uk-card uk-card-default uk-card-body">
                            <table className="uk-table uk-table-divider uk-table-middle">

                                <tbody>
                                    {this.props.pages.map(page => {
                                        return(
                                            <tr>
                                                <td><img className="uk-border-rounded" width="50" height="50" src={page.picture.data.url}></img></td>
                                                <td>{page.name}</td>
                                                <td><button className="uk-button uk-button-default uk-align-right" onClick={() => this.onConnectFbPage({...page, ...this.props.user})}>Connect</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        pages: state.pages
    }
}

const mapDispatchToProps = (dispatch) => ({
    getFbPages(){
        dispatch(fb.pages())
    },
    connectFbPage(payload){
        dispatch(connectFbPage(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
