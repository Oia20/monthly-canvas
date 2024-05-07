import { useState } from 'react'; // Import useState hook
import { createClient } from '@supabase/supabase-js';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import './login.css'
import { supabase } from './supabaseClient'

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error message
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Login error:', error.message);
                setError(error.message);
            } else {
                console.log('User:', user);
                navigate("/")
                // Redirect user after successful login
            }
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Sign in to Monthly-Canvas</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="logbut" type="submit"><h4>Login</h4></button>
                </form>
                {error && <p className="error">{error}</p>}
                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                <Link to="/">
                    <p>Return to this month's artwork</p>
                </Link>
            </div>
        </div>
    );
}
