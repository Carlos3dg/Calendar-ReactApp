import React from 'react';
import { Link } from 'react-router-dom';

const SideBarAccount = (props) => {
    //Determine if the user email has more than 20 characters, if so, then slice it and add '...'
    function sliceUserEmail (user, limit) {
        if (user.length > limit) {
            return user.slice(0, limit) + '...';
        } else {
            return user;
        }
    }

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
                    <p>{sliceUserEmail(props.user, 21)}</p>
                </div>
                <div className='sidebar-option-container'>
                    <ul>
                        <li className='sidebar-option'>
                            <Link
                                to='/logout'
                                className='close-sidebar'
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