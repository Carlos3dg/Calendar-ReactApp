import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/app-icon/icon-70x70.png';

function matchMedia(e) {
    if (e.matches) {
        return true;
    } else {
        return false;
    }
}

class Header extends React.Component {
    mediaQuery = window.matchMedia('(max-width: 896px)');
    state = {
        displayMobileIcon: matchMedia(this.mediaQuery),
        openSideBar: false,
    }

    onChangeMedia = (e) => {
        this.setState({
            displayMobileIcon: matchMedia(e)
        });
    };

    onClickMenuIcon = () => {
        this.setState((prevState) => (
            {
                openSideBar: !prevState.openSideBar
            }
        ))
    }

    render() {
        this.mediaQuery.addEventListener('change', this.onChangeMedia);
        const { token } = this.props;
        return (
            <header className={!token ? 'white-header' : 'gradient-header'}>
                <Link to='/' className='home-link'>
                    {!token ? <img src={logo} alt="Calendar App" /> : null}
                    <h2>Calendar App</h2>
                </Link>
                <div className='container-short container-log-button'>
                    {
                        ((token) => {
                            if (token) {
                                return (
                                    !this.state.displayMobileIcon ? (
                                        <Link
                                            to='/logout'
                                            className='log-button button'
                                        >
                                            Log out
                                        </Link>
                                    ) : (
                                            <div className='menu-icon-container' onClick={this.onClickMenuIcon}>
                                                <span className="material-icons">
                                                    menu
                                                </span>
                                                {
                                                    this.state.openSideBar ? (
                                                        <SideBarAccount
                                                            user={this.props.user}
                                                        />
                                                    ) : (
                                                        null
                                                    )
                                                }
                                            </div>
                                        )
                                )
                            } else {
                                return (
                                    <Link
                                        to='/login'
                                        className='log-button button'
                                    >
                                        Login
                                    </Link>
                                )
                            }
                        })(token)
                    }
                </div>
            </header>
        )
    }
};

const SideBarAccount = (props) => {
    const firstLetter = props.user.charAt(0);
    return (
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
    )
}

export default Header;