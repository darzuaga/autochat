import React, { Component } from 'react'
import data from '../data.json'
import {connect} from 'react-redux'
import{ triggerSelected, updateName } from './actionCreators'
import EditorActionElements from './EditorActionElements'
import EditorEventElements from './EditorEventElements'
import ElementsModal from './ElementsModal'

class EditorLeftNav extends Component {
    render(){
        return(
            <div className="editor_left_nav_container">

                <ul className="uk-nav uk-nav-default editor_left_nav_outer_ul">

                    <li className="uk-parent">
                        <a href="#">Name</a>
                        <ul className="uk-nav-sub">
                            <li>
                                <div className="uk-margin lef_nav_select_box">
                                    <input className="uk-input" type="text" value={this.props.name} onChange={this.props.updateName}/>
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li className="uk-parent">
                        <a href="#">Trigger</a>
                        <ul className="uk-nav-sub">
                            <li>
                                <select className="uk-select uk-form-width-medium lef_nav_select_box" onChange={this.props.selectTrigger}>
                                    <option selected></option>
                                    {data.events.map(event => {
                                        return(<option key={event.id} value={event.id}>{event.name}</option>)
                                    })}
                                </select>
                            </li>

                            {this.props.event_elements.map((event, index) => {
                                return(<li key={index}>{<EditorEventElements event={event} />}</li>)
                            })}
                        </ul>
                    </li>

                    <li className="uk-parent">
                        <a href="#">Action</a>
                        <ul className="uk-nav-sub">

                            <li>
                                <a href="#modal-example" uk-toggle=""><button className="uk-button uk-button-default add_element_btn">Add Element</button></a>
                            </li>

                            <li>
                                {this.props.action_elements.map((element, index) => {
                                    return(<div key={index}>{<EditorActionElements element={element}/>}</div>)
                                })}
                            </li>

                        </ul>
                    </li>

                </ul>

                <ElementsModal />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        action_elements: state.action_elements,
        event_elements: state.event_elements,
        name: state.name
    }
}

const mapDispatchToProps = (dispatch) => ({
    selectTrigger(event){
        dispatch(triggerSelected(event.target.value))
    },

    updateName(event){
        dispatch(updateName(event.target.value))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorLeftNav);
