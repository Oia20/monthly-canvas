import "./register.css"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default function RegisterForm() {
    return (
        <div className="login-container">
            <div className="login-form">
            <h1>Create a Monthly-Canvas account</h1>
            <form>
                <div className="form-group">
                <label for="username">Username</label>
                <input type="username" id="username" name="username" placeholder="myEpicName"required />
                </div>
                <div className="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />
                </div>
                <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required />
                </div>
                <button className="logbut" type="submit"><h4>Register</h4></button>
            </form>
            <p>Have an account? <Link to="/login"><a>Log in</a></Link></p>
            <Link to="/">
                <p><a>Return to this months artwork</a></p>
            </Link>
            </div>
        </div>
    )
}