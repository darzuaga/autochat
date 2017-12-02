import React, { Component } from 'react'
import { connect } from 'react-redux'
import {saveToFirebase, updateFirebaseAutomation} from './actionCreators'


class MainEditor extends Component {
    render(){
        let save_update_btn;
        if(this.props.active_automation_id == ""){
            save_update_btn = <button className="uk-button uk-button-primary" onClick={() => this.props.saveToFirebase()}>Save</button>
        } else {
            save_update_btn = <button className="uk-button uk-button-primary" onClick={() => this.props.updateFirebaseAutomation(this.props.active_automation_id)}>Update</button>
        }

        return(
            <div className="uk-width-expand uk-text-center editor_main_container" uk-grid="true">

                <div className="uk-width-expand">

                    <nav className="uk-navbar-container editor_navbar" uk-navbar="">
                        <div className="uk-navbar-right">

                            <ul className="uk-navbar-nav">
                                <li className="uk-active ">
                                    <a href="#">{save_update_btn}</a>
                                </li>
                            </ul>

                        </div>
                    </nav>

                    <div className="uk-card uk-card-default uk-card-body messenger_container">
                        <div className="editor_container">

                            <img src="../public/img/iphone.png" className="iphone_img"></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        action_elements: state.action_elements,
        event_elements: state.event_elements,
        active_automation_id: state.active_automation_id
    })
}

const mapDispatchToProps = (dispatch) => ({
    saveToFirebase(){
        dispatch(saveToFirebase())
    },
    updateFirebaseAutomation(automation_id){
        dispatch(updateFirebaseAutomation(automation_id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainEditor);
