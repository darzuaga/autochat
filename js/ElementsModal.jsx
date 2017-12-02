import React from 'react'
import {connect} from 'react-redux'
import{ addAction } from './actionCreators'

const ElementsModal = (props) => {
    return(
        <div id="modal-example" uk-modal="">
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Elements</h2>

                <button className="message_element_container uk-modal-close" value="UploadImage" onClick={props.addAction} >
                    <span href="" uk-icon="icon: image" className="element_icon_container">
                        <p className="icon_name">Image</p>
                    </span>
                </button>

                <button className="message_element_container uk-modal-close" value="TextMessage" onClick={props.addAction} >
                    <span href="" uk-icon="icon: table" className="element_icon_container">
                        <p className="icon_name">Text</p>
                    </span>
                </button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
        addAction(event){
            dispatch(addAction(event.target.value))
        }
})

export default connect(null, mapDispatchToProps)(ElementsModal);
