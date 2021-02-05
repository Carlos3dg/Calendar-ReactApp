import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = ({ location }) => (
    <div className="center-items-container">
        <div className='error404-container'>
            <div className='error404-header-text'>
                <h1>Oops!</h1>
                <h4>404 - Page Not Found</h4>
            </div>
            <div className='error404-main-text'>
                <div>
                    <p>The requested URL {location} was not found on this server.</p>
                </div>
                <div>
                    <p>Try to go to some of the helpful links instead:</p>
                    <ul>
                        <li>
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/login'>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/calendar'>
                                Calendar
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

export default Page404;