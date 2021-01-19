import React from 'react';

const Header = () => {
    return (
        <header>
            <h2>Calendar App</h2>
            <div className='container-short container-log-button'>
            <a href='#' className='log-button button'>
                Logout
            </a>
            </div>
        </header>
    )
};

export default Header;