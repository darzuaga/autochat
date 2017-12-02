import React, { Component } from 'react'
import { getAllAutomationsFromFirebase, getAutomationFromFirebase, deleteAutomation, addNewAutomation } from './actionCreators'
import {connect} from 'react-redux'
import _ from 'lodash'

class MessagesList extends Component {
    componentWillMount(){
        this.props.getAllAutomationsFromFirebase(this.props.active_fb_page_id)
    }

    render(){
        return(
            <div className="messages_list_container">

                <div className="messages_list_cards_container">

                    <button className="uk-button uk-button-primary uk-width-1-1 add_new_message_btn" onClick={() => this.props.addNewAutomation()}>
                        New Message
                        <span uk-icon="icon: plus-circle" className="add_new_message_btn_icon"></span>
                    </button>

                    {_.map(this.props.automations, (automation, key) => {
                        return(
                            <div className="uk-card uk-card-default uk-card-body messages_list_card_container" key={automation_key} id={automation_key} onClick={() => this.props.getAutomationFromFirebase(this.props.active_fb_page_id, automation_key)}>
                                <button className="messages_list_card_delete_btn_container" onClick={() => this.props.deleteAutomation(this.props.active_fb_page_id, key)}><div className="messages_list_card_delete_btn">-</div></button>
                                <a href="" uk-icon="icon: chevron-right" className="messages_list_card_icon"></a>
                                <div>{automation.name}</div>
                            </div>
                        )
                    })}

                </div>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        automations: state.automations,
        active_fb_page_id: state.active_fb_page.id
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllAutomationsFromFirebase(fb_page_id){
        dispatch(getAllAutomationsFromFirebase(fb_page_id))
    },

    getAutomationFromFirebase(fb_page_id, automation_id){
        dispatch(getAutomationFromFirebase(fb_page_id, automation_id))
    },

    deleteAutomation(fb_page_id, automation_id){
        dispatch(deleteAutomation(fb_page_id, automation_id))
    },

    addNewAutomation(){
        dispatch(addNewAutomation())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)
