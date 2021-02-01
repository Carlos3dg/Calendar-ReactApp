import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ token }) => {
    return (
        <header>
            <h2>Calendar App</h2>
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
                                Log in
                            </Link>
                        )
                }
            </div>
        </header>
    )
};

export default Header;