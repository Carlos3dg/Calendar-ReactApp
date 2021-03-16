import React from 'react';
import { Link } from 'react-router-dom';
import SideBarAccount from './SideBarAccount'
import {matchMedia} from '../../helpers/mediaQueries';
import logo from '../../img/app-icon/icon-70x70.png';

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
                                            <div className='menu-icon-container'>
                                                <span className="material-icons menu-icon" onClick={this.onClickMenuIcon}>
                                                    menu
                                                </span>
                                                {
                                                    this.state.openSideBar ? (
                                                        <SideBarAccount
                                                            user={this.props.user}
                                                            closeSideBar={this.onClickMenuIcon}
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

export default Header;