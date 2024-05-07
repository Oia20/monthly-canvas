import "./register.css"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react'; // Import useState hook
import { supabase } from './supabaseClient'

export default function RegisterForm() {
    const [formData, setFormData] = useState({}); // State for form data
    const [error, setError] = useState(null); // State for error message

    // const supabase = createClient(
    //     "https://gliscfokeivkvdrwzlsv.supabase.co",
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsaXNjZm9rZWl2a3Zkcnd6bHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MDQ0MDEsImV4cCI6MjAzMDA4MDQwMX0.XTXSScKdkRFNKbvB5lbPy8-XBtEec7oMac29BSb71Is"
    // )

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const signUpNewUser = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    redirectTo: 'http://127.0.0.1:5173/',
                },
            });

            if (error) {
                console.error(error.message);
                setError(error.message);
            } else {
                console.log("User signed up successfully:", data);
                // Redirect or show success message here
            }
        } catch (error) {
            console.error('Sign up error:', error.message);
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Create a Monthly-Canvas account</h1>
                <form onSubmit={signUpNewUser}> {/* Add onSubmit event handler */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required onChange={handleChange} />
                    </div>
                    <button className="logbut" type="submit"><h4>Register</h4></button>
                </form>
                {error && <p className="error">{error}</p>} {/* Display error message */}
                <p>Have an account? <Link to="/login">Log in</Link></p>
                <Link to="/">
                    <p><a>Return to this month's artwork</a></p>
                </Link>
            </div>
        </div>
    )
}
