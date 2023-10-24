import "./style/SCSS/Footer.scss"
import { Link } from 'react-router-dom';
import Compagny_Logo from './style/Image/job_jungle_logo.svg';
import Instagram_Logo from './style/Image/instagram_logo.svg';
import Linkedin_Logo from './style/Image/Linkedin.svg';
import Twitter_Logo from './style/Image/Twitter.svg';
// import Youtube_Logo from './style/Image/youtube_Logo.svg';

export default function Footer() {
    return (
        <>
            <footer>
                <div className="container-logo">
                    <div className="Logo">
                        <img src={Compagny_Logo} alt="Company Logo" className="company_logo" />
                        <div className="our_Socialmedia_logo">
                            <img src={Instagram_Logo} alt="Instagram Logo" />
                            <img src={Linkedin_Logo} alt="Linkedin Logo" className="linkedin" />
                            <img src={Twitter_Logo} alt="Twitter Logo" className="twitter"/>
                        </div>
                    </div>
                </div>

                <div className="about-news">
                    <div className="About_us">
                        <nav>
                            <ul>
                                <h2>About</h2>
                                <Link to={'/Concept'}>
                                    <li> Concept</li>
                                </Link>
                                <Link to={'/About_us'}>
                                    <li>About us</li>
                                </Link>
                                <Link to={'/Help_Center'}>
                                    <li>Help Center</li>
                                </Link>
                            </ul>
                        </nav>
                    </div>
                    <div className="Newsletter">
                        <div className="title">
                            <h2>Join our Newsletter</h2>
                            <p>Relevant advice, informative Q&As, inspirational portraits, newsworthy reports, videos, job openings, company profiles, and more.</p>
                        </div>
                        <div className="button_newsletter">
                            <input type="text" placeholder='Email' />
                            <div className="button">
                                <p>Join us</p>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}