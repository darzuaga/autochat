import React from 'react'

const Navbar = () => {
    return(
        <nav className="uk-navbar-container navbar-container" uk-navbar="">
            <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                    <li className="uk-active"><a href="/"><img src="../public/img/automate_logo.jpg" className="automate_logo_img"></img></a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
