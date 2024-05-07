import './nav.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

export default function Nav() {
    const [user, setUser] = useState(null)

    const supabase = createClient(
        "https://gliscfokeivkvdrwzlsv.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsaXNjZm9rZWl2a3Zkcnd6bHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MDQ0MDEsImV4cCI6MjAzMDA4MDQwMX0.XTXSScKdkRFNKbvB5lbPy8-XBtEec7oMac29BSb71Is"
      );
      useEffect(() => {
        fetchUser();
      }, []);
    async function fetchUser() {
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user.aud)
        setUser(user.aud)
      }


    async function signOut() {
        await supabase.auth.signOut()
        setUser(null);
        window.location.reload();
    }
    function LogButton() {
        if (user) {
            return (
                <button onClick={signOut}><h4>Sign out</h4></button>
            )
        } else {
            return (
            <Link to="/login">
                <button><h4>Sign in</h4></button>
            </Link>
            )
        }
    }
    return (
        <nav className="header-nav">
        <div className="logo"><p>Monthly-Canvas</p></div>
        <LogButton />
        </nav>
    )

}

