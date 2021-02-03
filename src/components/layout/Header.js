import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/app-icon/icon-70x70.png';

const Header = ({ token }) => {
    return (
        <header className={!token ? 'white-header' : 'gradient-header'}>
            <Link to='/' className='home-link'>
                {!token ? <img src={logo} alt="Calendar App" /> : null}
                <h2>Calendar App</h2>
            </Link>
            <div className='container-short container-log-button'>
                {
                    token ? (
                        <Link
                            to='/logout'
                            className='log-button button'
                        >
                            Log out
                        </Link>
                    ) : (
                            <Link
                                to='/login'
                                className='log-button button'
                            >
                                Login
                            </Link>
                        )
                }
            </div>
        </header>
    )
};

export default Header;