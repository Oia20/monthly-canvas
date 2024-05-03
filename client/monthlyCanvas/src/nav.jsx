import './nav.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className="header-nav">
        <div className="logo"><p>Monthly-Canvas</p></div>
        <Link to="/login">
            <button><h4>Sign in</h4></button>
        </Link>
        </nav>
    )

}

