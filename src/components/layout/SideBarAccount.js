import React from 'react';
import { Link } from 'react-router-dom';

const SideBarAccount = (props) => {
    function onClickContainer(e) {
        if (e.target.className.match('close-sidebar')) {
            props.closeSideBar();
        }
    }

    const firstLetter = props.user.charAt(0);
    return (
        <div className='popup-container close-sidebar' onClick={onClickContainer}>
            <div className='sidebar-container'>
                <div className='sidebar-header'>
                    <span>
                        {firstLetter.toUpperCase()}
                    </span>
                    <p>{props.user}</p>
                </div>
                <div className='sidebar-option-container'>
                    <ul>
                        <li className='sidebar-option'>
                            <Link
                                to='/logout'
                            >
                                Log out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBarAccount;