import React, { Component } from 'react'
import { updateElement } from './actionCreators'
import { connect } from 'react-redux'
import ContentEditable from "react-contenteditable"
import { storage } from '../firebase'

class EditorActionElements extends Component {
    constructor(props){
        super(props)
        this.getBlockComponent = this.getBlockComponent.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
    }

    uploadImage(params, e){
        var props = this.props
        var file = e.target.files[0]
        var storageRef = storage.ref(`pages/${this.props.active_fb_page_id}/automations/${file.name}`)
        var task = storageRef.put(file)

        task.on('state_changed',function completed(){
                console.log('completed');
                storageRef.getDownloadURL().then(url => {
                    console.log({...params, name: "Image", url});
                    props.updateElement({...params, name: "Image", url})
                })
            }
        )
    }

    getBlockComponent(block){
        switch(block.name){
            case "TextMessage":
                return(
                    <div className="text_message_container" >
                        <ContentEditable className="text_message_text" html={block.text} onChange={(e) => this.props.updateElement({...block, text: e.target.value}, e)}/>
                    </div>
                )
            case "UploadImage":
                return(
                    <div className="action_image_container" >
                        <input type="file" id="UploadImage" onChange={(e) => this.uploadImage(block, e)} />
                    </div>
                )
            case "Image":
                return(
                    <div className="action_image_container" >
                        <img className="uk-border-rounded uk-align-right" src={block.url} alt="Border rounded"/>
                    </div>
                )
        }
    }

    render(){
        return(<div>{this.getBlockComponent(this.props.element)}</div>)
    }
}

const mapStateToProps = (state) => {
    return {
        active_fb_page_id: state.active_fb_page.id
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateElement(params, event){
        dispatch(updateElement({...params, event_type: 'action_elements'}))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorActionElements);
