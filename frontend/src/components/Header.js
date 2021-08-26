import React from 'react';
import logo from '../images/logo.svg';

import { Link } from 'react-router-dom';



   
function Header({userData, loggedIn, onSignOut}) {

    const [clickLink, setClickLink] = React.useState()
function handleLinkClick () {
    if(clickLink) {
        setClickLink(false)
    } else{
    setClickLink(true)
    }
    

}

return(
        <header className='header'>
            <img  className='logo' alt='Логотип Место' src={logo}/>
            <div className='header__links'>
                <p className={`header__email ${loggedIn ? '' : 'header__email_hidden'}`} >{userData.email}</p>
                <Link className='header__link'
                onClick={handleLinkClick}
                 to={`${loggedIn ? '' :( clickLink ? '/signin' : '/signup' )}`}
                >
                    {loggedIn ? '' :( clickLink ? 'Вход' : 'Регистрация' )}
                </Link>

                <Link
                className={`header__link header__link_color-grey ${!loggedIn && 'header__email_hidden'}` }
                 to='/'
                onClick={onSignOut}
                >Выйти</Link>

            </div>
        </header>
    );
}
export default Header;