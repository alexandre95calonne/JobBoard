import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './style/scss/Header.scss';
import Compagny_Logo from './style/image/job_jungle_logo.svg';
import IconDeco from './style/image/deconnexion.png'
import Perso from './style/image/avatar-simple.png'


export default function Header() {
    const [showNav, setShowNav] = useState(false);
    const sidenavRef = useRef(null);
    const openBtnRef = useRef(null);
    const [isAuth, setIsAuth] = useState(false)
    const [userRole, setUserRole] = useState(null)

    const handleLogOut = () => {
        const confirmation = window.confirm("Are you sure you want to log out ?")
        if (confirmation) {
            localStorage.removeItem('jwt')
            localStorage.removeItem('userRole')
            setIsAuth(false)
            window.location.href = '/'
        }
    }


    useEffect(() => {

        const token = localStorage.getItem('jwt')
        setIsAuth(!!token)

        const role = localStorage.getItem('userRole')
        setUserRole(role)

        function handleClickOutside(event) {
            if (showNav && !sidenavRef.current.contains(event.target) && !openBtnRef.current.contains(event.target)) {
                setShowNav(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNav]);

    return (
        <>
            <header>
                <div className="logo">
                    {userRole === 'admin' ? (
                        <Link to={`/admin`}>
                            <img src={Compagny_Logo} alt="React Logo" />
                        </Link>
                    ) : userRole === 'candidate' || !isAuth ? (
                        <Link to={`/`}>
                            <img src={Compagny_Logo} alt="React Logo" />
                        </Link>
                    ) : userRole === 'employer' ? (
                        <Link to={`/employer`}>
                            <img src={Compagny_Logo} alt="React Logo" />
                        </Link>
                    ) : null}
                </div>

                <nav>
                    <ul>
                        {((!isAuth || userRole === 'candidate') && (
                            <>
                                <Link to={'/'}>
                                    <li>FIND A JOB</li>
                                </Link>
                                <Link to={'/companies'}>
                                    <li>FIND A COMPANY</li>
                                </Link>
                            </>
                        ))}
                        {((isAuth && userRole === 'admin') && (
                            <>
                                <Link to={'/admin'}>
                                    <li>COMPANIES</li>
                                </Link>
                                <Link to={'/admin/offers'}>
                                    <li>OFFERS</li>
                                </Link>
                                <Link to={'/admin/users'}>
                                    <li>PEOPLE</li>
                                </Link>
                            </>
                        ))}
                    </ul>
                </nav>
                <div className='header_right'>
                    {(!isAuth || userRole === 'candidate') && (
                        <>
                            <Link to={`/form-employer`}>
                                <div className='Employer'><p>EMPLOYER</p></div>
                            </Link>
                        </>
                    )}
                    {isAuth && (
                        <div className='deco-perso'>
                            <Link to={`/personal-infos`}>
                                <div className='perso'>
                                    <img src={Perso} alt="iconDeco" />
                                </div>
                            </Link>
                            <div className='deco'>
                                <img src={IconDeco} alt="iconDeco" onClick={handleLogOut} />
                            </div>
                        </div>
                    )}
                    {!isAuth && (
                        <Link to={`/sign`}>
                            <div className='sign_in'><p>SIGN IN</p></div>
                        </Link>
                    )}
                </div>

                <div id="mySidenav" className={`sidenav ${showNav ? 'active' : ''}`}>
                    <a id="closeBtn" href="#" className="close" onClick={() => setShowNav(false)}>×</a>
                    <ul>
                        <li>
                            <Link to={`/`} onClick={() => setShowNav(false)}>HOME</Link>
                        </li>
                        <li>
                            <Link to={`/offers`} onClick={() => setShowNav(false)}>FIND A JOB</Link>
                        </li>
                        <li>
                            <Link to={`/companies`} onClick={() => setShowNav(false)}>FIND A COMPANY</Link>
                        </li>
                        <li>
                            <Link to={`/employer`} onClick={() => setShowNav(false)}>EMPLOYER</Link>
                        </li>
                        <li>
                            {!isAuth && (
                                <Link to={`/sign`}>
                                    <div className='sign_in'><p>SIGN IN</p></div>
                                </Link>
                            )}
                        </li>
                        {isAuth && (
                            <div className='deco-perso'>
                                <div className='perso'>
                                    <img src={Perso} alt="iconDeco" />
                                </div>
                                <div className='deco'>
                                    <img src={IconDeco} alt="iconDeco" onClick={handleLogOut} />
                                </div>
                            </div>

                        )}
                    </ul>

                </div>

                <a href="#" id="openBtn" onClick={() => setShowNav(true)}>
                    <span className="burger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </a>

            </header>
        </>
    )
}