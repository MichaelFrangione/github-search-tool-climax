
import React from 'react';
import octocat from '../images/Octocat.png';

const Header = (props) => (
    <header>
        <div className="header-container">
            <img className="app-logo" src={octocat} alt="Octocat"/>
            <h1>GitHub Search Tool</h1>
        </div>
    </header>
 );

 export default Header;