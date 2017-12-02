import React, { Component } from 'react'
import {firebase, firestore} from '../firebase'
import Navbar from './Navbar'
import { login } from './services/fb'
import {connect} from 'react-redux'
import {getUserFromFirebase, connectFbPage} from './actionCreators'

var pagesRef = firestore.collection('pages')

class FacebookLogin extends Component {

    componentWillMount = () => {
        let _this = this
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                _this.props.getUserFromFirebase(user.uid)
                pagesRef.where("fire_uid", "==", `${user.uid}`).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        let payload = doc.data()
                        this.props.connectFbPage(payload)
                    })
                    return (querySnapshot.size > 0) ? _this.onLogin('/automations') : _this.onLogin('/pages')
                })
            }
        })
    }

    onLogin = (path) => this.props.history.push(path)

    render(){
        return(
            <div className='landing uk-height-1-1'>
                <Navbar />
                <div className="uk-grid uk-padding">
                    <div className="uk-width-1-3 uk-align-center">
                        <h1 className="uk-heading-divider">
                            Login
                        </h1>

                        <div className="uk-card uk-card-default uk-card-body">
                            <button className="uk-button uk-button-primary uk-width-1-1 uk-button-large" onClick={() => login(this.onLogin)}>
                                LOGIN TO FACEBOOK
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUserFromFirebase(user){
        dispatch(getUserFromFirebase(user))
    },

    connectFbPage(page){
        dispatch(connectFbPage(page))
    }
})

export default connect(null, mapDispatchToProps)(FacebookLogin);
