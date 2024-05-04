import "./login.css"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default function LoginForm() {
    return (
        <div className="login-container">
            <div className="login-form">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />
                </div>
                <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="#">Sign up</a></p>
            <Link to="/">
                <a>Return to this months artwork</a>
            </Link>
            </div>
        </div>
    )
}