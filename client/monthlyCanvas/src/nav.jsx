import './nav.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'

export default function Nav() {
    const [user, setUser] = useState(null)
      useEffect(() => {
        fetchUser();
      }, []);
    async function fetchUser() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user.aud) {
            setUser(user.aud)
          }
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
            <Link to="/monthly-canvas/login">
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

