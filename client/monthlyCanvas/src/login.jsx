import "./login.css"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default function LoginForm() {
    return (
        <div className="login-container">
            <div className="login-form">
            <h1>Sign in to Monthly-Canvas</h1>
            <form>
                <div className="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />
                </div>
                <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required />
                </div>
                <button className="logbut" type="submit"><h4>Login</h4></button>
            </form>
            <p>Don't have an account? <a href="#">Sign up</a></p>
            <Link to="/">
                <p><a>Return to this months artwork</a></p>
            </Link>
            </div>
        </div>
    )
}