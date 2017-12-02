import React, {Component} from 'react'
import Navbar from './Navbar'
import EditorLeftNav from './EditorLeftNav'
import MainEditor from './MainEditor'
import MessagesList from './MessagesList'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class Landing extends Component {

    addPage = () => this.props.history.push('/pages')

    render(){
        return(
            <div className='landing uk-height-1-1'>
                <Navbar />
                <div className="uk-grid">

                    <div className="accounts_sidenav uk-height-1-1">

                        <button className="connect_new_account_btn_container" onClick={this.addPage}>
                            <span uk-icon="icon: plus"></span>
                        </button>

                        <button className="connected_fb_accounts_container">
                            <img src={this.props.active_fb_page.picture.data.url} className="connected_fb_account_img"></img>
                        </button>

                    </div>

                    <MessagesList />
                    <EditorLeftNav />
                    <MainEditor />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        active_fb_page: state.active_fb_page
    }
}

export default connect(mapStateToProps)(Landing);
