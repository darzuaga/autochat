import React, { Component } from 'react'
import { updateElement } from './actionCreators'
import {connect} from 'react-redux'

class EditorEventElements extends Component {
    constructor(props){
        super(props)
        this.getBlockComponent = this.getBlockComponent.bind(this)
    }

    getBlockComponent(block){
        switch(block.name){
            case "KEYWORD":
                return(
                    <div className="event_keyword_container">
                        <input placeholder="Enter Keyword" value={block.text} onChange={(event) => this.props.updateElement(block, event)}></input>
                    </div>
                )
            case "HI":
                return(
                    <div className="event_keyword_container">
                        <input placeholder="Enter Keyword" value={block.text} onChange={this.props.updateElement(block, event)}></input>
                    </div>
                )
        }
    }

    render(){
        return(
            <div>{this.getBlockComponent(this.props.event)}</div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateElement(params, event){
        dispatch(updateElement({...params, text: event.target.value, event_type: 'event_elements'}))
    }
})

export default connect(null, mapDispatchToProps)(EditorEventElements);
